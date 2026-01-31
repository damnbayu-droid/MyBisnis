'use client'

import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Globe2, Heart, Home, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function InfoPage() {
    const [currentUser, setCurrentUser] = useState(null)
    const [language, setLanguage] = useState<'id' | 'en'>('id') // Default ID for now, or use context

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser')
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser))
        }
    }, [])

    // Simple mock logout for Header compatibility
    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
        window.location.href = '/'
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            <Header
                currentUser={currentUser}
                onLogout={handleLogout}
                onOpenLogin={() => window.location.href = '/?login=true'} // Redirect to home with login param
                onOpenRegister={() => window.location.href = '/?register=true'}
            />

            <main>
                {/* HERO SECTION */}
                <section className="relative py-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/info-hero.png"
                            alt="Local Economy Digital Growth"
                            fill
                            className="object-cover object-center opacity-40 blur-sm scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold mb-4 animate-fade-in-up">
                            <Heart className="w-4 h-4 mr-2" />
                            Karya Anak Bangsa, Untuk Lokal
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent leading-tight">
                            Membangun Ekonomi Lokal,<br />Menembus Pasar Global
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            MyBisnis hadir bukan sekadar aplikasi, tapi sebagai jembatan bagi UMKM, petani, nelayan, dan industri rumahan untuk naik kelas.
                        </p>
                    </div>
                </section>

                {/* MISSION SECTION */}
                <section className="py-16 px-4 bg-slate-900">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">Dari Desa untuk Dunia</h2>
                            <div className="space-y-4 text-slate-300">
                                <p>
                                    Banyak pengusaha kecil, petani, atau ibu rumah tangga yang memiliki produk luar biasa namun terkendala akses pasar. Mereka terjebak dalam persaingan harga yang tidak sehat dan jangkauan yang terbatas.
                                </p>
                                <p>
                                    <strong className="text-amber-400">MyBisnis mematahkan batasan itu.</strong>
                                </p>
                                <p>
                                    Kami percaya teknologi tidak harus rumit. Kami desain platform ini agar cocok dengan kearifan lokal (Urban Living, Mini Town, hingga Desa), memudahkan siapa saja untuk memulai bisnis digital tanpa modal besar.
                                </p>
                            </div>
                            <Button className="bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-full group">
                                Gabung Gerakan Ini <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-amber-500/10">
                            <Image
                                src="/images/info-hero.png"
                                alt="Empowering Locals"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* FEATURES / ROLES */}
                <section className="py-20 px-4 bg-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Peran Anda dalam Ekosistem</h2>
                            <p className="text-slate-400">Setiap orang punya peran penting untuk memajukan ekonomi daerah.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Card 1: Seller */}
                            <Card className="bg-slate-800 border-slate-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 duration-300">
                                <CardContent className="p-8 space-y-4">
                                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-4">
                                        <Home className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Penjual (Seller)</h3>
                                    <p className="text-slate-400">
                                        Pasarkan produk handmade, hasil panen, atau kuliner Anda ke ribuan pengguna. Kelola toko semudah update status, dengan fitur manajemen stok dan laporan keuangan otomatis.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Card 2: Driver */}
                            <Card className="bg-slate-800 border-slate-700 hover:border-green-500/50 transition-all hover:-translate-y-1 duration-300">
                                <CardContent className="p-8 space-y-4">
                                    <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-4">
                                        <TrendingUp className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Pengemudi (Driver)</h3>
                                    <p className="text-slate-400">
                                        Jadilah urat nadi logistik daerah. Dapatkan penghasilan harian dengan mengantar penumpang atau paket. Sistem yang adil dan transparan untuk kesejahteraan mitra.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Card 3: Community */}
                            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all hover:-translate-y-1 duration-300">
                                <CardContent className="p-8 space-y-4">
                                    <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-4">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Masyarakat</h3>
                                    <p className="text-slate-400">
                                        Nikmati kemudahan layanan ojek, belanja kebutuhan harian, dan dukung usaha tetangga Anda. Putaran ekonomi yang kuat dimulai dari belanja di warung sebelah.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CLOSING / IMPACT */}
                <section className="py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Globe2 className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Satu Aplikasi, Sejuta Dampak
                        </h2>
                        <p className="text-xl text-slate-300">
                            Kami tidak didanai oleh korporasi raksasa. Mimpi kami sederhana: Aplikasi ini hidup dari, oleh, dan untuk masyarakat lokal. Saat Anda menggunakan MyBisnis, Anda sedang memberi makan keluarga petani, menyekolahkan anak nelayan, dan membesarkan harapan tetangga.
                        </p>
                        <div className="pt-8">
                            <Button size="lg" className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:scale-105 transition-transform rounded-full px-10 py-6 text-lg font-bold shadow-xl shadow-amber-500/20" onClick={() => window.location.href = '/'}>
                                Mulai Sekarang
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer language={language as 'id' | 'en'} />
        </div>
    )
}
