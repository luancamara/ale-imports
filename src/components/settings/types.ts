import type { SxProps, Theme } from '@mui/material/styles'

import { z } from 'zod'

// ----------------------------------------------------------------------

export type SettingsCaches = 'cookie' | 'localStorage'

export interface SettingsDrawerProps {
  hideColorScheme?: boolean,
  hideCompact?: boolean,
  hideContrast?: boolean,
  hideDirection?: boolean,
  hideFont?: boolean,
  hideNavColor?: boolean,
  hideNavLayout?: boolean,
  hidePresets?: boolean,
  sx?: SxProps<Theme>
}

export const SettingsStateSchema = z.object({
  colorScheme: z.enum(['light', 'dark']),
  compactLayout: z.boolean(),
  contrast: z.enum(['default', 'hight']),
  direction: z.enum(['ltr', 'rtl']),
  fontFamily: z.string(),
  navColor: z.enum(['integrate', 'apparent']),
  navLayout: z.enum(['vertical', 'horizontal', 'mini']),
  primaryColor: z.enum(['default', 'cyan', 'purple', 'blue', 'orange', 'red'])
})

export type SettingsState = z.infer<typeof SettingsStateSchema>

export type SettingsContextValue = {
  canReset: boolean,
  onCloseDrawer: () => void,
  onReset: () => void,
  onToggleDrawer: () => void,
  onUpdate: (updateValue: Partial<SettingsState>) => void,
  onUpdateField: (
    name: keyof SettingsState,
    updateValue: SettingsState[keyof SettingsState]
  ) => void,
  // Drawer
  openDrawer: boolean
} & SettingsState

export interface SettingsProviderProps {
  caches?: SettingsCaches,
  children: React.ReactNode,
  settings: SettingsState
}
