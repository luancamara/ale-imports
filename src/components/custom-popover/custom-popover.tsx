import type { PaperProps } from '@mui/material/Paper'

import type { CustomPopoverProps } from './types'
import { listClasses } from '@mui/material/List'
import { menuItemClasses } from '@mui/material/MenuItem'

import Popover from '@mui/material/Popover'

import { StyledArrow } from './styles'
import { calculateAnchorOrigin } from './utils'

// ----------------------------------------------------------------------

export function CustomPopover({
  anchorEl,
  children,
  onClose,
  open,
  slotProps,
  ...other
}: CustomPopoverProps) {
  const arrowPlacement = slotProps?.arrow?.placement ?? 'top-right'

  const arrowSize = slotProps?.arrow?.size ?? 14

  const arrowOffset = slotProps?.arrow?.offset ?? 17

  const { anchorOrigin, paperStyles, transformOrigin } = calculateAnchorOrigin(arrowPlacement)

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      open={!!open}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          sx: {
            ...paperStyles,
            [`& .${listClasses.root}`]: { minWidth: 140 },
            [`& .${menuItemClasses.root}`]: { gap: 2 },
            overflow: 'inherit',
            ...(slotProps?.paper as PaperProps)?.sx
          }
        }
      }}
      transformOrigin={transformOrigin}
      {...other}
    >
      {!slotProps?.arrow?.hide && (
        <StyledArrow
          offset={arrowOffset}
          placement={arrowPlacement}
          size={arrowSize}
          sx={slotProps?.arrow?.sx}
        />
      )}

      {children}
    </Popover>
  )
}
