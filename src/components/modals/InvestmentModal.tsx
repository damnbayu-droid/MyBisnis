'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, Loader2, Send, ChartBar, TrendingUp, ShieldCheck, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface InvestmentModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function InvestmentModal({ isOpen, onClose }: InvestmentModalProps) {
    const { language } = useLanguage()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [viewMode, setViewMode] = useState<'info' | 'form'>('info')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch("https://formspree.io/f/mwvblkaw", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                setIsSuccess(true)
                setTimeout(() => {
                    setIsSuccess(false)
                    onClose()
                    setViewMode('info')
                }, 3000)
            } else {
                alert("Terjadi kesalahan saat mengirim formulir.")
            }
        } catch (error) {
            alert("Terjadi kesalahan koneksi.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-700 text-slate-200 max-w-4xl overflow-y-auto max-h-[90vh]">

                {viewMode === 'info' ? (
                    // VIEW MODE: Systematic Investment Plan Info
                    <div className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
                                📈 MyBisnis Systematic Investment Plan
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 text-lg">
                                Strategi investasi berkelanjutan untuk transformasi ekonomi digital ASEAN & Indonesia.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Minimum Invest Banner */}
                        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/50 rounded-xl p-6 text-center">
                            <h3 className="text-amber-500 font-bold uppercase tracking-wider text-sm mb-2">Minimum Seed Investment</h3>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                IDR 250 {language === 'id' ? 'Juta' : 'Million'}
                            </div>
                            <p className="text-slate-300 text-sm">Untuk memulai operasional skala kota (City Launch)</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Features */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Why Invest in MyBisnis?</h3>

                                <div className="flex gap-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg h-fit text-emerald-500"><TrendingUp /></div>
                                    <div>
                                        <h4 className="font-bold text-white">High Growth Potential</h4>
                                        <p className="text-slate-400 text-sm">Menargetkan pasar UMKM & Tier 2-3 Cities yang belum terjamah pemain besar.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg h-fit text-blue-500"><MapPin /></div>
                                    <div>
                                        <h4 className="font-bold text-white">Hyper-Local & ASEAN Ready</h4>
                                        <p className="text-slate-400 text-sm">Sistem zonasi unik yang cocok dengan geografis kepulauan Indonesia dan negara ASEAN.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="p-2 bg-purple-500/10 rounded-lg h-fit text-purple-500"><ShieldCheck /></div>
                                    <div>
                                        <h4 className="font-bold text-white">Sustainable Model</h4>
                                        <p className="text-slate-400 text-sm">Revenue stream beragam: Subscription, Ads, & Services (bukan bakar uang).</p>
                                    </div>
                                </div>
                            </div>

                            {/* Diagram Placeholder */}
                            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center">
                                <ChartBar className="w-16 h-16 text-slate-600 mb-4" />
                                <h4 className="text-slate-300 font-bold mb-2">Projected Growth</h4>
                                <p className="text-slate-500 text-sm">Dengan seed funding IDR 250 Juta, kami memproyeksikan operasional mandiri (cashflow positive) dalam 12-18 bulan.</p>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
                                Tutup
                            </Button>
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8" onClick={() => setViewMode('form')}>
                                Kirim Tawaran Kerjasama
                            </Button>
                        </div>
                    </div>
                ) : (
                    // FORM MODE
                    <div className="animate-in slide-in-from-right-5 duration-300">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-white">
                                Kirim Tawaran Kerjasama
                            </DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Isi detail di bawah untuk diskusi investasi awal.
                            </DialogDescription>
                        </DialogHeader>

                        {isSuccess ? (
                            <div className="py-12 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Tawaran Terkirim!</h3>
                                <p className="text-slate-400 max-w-xs">
                                    Terima kasih atas ketertarikan Anda. Tim founder kami akan segera menghubungi.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input id="name" name="name" placeholder="Nama Investor / VC" required className="bg-slate-950 border-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">WhatsApp / Kontak</Label>
                                        <Input id="phone" name="phone" placeholder="+62..." required className="bg-slate-950 border-slate-700" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required className="bg-slate-950 border-slate-700" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount">Rencana Investasi (IDR)</Label>
                                    <Select name="amount" required defaultValue="250 Juta - 500 Juta">
                                        <SelectTrigger className="bg-slate-950 border-slate-700">
                                            <SelectValue placeholder="Pilih Range" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                                            <SelectItem value="250 Juta - 500 Juta">IDR 250 - 500 Juta</SelectItem>
                                            <SelectItem value="500 Juta - 1 Miliar">IDR 500 Juta - 1 Miliar</SelectItem>
                                            <SelectItem value="> 1 Miliar">IDR &gt; 1 Miliar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Pesan / Catatan</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Pertanyaan atau jadwal meeting..."
                                        className="bg-slate-950 border-slate-700 min-h-[100px]"
                                    />
                                </div>

                                <DialogFooter className="pt-4 flex justify-between sm:justify-between w-full">
                                    <Button type="button" variant="ghost" onClick={() => setViewMode('info')} className="text-slate-400 hover:text-white">
                                        &larr; Kembali ke Info
                                    </Button>
                                    <Button type="submit" disabled={isLoading} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold min-w-[150px]">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                Kirim Tawaran <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
