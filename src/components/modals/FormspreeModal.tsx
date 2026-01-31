'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface FormspreeModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function FormspreeModal({ isOpen, onOpenChange }: FormspreeModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch("https://formspree.io/f/mwvblkaw", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                toast.success("Permintaan Anda telah terkirim! Tim kami akan segera menghubungi Anda.")
                onOpenChange(false)
                // Optional: Redirect or Reset
            } else {
                toast.error("Gagal mengirim pesan. Silakan coba lagi.")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan koneksi.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-amber-500">Mulai Bisnis Anda</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Isi form di bawah ini dan konsultan bisnis kami akan segera menghubungi Anda untuk panduan langkah demi langkah.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" name="name" className="bg-slate-800 border-slate-700 text-slate-100" required placeholder="Cth: Budi Santoso" />
                    </div>

                    <div>
                        <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                        <Input id="whatsapp" name="whatsapp" className="bg-slate-800 border-slate-700 text-slate-100" required placeholder="Cth: 08123456789" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" className="bg-slate-800 border-slate-700 text-slate-100" required placeholder="nama@email.com" />
                    </div>

                    <div>
                        <Label htmlFor="message">Jenis Bisnis / Pesan</Label>
                        <Textarea id="message" name="message" className="bg-slate-800 border-slate-700 text-slate-100 min-h-[100px]" placeholder="Ceritakan sedikit tentang rencana bisnis Anda..." />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Mengirim...' : 'Kirim Permintaan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
