import type { Components, ComponentsVariants, Theme } from '@mui/material/styles'

import { paginationItemClasses } from '@mui/material/PaginationItem'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    soft: true
  }

  interface PaginationPropsColorOverrides {
    error: true,
    info: true,
    success: true,
    warning: true
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

// ----------------------------------------------------------------------

const softVariant: Record<string, ComponentsVariants<Theme>['MuiPagination']> = {
  colors: COLORS.map(color => ({
    props: ({ ownerState }) =>
      !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
    style: ({ theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          '&:hover': {
            backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.16)
          },
          backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.08),
          color: (theme.vars || theme).palette[color].dark,
          fontWeight: theme.typography.fontWeightSemiBold,
          [stylesMode.dark]: { color: (theme.vars || theme).palette[color].light }
        }
      }
    })
  })),
  standardColor: [
    {
      props: ({ ownerState }) => ownerState.variant === 'soft' && ownerState.color === 'standard',
      style: ({ theme }) => ({
        [`& .${paginationItemClasses.root}`]: {
          [`&.${paginationItemClasses.selected}`]: {
            '&:hover': {
              backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16)
            },
            backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
            fontWeight: theme.typography.fontWeightSemiBold
          }
        }
      })
    }
  ]
}

// ----------------------------------------------------------------------

const MuiPagination: Components<Theme>['MuiPagination'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    /**
     * @variant outlined
     */
    outlined: ({
      theme
    }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          borderColor: 'currentColor',
          fontWeight: theme.typography.fontWeightSemiBold
        },
        borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)
      },

      variants: [{
        props: {
          color: 'standard'
        },

        style: {
          [`& .${paginationItemClasses.root}`]: {
            [`&.${paginationItemClasses.selected}`]: {
              backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08)
            }
          }
        }
      }]
    }),
    /**
     * @variant text
     */
    text: ({
      theme
    }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold
        }
      },

      variants: [{
        props: {
          color: 'standard'
        },

        style: {
          [`& .${paginationItemClasses.root}`]: {
            [`&.${paginationItemClasses.selected}`]: {
              '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[700] },
              backgroundColor: (theme.vars || theme).palette.text.primary,
              color: (theme.vars || theme).palette.common.white,
              [stylesMode.dark]: {
                '&:hover': { backgroundColor: (theme.vars || theme).palette.grey[100] },
                color: (theme.vars || theme).palette.grey[800]
              }
            }
          }
        }
      }]
    })
  },

  /**
   * **************************************
   * VARIANTS
   ***************************************
   */
  variants: [
    /**
     * @variant soft
     */
    ...[...softVariant.standardColor!, ...softVariant.colors!]
  ]
}

// ----------------------------------------------------------------------

export const pagination = { MuiPagination }
