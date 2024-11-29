import type { Components, Theme } from '@mui/material/styles'

import { varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const MuiBackdrop: Components<Theme>['MuiBackdrop'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    invisible: { background: 'transparent' },
    root: ({ theme }) => ({
      backgroundColor: varAlpha((theme.vars || theme).palette.grey['800Channel'], 0.48)
    })
  }
}

// ----------------------------------------------------------------------

export const backdrop = { MuiBackdrop }
