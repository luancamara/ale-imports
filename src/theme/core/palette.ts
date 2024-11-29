import type { ColorSystemOptions } from '@mui/material/styles'

import { createPaletteChannel, varAlpha } from '../styles'
import { COLORS } from './colors'

// ----------------------------------------------------------------------

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    blackChannel: string,
    whiteChannel: string
  }

  interface TypeText {
    disabledChannel: string
  }

  interface TypeBackground {
    neutral: string,
    neutralChannel: string
  }

  interface SimplePaletteColorOptions {
    darker: string,
    darkerChannel: string,
    lighter: string,
    lighterChannel: string
  }

  interface PaletteColor {
    darker: string,
    darkerChannel: string,
    lighter: string,
    lighterChannel: string
  }
}

declare module '@mui/material/styles' {
  interface ThemeVars {
    transitions: Theme['transitions']
  }
}

declare module '@mui/material' {
  interface Color {
    ['100Channel']: string,
    ['200Channel']: string,
    ['300Channel']: string,
    ['400Channel']: string,
    ['500Channel']: string,
    ['50Channel']: string,
    ['600Channel']: string,
    ['700Channel']: string,
    ['800Channel']: string,
    ['900Channel']: string
  }
}

export type ColorType = 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning'

// ----------------------------------------------------------------------

// Grey
export const grey = createPaletteChannel(COLORS.grey)

// Primary
export const primary = createPaletteChannel(COLORS.primary)

// Secondary
export const secondary = createPaletteChannel(COLORS.secondary)

// Info
export const info = createPaletteChannel(COLORS.info)

// Success
export const success = createPaletteChannel(COLORS.success)

// Warning
export const warning = createPaletteChannel(COLORS.warning)

// Error
export const error = createPaletteChannel(COLORS.error)

// Common
export const common = createPaletteChannel(COLORS.common)

// Text
export const text = {
  dark: createPaletteChannel({ disabled: grey[600], primary: '#FFFFFF', secondary: grey[500] }),
  light: createPaletteChannel({ disabled: grey[500], primary: grey[800], secondary: grey[600] })
}

// Background
export const background = {
  dark: createPaletteChannel({ default: grey[900], neutral: '#28323D', paper: grey[800] }),
  light: createPaletteChannel({ default: '#FFFFFF', neutral: grey[200], paper: '#FFFFFF' })
}

// Action
export const baseAction = {
  disabled: varAlpha(grey['500Channel'], 0.8),
  disabledBackground: varAlpha(grey['500Channel'], 0.24),
  disabledOpacity: 0.48,
  focus: varAlpha(grey['500Channel'], 0.24),
  hover: varAlpha(grey['500Channel'], 0.08),
  hoverOpacity: 0.08,
  selected: varAlpha(grey['500Channel'], 0.16)
}

export const action = {
  dark: { ...baseAction, active: grey[500] },
  light: { ...baseAction, active: grey[600] }
}

/*
 * Base palette
 */
export const basePalette = {
  action,
  common,
  divider: varAlpha(grey['500Channel'], 0.2),
  error,
  grey,
  info,
  primary,
  secondary,
  success,
  warning
}

export const lightPalette = {
  ...basePalette,
  action: action.light,
  background: background.light,
  text: text.light
}

export const darkPalette = {
  ...basePalette,
  action: action.dark,
  background: background.dark,
  text: text.dark
}

// ----------------------------------------------------------------------

export const colorSchemes: Partial<Record<'dark' | 'light', ColorSystemOptions>> = {
  dark: { palette: darkPalette },
  light: { palette: lightPalette }
}
