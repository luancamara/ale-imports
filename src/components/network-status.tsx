"use client"

import { useNetworkState } from "react-use"
import { Wifi, WifiOff } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function NetworkStatus() {
  type NetworkStatus = "good" | "medium" | "bad" | "offline"

  const network = useNetworkState()
  const [connectionQuality, setConnectionQuality] = useState<NetworkStatus>("good")
  const { toast } = useToast()

  useEffect(() => {
    if (network.rtt) {
      const status = calcRTTStatus(network.rtt)
      setConnectionQuality(status)
    } else {
      setConnectionQuality("offline")
    }

    if (!network.online) {
      toast({ title: "Sem conexão com a internet", variant: "destructive" })
    }
  }, [toast, network])

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
      {network.online ? <Wifi className={`size-5 ${getColor()}`} /> : <WifiOff className="size-5 text-red-500" />}
      <span className="ml-2">{formatarNetworkRTT(network.rtt)}</span>
    </div>
  )
}
