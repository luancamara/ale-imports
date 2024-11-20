import axios, { AxiosError } from "axios"
import { getToken, refreshToken } from "@/actions/oauth"
import { env } from "@/lib/env"

export const api = axios.create({
  baseURL: env.ML_API_BASE_URL,
})

api.interceptors.request.use(
  async (config) => {
    const tokenResponse = await getToken()
    config.headers = config.headers || {}
    config.headers["Authorization"] = `Bearer ${tokenResponse.access_token}`
    return config
  },
  (error: any) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data &&
      (error.response.data as any).code === "unauthorized" &&
      (error.response.data as any).message === "invalid access token"
    ) {
      try {
        const { access_token } = await refreshToken()

        const originalRequestConfig = error.config
        originalRequestConfig.headers = originalRequestConfig.headers || {}
        originalRequestConfig.headers["Authorization"] = `Bearer ${access_token}`

        return api.request(originalRequestConfig)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
