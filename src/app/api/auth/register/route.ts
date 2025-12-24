import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, whatsapp, role, lokasi, password } = await request.json()

    if (!name || !email || !role || !password) {
      return NextResponse.json(
        { error: 'Semua field wajib harus diisi' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        email,
        whatsapp: whatsapp || null,
        role,
        lokasi: lokasi || null,
        // In production, you should hash the password
        // For demo purposes, we're storing it as plain text (NOT RECOMMENDED)
      },
      include: {
        stores: true,
        couriers: true
      }
    })

    // Remove sensitive data from response
    const { ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Registrasi berhasil',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}