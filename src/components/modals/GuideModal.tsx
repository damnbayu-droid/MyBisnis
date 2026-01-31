
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

interface GuideModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onOpenRegister: () => void
}

export default function GuideModal({ isOpen, onOpenChange, onOpenRegister }: GuideModalProps) {
    const [step, setStep] = useState(0)

    const guides = [
        {
            image: '/images/guide-1.png',
            title: "Daftar Akun Digital",
            desc: "Registrasi mudah hanya dengan email dan WhatsApp. Akun Anda langsung terverifikasi dan siap digunakan.",
            features: ["Gratis biaya pendaftaran", "Verifikasi instan", "Akses ke semua fitur"]
        },
        {
            image: '/images/guide-2.png',
            title: "Upload & Kelola Produk",
            desc: "Foto produk Anda, tambahkan deskripsi, dan atur harga. Toko online Anda siap dalam hitungan menit.",
            features: ["Upload foto unlimited", "Kategori produk lengkap", "Manajemen stok mudah"]
        },
        {
            image: '/images/guide-3.png',
            title: "Mulai Hasilkan Cuan",
            desc: "Jangkau ribuan pelanggan di sekitar Anda. Terima pesanan dan perluas bisnis Anda secara eksponensial.",
            features: ["Analisis penjualan real-time", "Opsi pengiriman terintegrasi", "Sistem pembayaran aman"]
        }
    ]

    const handleNext = () => {
        if (step < guides.length - 1) {
            setStep(step + 1)
        } else {
            onOpenChange(false)
            onOpenRegister()
        }
    }

    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl p-0 overflow-hidden bg-slate-950 border-slate-800 text-slate-100 h-[85vh] md:h-[80vh] flex flex-col md:flex-row gap-0">
                {/* Left: Image Section */}
                <div className="relative w-full md:w-1/2 h-60 md:h-full bg-slate-900 overflow-hidden shrink-0">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-50 z-0"></div>

                    <div className="relative h-full w-full p-6 md:p-8 flex items-center justify-center z-10">
                        <div className="relative w-full h-full max-h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                            <Image
                                src={guides[step].image}
                                alt={guides[step].title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Stepper Dots (Mobile Overlay) */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 md:hidden z-20">
                        {guides.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-amber-500' : 'w-1.5 bg-slate-600'}`} />
                        ))}
                    </div>
                </div>

                {/* Right: Content Section */}
                <div className="w-full md:w-1/2 flex flex-col h-full relative bg-slate-950">

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-5 md:p-10 custom-scrollbar">
                        <DialogHeader className="mb-4 md:mb-6 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-500 w-fit text-xs md:text-sm font-bold mb-3 border border-slate-700">
                                Langkah {step + 1} dari {guides.length}
                            </div>
                            <DialogTitle className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight">
                                {guides[step].title}
                            </DialogTitle>
                            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                                {guides[step].desc}
                            </p>
                        </DialogHeader>

                        {/* Features List */}
                        <ul className="space-y-3 md:space-y-4 mb-2">
                            {guides[step].features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 animate-fade-in text-sm md:text-base" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <span className="flex-1">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer: Fixed Buttons */}
                    <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-950 shrink-0 flex items-center justify-between gap-3 md:gap-4 z-10 relative">
                        <Button
                            variant="ghost"
                            onClick={handlePrev}
                            disabled={step === 0}
                            className="text-slate-400 hover:text-white text-sm md:text-base"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                        </Button>

                        <div className="hidden md:flex gap-2">
                            {guides.map((_, i) => (
                                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700'}`} />
                            ))}
                        </div>

                        <Button
                            onClick={handleNext}
                            className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold px-6 md:px-8 text-sm md:text-base"
                        >
                            {step === guides.length - 1 ? "Daftar Sekarang" : "Lanjut"}
                            {step !== guides.length - 1 && <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
