import type { StackProps } from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

// ----------------------------------------------------------------------

export const StyledLegend = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'inline-flex',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  gap: 6,
  justifyContent: 'flex-start',
}))

export const StyledDot = styled(Box)(() => ({
  alignItems: 'center',
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  display: 'flex',
  flexShrink: 0,
  height: 12,
  justifyContent: 'center',
  position: 'relative',
  width: 12,
}))

// ----------------------------------------------------------------------

type Props = {
  colors?: string[],
  icons?: React.ReactNode[],
  labels?: string[],
  sublabels?: string[],
  values?: string[]
} & StackProps

export function ChartLegends({ colors = [], icons, labels = [], sublabels, values, ...other }: Props) {
  return (
    <Stack
      direction='row'
      spacing={2}
      {...other}
      sx={[
        {
          flexWrap: 'wrap',
        },
        // @ts-expect-error fix later
        Array.isArray(other.sx) ? other.sx : [other.sx],
      ]}
    >
      {labels?.map((series, index) => (
        <Stack key={series} spacing={1}>
          <StyledLegend>
            {icons?.length
              ? (
                  <Box component='span' sx={{ '& svg, & img': { height: 20, width: 20 }, color: colors[index] }}>
                    {icons?.[index]}
                  </Box>
                )
              : (
                  <StyledDot component='span' sx={{ color: colors[index] }} />
                )}

            <Box component='span' sx={{ flexShrink: 0 }}>
              {series}
              {sublabels && (
                <>
                  {' '}
                  {` (${sublabels[index]})`}
                </>
              )}
            </Box>
          </StyledLegend>

          {values && <Box sx={{ typography: 'h6' }}>{values[index]}</Box>}
        </Stack>
      ))}
    </Stack>
  )
}
