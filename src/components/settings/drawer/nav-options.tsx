import type { ButtonBaseProps } from '@mui/material/ButtonBase'
import type { SettingsState } from '../types'
import { stylesMode, varAlpha } from '@/theme/styles'
import Box from '@mui/material/Box'

import ButtonBase from '@mui/material/ButtonBase'
import Stack from '@mui/material/Stack'

import { useTheme } from '@mui/material/styles'

import { SvgColor, svgColorClasses } from '../../svg-color'
import { Block } from './styles'

// ----------------------------------------------------------------------

interface Props {
  hideNavColor?: boolean,
  hideNavLayout?: boolean,
  onClickOption: {
    color: (newValue: SettingsState['navColor']) => void,
    layout: (newValue: SettingsState['navLayout']) => void
  },
  options: {
    colors: SettingsState['navColor'][],
    layouts: SettingsState['navLayout'][]
  },
  value: {
    color: SettingsState['navColor'],
    layout: SettingsState['navLayout']
  }
}

export function NavOptions({ hideNavColor, hideNavLayout, onClickOption, options, value }: Props) {
  const theme = useTheme()

  const cssVars = {
    '--item-active-color': `linear-gradient(135deg, ${(theme.vars || theme).palette.primary.light} 0%, ${(theme.vars || theme).palette.primary.main} 100%)`,
    '--item-active-shadow-dark': `-8px 8px 20px -4px ${varAlpha(
      (theme.vars || theme).palette.common.blackChannel,
      0.12
    )}`,
    '--item-active-shadow-light': `-8px 8px 20px -4px ${varAlpha(
      (theme.vars || theme).palette.grey['500Channel'],
      0.12
    )}`,
    '--item-bg': (theme.vars || theme).palette.grey[500],
    '--item-border-color': varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
    '--item-radius': '12px',
  }

  const labelStyles: React.CSSProperties = {
    color: 'text.secondary',
    display: 'block',
    fontSize: theme.typography.pxToRem(11),
    fontWeight: 'fontWeightSemiBold',
    lineHeight: '14px',
  }

  const renderLayout = (
    <div>
      <Box component='span' sx={labelStyles}>
        Layout
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          mt: 1.5,
        }}
      >
        {options.layouts.map(option => (
          <LayoutOption
            key={option}
            onClick={() => onClickOption.layout(option)}
            option={option}
            selected={value.layout === option}
          />
        ))}
      </Box>
    </div>
  )

  const renderColor = (
    <div>
      <Box component='span' sx={labelStyles}>
        Color
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          mt: 1.5,
        }}
      >
        {options.colors.map(option => (
          <ColorOption
            key={option}
            onClick={() => onClickOption.color(option)}
            option={option}
            selected={value.color === option}
          />
        ))}
      </Box>
    </div>
  )

  return (
    <Block sx={{ ...cssVars, gap: 2.5 }} title='Nav' tooltip='Dashboard only'>
      {!hideNavLayout && renderLayout}
      {!hideNavColor && renderColor}
    </Block>
  )
}

// ----------------------------------------------------------------------

type OptionProps = {
  option: string,
  selected: boolean
} & ButtonBaseProps

export function LayoutOption({ option, selected, sx, ...other }: OptionProps) {
  const renderNav = () => {
    const baseStyles = { bgcolor: 'var(--item-bg)', borderRadius: 1, flexShrink: 0 }

    const circle = (
      <Box
        sx={[
          {
            ...baseStyles,
            height: 10,
            opacity: 0.8,
            width: 10,
          },
          selected && { background: 'var(--item-active-color)', opacity: 1 },
        ]}
      />
    )

    const primaryItem = (
      <Box
        sx={[
          {
            ...baseStyles,
            height: 4,
            opacity: 0.48,
            width: 1,
          },
          option === 'horizontal' && { width: 16 },
          selected && { background: 'var(--item-active-color)' },
        ]}
      />
    )

    const secondaryItem = (
      <Box
        sx={[
          {
            ...baseStyles,
            height: 4,
            maxWidth: 14,
            opacity: 0.24,
            width: 1,
          },
          option === 'horizontal' && { maxWidth: 10 },
          selected && { background: 'var(--item-active-color)' },
        ]}
      />
    )

    return (
      <Stack
        spacing={0.5}
        sx={[
          {
            flexShrink: 0,
          },
          {
            borderRightColor: 'var(--item-border-color)',
            borderRightStyle: 'solid',
            borderRightWidth: 1,
            height: 1,
            p: 0.75,
            width: 32,
          },
          option === 'mini' && {
            width: 22,
          },
          option === 'horizontal' && {
            alignItems: 'center',
            borderBottomColor: 'var(--item-border-color)',
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderRight: 'none',
            flexDirection: 'row',
            height: 22,
            width: 1,
          },
        ]}
      >
        {circle}
        {primaryItem}
        {secondaryItem}
      </Stack>
    )
  }

  const renderContent = (
    <Box sx={{ flexGrow: 1, height: 1, p: 0.5, width: 1 }}>
      <Box
        sx={[
          {
            bgcolor: 'var(--item-bg)',
            borderRadius: 0.75,
            height: 1,
            opacity: 0.2,
            width: 1,
          },
          selected && { background: 'var(--item-active-color)' },
        ]}
      />
    </Box>
  )

    return (
    <ButtonBase
      disableRipple
      sx={[
        {
          borderColor: 'var(--item-border-color)',
          borderRadius: 'var(--item-radius)',
          borderStyle: 'solid',
          borderWidth: 1,
          height: 64,
          width: 1,
          ...sx,
        },
        option === 'horizontal' && { flexDirection: 'column' },
        selected && {
          boxShadow: 'var(--item-active-shadow-light)',
          [stylesMode.dark]: {
            boxShadow: 'var(--item-active-shadow-dark)',
          },
        },
      ]}
      {...other}
    >
      {renderNav()}
      {renderContent}
    </ButtonBase>
  )
}

// ----------------------------------------------------------------------

export function ColorOption({ option, selected, sx, ...other }: OptionProps) {
  return (
    <ButtonBase
      disableRipple
      sx={[
        {
          borderRadius: 'var(--item-radius)',
          color: 'text.disabled',
          gap: 1.5,
          height: 56,
          width: 1,
          ...sx,
        },
        selected && {
          [`& .${svgColorClasses.root}`]: {
            background: 'var(--item-active-color)',
          },
          borderColor: 'var(--item-border-color)',
          borderStyle: 'solid',
          borderWidth: 1,
          boxShadow: 'var(--item-active-shadow-light)',
          color: 'text.primary',
          [stylesMode.dark]: {
            boxShadow: 'var(--item-active-shadow-dark)',
          },
        },
      ]}
      {...other}
    >
      <SvgColor
        src={`${'base-url'}/assets/icons/setting/ic-sidebar-${option === 'integrate' ? 'outline' : 'filled'}.svg`}
      />
      <Box
        component='span'
        sx={theme => ({
          fontSize: theme.typography.pxToRem(13),
          fontWeight: 'fontWeightSemiBold',
          lineHeight: '18px',
          textTransform: 'capitalize',
        })}
      >
        {option}
      </Box>
    </ButtonBase>
  )
}
