import { setFont, stylesMode, varAlpha } from '@/theme/styles'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'

import { SvgColor } from '../../svg-color'
import { Block } from './styles'

// ----------------------------------------------------------------------

interface Props {
  onClickOption: (newValue: string) => void,
  options: string[],
  value: string
}

export function FontOptions({ onClickOption, options, value }: Props) {
  return (
    <Block title='Font'>
      <Box
        component='ul'
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {options.map((option) => {
          const selected = value === option

          return (
            <Box component='li' key={option} sx={{ display: 'inline-flex' }}>
              <ButtonBase
                disableRipple
                onClick={() => onClickOption(option)}
                sx={[
                  theme => ({
                    borderColor: 'transparent',
                    borderRadius: 1.5,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    color: theme => (theme.vars || theme).palette.text.disabled,
                    display: 'inline-flex',
                    flexDirection: 'column',
                    fontFamily: setFont(option),
                    fontSize: theme.typography.pxToRem(12),
                    fontWeight: 'fontWeightMedium',
                    gap: 0.75,
                    py: 2,
                    width: 1,
                  }),
                  selected && {
                    borderColor: theme => varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
                    boxShadow: theme =>
                      `-8px 8px 20px -4px ${varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.12)}`,
                    color: theme => (theme.vars || theme).palette.text.primary,
                    [stylesMode.dark]: {
                      boxShadow: theme =>
                        `-8px 8px 20px -4px ${varAlpha((theme.vars || theme).palette.common.blackChannel, 0.12)}`,
                    },
                  },
                ]}
              >
                <SvgColor
                  src={`${'base-url'}/assets/icons/setting/ic-font.svg`}
                  sx={[
                    {
                      color: 'currentColor',
                      height: 28,
                      width: 28,
                    },
                    selected && {
                      background: theme =>
                        `linear-gradient(135deg, ${(theme.vars || theme).palette.primary.light}, ${(theme.vars || theme).palette.primary.main})`,
                    },
                  ]}
                />

                {option}
              </ButtonBase>
            </Box>
          )
        })}
      </Box>
    </Block>
  )
}
