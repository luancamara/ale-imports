import { api } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, status, statusText } = await api.get('/shipping/users/740458955/processing_time_middleend/cross_docking')

  return NextResponse.json({ data, status, statusText })
}
