import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Enabling RLS on all tables...')

    const tables = [
        'users',
        'stores',
        'products',
        'couriers',
        'orders',
        'order_items',
        'messages',
        'system_logs',
        'system_stats',
        'verification_requests',
    ]

    for (const table of tables) {
        try {
            await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`)
            console.log(`✅ RLS enabled for ${table}`)
        } catch (e) {
            console.error(`❌ Failed to enable RLS for ${table}:`, e)
        }
    }

    console.log('Creating RLS Policies...')

    try {
        // 1. Products - Public Read, Owner Write
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public Read Products" ON "products";`)
        await prisma.$executeRawUnsafe(`CREATE POLICY "Public Read Products" ON "products" FOR SELECT USING (true);`)
        console.log('✅ Policy created for Products')

        // 2. Stores - Public Read, Owner Write
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public Read Stores" ON "stores";`)
        await prisma.$executeRawUnsafe(`CREATE POLICY "Public Read Stores" ON "stores" FOR SELECT USING (true);`)
        console.log('✅ Policy created for Stores')

        // 3. Users - Read Self
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Users Read Self" ON "users";`)
        await prisma.$executeRawUnsafe(`CREATE POLICY "Users Read Self" ON "users" FOR SELECT USING (auth.uid()::text = user_id);`)
        console.log('✅ Policy created for Users')

    } catch (e) {
        console.error('❌ Failed to create policies:', e)
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
