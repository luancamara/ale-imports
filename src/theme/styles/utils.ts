// ----------------------------------------------------------------------

export const stylesMode = {
  dark: '[data-mui-color-scheme="dark"] &',
  light: '[data-mui-color-scheme="light"] &'
}

export const mediaQueries = {
  upLg: '@media (min-width:1200px)',
  upMd: '@media (min-width:900px)',
  upSm: '@media (min-width:600px)',
  upXl: '@media (min-width:1536px)',
  upXs: '@media (min-width:0px)'
}

/**
 * Set font family
 */
export function setFont(fontName: string) {
  return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
}

/**
 * Converts rem to px
 */
export function remToPx(value: string): number {
  return Math.round(Number.parseFloat(value) * 16)
}

/**
 * Converts px to rem
 */
export function pxToRem(value: number): string {
  return `${value / 16}rem`
}

/**
 * Responsive font sizes
 */
export function responsiveFontSizes({ lg, md, sm }: { lg: number, md: number, sm: number }) {
  return {
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) }
  }
}

/**
 * Converts a hex color to RGB channels
 */
export function hexToRgbChannel(hex: string) {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  const r = Number.parseInt(hex.substring(1, 3), 16)
  const g = Number.parseInt(hex.substring(3, 5), 16)
  const b = Number.parseInt(hex.substring(5, 7), 16)

  return `${r} ${g} ${b}`
}

/**
 * Converts a hex color to RGB channels
 */
export function createPaletteChannel(hexPalette: Record<string, string>) {
  const channelPalette: Record<string, string> = {}

  Object.entries(hexPalette).forEach(([key, value]) => {
    channelPalette[`${key}Channel`] = hexToRgbChannel(value)
  })

  return { ...hexPalette, ...channelPalette }
}

/**
 * Color with alpha channel
 */
export function varAlpha(color: string, opacity = 1) {
  const unsupported
    = color.startsWith('#')
    || color.startsWith('rgb')
    || color.startsWith('rgba')
    || (!color.includes('var') && color.includes('Channel'))

  if (unsupported) {
    throw new Error(
      `[Alpha]: Unsupported color format "${color}".
       Supported formats are:
       - RGB channels: "0 184 217".
       - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
       Unsupported formats are:
       - Hex: "#00B8D9".
       - RGB: "rgb(0, 184, 217)".
       - RGBA: "rgba(0, 184, 217, 1)".
       `
    )
  }

  return `rgba(${color} / ${opacity})`
}
