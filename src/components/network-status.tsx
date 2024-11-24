"use client"

import { useNetworkState } from "@uidotdev/usehooks"
import { Wifi, WifiOff } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function NetworkStatus() {
  type NetworkStatus = "good" | "medium" | "bad" | "offline"

  const network = useNetworkState()
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [connectionQuality, setConnectionQuality] = useState<NetworkStatus>("good")
  const { toast } = useToast()

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setConnectionQuality("good")
      toast({
        title: "Conexão restabelecida",
        description: "Sua conexão com a internet foi restaurada.",
        duration: 3000,
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      setConnectionQuality("offline")
      toast({
        variant: "destructive",
        title: "Sem conexão",
        description: "Você está offline. Verifique sua conexão com a internet.",
      })
    }

    const checkConnectionSpeed = async () => {
      const startTime = Date.now()
      try {
        const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", { cache: "no-store" })
        const endTime = Date.now()
        const duration = endTime - startTime

        if (duration > 1000) {
          setConnectionQuality("bad")
          toast({
            title: "Conexão lenta",
            description: "Sua conexão está lenta. Isso pode afetar a atualização dos dados.",
            duration: 5000,
          })
        } else {
          setConnectionQuality("good")
        }
      } catch (error) {
        console.error("Erro ao verificar a velocidade da conexão:", error)
      }
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    const speedCheckInterval = setInterval(checkConnectionSpeed, 30000)

    return () => {
      clearInterval(speedCheckInterval)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  const formatarNetworkRTT = (rtt?: number | null) => {
    if (!rtt) return "offline"
    return rtt + " ms"
  }

  const calcRTTStatus = (rtt?: number | null): NetworkStatus => {
    if (!rtt) return "offline"

    if (rtt < 100) {
      return "good"
    } else if (rtt < 200) {
      return "medium"
    } else {
      return "bad"
    }
  }

  const getColor = useCallback(() => {
    const status = calcRTTStatus(network.rtt)

    switch (status) {
      case "good":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "bad":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }, [network.rtt])

  return (
    <div className="flex items-center">
      {isOnline ? <Wifi className={`size-5 ${getColor()}`} /> : <WifiOff className="size-5 text-red-500" />}
      <span className="ml-2">{formatarNetworkRTT(network.rtt)}</span>
    </div>
  )
}
