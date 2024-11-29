import type { Components, Theme } from '@mui/material/styles'

import type { SettingsState } from '@/components/settings'

import type { ThemeComponents, ThemeUpdateOptions } from '../types'

import { COLORS } from '../core/colors'
import { components as coreComponents } from '../core/components'
import { customShadows as coreCustomShadows, createShadowColor } from '../core/custom-shadows'
import { grey as coreGreyPalette, primary as corePrimaryPalette } from '../core/palette'
import { createPaletteChannel, hexToRgbChannel } from '../styles'
import PRIMARY_COLOR from './primary-color.json'

// ----------------------------------------------------------------------

/**
 * [1] settings @primaryColor
 * [2] settings @contrast
 */

export function updateCoreWithSettings(
  theme: ThemeUpdateOptions,
  settings: SettingsState
): ThemeUpdateOptions {
  const { colorSchemes, customShadows } = theme

  return {
    ...theme,
    colorSchemes: {
      ...colorSchemes,
      dark: {
        palette: {
          ...colorSchemes?.dark?.palette,
          /** [1] */
          primary: getPalettePrimary(settings.primaryColor)
        }
      },
      light: {
        palette: {
          ...colorSchemes?.light?.palette,
          /** [2] */
          background: {
            ...colorSchemes?.light?.palette?.background,
            default: getBackgroundDefault(settings.contrast),
            defaultChannel: hexToRgbChannel(getBackgroundDefault(settings.contrast))
          },
          /** [1] */
          primary: getPalettePrimary(settings.primaryColor)
        }
      }
    },
    customShadows: {
      ...customShadows,
      /** [1] */
      primary:
        settings.primaryColor === 'default'
          ? coreCustomShadows('light').primary
          : createShadowColor(getPalettePrimary(settings.primaryColor).mainChannel)
    }
  }
}

// ----------------------------------------------------------------------

export function updateComponentsWithSettings(settings: SettingsState) {
  const components: ThemeComponents = {}

  /** [2] */
  if (settings.contrast === 'hight') {
    const MuiCard: Components<Theme>['MuiCard'] = {
      styleOverrides: {
        root: ({ theme }) => {
          let rootStyles = {}
          if (typeof coreComponents?.MuiCard?.styleOverrides?.root === 'function') {
            rootStyles = coreComponents.MuiCard.styleOverrides.root({ theme }) ?? {}
          }

          return {
            ...rootStyles,
            boxShadow: theme.customShadows.z1
          }
        }
      }
    }

    components.MuiCard = MuiCard
  }

  return { components }
}

// ----------------------------------------------------------------------

const PRIMARY_COLORS = {
  blue: PRIMARY_COLOR.blue,
  cyan: PRIMARY_COLOR.cyan,
  default: COLORS.primary,
  orange: PRIMARY_COLOR.orange,
  purple: PRIMARY_COLOR.purple,
  red: PRIMARY_COLOR.red
}

function getPalettePrimary(primaryColorName: SettingsState['primaryColor']) {
  /** [1] */
  const selectedPrimaryColor = PRIMARY_COLORS[primaryColorName]
  const updatedPrimaryPalette = createPaletteChannel(selectedPrimaryColor)

  return primaryColorName === 'default' ? corePrimaryPalette : updatedPrimaryPalette
}

function getBackgroundDefault(contrast: SettingsState['contrast']) {
  /** [2] */
  return contrast === 'default' ? '#FFFFFF' : coreGreyPalette[200]
}
