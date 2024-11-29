'use client'

import type {} from '@mui/lab/themeAugmentation'
import type {} from '@mui/material/themeCssVarsAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/x-tree-view/themeAugmentation'

import { useSettingsContext } from '@/components/settings'

import CssBaseline from '@mui/material/CssBaseline'
import { ptBR } from '@mui/material/locale'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { schemeConfig } from './color-scheme-script'
import { createTheme } from './create-theme'
import { RTL } from './with-settings/right-to-left'

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const settings = useSettingsContext()

  const theme = createTheme(
    {
      components: { ...ptBR.components },
    },
    settings
  )

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider
        defaultMode={schemeConfig.defaultMode}
        modeStorageKey={schemeConfig.modeStorageKey}
        theme={theme}
      >
        <CssBaseline />
        <RTL direction={settings.direction}>{children}</RTL>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  )
}
