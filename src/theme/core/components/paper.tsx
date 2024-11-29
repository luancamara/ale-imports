import type { Components, Theme } from '@mui/material/styles'

import { varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const MuiPaper: Components<Theme>['MuiPaper'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { elevation: 0 },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    outlined: ({ theme }) => ({
      borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16)
    }),
    root: { backgroundImage: 'none' }
  }
}

// ----------------------------------------------------------------------

export const paper = { MuiPaper }
