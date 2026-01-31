
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { sampleProductsId, sampleProductsEn, Product, translations } from '@/constants/landing-data'
import { toast } from 'sonner'
import { ShoppingCart, MessageSquare, Globe, User, LogOut, Settings, HelpCircle, Package, TrendingUp, Search, Plus, Truck, ArrowUp, ArrowDown, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import ProductCard from '@/components/products/ProductCard'
import ProductModal from '@/components/products/ProductModal'
// We need to use the CourierMapModal, assuming it's available or we need to pass a handler if it's high up. 
// Since this is a page, we can import the modal directly.
import CourierMapModal from '@/components/modals/CourierMapModal'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function MarketplacePage() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const { user } = useAuth()
  const router = useRouter()

  // Initialize with correct language data
  const [products, setProducts] = useState<Product[]>(language === 'id' ? sampleProductsId : sampleProductsEn)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  // Smart Header State
  const [isScrolled, setIsScrolled] = useState(false)

  // Modals
  const [showCourierMap, setShowCourierMap] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sort: 'popular'
  })
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update products when language changes
  useEffect(() => {
    const baseProducts = language === 'id' ? sampleProductsId : sampleProductsEn
    setProducts(baseProducts)
  }, [language])

  useEffect(() => {
    filterProducts()
  }, [filters, language]) // Trigger when filters OR language changes

  const filterProducts = () => {
    const baseProducts = language === 'id' ? sampleProductsId : sampleProductsEn
    let filtered = [...baseProducts]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.store.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Sort
    if (filters.sort === 'popular') {
      filtered.sort((a, b) => b.orders - a.orders)
    } else if (filters.sort === 'newest') {
      filtered.sort((a, b) => b.clicks - a.clicks)
    } else if (filters.sort === 'price_low') {
      filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (filters.sort === 'price_high') {
      filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    }

    setProducts(filtered)
  }

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''))
  }

  // --- LOGIC FOR CTAs ---
  const handleTambahProduk = () => {
    if (!user) {
      toast.error('Silakan login atau register terlebih dahulu.')
      // Redirect to register via query param or just to home with register open? 
      // For now, simpler to redirect to login/register page if it existed, or just home.
      // Assuming /auth/register exists or we use modal logic. 
      // Since we don't have direct access to root modals from here easily without context, 
      // we'll redirect to auth page if available or show toast.
      // Based on file structure, we have /auth/login and /auth/register mapped in sitemap but maybe implemented as modals on home.
      // Let's redirect to landing with register query if possible, or just alert.

      // Checking implementation plan: "Guest -> Redirect to Register"
      // Let's try redirecting to a dedicated auth page if it exists, otherwise back to home.
      // sitemap says /auth/register exists.
      router.push('/auth/register')
      return
    }

    // Check Role
    const role = user.user_metadata?.role || 'user'

    if (role === 'seller' || role === 'admin') {
      router.push('/dashboard')
    } else if (role === 'driver') {
      // Driver wanting to sell? 
      toast.info('Akun Anda terdaftar sebagai Driver. Silakan upgrade ke Seller di Dashboard.')
      router.push('/dashboard')
    } else {
      // Regular User -> Needs to become seller
      toast.info('Anda belum terdaftar sebagai Seller.')
      router.push('/dashboard?action=upgrade_seller')
    }
  }

  const handleOrderOjek = () => {
    // Open Courier Map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setShowCourierMap(true)
        },
        (error) => {
          console.warn('Loc error, default JKT')
          setUserLocation({ lat: -6.2088, lng: 106.8456 })
          setShowCourierMap(true)
        }
      )
    } else {
      setUserLocation({ lat: -6.2088, lng: 106.8456 })
      setShowCourierMap(true)
    }
  }

  const handleLogout = () => {
    toast.success(language === 'id' ? 'Logout berhasil!' : 'Logout successful!')
    // In a real app, you'd handle auth logout here
    window.location.href = '/'
  }

  const categories = Array.from(new Set((language === 'id' ? sampleProductsId : sampleProductsEn).map(p => p.category)))

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className={`sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all duration-300 ${isScrolled ? 'py-2 shadow-xl' : 'py-4 shadow-lg'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/marketplace" className="flex items-center gap-2">
              {/* Mobile Logo (Favicon) - Visible on small screens */}
              <img src="/Favicon.webp" alt="MyBisnis Logo" className="w-8 h-8 md:hidden" />
              {/* Desktop Logo (Text) - Hidden on small screens */}
              <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                MyMarketplace
              </span>
            </Link>

            {/* Smart Sticky Buttons - Appear on Scroll */}
            <div className={`flex items-center gap-2 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none hidden md:flex'}`}>
              <Button size="sm" className={`bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold ${isScrolled ? 'h-8 px-2 text-[10px] md:text-xs' : 'text-xs'}`} onClick={() => handleTambahProduk()}>
                <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Jualan
              </Button>
              <Button size="sm" variant="outline" className={`border-slate-600 text-slate-300 hover:text-amber-400 ${isScrolled ? 'h-8 px-2 text-[10px] md:text-xs' : 'text-xs'}`} onClick={() => handleOrderOjek()}>
                <Truck className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Ojek
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size={isScrolled ? "icon" : "default"}
              className={`text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all duration-300 ${isScrolled ? 'w-8 h-8' : ''}`}
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            >
              <Globe className="w-5 h-5" />
              <span className={`ml-2 text-xs font-bold ${isScrolled ? 'hidden' : 'hidden md:inline'}`}>{language === 'id' ? 'ID' : 'EN'}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
              onClick={() => toast.info('Fitur Chat segera hadir!')}
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
            {/* Cart Button - Kept standardized size as requested */}
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-amber-400 hover:bg-slate-800" onClick={() => toast.info('Fitur Keranjang segera hadir!')}>
              <ShoppingCart className="w-5 h-5" />
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                className={`border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300 ml-2 ${isScrolled ? 'h-8 px-2' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="w-4 h-4 mr-2" />
                <span className={isScrolled ? 'hidden md:inline' : 'hidden md:inline'}>Profile</span>
              </Button>

              {/* Profile Menu Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col gap-1">
                    <Link href="/akun">
                      <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-700">
                        <User className="w-4 h-4 mr-2" /> {language === 'id' ? 'Akun' : 'Account'}
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-700">
                        <TrendingUp className="w-4 h-4 mr-2" /> Dashboard
                      </Button>
                    </Link>
                    <Link href="/settings">
                      <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-700">
                        <Settings className="w-4 h-4 mr-2" /> {language === 'id' ? 'Setting & Privasi' : 'Settings & Privacy'}
                      </Button>
                    </Link>
                    <Link href="/help-support">
                      <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-700">
                        <HelpCircle className="w-4 h-4 mr-2" /> {language === 'id' ? 'Help & Support' : 'Help & Support'}
                      </Button>
                    </Link>
                    <div className="h-px bg-slate-700 my-1" />
                    <Button variant="ghost" className="justify-start text-red-400 hover:text-red-300 hover:bg-slate-700" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-500 text-center flex flex-wrap justify-center gap-2">
                    <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a> •
                    <a href="#" className="hover:text-amber-400 transition-colors">Terms</a> •
                    <a href="#" className="hover:text-amber-400 transition-colors">Refund</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Overlay to close menu */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" onClick={() => setIsProfileOpen(false)} />
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-900/0 to-slate-900/0 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-br from-white via-slate-200 to-amber-500 bg-clip-text text-transparent">
            {t.marketplaceTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.marketplaceSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold rounded-full px-8 py-6 text-lg shadow-lg shadow-amber-500/20" onClick={handleTambahProduk}>
              {t.tambahProduk}
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-amber-400 rounded-full px-8 py-6 text-lg" onClick={handleOrderOjek}>
              {t.orderOjek}
            </Button>
          </div>
        </div>
      </section>

      {/* Filter & Products Section */}
      {/* Filter & Products Section */}
      <section className="bg-slate-950/30 min-h-screen relative">

        {/* Sticky Filter Bar */}
        <div className={`sticky border-b border-slate-800/50 z-40 bg-slate-900/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'top-[60px] py-3 px-4 shadow-lg' : 'top-[80px] py-6 px-6'}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            {/* Search - Shrinks on scroll */}
            <div className={`relative flex-1 w-full transition-all duration-300 ${isScrolled ? 'scale-95 origin-left' : 'scale-100'}`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder={t.cariProduk}
                className={`pl-9 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-amber-500 rounded-full transition-all ${isScrolled ? 'h-9 text-sm' : 'h-12 text-base'}`}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <Select value={filters.category} onValueChange={(val) => setFilters({ ...filters, category: val })}>
                <SelectTrigger className={`w-[140px] bg-slate-800/50 border-slate-700 text-slate-200 rounded-full ${isScrolled ? 'h-9 text-xs' : 'h-12'}`}>
                  <SelectValue placeholder={t.kategori} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="all">{t.semuaKategori}</SelectItem>
                  {categories.map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.sort} onValueChange={(val) => setFilters({ ...filters, sort: val })}>
                <SelectTrigger className={`w-[160px] bg-slate-800/50 border-slate-700 text-slate-200 rounded-full ${isScrolled ? 'h-9 text-xs' : 'h-12'}`}>
                  <SelectValue placeholder={t.urutkan} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="popular">{t.palingPopuler}</SelectItem>
                  <SelectItem value="newest">{t.terbaru}</SelectItem>
                  {/* Location Filter */}
                  <SelectItem value="nearest">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-emerald-400" /> Terdekat
                    </div>
                  </SelectItem>
                  <SelectItem value="price_low">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-3 h-3 text-emerald-400" /> {t.hargaTerendah}
                    </div>
                  </SelectItem>
                  <SelectItem value="price_high">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-3 h-3 text-red-400" /> {t.hargaTertinggi}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onClick={() => {
                    setSelectedProduct(product)
                    setIsProductModalOpen(true)
                  }}
                  onAddToCart={(e) => {
                    e.stopPropagation()
                    toast.success(`${product.name} ${language === 'id' ? 'ditambahkan ke keranjang!' : 'added to cart!'}`)
                  }}
                  onBuyNow={(e) => {
                    e.stopPropagation()
                    toast.success(`${language === 'id' ? 'Memproses pembelian' : 'Processing purchase'} ${product.name}...`)
                  }}
                  onShare={(e) => {
                    e.stopPropagation()
                    toast.success("Link produk disalin!")
                  }}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 px-4">
              <div className="text-8xl mb-6 opacity-50">📦</div>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">{t.tidakAdaProduk}</h3>
              <p className="text-slate-400 text-lg">{t.cobaUbahFilter}</p>
              <Button
                variant="outline"
                className="mt-6 border-slate-600 text-slate-300 hover:text-amber-400"
                onClick={() => setFilters({ search: '', category: 'all', sort: 'popular' })}
              >
                {t.resetFilter}
              </Button>
            </div>
          )}

        </div>
      </section>


      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        isEditable={false}
      />

      <CourierMapModal
        isOpen={showCourierMap}
        onOpenChange={setShowCourierMap}
        userLocation={userLocation}
        language={language}
      />
    </div>
  )
}
