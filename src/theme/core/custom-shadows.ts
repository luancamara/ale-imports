import type { ThemeColorScheme } from '../types'

import { varAlpha } from '../styles'
import { common, error, grey, info, primary, secondary, success, warning } from './palette'

// ----------------------------------------------------------------------

export interface CustomShadows {
  //
  card?: string,
  dialog?: string,
  dropdown?: string,
  error?: string,
  info?: string,
  //
  primary?: string,
  secondary?: string,
  success?: string,
  warning?: string,
  z1?: string,
  z12?: string,
  z16?: string,
  z20?: string,
  z24?: string,
  z4?: string,
  z8?: string
}

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadows
  }
  interface ThemeOptions {
    customShadows?: CustomShadows
  }
  interface ThemeVars {
    customShadows: CustomShadows
  }
}

// ----------------------------------------------------------------------

export function createShadowColor(colorChannel: string) {
  return `0 8px 16px 0 ${varAlpha(colorChannel, 0.24)}`
}

export function customShadows(colorScheme: ThemeColorScheme) {
  const colorChannel = colorScheme === 'light' ? grey['500Channel'] : common.blackChannel

  return {
    card: `0 0 2px 0 ${varAlpha(colorChannel, 0.2)}, 0 12px 24px -4px ${varAlpha(
      colorChannel,
      0.12
    )}`,
    //
    dialog: `-40px 40px 80px -8px ${varAlpha(common.blackChannel, 0.24)}`,
    dropdown: `0 0 2px 0 ${varAlpha(colorChannel, 0.24)}, -20px 20px 40px -4px ${varAlpha(
      colorChannel,
      0.24
    )}`,
    error: createShadowColor(error.mainChannel),
    info: createShadowColor(info.mainChannel),
    //
    primary: createShadowColor(primary.mainChannel),
    secondary: createShadowColor(secondary.mainChannel),
    success: createShadowColor(success.mainChannel),
    warning: createShadowColor(warning.mainChannel),
    z1: `0 1px 2px 0 ${varAlpha(colorChannel, 0.16)}`,
    z12: `0 12px 24px -4px ${varAlpha(colorChannel, 0.16)}`,
    z16: `0 16px 32px -4px ${varAlpha(colorChannel, 0.16)}`,
    z20: `0 20px 40px -4px ${varAlpha(colorChannel, 0.16)}`,
    z24: `0 24px 48px 0 ${varAlpha(colorChannel, 0.16)}`,
    z4: `0 4px 8px 0 ${varAlpha(colorChannel, 0.16)}`,
    z8: `0 8px 16px 0 ${varAlpha(colorChannel, 0.16)}`
  }
}
