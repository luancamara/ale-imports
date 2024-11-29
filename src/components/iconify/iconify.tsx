'use client'

import Box from '@mui/material/Box'
import NoSsr from '@mui/material/NoSsr'

import { disableCache, Icon } from '@iconify/react'
import { forwardRef } from 'react'

import type { IconifyProps } from './types'

import { iconifyClasses } from './classes'

// ----------------------------------------------------------------------

export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ className, sx, width = 20, ...other }, ref) => {
    const baseStyles = {
      display: 'inline-flex',
      flexShrink: 0,
      height: width,
      width
    }

    const renderFallback = (
      <Box
        className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
        component='span'
        sx={{ ...baseStyles, ...sx }}
      />
    )

    return (
      <NoSsr fallback={renderFallback}>
        <Box
          className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
          component={Icon}
          ref={ref}
          sx={{ ...baseStyles, ...sx }}
          {...other}
        />
      </NoSsr>
    )
  }
)

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local')
