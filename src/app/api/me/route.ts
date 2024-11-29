import { api } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, status, statusText } = await api.get('/users/me')

  return NextResponse.json({ data, status, statusText })
}
