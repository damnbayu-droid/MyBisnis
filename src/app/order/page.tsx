'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function OrderPage() {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')
  const price = searchParams.get('price')
  const store = searchParams.get('store')

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Ringkasan Pesanan</h1>

      <div className="border rounded-lg p-4 mb-6">
        <p className="mb-2"><b>Produk:</b> {name}</p>
        <p className="mb-2"><b>Toko:</b> {store}</p>
        <p className="mb-2"><b>Harga:</b> Rp {Number(price).toLocaleString('id-ID')}</p>
      </div>

      <Button className="w-full">
        Konfirmasi Pesanan (Dummy)
      </Button>
    </div>
  )
}
