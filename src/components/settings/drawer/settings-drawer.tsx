'use client'

import type { SettingsDrawerProps } from '../types'
import { COLORS } from '@/theme/core/colors'
import { defaultFont } from '@/theme/core/typography'

import { paper, varAlpha } from '@/theme/styles'

import PRIMARY_COLOR from '@/theme/with-settings/primary-color.json'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Drawer, { drawerClasses } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useColorScheme, useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

import Typography from '@mui/material/Typography'

import { Iconify } from '../../iconify'
import { Scrollbar } from '../../scrollbar'
import { defaultSettings } from '../config-settings'
import { useSettingsContext } from '../context'
import { BaseOption } from './base-option'
import { FontOptions } from './font-options'
import { FullScreenButton } from './fullscreen-button'
import { NavOptions } from './nav-options'
import { PresetsOptions } from './presets-options'

// ----------------------------------------------------------------------

export function SettingsDrawer({
  hideColorScheme,
  hideCompact,
  hideContrast,
  hideDirection,
  hideFont,
  hideNavColor,
  hideNavLayout,
  hidePresets,
  sx,
}: SettingsDrawerProps) {
  const theme = useTheme()

  const settings = useSettingsContext()

  const { mode, setMode } = useColorScheme()

  const renderHead = (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        pl: 2.5,
        pr: 1,
        py: 2,
      }}
    >
      <Typography sx={{ flexGrow: 1 }} variant='h6'>
        Settings
      </Typography>

      <FullScreenButton />

      <Tooltip title='Reset'>
        <IconButton
          onClick={() => {
            settings.onReset()
            setMode(defaultSettings.colorScheme)
          }}
        >
          <Badge color='error' invisible={!settings.canReset} variant='dot'>
            <Iconify icon='solar:restart-bold' />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title='Close'>
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon='mingcute:close-line' />
        </IconButton>
      </Tooltip>
    </Box>
  )

  const renderMode = (
    <BaseOption
      icon='moon'
      label='Dark mode'
      onClick={() => {
        settings.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light')
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
      selected={settings.colorScheme === 'dark'}
    />
  )

  const renderContrast = (
    <BaseOption
      icon='contrast'
      label='Contrast'
      onClick={() => settings.onUpdateField('contrast', settings.contrast === 'default' ? 'hight' : 'default')}
      selected={settings.contrast === 'hight'}
    />
  )

  const renderRTL = (
    <BaseOption
      icon='align-right'
      label='Right to left'
      onClick={() => settings.onUpdateField('direction', settings.direction === 'ltr' ? 'rtl' : 'ltr')}
      selected={settings.direction === 'rtl'}
    />
  )

  const renderCompact = (
    <BaseOption
      icon='autofit-width'
      label='Compact'
      onClick={() => settings.onUpdateField('compactLayout', !settings.compactLayout)}
      selected={settings.compactLayout}
      tooltip='Dashboard only and available at large resolutions > 1600px (xl)'
    />
  )

  const renderPresets = (
    <PresetsOptions
      onClickOption={newValue => settings.onUpdateField('primaryColor', newValue)}
      options={[
        { name: 'default', value: COLORS.primary.main },
        { name: 'cyan', value: PRIMARY_COLOR.cyan.main },
        { name: 'purple', value: PRIMARY_COLOR.purple.main },
        { name: 'blue', value: PRIMARY_COLOR.blue.main },
        { name: 'orange', value: PRIMARY_COLOR.orange.main },
        { name: 'red', value: PRIMARY_COLOR.red.main },
      ]}
      value={settings.primaryColor}
    />
  )

  const renderNav = (
    <NavOptions
      hideNavColor={hideNavColor}
      hideNavLayout={hideNavLayout}
      onClickOption={{
        color: newValue => settings.onUpdateField('navColor', newValue),
        layout: newValue => settings.onUpdateField('navLayout', newValue),
      }}
      options={{
        colors: ['integrate', 'apparent'],
        layouts: ['vertical', 'horizontal', 'mini'],
      }}
      value={{
        color: settings.navColor,
        layout: settings.navLayout,
      }}
    />
  )

  const renderFont = (
    <FontOptions
      onClickOption={newValue => settings.onUpdateField('fontFamily', newValue)}
      options={[defaultFont, 'Inter', 'DM Sans', 'Nunito Sans']}
      value={settings.fontFamily}
    />
  )

  return (
    <Drawer
      anchor='right'
      onClose={settings.onCloseDrawer}
      open={settings.openDrawer}
      slotProps={{ backdrop: { invisible: true } }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({
            color: varAlpha((theme.vars || theme).palette.background.defaultChannel, 0.9),
            theme,
          }),
          width: 360,
          ...sx,
        },
      }}
    >
      {renderHead}
      <Scrollbar>
        <Stack spacing={6} sx={{ pb: 5, px: 2.5 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {!hideColorScheme && renderMode}
            {!hideContrast && renderContrast}
            {!hideDirection && renderRTL}
            {!hideCompact && renderCompact}
          </Box>
          {!(hideNavLayout && hideNavColor) && renderNav}
          {!hidePresets && renderPresets}
          {!hideFont && renderFont}
        </Stack>
      </Scrollbar>
    </Drawer>
  )
}
