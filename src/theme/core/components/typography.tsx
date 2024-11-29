import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiTypography: Components<Theme>['MuiTypography'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    gutterBottom: ({ theme }) => ({ marginBottom: theme.spacing(1) }),
    paragraph: ({ theme }) => ({ marginBottom: theme.spacing(2) })
  }
}

// ----------------------------------------------------------------------

export const typography = { MuiTypography }
