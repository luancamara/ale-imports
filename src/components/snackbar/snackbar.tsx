'use client'

import Portal from '@mui/material/Portal'

import { Iconify } from '../iconify'
import { toasterClasses } from './classes'
import { StyledToaster } from './styles'

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <Portal>
      <StyledToaster
        className={toasterClasses.root}
        closeButton
        expand
        gap={12}
        icons={{
          error: <Iconify className={toasterClasses.iconSvg} icon='solar:danger-bold' />,
          info: <Iconify className={toasterClasses.iconSvg} icon='solar:info-circle-bold' />,
          loading: <span className={toasterClasses.loadingIcon} />,
          success: <Iconify className={toasterClasses.iconSvg} icon='solar:check-circle-bold' />,
          warning: <Iconify className={toasterClasses.iconSvg} icon='solar:danger-triangle-bold' />
        }}
        offset={16}
        position='top-right'
        toastOptions={{
          classNames: {
            // button
            actionButton: toasterClasses.actionButton,
            cancelButton: toasterClasses.cancelButton,
            closeButton: toasterClasses.closeButton,
            // content
            content: toasterClasses.content,
            // state
            default: toasterClasses.default,
            description: toasterClasses.description,
            error: toasterClasses.error,
            icon: toasterClasses.icon,
            info: toasterClasses.info,
            success: toasterClasses.success,
            title: toasterClasses.title,
            toast: toasterClasses.toast,
            warning: toasterClasses.warning
          },
          unstyled: true
        }}
        visibleToasts={4}
      />
    </Portal>
  )
}
