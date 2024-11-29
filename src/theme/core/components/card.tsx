import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiCard: Components<Theme>['MuiCard'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.customShadows.card,
      position: 'relative',
      zIndex: 0 // Fix Safari overflow: hidden with border radius
    })
  }
}

// ----------------------------------------------------------------------

const MuiCardHeader: Components<Theme>['MuiCardHeader'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: {
    subheaderTypographyProps: { marginTop: '4px', variant: 'body2' },
    titleTypographyProps: { variant: 'h6' }
  },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3, 3, 0)
    })
  }
}

// ----------------------------------------------------------------------

const MuiCardContent: Components<Theme>['MuiCardContent'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { root: ({ theme }) => ({ padding: theme.spacing(3) }) }
}

// ----------------------------------------------------------------------

export const card = { MuiCard, MuiCardContent, MuiCardHeader }
