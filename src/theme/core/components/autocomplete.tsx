import type { Components, Theme } from '@mui/material/styles'
import type { SvgIconProps } from '@mui/material/SvgIcon'

import { autocompleteClasses } from '@mui/material/Autocomplete'
import SvgIcon, { svgIconClasses } from '@mui/material/SvgIcon'

import { menuItem, paper, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

/**
 * Icons
 * https://icon-sets.iconify.design/eva/arrow-ios-downward-fill/
 */
function ArrowDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d='M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16'
        fill='currentColor'
      />
    </SvgIcon>
  )
}

// ----------------------------------------------------------------------

const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { popupIcon: <ArrowDownIcon /> },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    endAdornment: { [`& .${svgIconClasses.root}`]: { height: 18, width: 18 } },
    listbox: ({ theme }) => ({
      [`& .${autocompleteClasses.option}`]: { ...menuItem(theme) },
      padding: 0
    }),
    paper: ({ theme }) => ({ ...paper({ dropdown: true, theme }) }),
    root: ({ theme }) => ({
      [`& span.${autocompleteClasses.tag}`]: {
        ...theme.typography.subtitle2,
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16),
        borderRadius: theme.shape.borderRadius,
        color: (theme.vars || theme).palette.text.secondary,
        height: 24,
        lineHeight: '24px',
        minWidth: 24,
        padding: theme.spacing(0, 0.75),
        textAlign: 'center'
      }
    })
  }
}

// ----------------------------------------------------------------------

export const autocomplete = { MuiAutocomplete }
