import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiStepConnector: Components<Theme>['MuiStepConnector'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { line: ({ theme }) => ({ borderColor: (theme.vars || theme).palette.divider }) }
}

// ----------------------------------------------------------------------

export const stepper = { MuiStepConnector }
