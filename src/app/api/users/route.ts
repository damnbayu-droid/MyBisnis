import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (userId) {
      // Get specific user
      const user = await db.user.findUnique({
        where: { user_id: userId },
        include: {
          stores: {
            select: {
              store_id: true,
              nama_toko: true,
              created_at: true
            }
          },
          couriers: {
            select: {
              courier_id: true,
              tipe: true,
              online: true,
              created_at: true
            }
          }
        }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User tidak ditemukan' },
          { status: 404 }
        )
      }

      return NextResponse.json(user)
    }

    // Get all users
    const users = await db.user.findMany({
      orderBy: { created_at: 'desc' },
      select: {
        user_id: true,
        name: true,
        email: true,
        whatsapp: true,
        role: true,
        status: true,
        lokasi: true,
        created_at: true
      }
    })

    return NextResponse.json(users)

  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      )
    }

    const updateData = await request.json()

    const user = await db.user.update({
      where: { user_id: userId },
      data: updateData,
      select: {
        user_id: true,
        name: true,
        email: true,
        whatsapp: true,
        role: true,
        status: true,
        lokasi: true,
        updated_at: true
      }
    })

    return NextResponse.json({
      message: 'User berhasil diperbarui',
      user
    })

  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}