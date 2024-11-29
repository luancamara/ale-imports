import { SettingsProvider } from '@/components/settings'
import { detectSettings } from '@/components/settings/server'
import { ThemeProvider } from '@/theme/theme-provider'
import { Inter } from 'next/font/google'
import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js Webapp Base',
  description: 'A base webapp with sidebar and topbar',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await detectSettings()

  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <SettingsProvider caches='cookie' settings={settings}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
