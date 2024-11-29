import type { SettingsState } from '@/components/settings'

import type { Theme } from '@mui/material/styles'

import type { ThemeLocaleComponents } from './types'

import { ptBR } from '@mui/material/locale'

import { extendTheme } from '@mui/material/styles'
import { colorSchemes, components, customShadows, shadows, typography } from './core'
import { overridesTheme } from './overrides-theme'
import { setFont } from './styles/utils'
import { updateComponentsWithSettings, updateCoreWithSettings } from './with-settings/update-theme'

// ----------------------------------------------------------------------

export function createTheme(
  localeComponents: ThemeLocaleComponents = {
    components: { ...ptBR.components },
  },
  settings: SettingsState
): Theme {
  const initialTheme = {
    colorSchemes,
    components,
    cssVariables: true,
    cssVarPrefix: '',
    customShadows: customShadows(settings.colorScheme),
    direction: settings.direction,
    shadows: shadows(settings.colorScheme),
    shape: { borderRadius: 8 },
    shouldSkipGeneratingVar,
    typography: {
      ...typography,
      fontFamily: setFont(settings.fontFamily)
    }
  }

  /**
   * 1.Update values from settings before creating theme.
   */
  const updateTheme = updateCoreWithSettings(initialTheme, settings)

  /**
   * 2.Create theme + add locale + update component with settings.
   */
  const theme = extendTheme(
    updateTheme,
    localeComponents,
    updateComponentsWithSettings(settings),
    overridesTheme
  )

  return theme
}

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(keys: string[]): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'breakpoints',
    'cssVarPrefix',
    'unstable_sxConfig',
    'typography'
    // 'transitions',
  ]

  const skipPaletteKeys: {
    [key: string]: string[]
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon']
  }

  const isPaletteKey = keys[0] === 'palette'

  if (isPaletteKey) {
    const paletteType = keys[1] || 'global'
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global

    return keys.some(key => skipKeys?.includes(key))
  }

  return keys.some(key => skipGlobalKeys?.includes(key))
}

/**
 * createTheme without @settings and @locale components.
 *
 ```jsx
 export function createTheme(): Theme {
 const initialTheme = {
 colorSchemes,
 shadows: shadows('light'),
 customShadows: customShadows('light'),
 shape: { borderRadius: 8 },
 components,
 typography,
 cssVarPrefix: '',
 shouldSkipGeneratingVar,
 };

 const theme = extendTheme(initialTheme, overridesTheme);

 return theme;
 }
 ```
 */
