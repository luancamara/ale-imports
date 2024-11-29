import type { SxProps, Theme } from '@mui/material/styles'

import { env } from '@/lib/env'

import Box from '@mui/material/Box'
import NoSsr from '@mui/material/NoSsr'

import { forwardRef } from 'react'

// ----------------------------------------------------------------------

export interface FlagIconProps {
  code?: string,
  sx?: SxProps<Theme>
}

export const FlagIcon = forwardRef<HTMLSpanElement, FlagIconProps>(
  ({ code, sx, ...other }, ref) => {
    const baseStyles = {
      bgcolor: 'background.neutral',
      borderRadius: '5px',
      display: 'inline-flex',
      flexShrink: 0,
      height: 20,
      overflow: 'hidden',
      width: 26
    }

    const renderFallback = <Box component='span' sx={{ ...baseStyles, ...sx }} />

    if (!code) {
      return null
    }

    return (
      <NoSsr fallback={renderFallback}>
        <Box component='span' ref={ref} sx={{ ...baseStyles, ...sx }} {...other}>
          <Box
            alt={code}
            component='img'
            src={`${
              env.NEXT_PUBLIC_GENERAL.baseUrl
            }/assets/icons/flagpack/${code?.toLowerCase()}.webp`}
            sx={{ height: 1, objectFit: 'cover', width: 1 }}
          />
        </Box>
      </NoSsr>
    )
  }
)
