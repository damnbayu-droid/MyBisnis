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
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { sampleProductsId, Product } from '@/constants/landing-data'
import ProductModal from '@/components/products/ProductModal'
import ProductCard from '@/components/products/ProductCard'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// ... imports

import RoleUpgradeModal from '@/components/modals/RoleUpgradeModal' // Import Modal

// ... inside component ...

export default function UserDashboard() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role')

  // Mock User Data - In real app, fetch from Auth/DB
  const user = {
    name: "Bayu Tester",
    roles: ["seller", "driver"], // User holds multiple roles
    status: "active"
  }

  const { language, setLanguage } = useLanguage()
  const [currentRole, setCurrentRole] = useState(
    (roleParam && user.roles.includes(roleParam)) ? roleParam : user.roles[0]
  )
  const [activeTab, setActiveTab] = useState('overview')
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false) // State for Modal

  // --- SELLER VIEW ---
  const SellerView = () => {
    // ... existing seller state ...
    const [myProducts, setMyProducts] = useState(sampleProductsId.slice(0, 6))
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)

    // ... existing handlers ...
    const handleEditProduct = (product: Product) => {
      setSelectedProduct(product)
      setIsProductModalOpen(true)
    }

    const handleSaveProduct = (updatedProduct: Product) => {
      setMyProducts(myProducts.map(p => p.name === updatedProduct.name ? updatedProduct : p))
      setIsProductModalOpen(false)
      setSelectedProduct(null)
    }

    const handleDeleteProduct = (productName: string) => {
      setMyProducts(myProducts.filter(p => p.name !== productName))
      setIsProductModalOpen(false)
      setSelectedProduct(null)
      toast.success("Produk berhasil dihapus")
    }

    const handleShareShop = () => {
      const url = `${window.location.origin}/store`
      navigator.clipboard.writeText(url)
      toast.success("Link toko berhasil disalin!")
    }

    return (
      <div className="space-y-6">
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
          <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
            Verifikasi Sekarang
          </Button>
        </div>

        {/* Top Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* ... existing stats ... */}
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
                  <Link href="/store" target="_blank">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                      <Eye className="w-4 h-4 mr-2" /> Lihat Toko
                    </Button>
                  </Link>
                  <Button size="sm" variant="secondary" onClick={handleShareShop}>
                    <Share2 className="w-4 h-4 mr-2" /> Share Toko
                  </Button>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                    <Plus className="w-4 h-4 mr-2" /> Tambah Produk
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {myProducts.length > 0 ? (
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
                ) : (
                  <div className="text-center text-slate-500 py-10 bg-slate-900/50 rounded-lg border border-slate-700 border-dashed">
                    Belum ada produk. Silakan tambah produk baru.
                  </div>
                )}
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
      </div>
    )
  }

  // --- DRIVER VIEW ---
  const DriverView = () => (
    <div className="space-y-6">
      {/* Verification CTA */}
      <div className="bg-amber-500/10 border border-amber-500/50 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-full text-amber-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold">Verifikasi Driver</h3>
            <p className="text-slate-400 text-sm">Upload dokumen kendaraan untuk mulai menerima order.</p>
          </div>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
          Upload Dokumen
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-slate-400 text-sm mb-1">Pendapatan Hari Ini</h3>
            <p className="text-2xl font-bold text-emerald-400">Rp 150.000</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-slate-400 text-sm mb-1">Trip Selesai</h3>
            <p className="text-2xl font-bold text-white">8</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-slate-400 text-sm mb-1">Rating</h3>
            <p className="text-2xl font-bold text-amber-400">4.9 ⭐</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-white">Order Masuk</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-amber-500/30 rounded-lg">
                <div>
                  <h4 className="text-white font-bold">Antar Paket (5km)</h4>
                  <p className="text-sm text-slate-400">Jl. Sunset Road &rarr; Jl. Raya Canggu</p>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600">Ambil Order</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Calculator />
        </div>
      </div>
    </div>
  )

  // --- BUYER VIEW ---
  const BuyerView = () => (
    <div className="text-center py-20">
      <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang, {user.name}</h2>
      <p className="text-slate-400 mb-8">Anda login sebagai Pembeli. Silahkan jelajahi marketplace.</p>

      <div className="flex justify-center gap-4">
        <Link href="/marketplace">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
            Ke Marketplace
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white" onClick={() => setIsUpgradeModalOpen(true)}>
          Buka Toko / Jadi Driver
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <header className="bg-slate-900 border-b border-slate-800 p-4">
        {/* ... existing header content ... */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              MyDashboard
            </Link>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs border border-slate-700 uppercase">
              {currentRole}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* ... */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Home className="w-4 h-4 mr-2" /> Home
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            >
              <Globe className="w-4 h-4 mr-2" /> {language === 'id' ? 'ID' : 'EN'}
            </Button>
            <Button variant="destructive" size="sm">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {currentRole === 'seller' && <SellerView />}
        {currentRole === 'driver' && <DriverView />}
        {currentRole === 'buyer' && <BuyerView />}
        {/* Fallback */}
        {!['seller', 'driver', 'buyer'].includes(currentRole) && (
          <div className="text-white">Role {currentRole} not recognized.</div>
        )}
      </main>

      <RoleUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentUser={user}
        onUpgradeSuccess={(newRole) => {
          // In real app, re-fetch user profile
          setCurrentRole(newRole)
          toast.success(`Berhasil beralih ke mode ${newRole}`)
        }}
      />
    </div>
  )
}
