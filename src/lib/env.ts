import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ANALYZE: z.enum(['true', 'false']).optional(),
    ML_CLIENT_SECRET: z.string().optional(),
    ML_CLIENT_ID: z.string().optional(),
    ML_REFRESH_TOKEN: z.string().optional(),
    ML_API_BASE_URL: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    ML_CLIENT_SECRET: process.env.ML_CLIENT_SECRET,
    ML_CLIENT_ID: process.env.ML_CLIENT_ID,
    ML_REFRESH_TOKEN: process.env.ML_REFRESH_TOKEN,
    ML_API_BASE_URL: process.env.ML_API_BASE_URL,
  },
})
