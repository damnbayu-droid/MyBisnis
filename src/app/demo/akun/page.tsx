'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
    CreditCard,
    Plus,
    ArrowRightLeft,
    Truck,
    RotateCcw,
    XCircle,
    ChevronRight,
    HelpCircle,
    ShoppingBag,
    Clock,
    MapPin,
    Star,
    Home,
    QrCode
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'

// Mock User Data for Demo
const MOCK_USER = {
    name: "Bayu Demo User",
    email: "bayu@demo.com",
    role: "User",
    photoUrl: "https://github.com/shadcn.png",
    balance: "Rp 250.000"
}

// Mock Order Data
const ORDERS = {
    unpaid: [
        { id: 'INV-001', item: 'Kopi Arabika Gayo 250g', price: 'Rp 85.000', store: 'Kopi Nusantara', date: '30 Jan 2026' }
    ],
    shipped: [
        { id: 'INV-009', item: 'Helm Retro Bogo', price: 'Rp 150.000', store: 'Garage Moto', status: 'Sedang dikirim', date: '28 Jan 2026' },
        { id: 'INV-008', item: 'Mouse Wireless Logitech', price: 'Rp 200.000', store: 'Tech Comp', status: 'Sampai di gudang DC', date: '29 Jan 2026' }
    ],
    returned: [],
    cancelled: [
        { id: 'INV-005', item: 'Kaos Polos Hitam XL', price: 'Rp 45.000', store: 'Distro Bandung', reason: 'Stok habis', date: '20 Jan 2026' }
    ]
}

// Mock Products
const POPULAR_PRODUCTS = [
    { id: 1, name: "Kopi Susu Literan", price: "Rp 85.000", store: "Kopi Kenangan Mantan", rating: 4.8, sold: 120, image: "☕" },
    { id: 2, name: "Kripik Singkong Pedas", price: "Rp 15.000", store: "Snack Hitz", rating: 4.7, sold: 500, image: "🍟" },
    { id: 3, name: "Sambal Matah Bali", price: "Rp 35.000", store: "Oleh-Oleh Bali", rating: 4.9, sold: 230, image: "🌶️" },
    { id: 4, name: "Kaos Barong Bali", price: "Rp 50.000", store: "Bali Tees", rating: 4.6, sold: 89, image: "👕" },
]

