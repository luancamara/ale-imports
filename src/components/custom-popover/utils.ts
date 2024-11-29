import type { PopoverOrigin } from '@mui/material/Popover'
import type { CSSObject } from '@mui/material/styles'

import type { PopoverArrow } from './types'

// ----------------------------------------------------------------------

const POPOVER_DISTANCE = 0.75

export interface CalculateAnchorOriginProps {
  anchorOrigin: PopoverOrigin,
  paperStyles?: CSSObject,
  transformOrigin: PopoverOrigin
}

export function calculateAnchorOrigin(
  arrow: PopoverArrow['placement']
): CalculateAnchorOriginProps {
  let props: CalculateAnchorOriginProps

  switch (arrow) {
    case 'bottom-center':
      props = {
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        paperStyles: undefined,
        transformOrigin: { horizontal: 'center', vertical: 'bottom' }
      }
      break
    /**
     * bottom-*
     */
    case 'bottom-left':
      props = {
        anchorOrigin: { horizontal: 'left', vertical: 'top' },
        paperStyles: { ml: -POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'left', vertical: 'bottom' }
      }
      break
    case 'bottom-right':
      props = {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        paperStyles: { ml: POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'right', vertical: 'bottom' }
      }
      break
    case 'left-bottom':
      props = {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        paperStyles: { mt: POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'left', vertical: 'bottom' }
      }
      break
    case 'left-center':
      props = {
        anchorOrigin: { horizontal: 'right', vertical: 'center' },
        paperStyles: undefined,
        transformOrigin: { horizontal: 'left', vertical: 'center' }
      }
      break
    /**
     * left-*
     */
    case 'left-top':
      props = {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        paperStyles: { mt: -POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'left', vertical: 'top' }
      }
      break
    case 'right-bottom':
      props = {
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        paperStyles: { mt: POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'right', vertical: 'bottom' }
      }
      break
    case 'right-center':
      props = {
        anchorOrigin: { horizontal: 'left', vertical: 'center' },
        paperStyles: undefined,
        transformOrigin: { horizontal: 'right', vertical: 'center' }
      }
      break
    /**
     * right-*
     */
    case 'right-top':
      props = {
        anchorOrigin: { horizontal: 'left', vertical: 'top' },
        paperStyles: { mt: -POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'right', vertical: 'top' }
      }
      break
    case 'top-center':
      props = {
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        paperStyles: undefined,
        transformOrigin: { horizontal: 'center', vertical: 'top' }
      }
      break
    /**
     * top-*
     */
    case 'top-left':
      props = {
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        paperStyles: { ml: -POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'left', vertical: 'top' }
      }
      break
    case 'top-right':
      props = {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        paperStyles: { ml: POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'right', vertical: 'top' }
      }
      break

    // top-right
    default:
      props = {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        paperStyles: { ml: POPOVER_DISTANCE },
        transformOrigin: { horizontal: 'right', vertical: 'top' }
      }
  }

  return props
}
