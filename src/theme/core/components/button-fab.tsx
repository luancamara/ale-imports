import type { Components, ComponentsVariants, Theme } from '@mui/material/styles'

import { fabClasses } from '@mui/material/Fab'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides {
    outlined: true,
    outlinedExtended: true,
    soft: true,
    softExtended: true
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

const DEFAULT_COLORS = ['default', 'inherit']
const EXTENDED_VARIANT = ['extended', 'outlinedExtended', 'softExtended']
const FILLED_VARIANT = ['circular', 'extended']
const OUTLINED_VARIANT = ['outlined', 'outlinedExtended']
const SOFT_VARIANT = ['soft', 'softExtended']

// ----------------------------------------------------------------------

const filledVariant: Record<string, ComponentsVariants<Theme>['MuiFab']> = {
  base: [
    {
      props: ({ ownerState }) =>
        FILLED_VARIANT.includes(ownerState.variant!) && DEFAULT_COLORS.includes(ownerState.color!),
      style: ({ theme }) => ({
        '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[400], boxShadow: 'none' },
        /**
         * @color inherit
         */
        [`&.${fabClasses.colorInherit}`]: {
          '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[700] },
          backgroundColor: (theme.vars || theme).palette.text.primary,
          color: (theme.vars || theme).palette.common.white,
          [stylesMode.dark]: {
            '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[400] },
            color: (theme.vars || theme).palette.grey[800]
          }
        },
        backgroundColor: (theme.vars || theme).palette.grey[300],
        boxShadow: theme.customShadows.z8,
        /**
         * @color default
         */
        color: (theme.vars || theme).palette.grey[800]
      })
    }
  ],
  colors: COLORS.map(color => ({
    props: ({ ownerState }) =>
      !ownerState.disabled
      && FILLED_VARIANT.includes(ownerState.variant!)
      && ownerState.color === color,
    style: ({ theme }) => ({
      '&:hover': { boxShadow: 'none' },
      boxShadow: theme.customShadows[color]
    })
  }))
}

const outlinedVariant: Record<string, ComponentsVariants<Theme>['MuiFab']> = {
  base: [
    {
      props: ({ ownerState }) => OUTLINED_VARIANT.includes(ownerState.variant!),
      style: ({ theme }) => ({
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
          borderColor: 'currentColor',
          boxShadow: '0 0 0 0.75px currentColor'
        },
        [`&.${fabClasses.colorInherit}`]: { color: (theme.vars || theme).palette.text.primary },
        [`&.${fabClasses.disabled}`]: {
          backgroundColor: 'transparent',
          border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
        },
        backgroundColor: 'transparent',
        border: `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)}`,
        boxShadow: 'none',
        color: (theme.vars || theme).palette.text.secondary
      })
    }
  ],
  colors: COLORS.map(color => ({
    props: ({ ownerState }) =>
      !ownerState.disabled
      && OUTLINED_VARIANT.includes(ownerState.variant!)
      && ownerState.color === color,
    style: ({ theme }) => ({
      '&:hover': {
        backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.08)
      },
      border: `solid 1px ${varAlpha((theme.vars || theme).palette[color].mainChannel, 0.48)}`,
      color: (theme.vars || theme).palette[color].main
    })
  }))
}

const softVariant: Record<string, ComponentsVariants<Theme>['MuiFab']> = {
  base: [
    {
      props: ({ ownerState }) =>
        SOFT_VARIANT.includes(ownerState.variant!) && DEFAULT_COLORS.includes(ownerState.color!),
      style: ({ theme }) => ({
        '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[400], boxShadow: 'none' },
        /**
         * @color inherit
         */
        [`&.${fabClasses.colorInherit}`]: {
          '&:hover': {
            backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)
          },
          backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
          color: (theme.vars || theme).palette.text.primary
        },
        backgroundColor: (theme.vars || theme).palette.grey[300],
        /**
         * @color default
         */
        boxShadow: 'none',
        color: (theme.vars || theme).palette.grey[800]
      })
    }
  ],
  colors: COLORS.map(color => ({
    props: ({ ownerState }) =>
      !ownerState.disabled
      && SOFT_VARIANT.includes(ownerState.variant!)
      && ownerState.color === color,
    style: ({ theme }) => ({
      '&:hover': {
        backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.32),
        boxShadow: 'none'
      },
      backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.16),
      boxShadow: 'none',
      color: (theme.vars || theme).palette[color].dark,
      [stylesMode.dark]: { color: (theme.vars || theme).palette[color].light }
    })
  }))
}

const sizes: ComponentsVariants<Theme>['MuiFab'] = [
  {
    props: ({ ownerState }) => EXTENDED_VARIANT.includes(ownerState.variant!),
    style: ({ theme }) => ({
      [`&.${fabClasses.sizeMedium}`]: { borderRadius: 40 / 2, height: 40, minHeight: 40 },
      [`&.${fabClasses.sizeSmall}`]: {
        borderRadius: 34 / 2,
        gap: theme.spacing(0.5),
        height: 34,
        minHeight: 34,
        padding: theme.spacing(0, 1)
      },
      borderRadius: 48 / 2,
      gap: theme.spacing(1),
      height: 48,
      minHeight: 48,
      padding: theme.spacing(0, 2),
      width: 'auto'
    })
  }
]

const MuiFab: Components<Theme>['MuiFab'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { color: 'primary' },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {},

  /**
   * **************************************
   * VARIANTS
   ***************************************
   */
  variants: [
    /**
     * @variant filled
     */
    ...[...filledVariant.base!, ...filledVariant.colors!],
    /**
     * @variant outlined
     */
    ...[...outlinedVariant.base!, ...outlinedVariant.colors!],
    /**
     * @variant soft
     */
    ...[...softVariant.base!, ...softVariant.colors!],
    /**
     * @sizes
     */
    ...sizes
  ]
}

// ----------------------------------------------------------------------

export const fab = { MuiFab }
