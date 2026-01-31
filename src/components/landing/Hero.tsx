
'use client'

import { Button } from '@/components/ui/button'
import { Truck } from 'lucide-react'
import { translations } from '@/constants/landing-data'

interface HeroProps {
    language: 'id' | 'en'
    onOpenGuide: () => void
    onOpenCourierMap: () => void
}

export default function Hero({ language, onOpenGuide, onOpenCourierMap }: HeroProps) {
    const t = translations[language]

    return (
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 to-transparent"></div>
            <div className="relative max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
                    Platform Marketplace Digital dan Transportasi Indonesia
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {t.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105" onClick={onOpenGuide} aria-label="Panduan memulai bisnis">
                        {t.mulaiSekarang}
                    </Button>
                    <Button size="lg" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105" onClick={onOpenCourierMap} aria-label="Pesan layanan pengiriman">
                        <Truck className="w-5 h-5 mr-2" />
                        {t.orderOjek}
                    </Button>
                </div>
            </div>
        </section>
    )
}
