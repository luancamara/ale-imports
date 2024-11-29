import type { Components, Theme } from '@mui/material/styles'

import { tableCellClasses } from '@mui/material/TableCell'
import { tableRowClasses } from '@mui/material/TableRow'

import { varAlpha } from '../../styles'

// ----------------------------------------------------------------------

const MuiTableContainer: Components<Theme>['MuiTableContainer'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      scrollbarColor: `${varAlpha((theme.vars || theme).palette.text.disabledChannel, 0.4)} ${varAlpha(
        (theme.vars || theme).palette.text.disabledChannel,
        0.08
      )}`,
      scrollbarWidth: 'thin'
    })
  }
}

// ----------------------------------------------------------------------

const MuiTable: Components<Theme>['MuiTable'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({ '--palette-TableCell-border': (theme.vars || theme).palette.divider })
  }
}

// ----------------------------------------------------------------------

const MuiTableRow: Components<Theme>['MuiTableRow'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      '&:last-of-type': { [`& .${tableCellClasses.root}`]: { borderColor: 'transparent' } },
      [`&.${tableRowClasses.selected}`]: {
        '&:hover': {
          backgroundColor: varAlpha((theme.vars || theme).palette.primary.darkChannel, 0.08)
        },
        backgroundColor: varAlpha((theme.vars || theme).palette.primary.darkChannel, 0.04)
      }
    })
  }
}

// ----------------------------------------------------------------------

const MuiTableCell: Components<Theme>['MuiTableCell'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    head: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.neutral,
      color: (theme.vars || theme).palette.text.secondary,
      fontSize: 14,
      fontWeight: theme.typography.fontWeightSemiBold
    }),
    paddingCheckbox: ({ theme }) => ({ paddingLeft: theme.spacing(1) }),
    root: { borderBottomStyle: 'dashed' },
    stickyHeader: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      backgroundImage: `linear-gradient(to bottom, ${(theme.vars || theme).palette.background.neutral} 0%, ${(theme.vars || theme).palette.background.neutral} 100%)`
    })
  }
}

// ----------------------------------------------------------------------

const MuiTablePagination: Components<Theme>['MuiTablePagination'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: {
    backIconButtonProps: { size: 'small' },
    nextIconButtonProps: { size: 'small' },
    slotProps: { select: { name: 'table-pagination-select' } }
  },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    actions: { marginRight: 8 },
    root: { width: '100%' },
    select: ({ theme }) => ({
      '&:focus': { borderRadius: theme.shape.borderRadius },
      paddingLeft: 8
    }),
    selectIcon: {
      height: 16,
      right: 4,
      top: 'calc(50% - 8px)',
      width: 16
    },
    toolbar: { height: 64 }
  }
}

// ----------------------------------------------------------------------

export const table = {
  MuiTable,
  MuiTableCell,
  MuiTableContainer,
  MuiTablePagination,
  MuiTableRow
}
