import type { Components, CSSObject, Theme } from '@mui/material/styles'
import type { ToggleButtonProps } from '@mui/material/ToggleButton'

import { toggleButtonClasses } from '@mui/material/ToggleButton'

import { varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

type ColorType = (typeof COLORS)[number]

function styleColors(ownerState: ToggleButtonProps, styles: (val: ColorType) => CSSObject) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (!ownerState.disabled && ownerState.color === color) {
      acc = styles(color)
    }
    return acc
  }, {})

  return outputStyle
}

// ----------------------------------------------------------------------

const MuiToggleButton: Components<Theme>['MuiToggleButton'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({
      theme
    }) => {
      const styled = {
        colors: styleColors(ownerState, color => ({
          '&:hover': {
            backgroundColor: varAlpha(
              (theme.vars || theme).palette[color].mainChannel,
              (theme.vars || theme).palette.action.hoverOpacity
            ),
            borderColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.48)
          }
        })),
        disabled: {
          ...(ownerState.disabled && {
            [`&.${toggleButtonClasses.selected}`]: {
              backgroundColor: (theme.vars || theme).palette.action.selected,
              borderColor: (theme.vars || theme).palette.action.disabledBackground,
              color: (theme.vars || theme).palette.action.disabled
            }
          })
        },
        selected: {
          [`&.${toggleButtonClasses.selected}`]: {
            borderColor: 'currentColor',
            boxShadow: '0 0 0 0.75px currentColor'
          }
        }
      }

      return { ...styled.colors, ...styled.selected, ...styled.disabled }
    }
  }
}

// ----------------------------------------------------------------------

const MuiToggleButtonGroup: Components<Theme>['MuiToggleButtonGroup'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    grouped: {
      [`&.${toggleButtonClasses.root}`]: { border: 'none', borderRadius: 'inherit' },
      [`&.${toggleButtonClasses.selected}`]: { boxShadow: 'none' }
    },
    root: ({ theme }) => ({
      border: `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08)}`,
      gap: 4,
      padding: 4
    })
  }
}

// ----------------------------------------------------------------------

export const toggleButton = { MuiToggleButton, MuiToggleButtonGroup }
