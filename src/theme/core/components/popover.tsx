import type { Components, Theme } from '@mui/material/styles'

import { listClasses } from '@mui/material/List'

import { paper } from '../../styles'

// ----------------------------------------------------------------------

const MuiPopover: Components<Theme>['MuiPopover'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    paper: ({ theme }) => ({
      ...paper({ dropdown: true, theme }),
      [`& .${listClasses.root}`]: { paddingBottom: 0, paddingTop: 0 }
    })
  }
}

// ----------------------------------------------------------------------

export const popover = { MuiPopover }
