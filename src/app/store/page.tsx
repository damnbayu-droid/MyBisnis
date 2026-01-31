'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Star, CreditCard, Share2, MessageCircle, Store, ShoppingBag } from 'lucide-react'
import { sampleProductsId, Product } from '@/constants/landing-data'
import { toast } from 'sonner'
import Link from 'next/link'
import ProductModal from '@/components/products/ProductModal'
import ProductCard from '@/components/products/ProductCard'

// Mock Store Data
const STORE_DATA = {
    name: "Toko Serba Ada Bayu",
    description: "Menyediakan berbagai macam kebutuhan harian, mulai dari makanan, minuman, hingga produk fashion lokal berkualitas. Pengiriman cepat dan terpercaya.",
    address: "Jl. Raya Kerobokan No. 88, Badung, Bali",
    rating: 4.8,
    reviews: 124,
    banner: "bg-gradient-to-r from-slate-800 to-slate-900", // Placeholder for actual image
    paymentMethods: ["QRIS", "Transfer Bank", "COD", "E-Wallet"],
    isVerified: true
}

export default function PublicStorePage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)

    const handleShareStore = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        toast.success("Link toko berhasil disalin!")
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
        setIsProductModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-20">
            {/* Header / Nav - Minimal for Store View */}
            {/* Header / Nav - Minimal for Store View */}
            <header className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href="/" className="font-bold text-lg bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        MyBisnis
                    </Link>
                    <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-slate-300" onClick={handleShareStore}>
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Link href="/akun">
                            <Button size="sm" variant="outline" className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Store Banner & Info */}
            <div className={`mt-14 h-48 md:h-64 ${STORE_DATA.banner} relative`}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute -bottom-16 left-0 right-0 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end gap-4 z-10 pb-10">
                    {/* Store Logo/Avatar */}
                    <div className="w-32 h-32 bg-slate-800 rounded-xl border-4 border-slate-950 shadow-2xl flex items-center justify-center text-4xl overflow-hidden">
                        🏪
                    </div>
                    {/* Store Title Info */}
                    <div className="mb-2 md:mb-4 flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-white shadow-black drop-shadow-md">
                                {STORE_DATA.name}
                            </h1>
                            {STORE_DATA.isVerified && <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Verified</Badge>}
                        </div>
                        <div className="flex items-center text-amber-400 font-bold text-sm bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full w-fit mt-1">
                            <Star className="w-4 h-4 fill-amber-400 mr-1" /> {STORE_DATA.rating} <span className="text-slate-300 font-normal ml-1">({STORE_DATA.reviews} Ulasan)</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-20 md:mt-12 space-y-8">

                {/* Store Details Box */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h2 className="text-lg font-bold text-white mb-2">Tentang Toko</h2>
                            <p className="text-slate-400 text-sm leading-relaxed text-justify">
                                {STORE_DATA.description}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 p-4 bg-slate-900 rounded-lg border border-slate-800">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-500 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Alamat Toko</h4>
                                    <p className="text-slate-400 text-xs">{STORE_DATA.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-4 space-y-4">
                                <div>
                                    <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-emerald-400" /> Metode Pembayaran
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {STORE_DATA.paymentMethods.map(pm => (
                                            <Badge key={pm} variant="secondary" className="bg-slate-800 text-slate-300 pointer-events-none hover:bg-slate-800">
                                                {pm}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold">
                                    <MessageCircle className="w-4 h-4 mr-2" /> Chat Penjual
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Product List */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-amber-500" /> Daftar Produk
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sampleProductsId.map((product, idx) => (
                            <ProductCard
                                key={idx}
                                product={product}
                                onClick={() => handleProductClick(product)}
                                onAddToCart={(e) => {
                                    e.stopPropagation()
                                    toast.success("Produk ditambahkan ke keranjang")
                                }}
                                onBuyNow={(e) => {
                                    e.stopPropagation()
                                    toast.success("Melanjutkan ke pembayaran...")
                                }}
                                onShare={(e) => {
                                    e.stopPropagation()
                                    toast.success("Link produk disalin!")
                                }}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Product Modal - Read Only View */}
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                product={selectedProduct}
                isEditable={false} // Visitor cannot edit
            />
        </div>
    )
}
