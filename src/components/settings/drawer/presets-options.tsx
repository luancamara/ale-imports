import type { SettingsState } from '../types'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'

import { alpha as hexAlpha } from '@mui/material/styles'

import { SvgColor } from '../../svg-color'
import { Block } from './styles'
// ----------------------------------------------------------------------

type Value = SettingsState['primaryColor']

interface Props {
  onClickOption: (newValue: Value) => void,
  options: { name: Value, value: string }[],
  value: Value
}

export function PresetsOptions({ onClickOption, options, value }: Props) {
  return (
    <Block title='Presets'>
      <Box
        component='ul'
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {options.map((option) => {
          const selected = value === option.name

          return (
            <Box component='li' key={option.name} sx={{ display: 'flex' }}>
              <ButtonBase
                onClick={() => onClickOption(option.name)}
                sx={[
                  {
                    borderRadius: 1.5,
                    color: option.value,
                    height: 64,
                    width: 1,
                  },
                  selected && {
                    bgcolor: hexAlpha(option.value, 0.08),
                  },
                ]}
              >
                <SvgColor
                  src={`${'base-url'}/assets/icons/setting/ic-siderbar-duotone.svg`}
                  sx={{ color: 'currentColor', height: 28, width: 28 }}
                />
              </ButtonBase>
            </Box>
          )
        })}
      </Box>
    </Block>
  )
}
