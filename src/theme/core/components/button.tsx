import type { ButtonProps } from '@mui/material/Button'
import type { Components, ComponentsVariants, CSSObject, Theme } from '@mui/material/styles'

import { loadingButtonClasses } from '@mui/lab/LoadingButton'
import { buttonClasses } from '@mui/material/Button'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

type ColorType = (typeof COLORS)[number]

function styleColors(ownerState: ButtonProps, styles: (val: ColorType) => CSSObject) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (!ownerState.disabled && ownerState.color === color) {
      acc = styles(color)
    }
    return acc
  }, {})

  return outputStyle
}

// ----------------------------------------------------------------------

const MuiButtonBase: Components<Theme>['MuiButtonBase'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }) }
}

// ----------------------------------------------------------------------

const softVariant: Record<string, ComponentsVariants<Theme>['MuiButton']> = {
  base: [
    {
      props: ({ ownerState }) => ownerState.variant === 'soft',
      style: ({ theme }) => ({
        '&:hover': {
          backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)
        },
        [`&.${buttonClasses.disabled}`]: {
          backgroundColor: (theme.vars || theme).palette.action.disabledBackground
        },
        [`&.${buttonClasses.sizeSmall}`]: {
          [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: { right: 10 },
          [`& .${loadingButtonClasses.loadingIndicatorStart}`]: { left: 10 }
        },
        [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: { right: 14 },
        [`& .${loadingButtonClasses.loadingIndicatorStart}`]: { left: 14 },
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08)
      })
    }
  ],
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
  }))
}

const MuiButton: Components<Theme>['MuiButton'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { color: 'inherit', disableElevation: true },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    /**
     * @variant contained
     */
    contained: ({
      theme
    }) => {
      const styled = {
        colors: styleColors(ownerState, color => ({
          '&:hover': { boxShadow: theme.customShadows[color] }
        })),
        inheritColor: {
          ...(ownerState.color === 'inherit'
            && !ownerState.disabled && {
            '&:hover': {
              backgroundColor: (theme.vars || theme).palette.grey[700],
              boxShadow: theme.customShadows.z8
            },
            backgroundColor: (theme.vars || theme).palette.grey[800],
            color: (theme.vars || theme).palette.common.white,
            [stylesMode.dark]: {
              '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[400] },
              backgroundColor: (theme.vars || theme).palette.common.white,
              color: (theme.vars || theme).palette.grey[800]
            }
          })
        }
      }
      return { ...styled.inheritColor, ...styled.colors }
    },
    /**
     * @variant outlined
     */
    outlined: ({
      theme
    }) => {
      const styled = {
        base: {
          '&:hover': { borderColor: 'currentColor', boxShadow: '0 0 0 0.75px currentColor' }
        },
        colors: styleColors(ownerState, color => ({
          borderColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.48)
        })),
        inheritColor: {
          ...(ownerState.color === 'inherit'
            && !ownerState.disabled && {
            '&:hover': { backgroundColor: (theme.vars || theme).palette.action.hover },
            borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)
          })
        }
      }
      return { ...styled.base, ...styled.inheritColor, ...styled.colors }
    },
    sizeLarge: ({}) => ({
      height: 48,

      variants: [{
        props: {
          variant: 'text'
        },

        style: { paddingLeft: '10px', paddingRight: '10px' }
      }, {
        props: (
          {
            ownerState
          }
        ) => ownerState.variant !== 'text',

        style: { paddingLeft: '16px', paddingRight: '16px' }
      }]
    }),
    sizeMedium: ({}) => ({
      variants: [{
        props: {
          variant: 'text'
        },

        style: { paddingLeft: '8px', paddingRight: '8px' }
      }, {
        props: (
          {
            ownerState
          }
        ) => ownerState.variant !== 'text',

        style: { paddingLeft: '12px', paddingRight: '12px' }
      }]
    }),
    /**
     * @size
     */
    sizeSmall: ({}) => ({
      height: 30,

      variants: [{
        props: {
          variant: 'text'
        },

        style: { paddingLeft: '4px', paddingRight: '4px' }
      }, {
        props: (
          {
            ownerState
          }
        ) => ownerState.variant !== 'text',

        style: { paddingLeft: '8px', paddingRight: '8px' }
      }]
    }),
    /**
     * @variant text
     */
    text: ({
      theme
    }) => {
      const styled = {
        inheritColor: {
          ...(ownerState.color === 'inherit'
            && !ownerState.disabled && {
            '&:hover': { backgroundColor: (theme.vars || theme).palette.action.hover }
          })
        }
      }
      return { ...styled.inheritColor }
    }
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
    ...[...softVariant.base!, ...softVariant.colors!]
  ]
}

// ----------------------------------------------------------------------

export const button = { MuiButton, MuiButtonBase }
