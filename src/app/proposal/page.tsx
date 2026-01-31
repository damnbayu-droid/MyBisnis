
'use client'

import { useState } from 'react'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, ChevronDown, ChevronUp, AlertCircle, TrendingUp, ShieldCheck, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import InvestmentModal from '@/components/modals/InvestmentModal'

// Since the proposal is specific, we might hardcode the text or create a specific data file. 
// For now, I'll inline the text as per the "copy paste" request, adapting to the language provided by context if possible, 
// but the source text is Indonesian. I will default to Indonesian for the proposal content itself as it seems to be a local "Lowongan Kerja Canggu" context.

export default function ProposalPage() {
    const { language } = useLanguage()
    // Mock user for header compliance
    const currentUser = null
    const handleLogout = () => { }

    const features = [
        { title: "Toko Online Instant", desc: "Buat toko dalam 5 menit, link custom, hanya Rp 5.000/bulan (Full Feature).", icon: Zap },
        { title: "Chat Langsung WhatsApp", desc: "Integrasi komunikasi langsung yang personal antara penjual dan pembeli.", icon: Zap },
        { title: "Sistem Zonasi Otomatis", desc: "Menampilkan produk terdekat secara cerdas untuk hemat ongkir.", icon: Zap },
        { title: "Driver Lokal Terintegrasi", desc: "Dukungan ojek/delivery lokal (Bentor, Pickup, dll).", icon: Zap },
        { title: "Multi Payment Gateway", desc: "QRIS, Transfer Bank, dan Cash untuk kemudahan transaksi.", icon: Zap },
        { title: "Analytics Dashboard", desc: "Monitoring penjualan dan traffic real-time untuk keputusan bisnis.", icon: TrendingUp },
        { title: "Custom Domain Service", desc: "Layanan website profesional mulai 250K.", icon: Zap },
        { title: "Verifikasi & Trust System", desc: "Keamanan bagi penjual, pembeli, dan driver.", icon: ShieldCheck },
        { title: "Mobile Responsive", desc: "Optimal di semua perangkat (HP, Tablet, Desktop).", icon: Zap },
    ]

    const problems = [
        {
            problem: "Biaya Platform Tinggi",
            desc: "Komisi 15-25% di platform lain membebani margin keuntungan UMKM.",
            solution: "Schema Harga atau patok harga berlangganan Hanya Rp 5.000/Bulan",
            solDesc: "Tanpa komisi transaksi (Bisa di atur), fitur lengkap termasuk link custom."
        },
        {
            problem: "Ongkir Mahal",
            desc: "Biaya pengiriman seringkali lebih mahal dari harga produk untuk jarak dekat.",
            solution: "Sistem Zonasi Cerdas, Aplikable Untuk Kota Kecil / Desa",
            solDesc: "Menghubungkan penjual terdekat, ongkir lebih murah 60-80%."
        }
    ]

    const faqs = [
        { q: "Apa yang membedakan MyBisnis dengan marketplace lain?", a: "MyBisnis fokus pada pemberdayaan UMKM lokal dengan sistem zonasi cerdas yang menghubungkan penjual-pembeli terdekat. Kami tidak mengambil komisi transaksi sama sekali, hanya subscription super terjangkau Rp 5.000/bulan untuk semua fitur lengkap. Plus, integrasi dengan driver lokal dan layanan order website profesional menjadikan MyBisnis solusi all-in-one untuk UMKM digital dengan biaya terendah di Indonesia." },
        { q: "Bagaimana model bisnis dan revenue MyBisnis?", a: "Revenue streams kami beragam: (1) Subscription terjangkau Rp 5.000/bulan dengan semua fitur lengkap termasuk link toko custom, (2) Order website service dengan paket 250K-15M, (3) Featured listing & advertising, (4) Komisi 5% dari transaksi driver delivery, (5) API & integration services untuk enterprise. Model subscription ultra-affordable kami memastikan barrier to entry sangat rendah dan adoption rate sangat tinggi." },
        { q: "Berapa besar potensi pasar UMKM di Indonesia?", a: "Indonesia memiliki 64+ juta pelaku UMKM (97% dari total unit usaha) yang berkontribusi $1.2 Triliun ke PDB dan menyerap 89% tenaga kerja. Namun hanya 20% yang sudah digital. Ini adalah pasar raksasa dengan penetrasi digital yang masih sangat rendah - peluang pertumbuhan luar biasa untuk platform yang fokus pada segmen ini." },
        { q: "Apa keunggulan sistem zonasi yang diterapkan?", a: "Sistem zonasi otomatis kami menampilkan produk dari penjual terdekat dengan pembeli, sehingga: (1) Ongkir lebih murah 60-80%, (2) Delivery lebih cepat, (3) Produk lebih fresh, (4) Mendukung ekonomi lokal. Berbeda dengan marketplace besar yang shipping antar kota, kami fokus pada transaksi hyperlocal yang lebih efisien dan sustainable." },
        { q: "Bagaimana strategi akuisisi user dan penjual?", a: "Strategi kami multi-channel: (1) Partnership dengan komunitas UMKM, koperasi, dan dinas UMKM daerah, (2) Social media marketing & influencer collaboration, (3) Referral & incentive program, (4) Free onboarding training untuk UMKM tradisional, (5) Digital marketing campaigns targeting area Tier 2 & 3 yang underserved oleh platform besar." },
        { q: "Bagaimana sistem verifikasi penjual dan driver?", a: "Kami menerapkan sistem verifikasi berlapis: Penjual harus verifikasi identitas (KTP), nomor WhatsApp aktif, dan alamat toko. Driver harus upload foto diri, kendaraan, plat nomor, dan STNK untuk verifikasi manual tim kami. Badge 'Verified' ditampilkan untuk user yang sudah terverifikasi, membangun trust dalam ekosistem." },
        { q: "Apa roadmap pengembangan 2 tahun ke depan?", a: "Year 1: (1) Launch mobile apps (Android & iOS), (2) Ekspansi ke 50+ kota, (3) Partnership dengan 100+ komunitas UMKM, (4) Onboard 50K users & 10K sellers. Year 2: (1) AI-powered recommendation system, (2) In-app payment gateway, (3) Ekspansi ke 200+ kota, (4) Target 150K+ active users, (5) Launch API untuk integration dengan POS systems & e-commerce platforms." },
        { q: "Siapa tim founder dan background-nya?", a: "MyBisnis adalah bagian dari ekosistem Bali Enterprises Group yang juga mengelola bali.enterprises dan visa.biz.id. Tim kami memiliki pengalaman dalam tech development, digital marketing, dan pemberdayaan UMKM. Kami sudah membangun platform kotabunan.shop sebagai proof of concept dan ready untuk scale dengan investasi yang tepat." },
        { q: "Apa saja risiko investasi dan mitigasinya?", a: "Risiko utama: (1) Kompetisi dari big players - mitigasi: fokus pada niche UMKM lokal & kota Tier 2-3, (2) Adopsi user yang lambat - mitigasi: freemium model & intensive onboarding program, (3) Operational challenges - mitigasi: partnership dengan driver lokal existing, (4) Regulatory changes - mitigasi: compliance team & legal advisory. Diversifikasi revenue streams juga meminimalkan single point of failure." },
        { q: "Apa exit strategy untuk investor?", a: "Kami merencanakan beberapa exit options: (1) Strategic acquisition oleh big tech/e-commerce players yang ingin ekspansi ke segmen UMKM lokal (target Year 3-4), (2) Series B funding dengan higher valuation untuk investor awal, (3) IPO di Bursa Efek Indonesia (long-term plan Year 5+). Dengan traction yang kuat dan market leadership di segmen hyperlocal UMKM, valuasi akan tumbuh signifikan." },
    ]

    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            <Header
                currentUser={currentUser}
                onLogout={handleLogout}
                onOpenLogin={() => { }}
                onOpenRegister={() => { }}
            />

            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 to-transparent"></div>
                <div className="relative max-w-5xl mx-auto text-center z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold mb-6">
                        Investasi Masa Depan UMKM
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-slate-200 to-amber-500 bg-clip-text text-transparent leading-tight">
                        Platform Marketplace UMKM Digital dan Transportasi di Indonesia
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        MyBisnis menghubungkan penjual, pembeli, dan driver delivery dalam satu ekosistem terintegrasi.
                        Solusi lengkap untuk transformasi digital UMKM Indonesia dengan potensi pasar 64+ juta pelaku bisnis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 text-lg px-8 py-6 rounded-full font-bold shadow-lg shadow-amber-500/20" onClick={() => setIsInvestModalOpen(true)}>
                            Lihat Systematic Investment Plan (SIP)
                        </Button>
                        <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-amber-400 text-lg px-8 py-6 rounded-full font-bold" onClick={() => setIsInvestModalOpen(true)}>
                            Kirim Tawaran Kerjasama
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-slate-700/50 pt-12">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">64M+</div>
                            <div className="text-sm text-slate-400">Potensi UMKM</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">$1.2T</div>
                            <div className="text-sm text-slate-400">Kontribusi PDB</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">97%</div>
                            <div className="text-sm text-slate-400">Total Unit Usaha</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">89%</div>
                            <div className="text-sm text-slate-400">Serapan Tenaga Kerja</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="py-20 px-6 bg-slate-950/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Masalah yang Kami Selesaikan</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">UMKM Indonesia menghadapi berbagai tantangan dalam transformasi digital. MyBisnis hadir sebagai solusi komprehensif.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {problems.map((item, idx) => (
                            <Card key={idx} className="bg-slate-800/50 border-slate-700 relative overflow-hidden group hover:border-amber-500/50 transition-all">
                                <CardContent className="p-8">
                                    <div className="mb-6 pb-6 border-b border-slate-700/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <AlertCircle className="text-red-400 w-6 h-6" />
                                            <h3 className="text-xl font-bold text-red-400">Masalah: {item.problem}</h3>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <Check className="text-green-400 w-6 h-6" />
                                            <h3 className="text-xl font-bold text-green-400">Solusi: {item.solution}</h3>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed">{item.solDesc}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Keunggulan Platform MyBisnis</h2>
                        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="bg-slate-800 border-slate-700 hover:bg-slate-700/50 transition-colors">
                                <CardHeader>
                                    <feature.icon className="w-10 h-10 text-amber-500 mb-3" />
                                    <CardTitle className="text-lg text-amber-400">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-400">{feature.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Competitive Comparison */}
            <section className="py-20 px-6 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold tracking-wider mb-4">
                            COMPETITIVE ANALYSIS
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">MyBisnis vs Kompetitor</h2>
                        <p className="text-slate-400">Mengapa MyBisnis berbeda dari platform marketplace dan delivery lainnya</p>
                    </div>

                    <div className="overflow-x-auto pb-4 mb-16">
                        <table className="w-full min-w-[1000px] border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-900 border-b border-slate-800">
                                    <th className="p-4 text-left text-sky-500 font-bold w-[250px]">Fitur</th>
                                    <th className="p-4 text-left text-sky-500 font-bold bg-slate-800/50">MyBisnis</th>
                                    <th className="p-4 text-left text-sky-500 font-bold">Gojek</th>
                                    <th className="p-4 text-left text-sky-500 font-bold">Grab</th>
                                    <th className="p-4 text-left text-sky-500 font-bold">Tokopedia</th>
                                    <th className="p-4 text-left text-sky-500 font-bold">Shopee</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {/* Row 1 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Gratis untuk Penjual</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Tanpa Komisi Transaksi</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-500" />
                                            <span className="text-red-400 font-bold">(15-25%)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-500" />
                                            <span className="text-red-400 font-bold">(15-25%)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-500" />
                                            <span className="text-red-400 font-bold">(2-5%)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-500" />
                                            <span className="text-red-400 font-bold">(2-5%)</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Sistem Zonasi Lokal</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                </tr>
                                {/* Row 4 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Link Toko Custom</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">(Premium)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">(Premium)</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 5 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Chat via WhatsApp</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                </tr>
                                {/* Row 6 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Driver Lokal</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">(Kota besar)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">(Kota besar)</span>
                                        </div>
                                    </td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                </tr>
                                {/* Row 7 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Order Website Service</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                </tr>
                                {/* Row 8 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Fokus UMKM Lokal</td>
                                    <td className="p-4 bg-slate-800/30"><Check className="w-5 h-5 text-emerald-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                </tr>
                                {/* Row 9 */}
                                <tr className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-300">Fitur Link Custom</td>
                                    <td className="p-4 bg-slate-800/30">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">Included</span>
                                        </div>
                                    </td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4"><X className="w-4 h-4 text-red-500" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">(Premium)</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                            <span className="text-emerald-500 font-bold">(Premium)</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Unique Value Proposition Card */}
                    <Card className="bg-slate-900 border border-sky-900/50 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                        <
                            CardContent className="p-12 text-center relative z-10">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-3">
                                <span>🎯</span> Unique Value Proposition
                            </h3>
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                                MyBisnis adalah <span className="text-sky-400 font-bold">satu-satunya platform</span> yang menggabungkan marketplace, delivery service, dan website development dalam satu ekosistem yang fokus pada pemberdayaan UMKM lokal dengan sistem zonasi cerdas dan biaya termurah di Indonesia - hanya <span className="text-emerald-400 font-bold">Rp 5.000/bulan "Bisa diatur"</span> tanpa komisi transaksi atau kita atur serendah mungkin!
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>


            {/* Ecosystem & Dashboard System */}
            <section className="py-24 px-6 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider mb-4">
                            🛠 SYSTEM ARCHITECTURE
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Ekosistem Dashboard Terintegrasi</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Sistem manajemen terpusat untuk Admin, Penjual, dan Driver dengan panel kontrol real-time.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Admin Dashboard */}
                        <Card className="bg-slate-950 border-slate-800 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-16 -mt-16"></div>
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Admin Control Panel</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Overview & Monitoring</h4>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Real-time User & Transaction Stats</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> System Health Check & API Status</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Revenue & Growth Charts (Monthly/Quarterly)</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">User Management</h4>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Verify/Block/Hold Users</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Subscription Limit Control</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Direct Admin Messaging</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Ecosystem */}
                        <Card className="bg-slate-950 border-slate-800 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -mr-16 -mt-16"></div>
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">User Dashboards</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Seller */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold text-amber-500 flex items-center gap-2">
                                            🛍 Demo Lapak (Seller)
                                        </h4>
                                        <Button size="sm" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900" onClick={() => window.open('/demo/lapak', '_blank')}>
                                            Demo Lapak
                                        </Button>
                                    </div>
                                    <ul className="text-slate-400 text-sm space-y-1 ml-6 list-disc marker:text-amber-500">
                                        <li>Upload & Manage Produk (Unlimited for Verified)</li>
                                        <li>Atur Toko & Link Custom</li>
                                        <li>Laporan Penjualan & Order Masuk</li>
                                    </ul>
                                </div>

                                {/* Store (New) */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold text-amber-500 flex items-center gap-2">
                                            🏪 Demo Store (Halaman Toko)
                                        </h4>
                                        <Button size="sm" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900" onClick={() => window.open('/demo/store', '_blank')}>
                                            Demo Store
                                        </Button>
                                    </div>
                                    <ul className="text-slate-400 text-sm space-y-1 ml-6 list-disc marker:text-amber-500">
                                        <li>Tampilan Toko Publik untuk Pembeli</li>
                                        <li>List Produk & Kategori</li>
                                        <li>Informasi Toko & Review</li>
                                    </ul>
                                </div>

                                {/* Driver */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold text-amber-500 flex items-center gap-2">
                                            🛵 Dashboard Driver (Ojek)
                                        </h4>
                                        <Button size="sm" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900" onClick={() => window.open('/demo/driver', '_blank')}>
                                            Demo Driver
                                        </Button>
                                    </div>
                                    <ul className="text-slate-400 text-sm space-y-1 ml-6 list-disc marker:text-amber-500">
                                        <li>Terima Order (Ride, Delivery, Pickup)</li>
                                        <li>Manajemen Kendaraan & Dokumen</li>
                                        <li>Pendapatan Harian & Withdraw</li>
                                    </ul>
                                </div>

                                {/* User Akun */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                                            👤 User Profile (Akun)
                                        </h4>
                                        <Button size="sm" variant="outline" className="border-slate-500 text-slate-400 hover:bg-slate-700 hover:text-white" onClick={() => window.open('/demo/akun', '_blank')}>
                                            Demo Akun
                                        </Button>
                                    </div>
                                    <p className="text-slate-400 text-sm">
                                        Akses penuh ke Marketplace & Booking. Wajib register untuk transaksi.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Investment & Roadmap */}
            <section className="py-24 px-6 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold tracking-wider mb-4">
                            💰 INVESTMENT OPPORTUNITY
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Rencana Investasi & Pengembangan</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Dana investasi akan digunakan untuk pengembangan teknologi, ekspansi pasar, dan peningkatan ekosistem
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Target Investasi Card */}
                        <Card className="bg-[#1f1b16] border-amber-900/50 shadow-2xl overflow-hidden relative hover:scale-[1.02] transition-all duration-300">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <CardHeader className="border-b border-amber-900/30 pb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">💼</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-amber-500">Target Investasi: Rp 250 Juta - 1 Miliar</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                {/* Mobile App */}
                                <div className="flex gap-4">
                                    <span className="text-2xl mt-1">📱</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-200 mb-2">Pengembangan Aplikasi Mobile (40%)</h4>
                                        <ul className="space-y-1 text-slate-400 text-sm">
                                            <li>- Android & iOS native apps</li>
                                            <li>- Real-time tracking system</li>
                                            <li>- Push notification & in-app messaging</li>
                                            <li>- Offline mode capabilities</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Infrastructure */}
                                <div className="flex gap-4">
                                    <span className="text-2xl mt-1">🖥</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-200 mb-2">Infrastruktur & Backend (25%)</h4>
                                        <ul className="space-y-1 text-slate-400 text-sm">
                                            <li>- Cloud server scaling (AWS/GCP)</li>
                                            <li>- Database optimization</li>
                                            <li>- API development & integration</li>
                                            <li>- Security & data protection</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Marketing */}
                                <div className="flex gap-4">
                                    <span className="text-2xl mt-1">📢</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-200 mb-2">Marketing & Akuisisi User (20%)</h4>
                                        <ul className="space-y-1 text-slate-400 text-sm">
                                            <li>- Digital marketing campaigns</li>
                                            <li>- Partnership dengan komunitas UMKM</li>
                                            <li>- Onboarding incentive program</li>
                                            <li>- Brand awareness & PR</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Team */}
                                <div className="flex gap-4">
                                    <span className="text-2xl mt-1">👥</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-200 mb-2">Tim & Operasional (10%)</h4>
                                        <ul className="space-y-1 text-slate-400 text-sm">
                                            <li>- Hiring developer & product team</li>
                                            <li>- Customer support 24/7</li>
                                            <li>- Office & operational costs</li>
                                            <li>- Training & development</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Legal */}
                                <div className="flex gap-4">
                                    <span className="text-2xl mt-1">⚖️</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-200 mb-2">Legal & Compliance (5%)</h4>
                                        <ul className="space-y-1 text-slate-400 text-sm">
                                            <li>- Business licensing</li>
                                            <li>- Payment gateway integration</li>
                                            <li>- Data privacy compliance</li>
                                            <li>- Insurance & legal protection</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Charts Column */}
                        <div className="space-y-8">
                            {/* Alokasi Dana Chart */}
                            <Card className="bg-slate-950 border-slate-800 p-6 hover:scale-[1.02] transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span>📊</span> Alokasi Dana Investasi
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Mobile App', val: '40%', w: '40%' },
                                        { label: 'Infrastructure', val: '25%', w: '25%' },
                                        { label: 'Marketing', val: '20%', w: '20%' },
                                        { label: 'Team', val: '10%', w: '10%' },
                                        { label: 'Legal', val: '5%', w: '5%' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-32 text-sm font-medium text-slate-400">{item.label}</div>
                                            <div className="flex-1 h-8 bg-slate-800 rounded-lg overflow-hidden relative">
                                                <div className="h-full bg-sky-500 flex items-center justify-end px-3 transition-all duration-1000" style={{ width: item.w }}>
                                                    <span className="text-white font-bold text-xs">{item.val}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Growth Chart */}
                            <Card className="bg-slate-950 border-slate-800 p-6 hover:scale-[1.02] transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span>📈</span> Proyeksi Pertumbuhan User (2 Tahun)
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Q1 2026', val: '1K', w: '8%' },
                                        { label: 'Q2 2026', val: '5K', w: '15%' },
                                        { label: 'Q3 2026', val: '15K', w: '25%' },
                                        { label: 'Q4 2026', val: '35K', w: '40%' },
                                        { label: 'Q1-Q2 2027', val: '75K', w: '65%' },
                                        { label: 'Q3-Q4 2027', val: '150K', w: '100%' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-24 text-sm font-medium text-slate-400">{item.label}</div>
                                            <div className="flex-1 h-8 bg-slate-800 rounded-lg overflow-hidden relative">
                                                <div className="h-full bg-emerald-500 flex items-center justify-end px-3 transition-all duration-1000" style={{ width: item.w }}>
                                                    <span className="text-white font-bold text-xs">{item.val}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* 3 Bottom Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Revenue Streams */}
                        <Card className="bg-[#0b2b2b] border-emerald-900/50 hover:border-emerald-500/30 hover:scale-[1.02] transition-all duration-300">
                            <CardHeader className="pb-4">
                                <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                                    <span>💰</span> Revenue Streams
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-3 text-slate-300">
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                    <span>Subscription bulanan (Rp 5.000/bulan)</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                    <span>Order website service (250K - 15M)</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                    <span>Featured listing & ads</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                    <span>Commission dari driver delivery (5%)</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                    <span>API & integration services</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Target Market */}
                        <Card className="bg-[#2b1b12] border-amber-900/50 hover:border-amber-500/30 hover:scale-[1.02] transition-all duration-300">
                            <CardHeader className="pb-4">
                                <h3 className="text-xl font-bold text-amber-500 flex items-center gap-2">
                                    <span>🎯</span> Target Market
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-3 text-slate-300">
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                                    <span>64M+ pelaku UMKM Indonesia</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                                    <span>Kota Tier 2 & 3 (underserved)</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                                    <span>UMKM tradisional → digital</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                                    <span>Driver ojol & delivery lokal</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                                    <span>Pembeli yang prefer produk lokal</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* ROI Projection */}
                        <Card className="bg-[#0f1d33] border-cyan-900/50 hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-300">
                            <CardHeader className="pb-4">
                                <h3 className="text-xl font-bold text-slate-400 flex items-center gap-2">
                                    <span>📊</span> ROI Projection
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-3 text-slate-300">
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                                    <span>Break-even: 18-24 bulan</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                                    <span>Expected ROI: 300-500%</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                                    <span>Revenue Year 1: Rp 2-3 Miliar</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                                    <span>Revenue Year 2: Rp 10-15 Miliar</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                                    <span>Exit strategy: Acquisition/IPO</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 bg-slate-950">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <Card key={idx} className="bg-slate-800/50 border-slate-700 cursor-pointer hover:bg-slate-800 transition-all hover:scale-[1.01]" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-slate-200 text-lg">{faq.q}</h3>
                                        {openFaq === idx ? <ChevronUp className="w-5 h-5 text-amber-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                    </div>
                                    {openFaq === idx && (
                                        <div className="mt-4 pt-4 border-t border-slate-700 text-slate-400 animate-in slide-in-from-top-2 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Bottom */}
            <section className="py-24 px-6 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 border-t border-slate-800 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Siap Mentransformasi UMKM Indonesia?</h2>
                    <p className="text-lg text-slate-400 mb-10">Bergabunglah dengan visi kami untuk menciptakan ekosistem digital yang adil dan terjangkau bagi semua.</p>
                    <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 text-xl px-10 py-6 rounded-full font-bold shadow-xl shadow-amber-500/20" onClick={() => setIsInvestModalOpen(true)}>
                        Kirim Investment Inquiry
                    </Button>
                    <div className="mt-8 text-slate-500 text-sm">
                        Contact: ceo@indonesianvisas.agency | +61 423 854 701
                    </div>
                </div>
            </section>

            <InvestmentModal isOpen={isInvestModalOpen} onClose={() => setIsInvestModalOpen(false)} />
            <Footer language={language} />
        </div>
    )
}
