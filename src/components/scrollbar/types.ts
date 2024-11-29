import type { SxProps, Theme } from '@mui/material/styles'
import type { Props as SimplebarProps } from 'simplebar-react'

// ----------------------------------------------------------------------

export type ScrollbarProps = {
  children?: React.ReactNode,
  fillContent?: boolean,
  naturalScroll?: boolean,
  slotProps?: {
    content?: Partial<SxProps<Theme>>,
    contentWrapper?: SxProps<Theme>,
    wrapper?: SxProps<Theme>
  },
  sx?: SxProps<Theme>
} & SimplebarProps
