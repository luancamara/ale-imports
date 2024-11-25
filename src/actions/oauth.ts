'use server'

import type { MLOauthTokenResponse } from '@/types/ml/oauth-response'
import type { AxiosResponse } from 'axios'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { firestore } from '@/lib/firebase'
import { MLOauthTokenResponseFirestoreConverter } from '@/types/ml/oauth-response'
import { doc, getDoc, setDoc } from '@firebase/firestore'

const docRef = doc(firestore, 'oauth', 'token').withConverter(MLOauthTokenResponseFirestoreConverter)

export async function getToken(): Promise<MLOauthTokenResponse> {
  const documentSnapshot = await getDoc(docRef)

  const data = documentSnapshot.data()

  if (!data) {
    throw new Error('No token found')
  }

  return data
}

export async function setToken(data: Omit<MLOauthTokenResponse, 'updatedAt'>) {
  await setDoc(docRef, { ...data, updatedAt: Date.now() })
}

export async function refreshToken(): Promise<MLOauthTokenResponse> {
  const { refresh_token } = await getToken()

  const tokenResponse: AxiosResponse<Omit<MLOauthTokenResponse, 'updatedAt'>> = await api.post('/oauth/token', {
    grant_type: 'refresh_token',
    client_id: env.ML_CLIENT_ID,
    client_secret: env.ML_CLIENT_SECRET,
    refresh_token,
  })

  if (tokenResponse.status !== 200) {
    throw new Error(`Invalid token response, status code: ${tokenResponse.status}`)
  }

  await setToken(tokenResponse.data)

  return { ...tokenResponse.data, updatedAt: Date.now() }
}
