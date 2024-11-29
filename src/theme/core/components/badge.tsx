import type { Components, Theme } from '@mui/material/styles'

import { badgeClasses } from '@mui/material/Badge'

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    alway: true,
    busy: true,
    invisible: true,
    offline: true,
    online: true
  }
}

// ----------------------------------------------------------------------

function baseStyles(theme: Theme) {
  return {
    '&::before, &::after': {
      backgroundColor: (theme.vars || theme).palette.common.white,
      borderRadius: 1,
      content: '\'\''
    },
    [`&.${badgeClasses.invisible}`]: { transform: 'unset' },
    height: 10,
    minWidth: 'auto',
    padding: 0,
    width: 10,
    zIndex: 9
  }
}

const MuiBadge: Components<Theme>['MuiBadge'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: { dot: { borderRadius: '50%' } },

  /**
   * **************************************
   * VARIANTS
   ***************************************
   */
  variants: [
    /**
     * @variant online
     */
    {
      props: ({ ownerState }) => ownerState.variant === 'online',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          backgroundColor: (theme.vars || theme).palette.success.main
        }
      })
    },
    /**
     * @variant alway
     */
    {
      props: ({ ownerState }) => ownerState.variant === 'alway',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          '&::after': { height: 4, transform: 'translateY(1px) rotate(125deg)', width: 2 },
          '&::before': { height: 4, transform: 'translateX(1px) translateY(-1px)', width: 2 },
          backgroundColor: (theme.vars || theme).palette.warning.main
        }
      })
    },
    /**
     * @variant busy
     */
    {
      props: ({ ownerState }) => ownerState.variant === 'busy',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          '&::before': { height: 2, width: 6 },
          backgroundColor: (theme.vars || theme).palette.error.main
        }
      })
    },
    /**
     * @variant offline
     */
    {
      props: ({ ownerState }) => ownerState.variant === 'offline',
      style: ({ theme }) => ({
        [`& .${badgeClasses.badge}`]: {
          ...baseStyles(theme),
          '&::before': { borderRadius: '50%', height: 6, width: 6 },
          backgroundColor: (theme.vars || theme).palette.text.disabled
        }
      })
    },
    /**
     * @variant invisible
     */
    {
      props: ({ ownerState }) => ownerState.variant === 'invisible',
      style: { [`& .${badgeClasses.badge}`]: { display: 'none' } }
    }
  ]
}

// ----------------------------------------------------------------------

export const badge = { MuiBadge }
