import { api } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data } = await api.get('/users/740458955/shipping_preferences')

  return NextResponse.json({ data, status: 200 })
}
