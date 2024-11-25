import type { Metadata } from 'next'
import OrderTable from '@/components/order-table'

export const metadata: Metadata = {
  title: 'Ale Imports | Orders',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://ale-imports.vercel.app/',
    images: [
      {
        width: 1200,
        height: 630,
        url: 'https://http2.mlstatic.com/storage/mshops-appearance-api/images/55/740458955/logo-2023071814054031500.webp',
      },
    ],
  },
}

export default function OrdersPage() {
  return <OrderTable />
}
