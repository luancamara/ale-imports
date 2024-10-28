"use client"

import { useNetworkState } from "@uidotdev/usehooks"
import { BarChart2, Clock, Home, Menu, Package, PackageCheck, Settings, Truck, Wifi, WifiOff } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MLPieChart } from "@/components/ui/pie-chart"
import { useToast } from "@/hooks/use-toast"

export default function PainelComponent() {
  type NetworkStatus = "good" | "medium" | "bad" | "offline"

  // Dados simulados atualizados - substitua por chamadas de API reais em uma aplicação real
  const dadosConta = {
    conta1: {
      nome: "Conta 1",
      mlColeta: 50,
      mlFlex: 30,
      horarioLimite: "18:00",
      pedidosSeparados: 40,
      pedidosEmbalados: 35,
    },
    conta2: {
      nome: "Conta 2",
      mlColeta: 40,
      mlFlex: 20,
      horarioLimite: "19:00",
      pedidosSeparados: 18, // Aproximadamente 30% dos pedidos separados
      pedidosEmbalados: 15,
    },
  }

  const network = useNetworkState()
  const [horaAtual, setHoraAtual] = useState(new Date())
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [connectionQuality, setConnectionQuality] = useState<NetworkStatus>("good")
  const { toast } = useToast()

  useEffect(() => {
    const temporizador = setInterval(() => setHoraAtual(new Date()), 1000)

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

        console.log("Tempo de resposta:", duration)

        if (duration > 1000) {
          // If the request takes more than 1 second
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

    // Check connection speed every 30 seconds
    const speedCheckInterval = setInterval(checkConnectionSpeed, 30000)

    return () => {
      clearInterval(temporizador)
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

  const formatarHora = (data: Date) => {
    return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const formatarData = (data: Date) => {
    return data.toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  const totalPedidos = (conta: typeof dadosConta.conta1) => conta.mlColeta + conta.mlFlex

  const gerarDadosGrafico = (conta: typeof dadosConta.conta1) => [
    { nome: "mlColeta", label: "ML Coleta", valor: conta.mlColeta, fill: "var(--color-mlColeta)" },
    { nome: "mlFlex", label: "ML Flex", valor: conta.mlFlex, fill: "var(--color-mlFlex)" },
    { nome: "total", label: "Separados", valor: conta.pedidosSeparados, fill: "var(--color-total)" },
  ]

  const dadosGraficoTotal = [
    {
      nome: "mlColeta",
      label: "ML Coleta",
      valor: dadosConta.conta1.mlColeta + dadosConta.conta2.mlColeta,
      fill: "var(--color-mlColeta)",
    },
    {
      nome: "mlFlex",
      label: "ML Flex",
      valor: dadosConta.conta1.mlFlex + dadosConta.conta2.mlFlex,
      fill: "var(--color-mlFlex)",
    },
    {
      nome: "total",
      label: "Separados",
      valor: dadosConta.conta1.pedidosSeparados + dadosConta.conta2.pedidosSeparados,
      fill: "var(--color-total)",
    },
  ]

  const calcularProgresso = (conta: typeof dadosConta.conta1) => {
    const total = totalPedidos(conta)
    return total > 0 ? (conta.pedidosSeparados / total) * 100 : 0
  }

  const renderizarGrafico = (dados: { nome: string; valor: number }[], titulo: string) => {
    const total = dados.reduce((sum, entry) => sum + entry.valor, 0)

    console.log(dados)

    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <MLPieChart data={dados} key={total} />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
          <h1 className="text-2xl font-bold">Painel Mercado Livre</h1>
          <div className="mt-2 flex items-center space-x-4 sm:mt-0">
            <Clock className="size-5" />
            <span className="hidden sm:inline">{formatarHora(horaAtual)}</span>
            <span className="hidden md:inline">{formatarData(horaAtual)}</span>
          </div>
        </div>
      </header>
      <nav className="bg-secondary">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="hidden space-x-4 sm:flex">
            <Button variant="ghost" className="text-secondary-foreground">
              <Home className="mr-2 size-4" />
              Início
            </Button>
            <Button variant="ghost" className="text-secondary-foreground">
              <BarChart2 className="mr-2 size-4" />
              Relatórios
            </Button>
            <Button variant="ghost" className="text-secondary-foreground">
              <Settings className="mr-2 size-4" />
              Configurações
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="outline" size="icon">
                <Menu className="size-[1.2rem]" />
                <span className="sr-only">Menu de navegação</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Home className="mr-2 size-4" />
                <span>Início</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="mr-2 size-4" />
                <span>Relatórios</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center">
            {isOnline ? <Wifi className={`size-5 ${getColor()}`} /> : <WifiOff className="size-5 text-red-500" />}
            <span className="ml-2">{formatarNetworkRTT(network.rtt)}</span>
          </div>
        </div>
      </nav>
      <main className="grow bg-background">
        <div className="container mx-auto p-4">
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.entries(dadosConta).map(([chave, conta]) => (
              <Card key={chave} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{conta.nome}</CardTitle>
                </CardHeader>
                <div className="absolute inset-x-0 top-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-green-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${calcularProgresso(conta)}%` }}
                  ></div>
                </div>
                <CardContent>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Progresso</span>
                      <span className="text-sm font-medium">{Math.round(calcularProgresso(conta))}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">ML Coleta</span>
                      <span className="text-sm font-medium">{conta.mlColeta}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">ML Flex</span>
                      <span className="text-sm font-medium">{conta.mlFlex}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Total</span>
                      <span className="text-sm font-medium">{totalPedidos(conta)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Separados</span>
                      <span className="text-sm font-medium">{conta.pedidosSeparados}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Horário Limite</span>
                      <span className="text-sm font-medium">{conta.horarioLimite}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Conjunto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <Package className="mr-2" />
                    <span>Total de Pedidos a Separar:</span>
                    <span className="ml-auto font-bold">
                      {totalPedidos(dadosConta.conta1) + totalPedidos(dadosConta.conta2)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <PackageCheck className="mr-2" />
                    <span>Total de Pedidos Separados:</span>
                    <span className="ml-auto font-bold">
                      {dadosConta.conta1.pedidosSeparados + dadosConta.conta2.pedidosSeparados}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="mr-2" />
                    <span>Total de Pedidos Embalados:</span>
                    <span className="ml-auto font-bold">
                      {dadosConta.conta1.pedidosEmbalados + dadosConta.conta2.pedidosEmbalados}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {renderizarGrafico(gerarDadosGrafico(dadosConta.conta1), "Distribuição Conta 1")}
            {renderizarGrafico(gerarDadosGrafico(dadosConta.conta2), "Distribuição Conta 2")}
            {renderizarGrafico(dadosGraficoTotal, "Distribuição Total")}
          </div>
        </div>
      </main>
    </div>
  )
}
