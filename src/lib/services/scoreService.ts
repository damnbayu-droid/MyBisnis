
import { db } from '@/lib/db'

type ScoreAction = 'order' | 'review' | 'cancel' | 'finish_order' | 'bad_review'

export async function updateScore(userId: string, action: ScoreAction, role: 'user' | 'seller' | 'driver') {
    let points = 0

    switch (action) {
        case 'order': // User orders or Seller sells (implied)
            points = 1
            break
        case 'review': // User reviews or Driver gets good review
            points = 1
            break
        case 'finish_order': // Driver finishes
            points = 1
            break
        case 'cancel':
            points = -2
            break
        case 'bad_review':
            points = -2
            break
    }

    if (points === 0) return

    try {
        // 1. Update User Score
        await db.user.update({
            where: { user_id: userId },
            data: {
                // @ts-ignore
                score: {
                    increment: points
                }
            }
        })

        // 2. If Seller, also update Store Score (if linked)
        if (role === 'seller') {
            // Find store owned by user
            const store = await db.store.findFirst({
                where: { owner_user_id: userId }
            })
            if (store) {
                await db.store.update({
                    where: { store_id: store.store_id },
                    // @ts-ignore
                    data: { score: { increment: points } }
                })
            }
        }

    } catch (error) {
        console.error('Error updating score:', error)
    }
}
