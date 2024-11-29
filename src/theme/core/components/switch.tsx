import type { Components, Theme } from '@mui/material/styles'

import { switchClasses } from '@mui/material/Switch'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: { alignItems: 'center' },
    sizeMedium: {
      [`& .${switchClasses.thumb}`]: { height: 14, width: 14 },
      [`& .${switchClasses.track}`]: { height: 20 }
    },
    sizeSmall: {
      [`& .${switchClasses.thumb}`]: { height: 10, width: 10 },
      [`& .${switchClasses.track}`]: { height: 16 }
    },
    switchBase: ({
      theme
    }) => ({
      [`&.${switchClasses.checked}`]: {
        [`& .${switchClasses.thumb}`]: {},
        [`&+.${switchClasses.track}`]: {
          opacity: 1
        }
      },

      [`&.${switchClasses.disabled}`]: {
        [`& .${switchClasses.thumb}`]: { opacity: 1, [stylesMode.dark]: { opacity: 0.48 } },
        [`&+.${switchClasses.track}`]: { opacity: 0.48 }
      },

      top: 'unset',
      transform: 'translateX(6px)',

      variants: [{
        props: {
          color: 'default'
        },

        style: {
          [`&.${switchClasses.checked}`]: {
            [`& .${switchClasses.thumb}`]: {
              [stylesMode.dark]: { color: (theme.vars || theme).palette.grey[800] }
            }
          }
        }
      }, {
        props: {
          color: 'default'
        },

        style: {
          [`&.${switchClasses.checked}`]: {
            [`&+.${switchClasses.track}`]: {
              backgroundColor: (theme.vars || theme).palette.text.primary
            }
          }
        }
      }]
    }),
    thumb: ({ theme }) => ({ color: (theme.vars || theme).palette.common.white }),
    track: ({ theme }) => ({
      backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.48),
      borderRadius: 10,
      opacity: 1
    })
  }
}

// ----------------------------------------------------------------------

export const switches = { MuiSwitch }
