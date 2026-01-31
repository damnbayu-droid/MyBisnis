'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, KeyRound } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Password berhasil diperbarui! Silakan login.')
            router.push('/?openLogin=true')
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                    <p className="text-slate-400 text-sm">Masukan password baru untuk akun Anda.</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-200">Password Baru</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Minimal 6 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <KeyRound className="w-4 h-4 mr-2" />}
                        Update Password
                    </Button>
                </form>
            </div>
        </div>
    )
}
