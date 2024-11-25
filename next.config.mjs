import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"

// const jiti = createJiti(fileURLToPath(import.meta.url))
//
// jiti.import("./src/lib/env")

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
