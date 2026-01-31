import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Creating User Sync Trigger...')

    try {
        // 1. Create the Function
        await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.users (user_id, email, name, whatsapp, role, status)
        VALUES (
          new.id::text,
          new.email,
          new.raw_user_meta_data->>'name',
          new.raw_user_meta_data->>'whatsapp',
          COALESCE(new.raw_user_meta_data->>'role', 'pembeli'),
          'active'
        );
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `)
        console.log('✅ Function handle_new_user created')

        // 2. Create the Trigger
        // Drop first to avoid duplicate errors if re-running
        await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;`)
        await prisma.$executeRawUnsafe(`
      CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    `)
        console.log('✅ Trigger on_auth_user_created created')

    } catch (e) {
        console.error('❌ Failed to create trigger:', e)
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
