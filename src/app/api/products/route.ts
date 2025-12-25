import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      name: 'Ikan Segar Kampung',
      price: 25000,
      description: 'Ikan segar hasil tangkapan nelayan lokal',
      image: '',
      store_name: 'Nelayan Pagi',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Kopi Hitam Kampung',
      price: 10000,
      description: 'Kopi hitam tradisional tanpa campuran',
      image: '',
      store_name: 'Kopi Korot',
      created_at: new Date().toISOString()
    }
  ])
}
