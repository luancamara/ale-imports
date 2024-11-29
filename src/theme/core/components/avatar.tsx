import type { Components, ComponentsVariants, Theme } from '@mui/material/styles'

import { avatarGroupClasses } from '@mui/material/AvatarGroup'

import { varAlpha } from '../../styles'

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides {
    compact: true
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

function colorByName(name: string) {
  const charAt = name.charAt(0).toLowerCase()

  if (['a', 'c', 'f'].includes(charAt)) {
    return 'primary'
  }
  if (['d', 'e', 'h'].includes(charAt)) {
    return 'secondary'
  }
  if (['i', 'k', 'l'].includes(charAt)) {
    return 'info'
  }
  if (['m', 'n', 'p'].includes(charAt)) {
    return 'success'
  }
  if (['q', 's', 't'].includes(charAt)) {
    return 'warning'
  }
  if (['v', 'x', 'y'].includes(charAt)) {
    return 'error'
  }
  return 'default'
}

// ----------------------------------------------------------------------

const avatarColors: Record<string, ComponentsVariants<Theme>['MuiAvatar']> = {
  colors: COLORS.map(color => ({
    props: ({ ownerState }) => ownerState.color === color,
    style: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette[color].main,
      color: (theme.vars || theme).palette[color].contrastText
    })
  })),
  defaultColor: [
    {
      props: ({ ownerState }) => ownerState.color === 'default',
      style: ({ theme }) => ({
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24),
        color: (theme.vars || theme).palette.text.secondary
      })
    }
  ]
}

const MuiAvatar: Components<Theme>['MuiAvatar'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    colorDefault: ({
      theme
    }) => {
      const color = colorByName(`${ownerState.alt}`)

      return {
        variants: []
      };
    },
    rounded: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 1.5 })
  },

  /**
   * **************************************
   * VARIANTS
   ***************************************
   */
  variants: [...[...avatarColors.defaultColor!, ...avatarColors.colors!]]
}

// ----------------------------------------------------------------------

const MuiAvatarGroup: Components<Theme>['MuiAvatarGroup'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { max: 4 },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    avatar: ({ theme }) => ({
      '&:first-of-type': {
        backgroundColor: (theme.vars || theme).palette.primary.lighter,
        color: (theme.vars || theme).palette.primary.dark,
        fontSize: 12
      },
      fontSize: 16,
      fontWeight: theme.typography.fontWeightSemiBold
    }),
    root: ({}) => ({
      justifyContent: 'flex-end',

      variants: [{
        props: {
          variant: 'compact'
        },

        style: {
          [`& .${avatarGroupClasses.avatar}`]: {
            '&:first-of-type': { bottom: 0, left: 0, zIndex: 9 },
            '&:last-of-type': { right: 0, top: 0 },
            height: 28,
            margin: 0,
            position: 'absolute',
            width: 28
          },
          height: 40,
          position: 'relative',
          width: 40
        }
      }]
    })
  }
}

// ----------------------------------------------------------------------

export const avatar = { MuiAvatar, MuiAvatarGroup }
