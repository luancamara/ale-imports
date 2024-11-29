import type { CSSObject, Theme } from '@mui/material/styles'

import { env } from '@/lib/env'

import { autocompleteClasses } from '@mui/material/Autocomplete'
import { checkboxClasses } from '@mui/material/Checkbox'
import { dividerClasses } from '@mui/material/Divider'
import { menuItemClasses } from '@mui/material/MenuItem'

import { mediaQueries, remToPx, varAlpha } from './utils'
// ----------------------------------------------------------------------

/**
 * Usage:
 * ...hideScrollX,
 * ...hideScrollY,
 */
export const hideScrollX: CSSObject = {
  '&::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none',
  overflowX: 'auto',
  scrollbarWidth: 'none'
}

export const hideScrollY: CSSObject = {
  '&::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none',
  overflowY: 'auto',
  scrollbarWidth: 'none'
}

/**
 * Usage:
 * ...textGradient(`to right, ${(theme.vars || theme).palette.text.primary}, ${alpha((theme.vars || theme).palette.text.primary, 0.2)}`
 */
export function textGradient(color: string): CSSObject {
  return {
    background: `linear-gradient(${color})`,
    backgroundClip: 'text',
    color: 'transparent',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
}

/**
 * Usage:
 * ...borderGradient({ color: `to right, ${(theme.vars || theme).palette.text.primary}, ${alpha((theme.vars || theme).palette.text.primary, 0.2)}`, padding: '4px' }),
 */
export interface BorderGradientProps {
  color?: string,
  padding?: string
}

export function borderGradient(props?: BorderGradientProps): CSSObject {
  return {
    borderRadius: 'inherit',
    content: '""',
    height: '100%',
    inset: 0,
    margin: 'auto',
    //
    mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
    maskComposite: 'exclude',
    padding: props?.padding ?? '2px',
    position: 'absolute',
    WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
    WebkitMaskComposite: 'xor',
    width: '100%',
    ...(props?.color && {
      background: `linear-gradient(${props.color})`
    })
  }
}

/**
 * Usage:
 * ...bgGradient({ color: `to right, ${(theme.vars || theme).palette.grey[900]} 25%, ${varAlpha((theme.vars || theme).palette.primary.darkerChannel, 0.88)}`, imgUrl: '/assets/background/overlay.png' }),
 */
export interface BgGradientProps {
  color: string,
  imgUrl?: string
}

export function bgGradient({ color, imgUrl }: BgGradientProps): CSSObject {
  if (imgUrl) {
    return {
      background: `linear-gradient(${color}), url(${imgUrl})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
  }
  return { background: `linear-gradient(${color})` }
}

/**
 * Usage:
 * ...bgBlur({ color: `varAlpha((theme.vars || theme).palette.background.paperChannel, 0.8)`, imgUrl: '/assets/background/overlay.png', blur: 6 }),
 */
export interface BgBlurProps {
  blur?: number,
  color: string,
  imgUrl?: string
}

export function bgBlur({ blur = 6, color, imgUrl }: BgBlurProps): CSSObject {
  if (imgUrl) {
    return {
      '&::before': {
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: color,
        content: '""',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        WebkitBackdropFilter: `blur(${blur}px)`,
        width: '100%',
        zIndex: 9
      },
      backgroundImage: `url(${imgUrl})`,
      position: 'relative'
    }
  }
  return {
    backdropFilter: `blur(${blur}px)`,
    backgroundColor: color,
    WebkitBackdropFilter: `blur(${blur}px)`
  }
}

/**
 * Usage:
 * ...maxLine({ line: 2, persistent: theme.typography.caption }),
 */
export interface MediaFontSize {
  [key: string]: {
    fontSize: React.CSSProperties['fontSize']
  }
}

export interface MaxLineProps {
  line: number,
  persistent?: Partial<React.CSSProperties>
}

function getFontSize(fontSize: React.CSSProperties['fontSize']) {
  return typeof fontSize === 'string' ? remToPx(fontSize) : fontSize
}

function getLineHeight(lineHeight: React.CSSProperties['lineHeight'], fontSize?: number) {
  if (typeof lineHeight === 'string') {
    return fontSize ? remToPx(lineHeight) / fontSize : 1
  }
  return lineHeight
}

export function maxLine({ line, persistent }: MaxLineProps): CSSObject {
  const baseStyles: CSSObject = {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: line
  }

  if (persistent) {
    const fontSizeBase = getFontSize(persistent.fontSize)
    const fontSizeSm = getFontSize((persistent as MediaFontSize)[mediaQueries.upSm]?.fontSize)
    const fontSizeMd = getFontSize((persistent as MediaFontSize)[mediaQueries.upMd]?.fontSize)
    const fontSizeLg = getFontSize((persistent as MediaFontSize)[mediaQueries.upLg]?.fontSize)

    const lineHeight = getLineHeight(persistent.lineHeight, fontSizeBase)

    return {
      ...baseStyles,
      ...(lineHeight && {
        ...(fontSizeBase && { height: fontSizeBase * lineHeight * line }),
        ...(fontSizeSm && { [mediaQueries.upSm]: { height: fontSizeSm * lineHeight * line } }),
        ...(fontSizeMd && { [mediaQueries.upMd]: { height: fontSizeMd * lineHeight * line } }),
        ...(fontSizeLg && { [mediaQueries.upLg]: { height: fontSizeLg * lineHeight * line } })
      })
    }
  }

  return baseStyles
}

/**
 * Usage:
 * ...paper({ theme, color: varAlpha((theme.vars || theme).palette.background.paperChannel, 0.9), dropdown: true }),
 */
interface PaperProps {
  color?: string,
  dropdown?: boolean,
  theme: Theme
}

export function paper({ color, dropdown, theme }: PaperProps) {
  return {
    ...bgBlur({
      blur: 20,
      color: color ?? varAlpha((theme.vars || theme).palette.background.paperChannel, 0.9)
    }),
    backgroundImage: `url(${env.NEXT_PUBLIC_GENERAL.baseUrl}/assets/cyan-blur.png), url(${env.NEXT_PUBLIC_GENERAL.baseUrl}/assets/red-blur.png)`,
    backgroundPosition: 'top right, left bottom',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: '50%, 50%',
    ...(theme.direction === 'rtl' && { backgroundPosition: 'top left, right bottom' }),
    ...(dropdown && {
      borderRadius: `${theme.shape.borderRadius * 1.25}px`,
      boxShadow: theme.customShadows.dropdown,
      padding: theme.spacing(0.5)
    })
  }
}

/**
 * Usage:
 * ...menuItem(theme)
 */
export function menuItem(theme: Theme) {
  return {
    ...theme.typography.body2,
    '&:not(:last-of-type)': { marginBottom: 4 },
    [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
      '&:hover': { backgroundColor: (theme.vars || theme).palette.action.hover },
      backgroundColor: (theme.vars || theme).palette.action.selected
    },
    [`& .${checkboxClasses.root}`]: {
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5),
      padding: theme.spacing(0.5)
    },
    [`&.${menuItemClasses.selected}`]: {
      '&:hover': { backgroundColor: (theme.vars || theme).palette.action.hover },
      backgroundColor: (theme.vars || theme).palette.action.selected,
      fontWeight: theme.typography.fontWeightSemiBold
    },
    [`&+.${dividerClasses.root}`]: { margin: theme.spacing(0.5, 0) },
    borderRadius: theme.shape.borderRadius * 0.75,
    padding: theme.spacing(0.75, 1)
  }
}
