import type { PopoverProps } from '@mui/material/Popover'

import type { UsePopoverReturn } from './types'

import { useCallback, useState } from 'react'

// ----------------------------------------------------------------------

export function usePopover(): UsePopoverReturn {
  const [anchorEl, setAnchorEl] = useState<PopoverProps['anchorEl']>(null)

  const onOpen = useCallback((event: React.MouseEvent<PopoverProps['anchorEl']>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return {
    anchorEl,
    onClose,
    onOpen,
    open: !!anchorEl,
    setAnchorEl
  }
}
