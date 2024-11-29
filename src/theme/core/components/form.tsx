import type { Components, Theme } from '@mui/material/styles'

import { inputLabelClasses } from '@mui/material/InputLabel'

// ----------------------------------------------------------------------

const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
      [`&.${inputLabelClasses.shrink}`]: {
        ...theme.typography.body1,
        [`&.${inputLabelClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
        [`&.${inputLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main },
        [`&.${inputLabelClasses.filled}`]: { transform: 'translate(12px, 6px) scale(0.75)' },
        [`&.${inputLabelClasses.focused}`]: { color: (theme.vars || theme).palette.text.primary },
        color: (theme.vars || theme).palette.text.secondary,
        fontWeight: 600
      },
      color: (theme.vars || theme).palette.text.disabled
    })
  }
}

// ----------------------------------------------------------------------

const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { component: 'div' },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { root: ({ theme }) => ({ marginTop: theme.spacing(1) }) }
}

// ----------------------------------------------------------------------

const MuiFormControlLabel: Components<Theme>['MuiFormControlLabel'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { label: ({ theme }) => ({ ...theme.typography.body2 }) }
}

// ----------------------------------------------------------------------

export const form = { MuiFormControlLabel, MuiFormHelperText, MuiFormLabel }
