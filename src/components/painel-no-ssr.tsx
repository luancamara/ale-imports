"use client"

import dynamic from "next/dynamic"
import { Loading } from "@/components/ui/loading"

export const DynamicPainelWithNoSSR = dynamic(() => import("@/components/painel"), {
  ssr: false,
  loading: () => <Loading />,
})
