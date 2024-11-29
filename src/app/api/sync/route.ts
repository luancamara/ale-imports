import type { MlGetOrdersResponse, MLGetOrdersResults } from '@/types/ml/orders'
import type { MlGetShippingResponse } from '@/types/ml/shipping'
import type { AxiosResponse } from 'axios'
import { api } from '@/lib/axios'
import { firestore } from '@/lib/firebase'
import { doc, writeBatch } from '@firebase/firestore'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextResponse } from 'next/server'

dayjs.extend(utc)

export async function GET() {
  const start = dayjs('11-24-2024').utc().startOf('day').toISOString()
  const end = dayjs('11-26-2024').utc().endOf('day').toISOString()

  const results: MLGetOrdersResults = []

  const { data }: AxiosResponse<MlGetOrdersResponse> = await api.get('/orders/search', {
    params: {
      seller: '740458955',
      'order.date_created.from': start,
      'order.date_created.to': end,
      'order.status': 'paid',
      limit: 50,
      offset: 0,
    },
  })

  results.push(...data.results)

  const total = data.paging.total

  if (total > 50) {
    const pages = Math.ceil(total / 50)

    for (let i = 1; i < pages; i++) {
      const { data }: AxiosResponse<MlGetOrdersResponse> = await api.get('/orders/search', {
        params: {
          seller: '740458955',
          'order.date_created.from': start,
          'order.date_created.to': end,
          'order.status': 'paid',
          limit: 50,
          offset: i * 50,
        },
      })

      results.push(...data.results)
    }
  }

  const shippingPromises = results.map((r) => {
    return api.get<MlGetShippingResponse>(`/orders/${r.id}/shipments`)
  })

  const shippingResponses = await Promise.all(shippingPromises)

  const newResults = results.map(r => ({
    ...r,
    shipping: shippingResponses.find(s => s.data.order_id === r.id)?.data,
  }))

  const batch = writeBatch(firestore)

  newResults.forEach((r) => {
    const docRef = doc(firestore, `orders/${r.id}`)
    batch.set(docRef, r)
  })

  await batch.commit()

  return NextResponse.json({ start, end, newResults, status: 200 })
}
