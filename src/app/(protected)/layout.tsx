import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()

        if (error || !user) {
            // Redirect to landing with login modal open
            redirect("/?openLogin=true")
        }
    } catch (error) {
        // If fetch fails (e.g. network error during dev), we should probably redirect or show an error.
        // For now, redirecting to home is safest to break the loading loop.
        console.error("Auth check failed:", error)
        redirect("/?openLogin=true")
    }

    return (
        <>
            {children}
        </>
    )
}
