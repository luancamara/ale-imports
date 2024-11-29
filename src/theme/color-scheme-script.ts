'use client'

import { defaultSettings } from '@/components/settings'

import InitColorSchemeScript from '@mui/system/InitColorSchemeScript'

// ----------------------------------------------------------------------

export const schemeConfig = {
  defaultMode: defaultSettings.colorScheme,
  modeStorageKey: 'theme-mode'
}

export const InitColorScheme = InitColorSchemeScript(schemeConfig)
