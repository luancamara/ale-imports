import type { TypographyOptions } from '@mui/material/styles/createTypography'

import { pxToRem, responsiveFontSizes, setFont } from '../styles/utils'

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'],
    fontWeightSemiBold: React.CSSProperties['fontWeight']
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties['fontFamily'],
    fontWeightSemiBold?: React.CSSProperties['fontWeight']
  }
  interface ThemeVars {
    typography: Theme['typography']
  }
}

// ----------------------------------------------------------------------

export const defaultFont = 'Public Sans'

export const primaryFont = setFont(defaultFont)

export const secondaryFont = setFont('Barlow')

// ----------------------------------------------------------------------

export const typography: TypographyOptions = {
  body1: {
    fontSize: pxToRem(16),
    lineHeight: 1.5
  },
  body2: {
    fontSize: pxToRem(14),
    lineHeight: 22 / 14
  },
  button: {
    fontSize: pxToRem(14),
    fontWeight: 700,
    lineHeight: 24 / 14,
    textTransform: 'unset'
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.5
  },
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightBold: '700',
  fontWeightLight: '300',
  fontWeightMedium: '500',
  fontWeightRegular: '400',
  fontWeightSemiBold: '600',
  h1: {
    fontFamily: secondaryFont,
    fontSize: pxToRem(40),
    fontWeight: 800,
    lineHeight: 80 / 64,
    ...responsiveFontSizes({ lg: 64, md: 58, sm: 52 })
  },
  h2: {
    fontFamily: secondaryFont,
    fontSize: pxToRem(32),
    fontWeight: 800,
    lineHeight: 64 / 48,
    ...responsiveFontSizes({ lg: 48, md: 44, sm: 40 })
  },
  h3: {
    fontFamily: secondaryFont,
    fontSize: pxToRem(24),
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ lg: 32, md: 30, sm: 26 })
  },
  h4: {
    fontSize: pxToRem(20),
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ lg: 24, md: 24, sm: 20 })
  },
  h5: {
    fontSize: pxToRem(18),
    fontWeight: 700,
    lineHeight: 1.5,
    ...responsiveFontSizes({ lg: 20, md: 20, sm: 19 })
  },
  h6: {
    fontSize: pxToRem(17),
    fontWeight: 600,
    lineHeight: 28 / 18,
    ...responsiveFontSizes({ lg: 18, md: 18, sm: 18 })
  },
  overline: {
    fontSize: pxToRem(12),
    fontWeight: 700,
    lineHeight: 1.5,
    textTransform: 'uppercase'
  },
  subtitle1: {
    fontSize: pxToRem(16),
    fontWeight: 600,
    lineHeight: 1.5
  },
  subtitle2: {
    fontSize: pxToRem(14),
    fontWeight: 600,
    lineHeight: 22 / 14
  }
}
