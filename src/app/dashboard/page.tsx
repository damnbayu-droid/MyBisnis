'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        // BELUM LOGIN → TETAP DI DASHBOARD, JANGAN REDIRECT
        setLoading(false)
      } else {
        setUser(data.session.user)
        setLoading(false)
      }
    })
  }, [])

  const loginTest = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@mybisnis.dev',
      password: '12345678'
    })

    if (error) {
      alert(error.message)
    } else {
      location.reload()
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  if (loading) return <p className="p-6">Loading dashboard...</p>

return (
  <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-amber-400">
        Dashboard
      </h1>

      {user && (
        <Button
          variant="outline"
          className="border-red-500 text-red-400"
          onClick={async () => {
            await supabase.auth.signOut()
            location.reload()
          }}
        >
          Logout
        </Button>
      )}
    </div>

    {!user ? (
      <p className="text-slate-400">
        Silakan login
      </p>
    ) : (
      <p className="text-slate-300">
        Login sebagai: {user.email}
      </p>
    )}
  </div>
)
}
