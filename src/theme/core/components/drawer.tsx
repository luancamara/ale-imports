import type { Components, Theme } from '@mui/material/styles'

import { paper, stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    paperAnchorLeft: ({
      theme
    }) => ({
      variants: [{
        props: {
          variant: 'temporary'
        },

        style: {
          ...paper({ theme }),
          boxShadow: `40px 40px 80px -8px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)}`,
          [stylesMode.dark]: {
            boxShadow: `40px 40px 80px -8px  ${varAlpha(
              (theme.vars || theme).palette.common.blackChannel,
              0.24
            )}`
          }
        }
      }]
    }),
    paperAnchorRight: ({
      theme
    }) => ({
      variants: [{
        props: {
          variant: 'temporary'
        },

        style: {
          ...paper({ theme }),
          boxShadow: `-40px 40px 80px -8px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)}`,
          [stylesMode.dark]: {
            boxShadow: `-40px 40px 80px -8px ${varAlpha(
              (theme.vars || theme).palette.common.blackChannel,
              0.24
            )}`
          }
        }
      }]
    })
  }
}

// ----------------------------------------------------------------------

export const drawer = { MuiDrawer }
