import type { CssVarsTheme, CssVarsThemeOptions } from '@mui/material/styles'
import type { Theme as BaseTheme } from '@mui/material/styles/createTheme'
import type { TypographyOptions } from '@mui/material/styles/createTypography'

import { z } from 'zod'

// ----------------------------------------------------------------------

export type Theme = CssVarsTheme & Omit<BaseTheme, 'applyStyles' | 'palette'>

export type ThemeUpdateOptions = {
  typography?: TypographyOptions
} & Omit<CssVarsThemeOptions, 'typography'>

export type ThemeComponents = CssVarsThemeOptions['components']

export type ThemeColorScheme = 'dark' | 'light'

export type ThemeDirection = 'ltr' | 'rtl'

export interface ThemeLocaleComponents {
  components: ThemeComponents
}

export const SemanticColorSchema = z.object({
  contrastText: z.string(),
  dark: z.string(),
  darker: z.string(),
  light: z.string(),
  lighter: z.string(),
  main: z.string()
})

export type SemanticColor = z.infer<typeof SemanticColorSchema>

export const ColorsSchema = z.object({
  common: z.object({
    black: z.string(),
    white: z.string()
  }),
  error: SemanticColorSchema,
  grey: z.object({
    '100': z.string(),
    '200': z.string(),
    '300': z.string(),
    '400': z.string(),
    '50': z.string(),
    '500': z.string(),
    '600': z.string(),
    '700': z.string(),
    '800': z.string(),
    '900': z.string()
  }),
  info: SemanticColorSchema,
  primary: SemanticColorSchema,
  secondary: SemanticColorSchema,
  success: SemanticColorSchema,
  warning: SemanticColorSchema
})

export type Colors = z.infer<typeof ColorsSchema>
