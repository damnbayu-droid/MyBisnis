'use client'

import React, { useState } from 'react'
import Calculator from '@/components/dashboard/Calculator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    ShoppingBag,
    Truck,
    Settings,
    Plus,
    FileText,
    LogOut,
    Home,
    Globe,
    Edit2,
    Share2,
    Eye,
    Trash2,
    ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { sampleProductsId, Product } from '@/constants/landing-data'
import ProductModal from '@/components/products/ProductModal'
import { toast } from 'sonner'

export default function DemoLapakPage() {
    const { language, setLanguage } = useLanguage()

    // Hardcoded Demo State
    const [myProducts, setMyProducts] = useState(sampleProductsId.slice(0, 6))
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product)
        setIsProductModalOpen(true)
    }

    const handleSaveProduct = (updatedProduct: Product) => {
        setMyProducts(myProducts.map(p => p.name === updatedProduct.name ? updatedProduct : p))
        setIsProductModalOpen(false)
        setSelectedProduct(null)
        toast.success("Produk berhasil diupdate (Demo)")
    }

    const handleDeleteProduct = (productName: string) => {
        setMyProducts(myProducts.filter(p => p.name !== productName))
        setIsProductModalOpen(false)
        setSelectedProduct(null)
        toast.success("Produk berhasil dihapus (Demo)")
    }

    const handleShareShop = () => {
        toast.success("Link toko berhasil disalin! (Demo)")
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans pt-[34px]">
            <header className="bg-slate-900 border-b border-slate-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/proposal" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                            MyDashboard
                        </Link>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs border border-slate-700 uppercase">
                            SELLER (DEMO)
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/proposal">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <Home className="w-4 h-4 mr-2" /> Back to Proposal
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Verification CTA */}
                <div className="bg-amber-500/10 border border-amber-500/50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-full text-amber-500">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Verifikasi Akun Toko</h3>
                            <p className="text-slate-400 text-sm">Lengkapi data toko Anda untuk meningkatkan kepercayaan pelanggan.</p>
                        </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" onClick={() => toast.success("Verifikasi berhasil (Demo)")}>
                        Verifikasi Sekarang
                    </Button>
                </div>

                {/* Top Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <h3 className="text-slate-400 text-sm mb-1">Total Produk</h3>
                            <p className="text-2xl font-bold text-white">{myProducts.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <h3 className="text-slate-400 text-sm mb-1">Order Masuk</h3>
                            <p className="text-2xl font-bold text-amber-500">3</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <h3 className="text-slate-400 text-sm mb-1">Penjualan Bulan Ini</h3>
                            <p className="text-2xl font-bold text-emerald-400">Rp 1.500.000</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Product Management Section */}
                    <div className="md:col-span-2">
                        <Card className="bg-slate-800 border-slate-700 h-full">
                            <CardHeader className="border-b border-slate-700 flex flex-row items-center justify-between">
                                <CardTitle className="text-white">Produk Saya</CardTitle>
                                <div className="flex gap-2">
                                    <Link href="/demo/store" target="_blank">
                                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                                            <Eye className="w-4 h-4 mr-2" /> Lihat Toko
                                        </Button>
                                    </Link>
                                    <Button size="sm" variant="secondary" onClick={handleShareShop}>
                                        <Share2 className="w-4 h-4 mr-2" /> Share Toko
                                    </Button>
                                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900" onClick={() => toast.info("Fitur Tambah Produk (Demo)")}>
                                        <Plus className="w-4 h-4 mr-2" /> Tambah Produk
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {myProducts.map((product, idx) => (
                                        <div
                                            key={idx}
                                            className="group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-amber-500/50 cursor-pointer relative"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            <div className="aspect-square bg-slate-800 flex items-center justify-center text-4xl">
                                                {product.image}
                                            </div>
                                            <div className="p-3">
                                                <h4 className="text-white font-bold text-sm line-clamp-1">{product.name}</h4>
                                                <p className="text-amber-500 font-medium text-xs mt-1">{product.price}</p>
                                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="bg-slate-800 p-1.5 rounded-full hover:bg-amber-500 hover:text-slate-900 text-slate-300">
                                                        <Edit2 className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
                            <h3 className="text-white font-bold mb-4">Metode Pembayaran</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">QRIS</span>
                                    <span className="text-emerald-400 font-bold">Aktif</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Transfer Bank</span>
                                    <span className="text-emerald-400 font-bold">Aktif</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Tunai / COD</span>
                                    <span className="text-slate-500">Non-Aktif</span>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-2 border-slate-600 text-slate-300">Atur Pembayaran</Button>
                            </div>
                        </div>
                        <Calculator />
                    </div>
                </div>

                <ProductModal
                    isOpen={isProductModalOpen}
                    onClose={() => {
                        setIsProductModalOpen(false)
                        setSelectedProduct(null)
                    }}
                    product={selectedProduct}
                    isEditable={true}
                    onSave={handleSaveProduct}
                    onDelete={handleDeleteProduct}
                />
            </main>
        </div>
    )
}
