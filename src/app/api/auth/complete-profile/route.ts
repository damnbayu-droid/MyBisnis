
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateSlug } from '@/lib/utils/slug'

export async function POST(request: NextRequest) {
    try {
        const { userId, name, role } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 })
        }

        // Generate Slug
        // Default isVerified = false for new users
        const slug = generateSlug(name, false)

        // Update User in DB
        // We assume the Trigger has already created the user, or we create/update it here.
        // Using upsert to be safe.
        const user = await db.user.upsert({
            where: { user_id: userId },
            update: {
                slug: slug,
                score: 1000,
                verification_status: 'unverified'
            },
            create: {
                user_id: userId,
                name: name || 'User',
                email: 'temp@email.com', // Placeholder if not provided, usually trigger handles this
                role: role || 'pembeli',
                slug: slug,
                score: 1000,
                verification_status: 'unverified'
            }
        })

        return NextResponse.json({ success: true, slug: user.slug })
    } catch (error) {
        console.error('Complete Profile Error:', error)
        return NextResponse.json({ error: 'Failed to complete profile' }, { status: 500 })
    }
}
