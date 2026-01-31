
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  // Parse query params
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') // 'popular', 'newest', 'price_asc', 'price_desc', 'algo'
  const limitParam = searchParams.get('limit') // 'top5', 'top10', 'top25', 'top50'

  // Build filter
  const whereClause: any = {
    status: 'active'
  }

  if (category && category !== 'Semua Kategori') {
    whereClause.jenis_produk = category
  }

  if (search) {
    whereClause.OR = [
      { nama_produk: { contains: search, mode: 'insensitive' } },
      { keterangan: { contains: search, mode: 'insensitive' } },
      {
        store: {
          nama_toko: { contains: search, mode: 'insensitive' }
        }
      }
    ]
  }

  // Fetch Products
  let products = await db.product.findMany({
    where: whereClause,
    include: {
      store: true // Needed for Store Score / Response Rate
    },
    orderBy: {
      created_at: 'desc' // Default fallback
    }
  })

  // --- ALGORITHM IMPLEMENTATION ---
  // Formula:
  // 1. Most Order (50%)
  // 2. Reviews/Rating (25%) -> Rating is 0-5, normalize to 0-100 (x20)
  // 3. Fast Response (18%) -> Store.response_rate
  // 4. Most Click (7%) -> Normalized? Let's just use raw value relative to max or just add it scaled.
  // Simplified Score = (orders * 50) + (rating * 20 * 25) + (response_rate * 18) + (clicks * 0.5) ?
  // User Percents: 50%, 25%, 18%, 7%

  // Let's normalize slightly to avoid huge numbers dominating
  const maxOrders = Math.max(...products.map((p: any) => p.jumlah_order), 1)
  const maxClicks = Math.max(...products.map((p: any) => p.jumlah_klik), 1)

  const scoredProducts = products.map((product: any) => {
    const orderScore = (product.jumlah_order / maxOrders) * 50
    const ratingScore = ((product.store?.score || 1000) / 2000) * 25 // Using Store Score as proxy for rating/reputation, normalized 1000-2000 range. Or use product rating if existed. Schema has Store Score.
    const responseScore = (product.store?.response_rate || 100) * 0.18 // 0-100 * 0.18 -> max 18
    const clickScore = (product.jumlah_klik / maxClicks) * 7

    const totalAlgoScore = orderScore + ratingScore + responseScore + clickScore

    return { ...product, algoScore: totalAlgoScore }
  })

  // Sort Logic
  if (sort === 'algo' || limitParam) {
    scoredProducts.sort((a: any, b: any) => b.algoScore - a.algoScore)
  } else if (sort === 'price_asc') {
    scoredProducts.sort((a: any, b: any) => a.harga - b.harga)
  } else if (sort === 'price_desc') {
    scoredProducts.sort((a: any, b: any) => b.harga - a.harga)
  } else if (sort === 'popular') {
    scoredProducts.sort((a: any, b: any) => b.jumlah_klik - a.jumlah_klik)
  }

  // Limit Logic
  let finalProducts = scoredProducts
  if (limitParam) {
    let limit = 100
    if (limitParam === 'top5') limit = 5
    if (limitParam === 'top10') limit = 10
    if (limitParam === 'top25') limit = 25
    if (limitParam === 'top50') limit = 50
    finalProducts = scoredProducts.slice(0, limit)
  }

  return NextResponse.json(finalProducts)
}
