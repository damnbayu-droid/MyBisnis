'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Search, Store } from 'lucide-react'

interface Product {
  product_id: string
  nama_produk: string
  harga: number
  foto?: string
  store: {
    nama_toko: string
    owner: {
      whatsapp: string
    }
  }
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (res.ok) {
        setProducts(data.products || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p =>
    p.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
    p.store.nama_toko.toLowerCase().includes(search.toLowerCase())
  )

  const handleBuyWA = (product: Product) => {
    const text = `Halo, saya tertarik dengan produk "${product.nama_produk}" dari toko ${product.store.nama_toko}`
    const wa = product.store.owner.whatsapp.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            MyBisnis
          </div>
          <Badge className="bg-amber-500 text-slate-900">
            Marketplace
          </Badge>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cari produk atau toko..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-slate-100 rounded-full"
            />
          </div>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <p className="text-slate-400">Memuat produk...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-slate-400">Produk tidak ditemukan</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card
                key={product.product_id}
                className="bg-slate-800 border-slate-700 hover:border-amber-500/50 transition"
              >
                <CardHeader className="p-4">
                  <div className="h-40 bg-slate-700 rounded mb-3 flex items-center justify-center">
                    {product.foto ? (
                      <img
                        src={product.foto}
                        alt={product.nama_produk}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                  </div>
                  <CardTitle className="text-amber-400 text-lg">
                    {product.nama_produk}
                  </CardTitle>
                  <p className="text-xl font-bold text-amber-400">
                    Rp {product.harga.toLocaleString('id-ID')}
                  </p>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Store className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">
                      {product.store.nama_toko}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-green-500 hover:bg-green-400 text-white rounded-full"
                    onClick={() => handleBuyWA(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Beli via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
