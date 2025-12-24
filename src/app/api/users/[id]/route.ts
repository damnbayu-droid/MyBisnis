import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
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