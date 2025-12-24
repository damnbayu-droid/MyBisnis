import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courierId = searchParams.get('id')
    const userId = searchParams.get('user_id')
    const online = searchParams.get('online')
    const zona = searchParams.get('zona')

    if (courierId) {
      // Get specific courier
      const courier = await db.courier.findUnique({
        where: { courier_id: courierId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              whatsapp: true
            }
          }
        }
      })

      if (!courier) {
        return NextResponse.json(
          { error: 'Courier tidak ditemukan' },
          { status: 404 }
        )
      }

      return NextResponse.json(courier)
    }

    if (userId) {
      // Get couriers by user
      const couriers = await db.courier.findMany({
        where: { user_id: userId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              whatsapp: true
            }
          }
        }
      })

      return NextResponse.json(couriers)
    }

    // Build filter conditions
    const where: any = {}
    
    if (online !== null) {
      where.online = online === 'true'
    }
    
    if (zona) {
      where.zona = {
        contains: zona,
        mode: 'insensitive'
      }
    }

    // Get all couriers with filters
    const couriers = await db.courier.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            whatsapp: true
          }
        }
      },
      orderBy: [
        { online: 'desc' },
        { created_at: 'desc' }
      ]
    })

    return NextResponse.json(couriers)

  } catch (error) {
    console.error('Get couriers error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      user_id, 
      tipe, 
      kendaraan, 
      zona, 
      latitude, 
      longitude, 
      online,
      foto_driver,
      foto_kendaraan,
      foto_plat_nomor,
      foto_stnk
    } = await request.json()

    if (!user_id || !tipe) {
      return NextResponse.json(
        { error: 'User ID dan tipe harus diisi' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { user_id }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      )
    }

    const courier = await db.courier.create({
      data: {
        user_id,
        tipe,
        kendaraan: kendaraan || null,
        zona: zona || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        online: online || false,
        foto_driver: foto_driver || null,
        foto_kendaraan: foto_kendaraan || null,
        foto_plat_nomor: foto_plat_nomor || null,
        foto_stnk: foto_stnk || null
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            whatsapp: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Courier berhasil didaftarkan',
      courier
    })

  } catch (error) {
    console.error('Create courier error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courierId = searchParams.get('id')
    
    if (!courierId) {
      return NextResponse.json(
        { error: 'Courier ID diperlukan' },
        { status: 400 }
      )
    }

    const updateData = await request.json()

    const courier = await db.courier.update({
      where: { courier_id: courierId },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            whatsapp: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Courier berhasil diperbarui',
      courier
    })

  } catch (error) {
    console.error('Update courier error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}