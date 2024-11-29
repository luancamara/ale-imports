import type { MLGetOrderResponse } from '@/types/ml/orders'
import type { MlGetShippingResponse } from '@/types/ml/shipping'
import type { NextRequest } from 'next/server'
import { api } from '@/lib/axios'
import { firestore } from '@/lib/firebase'
import { MLWebhookSchema } from '@/types/ml/webhook'
import { doc, setDoc } from '@firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const requestData = await request.json()

  const { data, error } = MLWebhookSchema.safeParse(requestData)

  if (error || !data) {
    return NextResponse.error()
  }

  const { resource, user_id } = data

  const webhookDocRef = doc(firestore, 'webhooks', data._id)

  await setDoc(webhookDocRef, data)

  if (user_id !== 740458955) {
    return NextResponse.json({ status: 200 })
  }

  if (data.topic.includes('orders') && !data.topic.includes('feedback')) {
    const { data: order } = await api.get<MLGetOrderResponse>(resource)

    const { data: shipping } = await api.get<MlGetShippingResponse>(`${resource}/shipments`)

    const docRef = doc(firestore, resource)

    await setDoc(docRef, {
      ...order,
      shipping,
    })

    return NextResponse.json({ status: 200 })
  }

  if (data.topic.includes('shipments')) {
    const { data: shipping } = await api.get<MlGetShippingResponse>(`${resource}`)

    const { data: order } = await api.get<MLGetOrderResponse>(`/orders/${shipping.order_id}`)

    const docRef = doc(firestore, `/orders/${shipping.order_id}`)

    await setDoc(docRef, {
      ...order,
      shipping,
    })

    return NextResponse.json({ status: 200 })
  }

  return NextResponse.json({ status: 200 })
}
