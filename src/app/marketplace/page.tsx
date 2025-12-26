'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MarketplacePage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>

      {products.length === 0 && (
        <p>Produk belum tersedia</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-2">
                {product.store_name}
              </p>

              <p className="font-semibold mb-4">
                Rp {product.price.toLocaleString('id-ID')}
              </p>

              <Link href={`/marketplace/${product.id}`}>
                <Button className="w-full">
                  Lihat Produk
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
