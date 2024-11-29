import type { AxiosError, AxiosRequestConfig } from 'axios'
import { getToken, refreshToken } from '@/actions/oauth'
import { env } from '@/lib/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.ML_API_BASE_URL,
})

api.interceptors.request.use(
  async (config) => {
    const tokenResponse = await getToken()
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${tokenResponse.access_token}`
    return config
  },
  (error: any) => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    console.group('Axios Error')
    console.error('Status: ', error.status)
    console.error('Status text: ', error.response?.statusText)
    console.error('Data: ', error.response?.data)
    console.error('Config: ', error.config)
    console.groupEnd()

    if (
      error.response
      && error.response.status === 401
      && error.response.data
      && (error.response.data as any).code === 'unauthorized'
      && (error.response.data as any).message === 'invalid access token'
    ) {
      try {
        const { access_token } = await refreshToken()

        const originalRequestConfig = error.config

        if (!originalRequestConfig) {
          return Promise.reject(error)
        }

        originalRequestConfig.headers = originalRequestConfig.headers || {}
        originalRequestConfig.headers.Authorization = `Bearer ${access_token}`

        return api.request(originalRequestConfig)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export async function fetcher(args: [string, AxiosRequestConfig] | string) {
  try {
    const [url, config] = Array.isArray(args) ? args : [args]

    const res = await api.get(url, { ...config })

    return res.data
  } catch (error) {
    console.error('Failed to fetch:', error)
    throw error
  }
}

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  calendar: '/api/calendar',
  chat: '/api/chat',
  kanban: '/api/kanban',
  mail: {
    details: '/api/mail/details',
    labels: '/api/mail/labels',
    list: '/api/mail/list',
  },
  post: {
    details: '/api/post/details',
    latest: '/api/post/latest',
    list: '/api/post/list',
    search: '/api/post/search',
  },
  product: {
    details: '/api/product/details',
    list: '/api/product/list',
    search: '/api/product/search',
  },
}
