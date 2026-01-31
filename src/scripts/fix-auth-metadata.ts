import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const userId = 'd312d3cc-47fa-4280-bb6c-d6a3e159dcf'

    console.log(`Updating Auth Metadata for ID ${userId}...`)

    try {
        // Try updating by ID with UUID cast
        const count = await prisma.$executeRawUnsafe(`
      UPDATE auth.users
      SET raw_user_meta_data = 
        CASE 
          WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
          ELSE jsonb_set(raw_user_meta_data, '{role}', '"admin"')
        END
      WHERE id = '${userId}'::uuid;
    `)

        console.log(`✅ Updated ${count} user(s) in auth.users (matches by ID)`)

        // Also try to just select count to verify access
        const result = await prisma.$queryRawUnsafe(`SELECT count(*) FROM auth.users`)
        console.log('Total users in auth.users:', result)

    } catch (e) {
        console.error('❌ Failed to update auth metadata:', e)
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
