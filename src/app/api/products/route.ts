import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    products: [
      {
        product_id: '1',
        nama_produk: 'Ikan Segar Kampung',
        harga: 25000,
        foto: '',
        jumlah_klik: 120,
        jumlah_order: 45,
        status: 'active',
        store: {
          store_id: 't1',
          nama_toko: 'Nelayan Pagi',
          link_toko: 'nelayan-pagi',
          owner: {
            name: 'Pak Andi',
            whatsapp: '628123456789'
          }
        }
      },
      {
        product_id: '2',
        nama_produk: 'Kopi Hitam Kampung',
        harga: 10000,
        foto: '',
        jumlah_klik: 210,
        jumlah_order: 98,
        status: 'active',
        store: {
          store_id: 't2',
          nama_toko: 'Kopi Korot',
          link_toko: 'kopi-korot',
          owner: {
            name: 'Ibu Sari',
            whatsapp: '628987654321'
          }
        }
      }
    ],
    pagination: {
      page: 1,
      pages: 1,
      total: 2
    }
  })
}
