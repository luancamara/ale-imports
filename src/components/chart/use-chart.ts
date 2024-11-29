import { varAlpha } from '@/theme/styles'

import { useTheme } from '@mui/material/styles'

import type { ChartOptions } from './types'

// ----------------------------------------------------------------------

export function useChart(options?: ChartOptions): ChartOptions {
  const theme = useTheme()

  const LABEL_TOTAL = {
    color: (theme.vars || theme).palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize as string,
    fontWeight: theme.typography.subtitle2.fontWeight,
    label: 'Total',
    show: true
  }

  const LABEL_VALUE = {
    color: (theme.vars || theme).palette.text.primary,
    fontSize: theme.typography.h4.fontSize as string,
    fontWeight: theme.typography.h4.fontWeight,
    offsetY: 8
  }

  const RESPONSIVE = [
    {
      breakpoint: theme.breakpoints.values.sm, // sm ~ 600
      options: {
        plotOptions: {
          bar: {
            borderRadius: 3,
            columnWidth: '80%'
          }
        }
      }
    },
    {
      breakpoint: theme.breakpoints.values.md, // md ~ 900
      options: {
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        }
      }
    },
    ...(options?.responsive ?? [])
  ]

  return {
    ...options,

    /**
     * **************************************
     * Chart
     ***************************************
     */
    chart: {
      fontFamily: theme.typography.fontFamily,
      foreColor: (theme.vars || theme).palette.text.disabled,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      ...options?.chart,
      animations: {
        animateGradually: { delay: 120, enabled: true },
        dynamicAnimation: { enabled: true, speed: 360 },
        enabled: true,
        speed: 360,
        ...options?.chart?.animations
      }
    },

    /**
     * **************************************
     * Colors
     ***************************************
     */
    colors: options?.colors ?? [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.darker,
      theme.palette.info.dark,
      theme.palette.info.darker
    ],

    /**
     * **************************************
     * Data labels
     ***************************************
     */
    dataLabels: {
      enabled: false,
      ...options?.dataLabels
    },

    /**
     * **************************************
     * Fill
     ***************************************
     */
    fill: {
      opacity: 1,
      ...options?.fill,
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
        shadeIntensity: 0,
        stops: [0, 100],
        type: 'vertical',
        ...options?.fill?.gradient
      }
    },

    /**
     * **************************************
     * Grid
     ***************************************
     */
    grid: {
      borderColor: (theme.vars || theme).palette.divider,
      strokeDashArray: 3,
      ...options?.grid,
      padding: {
        bottom: 0,
        right: 0,
        top: 0,
        ...options?.grid?.padding
      },
      xaxis: {
        lines: {
          show: false
        },
        ...options?.grid?.xaxis
      }
    },

    /**
     * **************************************
     * Legend
     ***************************************
     */
    legend: {
      fontSize: '13px',
      fontWeight: 500,
      horizontalAlign: 'right',
      labels: {
        colors: (theme.vars || theme).palette.text.primary
      },
      markers: { radius: 12 },
      position: 'top',
      show: false,
      ...options?.legend,
      itemMargin: {
        horizontal: 8,
        vertical: 8,
        ...options?.legend?.itemMargin
      }
    },

    /**
     * **************************************
     * Markers
     ***************************************
     */
    markers: {
      size: 0,
      strokeColors: (theme.vars || theme).palette.background.paper,
      ...options?.markers
    },

    /**
     * **************************************
     * plotOptions
     ***************************************
     */
    plotOptions: {
      ...options?.plotOptions,
      // plotOptions: Bar
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        columnWidth: '48%',
        ...options?.plotOptions?.bar
      },

      // plotOptions: heatmap
      heatmap: {
        distributed: true,
        ...options?.plotOptions?.heatmap
      },

      // plotOptions: Pie + Donut
      pie: {
        ...options?.plotOptions?.pie,
        donut: {
          ...options?.plotOptions?.pie?.donut,
          labels: {
            show: true,
            ...options?.plotOptions?.pie?.donut?.labels,
            total: {
              ...LABEL_TOTAL,
              ...options?.plotOptions?.pie?.donut?.labels?.total
            },
            value: {
              ...LABEL_VALUE,
              ...options?.plotOptions?.pie?.donut?.labels?.value
            }
          }
        }
      },

      // plotOptions: polarArea
      polarArea: {
        rings: {
          strokeColor: (theme.vars || theme).palette.divider
        },
        spokes: {
          connectorColors: (theme.vars || theme).palette.divider
        },
        ...options?.plotOptions?.polarArea
      },

      // plotOptions: Radar
      radar: {
        ...options?.plotOptions?.radar,
        polygons: {
          connectorColors: (theme.vars || theme).palette.divider,
          fill: {
            colors: ['transparent']
          },
          strokeColors: (theme.vars || theme).palette.divider,
          ...options?.plotOptions?.radar?.polygons
        }
      },

      // plotOptions: Radialbar
      radialBar: {
        ...options?.plotOptions?.radialBar,
        dataLabels: {
          ...options?.plotOptions?.radialBar?.dataLabels,
          total: {
            ...LABEL_TOTAL,
            ...options?.plotOptions?.radialBar?.dataLabels?.total
          },
          value: {
            ...LABEL_VALUE,
            ...options?.plotOptions?.radialBar?.dataLabels?.value
          }
        },
        hollow: {
          margin: -8,
          size: '100%',
          ...options?.plotOptions?.radialBar?.hollow
        },
        track: {
          background: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16),
          margin: -8,
          strokeWidth: '50%',
          ...options?.plotOptions?.radialBar?.track
        }
      }
    },
    /**
     * **************************************
     * Responsive
     ***************************************
     */
    responsive: RESPONSIVE.reduce((acc: typeof RESPONSIVE, cur) => {
      if (!acc.some(item => item.breakpoint === cur.breakpoint)) {
        acc.push(cur)
      }
      return acc
    }, []),

    /**
     * **************************************
     * States
     ***************************************
     */
    states: {
      ...options?.states,
      active: {
        ...options?.states?.active,
        filter: { type: 'darken', value: 0.88, ...options?.states?.active?.filter }
      },
      hover: {
        ...options?.states?.hover,
        filter: { type: 'darken', value: 0.88, ...options?.states?.hover?.filter }
      }
    },

    /**
     * **************************************
     * Stroke
     ***************************************
     */
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      width: 2.5,
      ...options?.stroke
    },

    /**
     * **************************************
     * Tooltip
     ***************************************
     */
    tooltip: {
      fillSeriesColor: false,
      theme: 'false',
      x: {
        show: true
      },
      ...options?.tooltip
    },

    /**
     * **************************************
     * Axis
     ***************************************
     */
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      ...options?.xaxis
    },

    yaxis: {
      tickAmount: 5,
      ...options?.yaxis
    }
  }
}
