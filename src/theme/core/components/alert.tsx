import type { Components, Theme } from '@mui/material/styles'
import type { ComponentsVariants } from '@mui/material/styles/variants'
import type { SvgIconProps } from '@mui/material/SvgIcon'

import { alertClasses } from '@mui/material/Alert'
import SvgIcon from '@mui/material/SvgIcon'

import { merge } from 'lodash'

import { stylesMode, varAlpha } from '../../styles'

// ----------------------------------------------------------------------

/**
 * Icons
 */

/* https://icon-sets.iconify.design/solar/info-circle-bold/ */
function AlertInfoIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        clipRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2'
        fill='currentColor'
        fillRule='evenodd'
      />
    </SvgIcon>
  )
}

/* https://icon-sets.iconify.design/solar/check-circle-bold/ */
function AlertSuccessIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        clipRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0'
        fill='currentColor'
        fillRule='evenodd'
      />
    </SvgIcon>
  )
}

/* https:// icon-sets.iconify.design/solar/danger-triangle-bold/ */
function AlertWarningIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        clipRule='evenodd'
        d='M5.312 10.762C8.23 5.587 9.689 3 12 3c2.31 0 3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022zM12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2'
        fill='currentColor'
        fillRule='evenodd'
      />
    </SvgIcon>
  )
}

/* https://icon-sets.iconify.design/solar/danger-bold/ */
function AlertErrorIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        clipRule='evenodd'
        d='M7.843 3.802C9.872 2.601 10.886 2 12 2c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7c.557-.99 1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75'
        fill='currentColor'
        fillRule='evenodd'
      />
    </SvgIcon>
  )
}

// ----------------------------------------------------------------------

const COLORS = ['info', 'success', 'warning', 'error'] as const

function filled(): ComponentsVariants<Theme>['MuiAlert'] {
  return COLORS.map(color => ({
    props: ({ ownerState }) => ownerState.severity === color && ownerState.variant === 'filled',
    style: ({ theme }) => ({
      backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.08),
      color: (theme.vars || theme).palette[color].contrastText
    })
  }))
}

function outlined(): ComponentsVariants<Theme>['MuiAlert'] {
  return COLORS.map((color) => {
    return {
      props: ({ ownerState }) => ownerState.severity === color && ownerState.variant === 'outlined',
      style: ({ theme }) => {
        return {
          [`& .${alertClasses.icon}`]: { color: (theme.vars || theme).palette[color].main },
          backgroundColor: varAlpha((theme.vars || theme).palette[color].mainChannel, 0.08),
          border: `solid 1px ${varAlpha((theme.vars || theme).palette[color].mainChannel, 0.16)}`,
          color: (theme.vars || theme).palette[color].dark,
          [stylesMode.dark]: { color: (theme.vars || theme).palette[color].light }
        }
      }
    }
  })
}

function standard(): ComponentsVariants<Theme>['MuiAlert'] {
  return COLORS.map(color => ({
    props: ({ ownerState }) => ownerState.severity === color && ownerState.variant === 'standard',
    style: ({ theme }) => ({
      [`& .${alertClasses.icon}`]: {
        color: (theme.vars || theme).palette[color].main,
        [stylesMode.dark]: { color: (theme.vars || theme).palette[color].light }
      },
      backgroundColor: (theme.vars || theme).palette[color].lighter,
      color: (theme.vars || theme).palette[color].darker,
      [stylesMode.dark]: {
        backgroundColor: (theme.vars || theme).palette[color].darker,
        color: (theme.vars || theme).palette[color].lighter
      }
    })
  }))
}

// ----------------------------------------------------------------------

const MuiAlert: Components<Theme>['MuiAlert'] = {
  /**
   * **************************************
   * DEFAULT PROPS
   ***************************************
   */
  defaultProps: {
    iconMapping: {
      error: <AlertErrorIcon />,
      info: <AlertInfoIcon />,
      success: <AlertSuccessIcon />,
      warning: <AlertWarningIcon />
    }
  },
  variants: merge(filled(), outlined(), standard())
}

// ----------------------------------------------------------------------

const MuiAlertTitle: Components<Theme>['MuiAlertTitle'] = {
  /**
   * **************************************
   * STYLE
   ***************************************
   */
  styleOverrides: {
    root: ({ theme }) => ({
      fontWeight: theme.typography.fontWeightSemiBold,
      marginBottom: theme.spacing(0.5)
    })
  }
}

// ----------------------------------------------------------------------

export const alert = { MuiAlert, MuiAlertTitle }
