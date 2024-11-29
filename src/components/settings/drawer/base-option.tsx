import type { ButtonBaseProps } from '@mui/material/ButtonBase'
import { Iconify } from '@/components/iconify'
import { varAlpha } from '@/theme/styles'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'

import { SvgColor } from '../../svg-color'
// ----------------------------------------------------------------------

type Props = {
  icon: string,
  label: string,
  selected: boolean,
  tooltip?: string
} & ButtonBaseProps

export function BaseOption({ icon, label, selected, tooltip, ...other }: Props) {
  return (
    <ButtonBase
      disableRipple
      sx={[
        {
          '&:hover': {
            bgcolor: theme => varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
          },

          alignItems: 'flex-start',
          border: theme => `solid 1px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.12)}`,
          borderRadius: 2,
          cursor: 'pointer',
          flexDirection: 'column',
          px: 2,
          py: 2.5,
        },
        selected && {
          bgcolor: theme => varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
        },
      ]}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          width: 1,
        }}
      >
        <SvgColor src={`${'base-url'}/assets/icons/setting/ic-${icon}.svg`} />
        <Switch checked={selected} color='default' name={label} size='small' sx={{ mr: -0.75 }} />
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          width: 1,
        }}
      >
        <Box
          component='span'
          sx={theme => ({
            fontSize: theme.typography.pxToRem(13),
            fontWeight: 'fontWeightSemiBold',
            lineHeight: '18px',
          })}
        >
          {label}
        </Box>

        {tooltip && (
          <Tooltip
            arrow
            slotProps={{
              tooltip: { sx: { maxWidth: 240, mr: 0.5 } },
            }}
            title={tooltip}
          >
            <Iconify icon='eva:info-outline' sx={{ color: 'text.disabled', cursor: 'pointer' }} width={16} />
          </Tooltip>
        )}
      </Box>
    </ButtonBase>
  )
}
