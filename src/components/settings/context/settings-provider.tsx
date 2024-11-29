'use client'

import type { SettingsContextValue, SettingsProviderProps, SettingsState } from '../types'
import { useCookies } from '@/hooks/use-cookies'

import { useLocalStorage } from '@/hooks/use-local-storage'

import { createContext, useCallback, useMemo, useState } from 'react'

import { defaultSettings, STORAGE_KEY } from '../config-settings'

// ----------------------------------------------------------------------

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export const SettingsConsumer = SettingsContext.Consumer

// ----------------------------------------------------------------------

export function SettingsProvider({
  caches = 'localStorage',
  children,
  settings
}: SettingsProviderProps) {
  const cookies = useCookies<SettingsState>(STORAGE_KEY, settings, defaultSettings)

  const localStorage = useLocalStorage<SettingsState>(STORAGE_KEY, settings)

  const values = caches === 'cookie' ? cookies : localStorage

  const [openDrawer, setOpenDrawer] = useState(false)

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer(prev => !prev)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  const memoizedValue = useMemo(
    () => ({
      ...values.state,
      canReset: values.canReset,
      onCloseDrawer,
      onReset: values.resetState,
      onToggleDrawer,
      onUpdate: values.setState,
      onUpdateField: values.setField,
      openDrawer
    }),
    [
      values.canReset,
      values.resetState,
      values.setField,
      values.setState,
      values.state,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer
    ]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
