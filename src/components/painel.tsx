"use client"

import { useNetworkState } from "@uidotdev/usehooks"
import { BarChart2, Clock, Home, Menu, Package, PackageCheck, Settings, Truck, Wifi, WifiOff } from "lucide-react"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loading } from "@/components/ui/loading"
import { MLPieChart } from "@/components/ui/pie-chart"
import { useToast } from "@/hooks/use-toast"

const DynamicPainelWithNoSSR = dynamic(() => import("@/components/painel"), {
  ssr: false,
  loading: () => <Loading />,
})

export default function PainelComponent() {
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
    <div className="flex flex-col">
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
