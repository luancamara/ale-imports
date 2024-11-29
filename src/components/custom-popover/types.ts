import type { PopoverProps } from '@mui/material/Popover'
import type { SxProps, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export interface PopoverArrow {
  hide?: boolean,
  offset?: number,
  placement?:
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-bottom'
    | 'left-center'
    | 'left-top'
    | 'right-bottom'
    | 'right-center'
    | 'right-top'
    | 'top-center'
    | 'top-left'
    | 'top-right',
  size?: number,
  sx?: SxProps<Theme>
}

export interface UsePopoverReturn {
  anchorEl: PopoverProps['anchorEl'],
  onClose: () => void,
  onOpen: (event: React.MouseEvent<HTMLElement>) => void,
  open: PopoverProps['open'],
  setAnchorEl: React.Dispatch<React.SetStateAction<PopoverProps['anchorEl']>>
}

export type CustomPopoverProps = {
  slotProps?: {
    arrow?: PopoverArrow
  } & PopoverProps['slotProps']
} & PopoverProps
