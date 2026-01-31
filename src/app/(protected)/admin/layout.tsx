'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, Users, ShieldCheck, CreditCard, BarChart3, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading, signOut } = useAuth()
    const router = useRouter()

    const [checkingRole, setCheckingRole] = useState(true)

    useEffect(() => {
        const checkAdminRole = async () => {
            if (!isLoading) {
                if (!user) {
                    router.push('/?openLogin=true')
                } else {
                    // Check role from Database (public.users)
                    // The user_metadata might be stale, so we fetch the real role
                    try {
                        const { createClient } = await import('@/lib/supabase/client')
                        const supabase = createClient()

                        const { data: profile, error } = await supabase
                            .from('users')
                            .select('role')
                            .eq('user_id', user.id)
                            .single()

                        // Allow 'admin' role or the specific master email
                        const isAdmin = (profile?.role === 'admin') || user.email === 'admin@email.com'

                        if (!isAdmin) {
                            console.warn('Access Denied: Not an admin', profile)
                            // Optional: Show toast
                            // alert('Access Denied: You are not an administrator.')
                            router.push('/')
                        }
                    } catch (err) {
                        console.error('Error checking admin role:', err)
                        router.push('/')
                    } finally {
                        setCheckingRole(false)
                    }
                }
            }
        }

        checkAdminRole()
    }, [user, isLoading, router])

    if (isLoading || checkingRole) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        MyBisnis Admin
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
                        { href: '/admin/users', label: 'User Management', icon: Users },
                        { href: '/admin/verification', label: 'Verification', icon: ShieldCheck },
                        { href: '/admin/subscription', label: 'Subscription', icon: CreditCard },
                        { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => signOut()}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
