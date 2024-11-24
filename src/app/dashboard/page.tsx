import MainLayout from "@/components/main-layout"
import { DynamicPainelWithNoSSR } from "@/components/painel-no-ssr"

export default function Home() {
  return (
    <MainLayout>
      <DynamicPainelWithNoSSR />
    </MainLayout>
  )
}
