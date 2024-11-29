import { type SettingsState, SettingsStateSchema } from '@/components/settings/types'

import { cookies } from 'next/headers'

import { defaultSettings, STORAGE_KEY } from './config-settings' // ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export async function detectSettings(): Promise<SettingsState> {
  const cookieStore = await cookies()

  const settingsStore = cookieStore.get(STORAGE_KEY)

  const { data, success } = SettingsStateSchema.safeParse(settingsStore)

  if (success) {
    return data
  }

  return defaultSettings
}
