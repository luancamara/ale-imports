import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Loading } from "@/components/ui/loading"

export const metadata: Metadata = {
  title: "Ale Imports",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://ale-imports.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://http2.mlstatic.com/storage/mshops-appearance-api/images/55/740458955/logo-2023071814054031500.webp",
      },
    ],
  },
}

const DynamicPainelWithNoSSR = dynamic(() => import("@/components/painel"), {
  ssr: false,
  loading: () => <Loading />,
})

export default function Web() {
  return <DynamicPainelWithNoSSR />
}
