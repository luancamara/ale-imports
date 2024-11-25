import { useEffect, useState } from 'react'

export function useCurrentTime(msBetweenUpdates: number = 1_000) {
  const [curTime, setCurTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurTime(new Date())
    }, msBetweenUpdates)
    return () => clearInterval(intervalId)
  }, [msBetweenUpdates])

  return curTime
}
