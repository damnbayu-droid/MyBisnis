
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Eye, EyeOff } from 'lucide-react'
import { translations } from '@/constants/landing-data'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface LoginModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSwitchToRegister: () => void
    onLoginSuccess: (user: any) => void
    language: 'id' | 'en'
}

export default function LoginModal({ isOpen, onOpenChange, onSwitchToRegister, onLoginSuccess, language, onRequestLocation }: LoginModalProps & { onRequestLocation: () => void }) {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
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

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        onRequestLocation() // Keep existing location request

        try {
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                toast.error(error.message)
            } else if (data.user) {
                toast.success('Login berhasil!')
                onLoginSuccess(data.user)
                onOpenChange(false)

                // Redirect based on role
                const role = data.user.user_metadata?.role
                if (role === 'admin') {
                    window.location.href = '/admin'
                } else {
                    window.location.href = '/marketplace'
                }
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-amber-400">{t.login}</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Masuk ke akun MyBisnis Anda
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className="bg-slate-700 border-slate-600 text-slate-100"
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-slate-300">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="bg-slate-700 border-slate-600 text-slate-100 pr-10"
                                placeholder="••••••"
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
                        <div className="flex justify-end mt-1">
                            <a href="/forgot-password" className="text-xs text-amber-500 hover:text-amber-400 hover:underline">
                                {language === 'id' ? 'Lupa Password?' : 'Forgot Password?'}
                            </a>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full" disabled={isLoading}>
                        {isLoading ? 'Loading...' : t.login}
                    </Button>
                    <div className="text-center text-sm text-slate-400 mt-4">
                        Belum punya akun?{' '}
                        <button
                            type="button"
                            className="text-amber-400 hover:text-amber-300 underline"
                            onClick={onSwitchToRegister}
                        >
                            Daftar di sini
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
