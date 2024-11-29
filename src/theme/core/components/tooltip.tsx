import type { Components, Theme } from '@mui/material/styles'

import { tooltipClasses } from '@mui/material/Tooltip'

import { stylesMode } from '../../styles'

// ----------------------------------------------------------------------

const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    arrow: ({ theme }) => ({
      color: (theme.vars || theme).palette.grey[800],
      [stylesMode.dark]: {
        color: (theme.vars || theme).palette.grey[700]
      }
    }),
    popper: {
      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
        marginTop: 12
      },
      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
        marginRight: 12
      },
      [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
        marginLeft: 12
      },
      [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
        marginBottom: 12
      }
    },
    tooltip: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.grey[800],
      [stylesMode.dark]: {
        backgroundColor: (theme.vars || theme).palette.grey[700]
      }
    })
  }
}

// ----------------------------------------------------------------------

export const tooltip = { MuiTooltip }
