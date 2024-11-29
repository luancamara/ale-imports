import type { ChipProps } from '@mui/material/Chip'
import type { Components, ComponentsVariants, CSSObject, Theme } from '@mui/material/styles'
import type { SvgIconProps } from '@mui/material/SvgIcon'

import { chipClasses } from '@mui/material/Chip'
import SvgIcon from '@mui/material/SvgIcon'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

/**
 * Icons
 * https://icon-sets.iconify.design/solar/close-circle-bold
 */
export function ChipDeleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        clipRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06'
        fill='currentColor'
        fillRule='evenodd'
      />
    </SvgIcon>
  )
}

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

type ColorType = (typeof COLORS)[number]

// ----------------------------------------------------------------------

function styleColors(ownerState: ChipProps, styles: (val: ColorType) => CSSObject) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (!ownerState.disabled && ownerState.color === color) {
      acc = styles(color)
    }
    return acc
  }, {})

  return outputStyle
}

const softVariant: Record<string, ComponentsVariants<Theme>['MuiChip']> = {
  colors: COLORS.map(color => ({
    props: ({ ownerState }) =>
      !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
    style: ({ theme }) => ({
      '&:hover': {
        backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.32)
      },
      backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.16),
      color: (theme.vars || theme).palette[color].dark,
      [stylesMode.dark]: { color: (theme.vars || theme).palette[color].light }
    })
  })),
  inheritColor: [
    {
      props: ({ ownerState }) => ownerState.variant === 'soft' && ownerState.color === 'default',
      style: ({ theme }) => ({
        '&:hover': {
          backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)
        },
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16)
      })
    }
  ]
}

// ----------------------------------------------------------------------

const MuiChip: Components<Theme>['MuiChip'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { deleteIcon: <ChipDeleteIcon /> },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    deleteIcon: {
      '&:hover': { color: 'currentColor', opacity: 1 },
      color: 'currentColor',
      opacity: 0.48
    },
    /**
     * @variant filled
     */
    filled: ({ ownerState, theme }) => {
      const styled = {
        defaultColor: {
          ...(!ownerState.disabled
            && ownerState.color === 'default' && {
            '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[700] },
            [`& .${chipClasses.avatar}`]: { color: (theme.vars || theme).palette.text.primary },
            backgroundColor: (theme.vars || theme).palette.text.primary,
            color: (theme.vars || theme).palette.common.white,
            [stylesMode.dark]: {
              '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[100] },
              color: (theme.vars || theme).palette.grey[800]
            }
          })
        }
      }
      return { ...styled.defaultColor }
    },
    icon: { color: 'currentColor' },
    label: ({ theme }) => ({ fontWeight: theme.typography.fontWeightMedium }),
    /**
     * @variant outlined
     */
    outlined: ({ ownerState, theme }) => {
      const styled = {
        defaultColor: {
          ...(!ownerState.disabled
            && ownerState.color === 'default' && {
            borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)
          })
        }
      }
      return { ...styled.defaultColor }
    },
    root: ({ ownerState, theme }) => {
      const styled = {
        colors: styleColors(ownerState, color => ({
          [`& .${chipClasses.avatar}`]: {
            backgroundColor: (theme.vars || theme).palette[color].dark,
            color: (theme.vars || theme).palette[color].lighter
          }
        })),
        disabled: {
          [`&.${chipClasses.disabled}`]: {
            [`& .${chipClasses.avatar}`]: {
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
              color: (theme.vars || theme).palette.action.disabled
            },
            opacity: 1,
            ...(ownerState.variant === 'outlined' && {
              borderColor: (theme.vars || theme).palette.action.disabledBackground,
              color: (theme.vars || theme).palette.action.disabled
            }),
            ...(['filled', 'soft'].includes(ownerState.variant!) && {
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
              color: (theme.vars || theme).palette.action.disabled
            })
          }
        }
      }

      return { ...styled.colors, ...styled.disabled }
    },
    sizeMedium: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 1.25 }),
    sizeSmall: ({ theme }) => ({ borderRadius: theme.shape.borderRadius })
  },

  /**
   * **************************************
   * VARIANTS
   ***************************************
   */
  variants: [
    /**
     * @variant soft
     */
    ...[...softVariant.inheritColor!, ...softVariant.colors!]
  ]
}

// ----------------------------------------------------------------------

export const chip = { MuiChip }
