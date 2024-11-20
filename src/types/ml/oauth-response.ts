import { FirestoreDataConverter } from "@firebase/firestore"
import { z } from "zod"

export const MLOauthTokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  user_id: z.number(),
  refresh_token: z.string(),
  updatedAt: z.number(),
})

export type MLOauthTokenResponse = z.infer<typeof MLOauthTokenResponseSchema>

export const MLOauthTokenResponseFirestoreConverter: FirestoreDataConverter<MLOauthTokenResponse> = {
  fromFirestore(snapshot, options): MLOauthTokenResponse {
    const data = snapshot.data(options)
    return MLOauthTokenResponseSchema.parse(data)
  },
  toFirestore(data) {
    return data
  },
}
