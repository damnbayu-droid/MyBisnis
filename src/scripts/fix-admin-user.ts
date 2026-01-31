import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const userId = 'd312d3cc-47fa-4280-bb6c-d6a3e159dcf' // From screenshot
    const email = 'damnbayu4@gmail.com'
    const name = 'Bayu Damn' // From screenshot

    console.log(`Fixing user ${email} (${userId})...`)

    try {
        // Upsert the user into public.users (Model name is User)
        const user = await prisma.user.upsert({
            where: { user_id: userId },
            update: {
                role: 'admin',
                status: 'active'
            },
            create: {
                user_id: userId,
                email: email,
                name: name,
                role: 'admin',
                status: 'active',
                whatsapp: '-' // Default
            }
        })

        console.log('✅ User successfully linked and set as ADMIN:')
        console.log(user)

    } catch (e) {
        console.error('❌ Failed to fix user:', e)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