export default function DemoAkunPage() {
    const [showQR, setShowQR] = React.useState(false)
    const profileLink = "https://mybisnis.app/bayu_demo"

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
            {/* QR Code Modal */}
            <Dialog open={showQR} onOpenChange={setShowQR}>
                <DialogContent className="bg-white text-slate-900 border-none max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold">QR Code Saya</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="bg-white p-2 rounded-lg border-2 border-slate-900">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${profileLink}`}
                                alt="QR Code"
                                className="w-64 h-64"
                            />
                        </div>
                        <p className="text-center text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded w-full">
                            {profileLink}
                        </p>
                        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" onClick={() => {
                            navigator.clipboard.writeText(profileLink)
                            toast.success("Link disalin!")
                        }}>
                            Salin Link
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            {/* Fixed Header for Demo */}
            <header className="fixed top-[34px] w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-white">MyAkun (Demo)</span>
                </div>
                <Link href="/proposal">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Home className="w-4 h-4 mr-2" /> Back
                    </Button>
                </Link>
            </header>

            <main className="max-w-7xl mx-auto pt-32 pb-8 px-6 space-y-8">

                {/* Account Header Equivalent Inline */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="w-24 h-24 border-4 border-slate-800 shadow-xl">
                        <AvatarImage src={MOCK_USER.photoUrl} alt={MOCK_USER.name} />
                        <AvatarFallback className="bg-amber-500 text-slate-900 text-2xl font-bold">
                            {MOCK_USER.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-2xl font-bold text-white mb-1">{MOCK_USER.name}</h1>
                        <p className="text-slate-400 mb-4">{MOCK_USER.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <Badge variant="outline" className="border-emerald-500 text-emerald-400 bg-emerald-500/10">Verified User</Badge>
                            <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-500/10">Gold Member</Badge>
                        </div>
                    </div>
                    <Button variant="outline" className="h-full py-2 flex flex-col items-center gap-1 border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300" onClick={() => setShowQR(true)}>
                        <QrCode className="w-6 h-6" />
                        <span className="text-xs">QR Code</span>
                    </Button>
                </div>


                {/* Top Section: Wallet & Profile Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Wallet Card */}
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg md:col-span-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all"></div>
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                <div>
                                    <h3 className="text-slate-400 font-medium mb-1 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-amber-500" /> Dompet Saya
                                    </h3>
                                    <div className="text-4xl font-bold text-white tracking-tight">{MOCK_USER.balance}</div>
                                    <p className="text-xs text-slate-500 mt-2">Saldo aktif dapat digunakan untuk belanja & bayar layanan (Demo).</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 shadow-lg shadow-amber-500/10" onClick={() => toast.success("Top Up Demo Clicked")}>
                                        <Plus className="w-4 h-4 mr-2" /> Top Up
                                    </Button>
                                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-6" onClick={() => toast.success("Transfer Demo Clicked")}>
                                        <ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Start Selling CTA */}
                    <Card className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border-indigo-500/30 flex flex-col justify-center items-center text-center p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-indigo-500/5 z-0"></div>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xl font-bold text-white">Ingin Jualan atau Jadi Driver?</h3>
                            <p className="text-sm text-slate-400">Daftar sekarang dan mulai hasilkan pendapatan tambahan.</p>
                            <div className="flex gap-2 justify-center w-full">
                                <Button size="sm" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => window.open('/demo/lapak', '_blank')}>
                                    Seller Demo
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-indigo-400 text-indigo-400 hover:bg-indigo-500/10" onClick={() => window.open('/demo/driver', '_blank')}>
                                    Driver Demo
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Order History Panel */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Riwayat Pesanan</h2>
                        <Button variant="link" className="text-amber-500 hover:text-amber-400 p-0 h-auto font-normal">
                            Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>

                    <Tabs defaultValue="shipped" className="w-full">
                        <TabsList className="bg-slate-900 border border-slate-800 w-full justify-start p-1 h-auto grid grid-cols-2 md:grid-cols-4 gap-1">
                            <TabsTrigger value="unpaid" className="data-[state=active]:bg-slate-800 data-[state=active]:text-amber-500 text-slate-400 py-3">
                                <CreditCard className="w-4 h-4 mr-2" /> Belum Bayar
                                {ORDERS.unpaid.length > 0 && <Badge className="ml-2 bg-amber-500 text-slate-900">{ORDERS.unpaid.length}</Badge>}
                            </TabsTrigger>
                            <TabsTrigger value="shipped" className="data-[state=active]:bg-slate-800 data-[state=active]:text-blue-400 text-slate-400 py-3">
                                <Truck className="w-4 h-4 mr-2" /> Dikirim
                            </TabsTrigger>
                            <TabsTrigger value="returned" className="data-[state=active]:bg-slate-800 data-[state=active]:text-purple-400 text-slate-400 py-3">
                                <RotateCcw className="w-4 h-4 mr-2" /> Pengembalian
                            </TabsTrigger>
                            <TabsTrigger value="cancelled" className="data-[state=active]:bg-slate-800 data-[state=active]:text-red-400 text-slate-400 py-3">
                                <XCircle className="w-4 h-4 mr-2" /> Dibatalkan
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab Contents */}
                        <div className="mt-4">
                            <TabsContent value="unpaid" className="space-y-3">
                                {ORDERS.unpaid.map(order => (
                                    <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between hover:border-amber-500/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500"><ShoppingBag className="w-6 h-6" /></div>
                                            <div>
                                                <h4 className="font-bold text-white">{order.item}</h4>
                                                <p className="text-sm text-slate-400">{order.store} • {order.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-amber-500">{order.price}</div>
                                            <Button size="sm" className="mt-1 h-8 bg-amber-500 text-slate-900 hover:bg-amber-600">Bayar Sekarang</Button>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="shipped" className="space-y-3">
                                {ORDERS.shipped.map(order => (
                                    <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between hover:border-blue-500/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Truck className="w-6 h-6" /></div>
                                            <div>
                                                <h4 className="font-bold text-white">{order.item}</h4>
                                                <p className="text-sm text-slate-400">{order.store} • {order.status}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-white">{order.price}</div>
                                            <Button size="sm" variant="outline" className="mt-1 h-8 border-slate-700 text-slate-300">Lacak</Button>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="returned" className="text-center py-10 text-slate-500">
                                Belum ada pesanan dikembalikan.
                            </TabsContent>
                            <TabsContent value="cancelled" className="space-y-3">
                                {ORDERS.cancelled.map(order => (
                                    <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between opacity-75">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-red-500/10 rounded-lg text-red-500"><XCircle className="w-6 h-6" /></div>
                                            <div>
                                                <h4 className="font-bold text-slate-300">{order.item}</h4>
                                                <p className="text-sm text-slate-500">{order.store} • {order.reason}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-slate-400 line-through">{order.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                {/* Activity Record */}
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-400" /> Aktivitas Terakhir
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 items-start pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                            <div className="mt-1 p-2 bg-emerald-500/10 rounded-full text-emerald-500">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">Selesai menggunakan jasa Ojek</p>
                                <p className="text-xs text-slate-500">Jl. Pantai Batu Bolong → Canggu Shortcut • 2 jam yang lalu</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                            <div className="mt-1 p-2 bg-amber-500/10 rounded-full text-amber-500">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">Pembelian Kopi Arabika</p>
                                <p className="text-xs text-slate-500">Menunggu konfirmasi pembayaran • 5 jam yang lalu</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Help Center CTA */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-sky-500/10 rounded-xl text-sky-500">
                            <HelpCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Butuh Bantuan?</h3>
                            <p className="text-slate-400">Hubungi CS kami atau baca FAQ jika ada kendala.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all" onClick={() => toast.info("Opening Help Demo")}>
                        Kunjungi Pusat Bantuan
                    </Button>
                </div>

                {/* Popular Products Recommendation */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" /> Produk Populer
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {POPULAR_PRODUCTS.map((product) => (
                            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer group" onClick={() => toast.info("View Product Demo")}>
                                <div className="aspect-square bg-slate-800 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                                    {product.image}
                                </div>
                                <div className="p-4">
                                    <h4 className="text-white font-bold line-clamp-1">{product.name}</h4>
                                    <p className="text-xs text-slate-400 mb-2">{product.store}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-500 font-bold">{product.price}</span>
                                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {product.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    )
}
