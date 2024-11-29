import type { SettingsState } from './types'

import { defaultFont } from '@/theme/core/typography'

// ----------------------------------------------------------------------

export const STORAGE_KEY = 'app-settings'

export const defaultSettings: SettingsState = {
  colorScheme: 'light',
  compactLayout: true,
  contrast: 'default',
  direction: 'ltr',
  fontFamily: defaultFont,
  navColor: 'integrate',
  navLayout: 'vertical',
  primaryColor: 'default',
} as const
