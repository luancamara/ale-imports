import type { SvgColorProps } from './types'

import Box from '@mui/material/Box'

import { forwardRef } from 'react'

import { svgColorClasses } from './classes'

// ----------------------------------------------------------------------

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ className, src, sx, width = 24, ...other }, ref) => (
    <Box
      className={svgColorClasses.root.concat(className ? ` ${className}` : '')}
      component='span'
      ref={ref}
      sx={{
        bgcolor: 'currentColor',
        display: 'inline-flex',
        flexShrink: 0,
        height: width,
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        width,
        ...sx,
      }}
      {...other}
    />
  )
)
