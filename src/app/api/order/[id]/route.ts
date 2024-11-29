import type { MlGetOrdersResponse } from '@/types/ml/orders'
import type { AxiosResponse } from 'axios'
import type { NextRequest } from 'next/server'
import { api } from '@/lib/axios'

interface Params {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params

  const { data }: AxiosResponse<MlGetOrdersResponse> = await api.get(`/orders/${id}/shipments`)

  return Response.json({ data, status: 200 })
}
