import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      )
    }

    // Get messages for user (both sent and received)
    const messages = await db.$queryRaw`
      SELECT 
        m.*,
        sender.name as sender_name,
        receiver.name as receiver_name
      FROM messages m
      LEFT JOIN users sender ON m.sender_id = sender.user_id
      LEFT JOIN users receiver ON m.receiver_id = receiver.user_id
      WHERE m.sender_id = ${userId} OR m.receiver_id = ${userId}
      ORDER BY m.created_at DESC
      LIMIT 50
    `

    return NextResponse.json(messages)

  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sender, receiver, content } = await request.json()

    if (!sender || !receiver || !content) {
      return NextResponse.json(
        { error: 'Sender, receiver, dan content harus diisi' },
        { status: 400 }
      )
    }

    // Create message
    const message = await db.$queryRaw`
      INSERT INTO messages (id, sender_id, receiver_id, content, read, created_at)
      VALUES (
        ${Date.now()},
        ${sender},
        ${receiver},
        ${content},
        false,
        ${new Date().toISOString()}
      )
    `

    return NextResponse.json({
      message: 'Pesan berhasil dikirim',
      data: message
    })

  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}