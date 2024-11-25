import type {
  ChartConfig
} from '@/components/ui/chart'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'

export const description = 'A pie chart with a legend'

const chartConfig = {
  mlColeta: {
    label: 'ML Coleta',
    color: 'hsl(var(--chart-1))',
  },
  mlFlex: {
    label: 'ML Flex',
    color: 'hsl(var(--chart-2))',
  },
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

interface Props {
  data: { nome: string, valor: number }[]
}

export function MLPieChart({ data }: Props) {
  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[300px]'>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={data} dataKey='valor' nameKey='nome' innerRadius={50} outerRadius={90} />
        <ChartLegend
          content={<ChartLegendContent nameKey='nome' />}
          className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
        />
      </PieChart>
    </ChartContainer>
  )
}
