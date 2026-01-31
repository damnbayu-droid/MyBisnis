'use client'

import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner' // Ensure sonner is installed or remove toast

const INACTIVITY_LIMIT = 5 * 60 * 1000 // 5 Minutes in milliseconds

export default function AutoLogout() {
    const router = useRouter()
    const lastActivity = useRef(Date.now())
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const logout = async (reason = 'inactive') => {
        const supabase = createClient()
        await supabase.auth.signOut()

        // Remove locally stored user too if using localStorage
        localStorage.removeItem('currentUser')

        if (reason === 'inactive') {
            toast.message('Sesi Anda telah berakhir karena tidak aktif.')
        }

        router.push('/?openLogin=true')
    }

    const resetTimer = () => {
        lastActivity.current = Date.now()
    }

    useEffect(() => {
        // 1. Events to track activity
        const events = ['mousemove', 'keydown', 'scroll', 'click']
        events.forEach(event => window.addEventListener(event, resetTimer))

        // 2. Check for inactivity every minute (or more frequently)
        const interval = setInterval(() => {
            if (Date.now() - lastActivity.current > INACTIVITY_LIMIT) {
                // Check if user is actually logged in first?
                // For simplicity, we just try to logout.
                // Optimally we chech session first, but client-side check is fast.
                logout('inactive')
            }
        }, 60 * 1000) // Check every 1 minute

        // 3. Tab Close / Browser Close Handler
        const handleBeforeUnload = () => {
            // NOTE: signOut is async and might not complete before tab closes.
            // Using navigator.sendBeacon or persistent cleanup is better, but this is best effort.
            // A more robust way for "session on close" is setting cookies to session-only (no max-age),
            // but Supabase usually persists.
            // We'll try to explicitly sign out.
            const supabase = createClient()
            supabase.auth.signOut()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer))
            clearInterval(interval)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    return null // Hidden component
}
