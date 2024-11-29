import type { ScrollbarProps } from './types'

import Box from '@mui/material/Box'
import { forwardRef } from 'react'

import SimpleBar from 'simplebar-react'

import { scrollbarClasses } from './classes'

// ----------------------------------------------------------------------

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ children, fillContent, naturalScroll, slotProps, sx, ...other }, ref) => (
    <Box
      className={scrollbarClasses.root}
      clickOnTrack={false}
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      sx={{
        '& .simplebar-content': {
          ...(fillContent && {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: 1,
          }),
          ...slotProps?.content,
        } as React.CSSProperties,
        '& .simplebar-content-wrapper': slotProps?.contentWrapper as React.CSSProperties,
        '& .simplebar-wrapper': slotProps?.wrapper as React.CSSProperties,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minHeight: 0,
        minWidth: 0,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
)
