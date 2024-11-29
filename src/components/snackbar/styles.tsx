import { varAlpha } from '@/theme/styles'

import { styled } from '@mui/material/styles'

import { Toaster } from 'sonner'

import { toasterClasses } from './classes'

// ----------------------------------------------------------------------

export const StyledToaster = styled(Toaster)(({ theme }) => {
  const baseStyles = {
    toastColor: {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      boxShadow: theme.customShadows.z8,
      color: (theme.vars || theme).palette.text.primary,
      padding: theme.spacing(0.5, 1, 0.5, 0.5)
    },
    toastDefault: {
      backgroundColor: (theme.vars || theme).palette.text.primary,
      boxShadow: theme.customShadows.z8,
      color: (theme.vars || theme).palette.background.paper,
      padding: theme.spacing(1, 1, 1, 1.5)
    },
    toastLoader: {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      boxShadow: theme.customShadows.z8,
      color: (theme.vars || theme).palette.text.primary,
      padding: theme.spacing(0.5, 1, 0.5, 0.5)
    }
  }

  const loadingStyles = {
    [`& .${toasterClasses.loadingIcon}`]: {
      animation: 'rotate 3s infinite linear',
      background: `conic-gradient(${varAlpha(
        (theme.vars || theme).palette.text.primaryChannel,
        0
      )}, ${varAlpha((theme.vars || theme).palette.text.disabledChannel, 0.64)})`,
      borderRadius: '50%',
      height: 24,
      width: 24,
      zIndex: 9
    },
    alignItems: 'center',
    background: (theme.vars || theme).palette.background.neutral,
    borderRadius: 'inherit',
    display: 'none',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    overflow: 'hidden',
    position: 'relative',
    [toasterClasses.loaderVisible]: { display: 'flex' },
    top: 0,
    transform: 'none',
    width: '100%'
  }

  return {
    /*
     * Default
     */
    '@keyframes rotate': { to: { transform: 'rotate(1turn)' } },
    /*
     * Buttons
     */
    [`& .${toasterClasses.actionButton}`]: {},
    [`& .${toasterClasses.cancelButton}`]: {},
    [`& .${toasterClasses.closeButton}`]: {
      '&:hover': {
        backgroundColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.08),
        borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.24)
      },
      backgroundColor: 'transparent',
      borderColor: varAlpha((theme.vars || theme).palette.grey['500Channel'], 0.16),
      color: 'currentColor',
      left: 'auto',
      right: 0,
      top: 0,
      transform: 'translate(-6px, 6px)',
      transition: theme.transitions.create(['background-color', 'border-color'])
    },
    /*
     * Content
     */
    [`& .${toasterClasses.content}`]: {
      flex: '1 1 auto',
      gap: 0
    },
    [`& .${toasterClasses.default}`]: {
      ...baseStyles.toastDefault,
      [`&:has(.${toasterClasses.loader})`]: baseStyles.toastLoader,
      /*
       * With loader
       */
      [`&:has(.${toasterClasses.loader})`]: baseStyles.toastLoader,
      [`&:has(${toasterClasses.closeBtnVisible})`]: {
        [`& .${toasterClasses.content}`]: {
          paddingRight: 32
        }
      },
      [`& .${toasterClasses.loader}`]: loadingStyles
    },
    [`& .${toasterClasses.description}`]: {
      ...theme.typography.caption,
      opacity: 0.64
    },
    /*
     * Error
     */
    [`& .${toasterClasses.error}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        backgroundColor: varAlpha((theme.vars || theme).palette.error.mainChannel, 0.08),
        color: (theme.vars || theme).palette.error.main
      }
    },
    /*
     * Icon
     */
    [`& .${toasterClasses.icon}`]: {
      [`& .${toasterClasses.iconSvg}`]: {
        fontSize: 0,
        height: 24,
        width: 24
      },
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: 'inherit',
      height: 48,
      justifyContent: 'center',
      margin: 0,
      width: 48
    },

    /*
     * Info
     */
    [`& .${toasterClasses.info}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        backgroundColor: varAlpha((theme.vars || theme).palette.info.mainChannel, 0.08),
        color: (theme.vars || theme).palette.info.main
      }
    },

    /*
     * Success
     */
    [`& .${toasterClasses.success}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        backgroundColor: varAlpha((theme.vars || theme).palette.success.mainChannel, 0.08),
        color: (theme.vars || theme).palette.success.main
      }
    },
    [`& .${toasterClasses.title}`]: {
      fontSize: theme.typography.subtitle2.fontSize
    },
    [`& .${toasterClasses.toast}`]: {
      alignItems: 'center',
      borderRadius: 12,
      display: 'flex',
      gap: 12,
      minHeight: 52,
      width: '100%'
    },
    /*
     * Warning
     */
    [`& .${toasterClasses.warning}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        backgroundColor: varAlpha((theme.vars || theme).palette.warning.mainChannel, 0.08),
        color: (theme.vars || theme).palette.warning.main
      }
    },
    width: 300
  }
})
