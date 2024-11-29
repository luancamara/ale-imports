import type { SxProps, Theme } from '@mui/material/styles'
import type { Props } from 'react-apexcharts'

// ----------------------------------------------------------------------

export interface ChartProps {
  loadingProps?: ChartLoadingProps,
  options: Props['options'],
  series: Props['series'],
  type: Props['type']
}

export type ChartBaseProps = Props

export type ChartOptions = Props['options']

export interface ChartLoadingProps {
  disabled?: boolean,
  sx?: SxProps<Theme>
}
