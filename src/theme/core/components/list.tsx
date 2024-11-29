import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiListItemIcon: Components<Theme>['MuiListItemIcon'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({ color: 'inherit', marginRight: theme.spacing(2), minWidth: 'auto' })
  }
}

// ----------------------------------------------------------------------

const MuiListItemAvatar: Components<Theme>['MuiListItemAvatar'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { root: ({ theme }) => ({ marginRight: theme.spacing(2), minWidth: 'auto' }) }
}

// ----------------------------------------------------------------------

const MuiListItemText: Components<Theme>['MuiListItemText'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { primaryTypographyProps: { typography: 'subtitle2' } },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { multiline: { margin: 0 }, root: { margin: 0 } }
}

// ----------------------------------------------------------------------

export const list = {
  MuiListItemAvatar,
  MuiListItemIcon,
  MuiListItemText
}
