'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            toast.error(error.message)
        } else {
            setIsSent(true)
            toast.success('Link reset password telah dikirim ke email Anda.')
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">Lupa Password?</h1>
                    <p className="text-slate-400 text-sm">Masukan email Anda untuk menerima link reset password.</p>
                </div>

                {!isSent ? (
                    <form onSubmit={handleReset} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                            Kirim Link Reset
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-4 py-4">
                        <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <p className="text-slate-300">
                            Email telah dikirim ke <span className="text-white font-bold">{email}</span>.
                            <br />Silakan cek inbox atau folder spam Anda.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full border-slate-700 text-slate-300"
                            onClick={() => setIsSent(false)}
                        >
                            Kirim Ulang
                        </Button>
                    </div>
                )}

                <div className="text-center">
                    <Link href="/?openLogin=true" className="text-sm text-slate-500 hover:text-white flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
