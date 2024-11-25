'use server'

import type { MlGetOrdersResponse } from '@/types/ml/orders'
import type { AxiosResponse } from 'axios'
import { api } from '@/lib/axios'
import { today } from '@/lib/utils'

export async function getOrders(): Promise<MlGetOrdersResponse> {
  const { start, end } = today()

  const { data }: AxiosResponse<MlGetOrdersResponse> = await api.get('/orders/search', {
    params: {
      seller: '740458955',
      'order.date_created.from': start,
      'order.date_created.to': end,
    },
  })

  return data
}
