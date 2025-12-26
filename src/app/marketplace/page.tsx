'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProductDetailPage() {
  const params = useParams()
  const id = String(params.id)

  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data) => {
        const found = data.find((item: any) => String(item.id) === id)
        setProduct(found || null)
      })
  }, [id])

  if (!product) {
    return (
      <div className="p-8">
        <p>Produk tidak ditemukan</p>

        <Link href="/marketplace">
          <Button className="mt-4">
            Kembali ke Marketplace
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-4">
        {product.name}
      </h1>

      <p className="mb-2">
        <b>Toko:</b> {product.store_name}
      </p>

      <p className="text-xl font-semibold mb-6">
        Rp {product.price.toLocaleString('id-ID')}
      </p>

      <Link
        href={`/order?name=${encodeURIComponent(product.name)}&price=${product.price}&store=${encodeURIComponent(product.store_name)}`}
      >
        <Button className="w-full">
          Pesan Sekarang
        </Button>
      </Link>
    </div>
  )
}
