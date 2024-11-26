import * as z from 'zod'

export const MLWebhookSchema = z.object({
  _id: z.string(),
  resource: z.string(),
  user_id: z.number(),
  topic: z.string(),
  application_id: z.number(),
  attempts: z.number(),
  sent: z.coerce.date(),
  received: z.coerce.date(),
})

export type MLWebhook = z.infer<typeof MLWebhookSchema>
