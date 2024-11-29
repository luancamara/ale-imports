import type { Components, Theme } from '@mui/material/styles'

import { filledInputClasses } from '@mui/material/FilledInput'
import { inputBaseClasses } from '@mui/material/InputBase'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'

import { varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    input: ({ theme }) => ({
      '&::placeholder': {
        color: (theme.vars || theme).palette.text.disabled,
        opacity: 1
      },
      fontSize: theme.typography.pxToRem(15),
      [theme.breakpoints.down('sm')]: {
        // This will prevent zoom in Safari min font size ~ 16px
        fontSize: theme.typography.pxToRem(16)
      }
    }),
    root: ({ theme }) => ({
      [`&.${inputBaseClasses.disabled}`]: {
        '& svg': { color: (theme.vars || theme).palette.text.disabled }
      }
    })
  }
}

// ----------------------------------------------------------------------

const MuiInput: Components<Theme>['MuiInput'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    underline: ({ theme }) => ({
      '&::after': { borderBottomColor: (theme.vars || theme).palette.text.primary },
      '&::before': {
        borderBottomColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.32)
      }
    })
  }
}

// ----------------------------------------------------------------------

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    notchedOutline: ({ theme }) => ({
      borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.2),
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.shortest
      })
    }),
    root: ({ theme }) => ({
      [`&.${outlinedInputClasses.disabled}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.action.disabledBackground
        }
      },
      [`&.${outlinedInputClasses.error}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.error.main
        }
      },
      [`&.${outlinedInputClasses.focused}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.text.primary
        }
      }
    })
  }
}

// ----------------------------------------------------------------------

const MuiFilledInput: Components<Theme>['MuiFilledInput'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { disableUnderline: true },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover': {
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16)
      },
      [`&.${filledInputClasses.disabled}`]: {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground
      },
      [`&.${filledInputClasses.error}`]: {
        [`&.${filledInputClasses.focused}`]: {
          backgroundColor: varAlpha((theme.vars || theme).palette.error.mainChannel, 0.16)
        },
        backgroundColor: varAlpha((theme.vars || theme).palette.error.mainChannel, 0.08)
      },
      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16)
      },
      backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
      borderRadius: theme.shape.borderRadius
    })
  }
}

// ----------------------------------------------------------------------

export const textfield = {
  MuiFilledInput,
  MuiInput,
  MuiInputBase,
  MuiOutlinedInput
}
