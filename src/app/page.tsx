import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Loading } from "@/components/ui/loading"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
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
