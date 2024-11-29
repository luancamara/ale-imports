import type { Components, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

const MuiBreadcrumbs: Components<Theme>['MuiBreadcrumbs'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    li: ({ theme }) => ({ '& > *': { ...theme.typography.body2 }, display: 'inline-flex' }),

    ol: ({ theme }) => ({ columnGap: theme.spacing(2), rowGap: theme.spacing(0.5) }),
    separator: { margin: 0 }
  }
}

// ----------------------------------------------------------------------

export const breadcrumbs = { MuiBreadcrumbs }
