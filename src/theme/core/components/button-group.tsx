import type { ButtonGroupProps } from '@mui/material/ButtonGroup'
import type { Components, ComponentsVariants, CSSObject, Theme } from '@mui/material/styles'

import { buttonGroupClasses } from '@mui/material/ButtonGroup'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    soft: true
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

type ColorType = (typeof COLORS)[number]

function styleColors(ownerState: ButtonGroupProps, styles: (val: ColorType) => CSSObject) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (!ownerState.disabled && ownerState.color === color) {
      acc = styles(color)
    }
    return acc
  }, {})

  return outputStyle
}

const buttonClasses = `& .${buttonGroupClasses.firstButton}, & .${buttonGroupClasses.middleButton}`

const softVariant: Record<string, ComponentsVariants<Theme>['MuiButtonGroup']> = {
  base: [
    {
      props: ({ ownerState }) => ownerState.variant === 'soft',
      style: ({ theme }) => ({
        [`&.${buttonGroupClasses.vertical}`]: {
          [buttonClasses]: {
            [`&.${buttonGroupClasses.disabled}`]: {
              borderColor: (theme.vars || theme).palette.action.disabledBackground
            },
            borderBottom: `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)}`,
            borderRight: 'none'
          }
        },
        [buttonClasses]: {
          [`&.${buttonGroupClasses.disabled}`]: {
            borderColor: (theme.vars || theme).palette.action.disabledBackground
          },
          borderRight: `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)}`
        }
      })
    }
  ],
  colors: COLORS.map(color => ({
    props: ({ ownerState }) =>
      !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
    style: ({ theme }) => ({
      [`&.${buttonGroupClasses.vertical}`]: {
        [buttonClasses]: {
          borderColor: varAlpha((theme.vars || theme).palette[color].darkChannel, 0.24),
          [stylesMode.dark]: {
            borderColor: varAlpha((theme.vars || theme).palette[color].lightChannel, 0.24)
          }
        }
      },
      [buttonClasses]: {
        borderColor: varAlpha((theme.vars || theme).palette[color].darkChannel, 0.24),
        [stylesMode.dark]: {
          borderColor: varAlpha((theme.vars || theme).palette[color].lightChannel, 0.24)
        }
      }
    })
  }))
}

// ----------------------------------------------------------------------

const MuiButtonGroup: Components<Theme>['MuiButtonGroup'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { disableElevation: true },

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
          [buttonClasses]: {
            borderColor: varAlpha((theme.vars || theme).palette[color].darkChannel, 0.48)
          }
        })),
        disabled: {
          ...(ownerState.disabled && {
            [buttonClasses]: {
              [`&.${buttonGroupClasses.disabled}`]: {
                borderColor: (theme.vars || theme).palette.action.disabledBackground
              }
            }
          })
        },
        inheritColor: {
          ...(ownerState.color === 'inherit' && {
            [buttonClasses]: {
              borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)
            }
          })
        }
      }

      return { ...styled.inheritColor, ...styled.colors, ...styled.disabled }
    },
    /**
     * @variant text
     */
    text: ({
      theme
    }) => {
      const styled = {
        colors: styleColors(ownerState, color => ({
          [buttonClasses]: {
            borderColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.48)
          }
        })),
        disabled: {
          ...(ownerState.disabled && {
            [buttonClasses]: {
              [`&.${buttonGroupClasses.disabled}`]: {
                borderColor: (theme.vars || theme).palette.action.disabledBackground
              }
            }
          })
        },
        inheritColor: {
          ...(ownerState.color === 'inherit' && {
            [buttonClasses]: {
              borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)
            }
          })
        }
      }

      return { ...styled.inheritColor, ...styled.colors, ...styled.disabled }
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

export const buttonGroup = { MuiButtonGroup }
