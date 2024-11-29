import type { Components, Theme } from '@mui/material/styles'
import type { SvgIconProps } from '@mui/material/SvgIcon'

import SvgIcon from '@mui/material/SvgIcon'

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

const MuiSelect: Components<Theme>['MuiSelect'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { IconComponent: ArrowDownIcon },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    icon: {
      height: 18,
      right: 10,
      top: 'calc(50% - 9px)',
      width: 18
    }
  }
}

// ----------------------------------------------------------------------

const MuiNativeSelect: Components<Theme>['MuiNativeSelect'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: { IconComponent: ArrowDownIcon },

  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    icon: {
      height: 18,
      right: 10,
      top: 'calc(50% - 9px)',
      width: 18
    }
  }
}

// ----------------------------------------------------------------------

export const select = { MuiNativeSelect, MuiSelect }
