import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Today {
  start: string,
  end: string
}

export function today(): Today {
  const today = dayjs()

  return {
    start: today.startOf('day').toISOString(),
    end: today.endOf('day').toISOString(),
  }
}
