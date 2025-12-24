import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('id')
    const ownerId = searchParams.get('owner_id')

    if (storeId) {
      // Get specific store
      const store = await db.store.findUnique({
        where: { store_id: storeId },
        include: {
          owner: {
            select: {
              user_id: true,
              name: true,
              email: true,
              whatsapp: true
            }
          },
          products: {
            where: { status: 'active' },
            orderBy: { created_at: 'desc' }
          }
        }
      })

      if (!store) {
        return NextResponse.json(
          { error: 'Toko tidak ditemukan' },
          { status: 404 }
        )
      }

      return NextResponse.json(store)
    }

    if (ownerId) {
      // Get stores by owner
      const stores = await db.store.findMany({
        where: { owner_user_id: ownerId },
        include: {
          products: {
            where: { status: 'active' }
          }
        }
      })

      return NextResponse.json(stores)
    }

    // Get all stores with pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const stores = await db.store.findMany({
      skip,
      take: limit,
      include: {
        owner: {
          select: {
            name: true,
            whatsapp: true
          }
        },
        products: {
          where: { status: 'active' },
          select: {
            product_id: true,
            nama_produk: true,
            harga: true,
            foto: true,
            jumlah_klik: true,
            jumlah_order: true
          }
        },
        _count: {
          select: {
            products: {
              where: { status: 'active' }
            }
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    const total = await db.store.count()

    return NextResponse.json({
      stores,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get stores error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      owner_user_id, 
      nama_toko, 
      jenis_toko, 
      deskripsi, 
      payment_qris, 
      payment_transfer, 
      payment_cash 
    } = await request.json()

    if (!owner_user_id || !nama_toko) {
      return NextResponse.json(
        { error: 'Owner user ID dan nama toko harus diisi' },
        { status: 400 }
      )
    }

    // Generate unique store link
    const link_toko = `https://mybisnis.shop/toko/${nama_toko.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`

    const store = await db.store.create({
      data: {
        owner_user_id,
        nama_toko,
        jenis_toko: jenis_toko || null,
        deskripsi: deskripsi || null,
        link_toko,
        payment_qris: payment_qris || false,
        payment_transfer: payment_transfer || false,
        payment_cash: payment_cash || false,
        verified: false
      },
      include: {
        owner: {
          select: {
            user_id: true,
            name: true,
            email: true,
            whatsapp: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Toko berhasil dibuat',
      store
    })

  } catch (error) {
    console.error('Create store error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}