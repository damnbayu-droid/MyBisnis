'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Store, ShoppingBag, TrendingUp } from 'lucide-react'
import Image from 'next/image'

interface StartBusinessCTAProps {
    language: 'id' | 'en'
    onOpenRegister: () => void
    onOpenGuide: () => void
}

export default function StartBusinessCTA({ language, onOpenRegister, onOpenGuide }: StartBusinessCTAProps) {
    const isId = language === 'id'

    const steps = [
        {
            icon: Store,
            title: isId ? "Daftar Gratis" : "Register Free",
            desc: isId ? "Buat akun dalam 1 menit" : "Create account in 1 min",
            color: "text-blue-400"
        },
        {
            icon: ShoppingBag,
            title: isId ? "Upload Produk" : "Upload Products",
            desc: isId ? "Foto & deskripsi jualanmu" : "Photo & description",
            color: "text-purple-400"
        },
        {
            icon: TrendingUp,
            title: isId ? "Mulai Cuan" : "Start Earning",
            desc: isId ? "Jangkau ribuan pembeli" : "Reach thousands buyers",
            color: "text-green-400"
        }
    ]

    return (
        <section className="relative py-24 px-4 overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/images/cta-bg.png"
                    alt="Digital Growth Background"
                    fill
                    className="object-cover object-center"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-bold animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        {isId ? "Revolusi Bisnis Digital" : "Digital Business Revolution"}
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
                        {isId ? "Mulai Bisnis Digitalmu, Sekarang." : "Start Your Digital Business, Now."}
                    </h2>

                    <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                        {isId
                            ? "Bergabung dengan ribuan UMKM yang telah Go Digital bersama MyBisnis. Solusi lengkap dari marketplace hingga pengiriman."
                            : "Join thousands of MSMEs who have gone Digital with MyBisnis. Complete solution from marketplace to delivery."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 text-lg px-8 py-6 rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-all duration-300 font-bold group"
                            onClick={onOpenGuide}
                        >
                            {isId ? "Mulai Sekarang Gratis" : "Start Now for Free"}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 py-6 rounded-2xl backdrop-blur-sm"
                            onClick={onOpenGuide}
                        >
                            {isId ? "Pelajari Dulu" : "Learn More"}
                        </Button>
                    </div>
                </div>

                {/* Right Content - Visual Steps for Guidance */}
                <div className="relative">
                    {/* Glowing Backdrop */}
                    <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full transform rotate-12"></div>

                    <div className="relative grid gap-6">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/80 transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform duration-300 shadow-inner ${step.color}`}>
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{step.title}</h3>
                                        <p className="text-slate-400">{step.desc}</p>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                        <ArrowRight className="w-6 h-6 text-slate-500" />
                                    </div>
                                </div>
                                {/* Connector Line (except for last item) */}
                                {idx !== steps.length - 1 && (
                                    <div className="absolute left-[3.25rem] -bottom-8 w-0.5 h-8 bg-gradient-to-b from-slate-700 to-transparent z-0"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section >
    )
}
