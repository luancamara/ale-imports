import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiDialog: Components<Theme>['MuiDialog'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    paper: ({ ownerState, theme }) => ({
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.customShadows.dialog,
      ...(!ownerState.fullScreen && { margin: theme.spacing(2) })
    }),
    paperFullScreen: { borderRadius: 0 }
  }
}

const MuiDialogTitle: Components<Theme>['MuiDialogTitle'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { root: ({ theme }) => ({ padding: theme.spacing(3) }) }
}

const MuiDialogContent: Components<Theme>['MuiDialogContent'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    dividers: ({ theme }) => ({
      borderBottomStyle: 'dashed',
      borderTop: 0,
      paddingBottom: theme.spacing(3)
    }),
    root: ({ theme }) => ({ padding: theme.spacing(0, 3) })
  }
}

const MuiDialogActions: Components<Theme>['MuiDialogActions'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { disableSpacing: true },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      '& > :not(:first-of-type)': { marginLeft: theme.spacing(1.5) },
      padding: theme.spacing(3)
    })
  }
}

// ----------------------------------------------------------------------

export const dialog = {
  MuiDialog,
  MuiDialogActions,
  MuiDialogContent,
  MuiDialogTitle
}
