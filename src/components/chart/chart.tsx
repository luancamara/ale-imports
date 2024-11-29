import type { BoxProps } from '@mui/material/Box'

import { withLoadingProps } from '@/utils/with-loading-props'

import Box from '@mui/material/Box'

import dynamic from 'next/dynamic'

import type { ChartBaseProps, ChartLoadingProps, ChartProps } from './types'

import { ChartLoading } from './chart-loading'

// ----------------------------------------------------------------------

type WithLoadingProps = {
  loading?: ChartLoadingProps
} & ChartBaseProps

const ApexChart = withLoadingProps<WithLoadingProps>(props =>
  dynamic(() => import('react-apexcharts').then(mod => ({
    default: mod.default
  })), {
    loading: () => {
      const { loading, type } = props()

      return loading?.disabled ? null : <ChartLoading sx={loading?.sx} type={type} />
    },
    ssr: false
  })
)

export function Chart({
  height,
  loadingProps,
  options,
  series,
  sx,
  type,
  width = '100%',
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir='ltr'
      sx={{
        borderRadius: 1.5,
        flexShrink: 0,
        height,
        position: 'relative',
        width,
        ...sx
      }}
      {...other}
    >
      <ApexChart
        height='100%'
        loading={loadingProps}
        options={options}
        series={series}
        type={type}
        width='100%'
      />
    </Box>
  )
}
