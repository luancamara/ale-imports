import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiSvgIcon: Components<Theme>['MuiSvgIcon'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { fontSizeLarge: { fontSize: 'inherit', height: 32, width: 32 } }
}

// ----------------------------------------------------------------------

export const svgIcon = { MuiSvgIcon }
