
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Eye, EyeOff } from 'lucide-react'
import { translations } from '@/constants/landing-data'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface RegisterModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSwitchToLogin: () => void
    onRegisterSuccess: (user: any) => void
    language: 'id' | 'en'
}

export default function RegisterModal({ isOpen, onOpenChange, onSwitchToLogin, onRegisterSuccess, language, onRequestLocation }: RegisterModalProps & { onRequestLocation: () => void }) {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [agreedToPolicy, setAgreedToPolicy] = useState(false)
    const t = translations[language]

    const getPasswordStrength = (pass: string) => {
        if (!pass) return 0
        let strength = 0
        if (pass.length >= 6) strength += 1
        if (pass.length >= 8) strength += 1
        if (/[A-Z]/.test(pass)) strength += 1
        if (/[0-9]/.test(pass)) strength += 1
        return strength
    }

    const strength = getPasswordStrength(password)
    const strengthColor = strength <= 1 ? 'bg-red-500' : strength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
    const strengthWidth = strength === 0 ? 'w-0' : strength <= 1 ? 'w-1/3' : strength <= 3 ? 'w-2/3' : 'w-full'

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        onRequestLocation()

        try {
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            const name = formData.get('name') as string
            const whatsapp = formData.get('whatsapp') as string
            const role = 'pembeli' // Default role
            const lokasi = formData.get('lokasi') as string

            const supabase = createClient()
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        whatsapp,
                        role, // will be 'pembeli'
                        lokasi,
                        storeName: formData.get('storeName'),
                        jenisToko: formData.get('jenisToko'),
                        deskripsiToko: formData.get('deskripsiToko'),
                    }
                }
            })

            if (error) {
                toast.error(error.message)
            } else if (data.user) {
                // Call API to complete profile (generate slug & score)
                try {
                    await fetch('/api/auth/complete-profile', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: data.user.id,
                            name: name,
                            role: role
                        })
                    })
                } catch (err) {
                    console.error('Failed to complete profile', err)
                }

                toast.success('Registrasi berhasil! Mengalihkan ke Marketplace...')
                onRegisterSuccess(data.user)
                // Redirect to Marketplace
                window.location.href = '/marketplace'
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat registrasi')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-amber-400">{t.daftar}</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Buat akun baru untuk memulai bisnis Anda
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input id="name" name="name" className="bg-slate-700 border-slate-600 text-slate-100" required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" className="bg-slate-700 border-slate-600 text-slate-100" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input id="whatsapp" name="whatsapp" className="bg-slate-700 border-slate-600 text-slate-100" required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="lokasi">Lokasi</Label>
                        <Input id="lokasi" name="lokasi" className="bg-slate-700 border-slate-600 text-slate-100" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="bg-slate-700 border-slate-600 text-slate-100 pr-10"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <button
                                    type="button"
                                    className="text-slate-400 hover:text-amber-400 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        {/* Password Strength Bar */}
                        {password && (
                            <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${strengthColor} ${strengthWidth} transition-all duration-300`} />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <div className="flex items-center h-5">
                            <input
                                id="privacy-policy"
                                name="privacy-policy"
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
                                required
                                checked={agreedToPolicy}
                                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                            />
                        </div>
                        <Label htmlFor="privacy-policy" className="text-sm text-slate-400">
                            Saya setuju dengan <a href="/privacy" className="text-amber-400 hover:underline">Kebijakan Privasi</a> dan <a href="/terms" className="text-amber-400 hover:underline">Syarat & Ketentuan</a>
                        </Label>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading || !agreedToPolicy}>
                        {isLoading ? 'Loading...' : t.daftar}
                    </Button>
                    <div className="text-center text-sm text-slate-400 mt-4">
                        Sudah punya akun?{' '}
                        <button
                            type="button"
                            className="text-amber-400 hover:text-amber-300 underline"
                            onClick={onSwitchToLogin}
                        >
                            Login di sini
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}
