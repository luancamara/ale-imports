'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { useCallback, useState } from 'react'

import { SvgColor, svgColorClasses } from '../../svg-color'

// ----------------------------------------------------------------------

export function FullScreenButton() {
  const [fullscreen, setFullscreen] = useState(false)

  const onToggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }, [])

  return (
    <Tooltip title={fullscreen ? 'Exit' : 'Full Screen'}>
      <IconButton
        onClick={onToggleFullScreen}
        sx={[
          fullscreen && {
            [`& .${svgColorClasses.root}`]: {
              background: theme =>
                `linear-gradient(135deg, ${(theme.vars || theme).palette.primary.light} 0%, ${(theme.vars || theme).palette.primary.main} 100%)`,
            },
          },
        ]}
      >
        <SvgColor
          src={`${'base-url'}/assets/icons/setting/${fullscreen ? 'ic-exit-full-screen' : 'ic-full-screen'}.svg`}
          sx={{ height: 18, width: 18 }}
        />
      </IconButton>
    </Tooltip>
  )
}
