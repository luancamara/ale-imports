import type { BoxProps } from '@mui/material/Box'
import type { ChartBaseProps } from './types'
import Box from '@mui/material/Box'

import Skeleton from '@mui/material/Skeleton'

// ----------------------------------------------------------------------

type Props = {
  type: ChartBaseProps['type']
} & BoxProps

export function ChartLoading({ sx, type, ...other }: Props) {
  const circularTypes = ['donut', 'radialBar', 'pie', 'polarArea']

  return (
    // @ts-ignore
    <Box
      {...other}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'inherit',
          height: 1,
          left: 0,
          overflow: 'hidden',
          p: 'inherit',
          position: 'absolute',
          top: 0,
          width: 1,
          zIndex: 9,
          ...sx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Skeleton
        sx={[
          {
            borderRadius: 'inherit',
            height: 1,
            width: 1,
          },
          circularTypes.includes(type!) && {
            borderRadius: '50%',
          },
        ]}
        variant='circular'
      />
    </Box>
  )
}
