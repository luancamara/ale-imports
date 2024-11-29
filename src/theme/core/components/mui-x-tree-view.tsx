import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiTreeItem: Components<Theme>['MuiTreeItem'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    iconContainer: { width: 'auto' },
    label: ({ theme }) => ({ ...theme.typography.body2 })
  }
}

// ----------------------------------------------------------------------

export const treeView = { MuiTreeItem }
