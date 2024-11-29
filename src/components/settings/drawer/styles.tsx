import type { SxProps, Theme } from '@mui/material/styles'

import { Iconify } from '@/components/iconify'

import { stylesMode, varAlpha } from '@/theme/styles'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode,
  sx?: SxProps<Theme>,
  title: string,
  tooltip?: string
}

export function Block({ children, sx, title, tooltip }: Props) {
  return (
    <Box
      sx={{
        border: theme => `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.12)}`,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        pb: 2,
        position: 'relative',
        pt: 4,
        px: 2,
        ...sx,
      }}
    >
      <Box
        component='span'
        sx={{
          alignItems: 'center',
          bgcolor: 'text.primary',
          borderRadius: 22,
          color: 'common.white',
          display: 'inline-flex',
          fontSize: 13,
          fontWeight: 'fontWeightSemiBold',
          lineHeight: '22px',
          position: 'absolute',
          px: 1.25,
          [stylesMode.dark]: { color: 'grey.800' },
          top: -12,
        }}
      >
        {title}

        {tooltip && (
          <Tooltip placement='right' title={tooltip}>
            <Iconify icon='eva:info-outline' sx={{ cursor: 'pointer', ml: 0.5, mr: -0.5, opacity: 0.48 }} width={14} />
          </Tooltip>
        )}
      </Box>
      {children}
    </Box>
  )
}
