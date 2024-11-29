import type { Components, Theme } from '@mui/material/styles'

import { tabClasses } from '@mui/material/Tab'

// ----------------------------------------------------------------------

const MuiTabs: Components<Theme>['MuiTabs'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: {
    allowScrollButtonsMobile: true,
    textColor: 'inherit',
    variant: 'scrollable'
  },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    flexContainer: ({ ownerState, theme }) => ({
      ...(ownerState.variant !== 'fullWidth' && {
        gap: '24px',
        [theme.breakpoints.up('sm')]: {
          gap: '40px'
        }
      })
    }),
    indicator: { backgroundColor: 'currentColor' }
  }
}

// ----------------------------------------------------------------------

const MuiTab: Components<Theme>['MuiTab'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { disableRipple: true, iconPosition: 'start' },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      [`&.${tabClasses.selected}`]: {
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: theme.typography.fontWeightSemiBold
      },
      color: (theme.vars || theme).palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: theme.typography.body2.lineHeight,
      minHeight: 48,
      minWidth: 48,
      opacity: 1,
      padding: theme.spacing(1, 0)
    })
  }
}

// ----------------------------------------------------------------------

export const tabs = { MuiTab, MuiTabs }
