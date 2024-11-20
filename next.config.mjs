import withBundleAnalyzer from "@next/bundle-analyzer"
import { createJiti } from "jiti"
import withPlugins from "next-compose-plugins"
import { fileURLToPath } from "node:url"

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti("./src/lib/env")

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })]], {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  instrumentationHook: true,
  rewrites() {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ]
  },
})

export default config
