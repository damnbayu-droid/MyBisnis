'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, ShoppingCart, Store, Truck, Star, TrendingUp, Users, CreditCard, MessageSquare, Search, Filter, ChevronRight, Package, Globe, Zap, Shield, HeadphonesIcon, Database, Settings, BarChart3, Menu, X, Eye, EyeOff, Globe2, ShoppingBag, Navigation, Plus, Camera, Upload, Store as StoreIcon, Package as PackageIcon, Truck as TruckIcon, MapPin as MapPinIcon, DollarSign, QrCode, Check, UserPlus, Building2, Palette, Sparkles, Target, BarChart, User, Lock, Map, Activity, ArrowRight, Wrench, Globe as WorldIcon, ShoppingBag as CartIcon, CreditCard as PaymentIcon, BarChart3 as AnalyticsIcon, Shield as SecurityIcon, Zap as BoltIcon, Settings as SettingsIcon, Database as DatabaseIcon, MessageSquare as ChatIcon, TrendingUp as GrowthIcon, Apple, Coffee, Send, Phone, Navigation2, MapPin as MapPin2, Clock } from 'lucide-react'

// Dynamic imports for Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

interface Translation {
  [key: string]: string
}

interface Courier {
  id: string
  name: string
  type: string
  vehicle: string
  zone: string
  status: 'online' | 'offline' | 'busy'
  lat: number
  lng: number
  phone: string
  rating: number
  completedOrders: number
}

interface ChatMessage {
  id: string
  sender: 'user' | 'courier'
  message: string
  timestamp: Date
}

const translations: { [key: string]: Translation } = {
  id: {
    title: 'Platform Marketplace UMKM Digital Indonesia',
    subtitle: 'Kembangkan bisnis Anda dengan mudah. Buat toko online profesional, kelola produk, dan raih lebih banyak pelanggan dengan sistem marketplace terintegrasi.',
    daftar: 'Daftar',
    login: 'Login',
    mulaiSekarang: 'Mulai Sekarang',
    orderOjek: 'Order Ojek',
    belumPunyaAkun: 'Belum Punya Akun, Daftar Disini',
    lihatPassword: 'Lihat Password',
    sembunyikanPassword: 'Sembunyikan Password',
    namaToko: 'Nama Toko',
    jenisToko: 'Jenis Toko',
    deskripsi: 'Deskripsi Toko',
    linkToko: 'Link Toko',
    metodePembayaran: 'Metode Pembayaran',
    uploadProduk: 'Upload Produk',
    kelolaProduk: 'Kelola Produk',
    trackingPengiriman: 'Tracking Pengiriman',
    chatDriver: 'Chat Driver',
    pilihDriver: 'Pilih Driver',
    driverTerdekat: 'Driver Terdekat',
    estimasiWaktu: 'Estimasi Waktu',
    biayaPengiriman: 'Biaya Pengiriman',
    kirimPesan: 'Kirim Pesan',
  },
  en: {
    title: 'Indonesian Digital UMKM Marketplace Platform',
    subtitle: 'Grow your business easily. Create professional online stores, manage products, and reach more customers with an integrated marketplace system.',
    daftar: 'Register',
    login: 'Login',
    mulaiSekarang: 'Get Started',
    orderOjek: 'Order Taxi',
    belumPunyaAkun: "Don't have an account? Register here",
    lihatPassword: 'Show Password',
    sembunyikanPassword: 'Hide Password',
    namaToko: 'Store Name',
    jenisToko: 'Store Type',
    deskripsi: 'Store Description',
    linkToko: 'Store Link',
    metodePembayaran: 'Payment Methods',
    uploadProduk: 'Upload Products',
    kelolaProduk: 'Manage Products',
    trackingPengiriman: 'Delivery Tracking',
    chatDriver: 'Chat Driver',
    pilihDriver: 'Select Driver',
    driverTerdekat: 'Nearest Driver',
    estimasiWaktu: 'Estimated Time',
    biayaPengiriman: 'Delivery Cost',
    kirimPesan: 'Send Message',
  }
}

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showGuideModal, setShowGuideModal] = useState(false)
  const [showCourierMap, setShowCourierMap] = useState(false)
  const [showWebsiteOrder, setShowWebsiteOrder] = useState(false)
  const [selectedWebsiteType, setSelectedWebsiteType] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<'id' | 'en'>('id')
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')

  
  // New states for enhanced features
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null)
  const [couriers, setCouriers] = useState<Courier[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [deliveryCost, setDeliveryCost] = useState(0)
  const [mapReady, setMapReady] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const t = translations[language]

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Jakarta if location access denied
          setUserLocation({ lat: -6.2088, lng: 106.8456 })
        }
      )
    } else {
      setUserLocation({ lat: -6.2088, lng: 106.8456 })
    }

    // Initialize mock couriers
    const mockCouriers: Courier[] = [
      {
        id: '1',
        name: 'Budi Santoso',
        type: 'Ompreng',
        vehicle: 'Honda Beat',
        zone: 'Jakarta Pusat',
        status: 'online',
        lat: -6.2088,
        lng: 106.8456,
        phone: '+62812345678',
        rating: 4.8,
        completedOrders: 156
      },
      {
        id: '2',
        name: 'Ahmad Fauzi',
        type: 'Bentor',
        vehicle: 'Yamaha Mio',
        zone: 'Jakarta Utara',
        status: 'online',
        lat: -6.1384,
        lng: 106.8759,
        phone: '+62823456789',
        rating: 4.9,
        completedOrders: 203
      },
      {
        id: '3',
        name: 'Siti Nurhaliza',
        type: 'Deliv',
        vehicle: 'Suzuki Satria',
        zone: 'Jakarta Selatan',
        status: 'offline',
        lat: -6.2615,
        lng: 106.8106,
        phone: '+62834567890',
        rating: 4.7,
        completedOrders: 89
      },
      {
        id: '4',
        name: 'Rudi Hermawan',
        type: 'Ompreng',
        vehicle: 'Honda Vario',
        zone: 'Jakarta Barat',
        status: 'busy',
        lat: -6.1751,
        lng: 106.8195,
        phone: '+62845678901',
        rating: 4.6,
        completedOrders: 267
      }
    ]
    setCouriers(mockCouriers)
  }, [])

  useEffect(() => {
    // Auto-scroll chat to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  useEffect(() => {
    // Calculate estimated time and cost when courier is selected
    if (selectedCourier && userLocation) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        selectedCourier.lat,
        selectedCourier.lng
      )
      
      // Estimate time (assuming average speed of 30 km/h in city traffic)
      const timeInMinutes = Math.round((distance / 30) * 60)
      setEstimatedTime(timeInMinutes)
      
      // Calculate cost (base fare + distance)
      const baseFare = 10000 // 10k base fare
      const distanceCost = Math.round(distance * 2000) // 2k per km
      setDeliveryCost(baseFare + distanceCost)
    }
  }, [selectedCourier, userLocation])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      // Check for master accounts
      if (email === 'admin@email.com' && password === '@Lcf210492') {
        const adminUser = {
          user_id: 'admin-master',
          name: 'Admin Master',
          email: 'admin@email.com',
          role: 'admin',
          status: 'active'
        }
        setCurrentUser(adminUser)
        localStorage.setItem('currentUser', JSON.stringify(adminUser))
        setShowLoginModal(false)
        alert('Login berhasil sebagai Admin Master!')
        setTimeout(() => {
          if (data.user.role === 'pembeli') {
            window.location.href = '/marketplace'
          } else if (data.user.role === 'penjual' || data.user.role === 'pengirim') {
            window.location.href = '/dashboard'
          } else if (data.user.role === 'admin') {
            window.location.href = '/admin'
          }
        }, 300)

      } else {
        alert(data.error || 'Login gagal')
      }

      if (email === 'penjual@email.com' && password === '@Lcf210492') {
        const sellerUser = {
          user_id: 'penjual-master',
          name: 'Penjual Master',
          email: 'penjual@email.com',
          role: 'penjual',
          status: 'active'
        }
        setCurrentUser(sellerUser)
        localStorage.setItem('currentUser', JSON.stringify(sellerUser))
        setShowLoginModal(false)
        alert('Login berhasil sebagai Penjual Master!')
        setIsLoading(false)
        return
      }

      if (email === 'pengantar@email.com' && password === '@Lcf210492') {
        const courierUser = {
          user_id: 'pengantar-master',
          name: 'Pengantar Master',
          email: 'pengantar@email.com',
          role: 'pengirim',
          status: 'active'
        }
        setCurrentUser(courierUser)
        localStorage.setItem('currentUser', JSON.stringify(courierUser))
        setShowLoginModal(false)
        alert('Login berhasil sebagai Pengantar Master!')
        setIsLoading(false)
        return
      }

      if (email === 'pembeli@email.com' && password === '@Lcf210492') {
        const buyerUser = {
          user_id: 'pembeli-master',
          name: 'Pembeli Master',
          email: 'pembeli@email.com',
          role: 'pembeli',
          status: 'active'
        }
        setCurrentUser(buyerUser)
        localStorage.setItem('currentUser', JSON.stringify(buyerUser))
        setShowLoginModal(false)
        alert('Login berhasil sebagai Pembeli Master!')
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentUser(data.user)
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        setShowLoginModal(false)
        alert('Login berhasil!')
      } else {
        alert(data.error || 'Login gagal')
      }
    } catch (error) {
      alert('Terjadi kesalahan saat login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      const userData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        whatsapp: formData.get('whatsapp') as string,
        role: formData.get('role') as string,
        lokasi: formData.get('lokasi') as string,
        password: formData.get('password') as string,
        storeName: formData.get('storeName') as string,
        jenisToko: formData.get('jenisToko') as string,
        deskripsiToko: formData.get('deskripsiToko') as string,
        paymentQris: formData.get('paymentQris') === 'on',
        paymentTransfer: formData.get('paymentTransfer') === 'on',
        paymentCash: formData.get('paymentCash') === 'on',
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        // Send confirmation email (simulation)
        alert(`Email konfirmasi telah dikirim ke ${userData.email}`)
        
        setCurrentUser(data.user)
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        setShowRegisterModal(false)
        alert('Registrasi berhasil!')
      } else {
        alert(data.error || 'Registrasi gagal')
      }
    } catch (error) {
      alert('Terjadi kesalahan saat registrasi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
  }

  const handleWebsiteOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const orderData = {
      name: formData.get('name'),
      email: formData.get('email'),
      websiteType: formData.get('websiteType'),
      package: formData.get('package'),
      description: formData.get('description'),
    }

    // Send to Formspree
    try {
      const response = await fetch('https://formspree.io/f/mjgbkpr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        alert('Order website berhasil dikirim! Kami akan menghubungi Anda segera.')
        setShowWebsiteOrder(false)
      } else {
        alert('Gagal mengirim order. Silakan coba lagi.')
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim order')
    }
  }

  const handleStoreNameChange = (name: string) => {
    setStoreName(name)
    const linkToko = `https://mybisnis.shop/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
    setLinkToko(linkToko)
  }

  const handleSelectCourier = (courier: Courier) => {
    setSelectedCourier(courier)
    setIsTracking(true)
    
    // Simulate tracking
    setTimeout(() => {
      setChatMessages([
        {
          id: '1',
          sender: 'courier',
          message: `Halo! Saya ${courier.name}, siap mengantarkan pesanan Anda. Lokasi saya sekarang dekat dengan Anda.`,
          timestamp: new Date()
        }
      ])
    }, 1000)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedCourier) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Simulate courier response
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'courier',
          message: 'Baik, pesan diterima. Saya segera menuju lokasi Anda.',
          timestamp: new Date()
        }
        setChatMessages(prev => [...prev, response])
      }, 1000)
    }
  }

  const startOrder = () => {
    if (selectedCourier) {
      alert(`Pesanan telah dibuat! ${selectedCourier.name} akan segera menghubungi Anda.\n\nEstimasi waktu: ${estimatedTime} menit\nBiaya: Rp ${deliveryCost.toLocaleString('id-ID')}`)
      setShowCourierMap(false)
      setSelectedCourier(null)
      setIsTracking(false)
      setChatMessages([])
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div 
                className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent cursor-pointer" 
                onClick={() => window.location.reload()}
              >
                MyBisnis
              </div>
            </div>
            <nav className="flex items-center gap-4">
              {/* Language Switch */}
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              >
                <Globe2 className="w-4 h-4 mr-2" />
                {language === 'id' ? 'EN' : 'ID'}
              </Button>

              {currentUser ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">Welcome, {currentUser.name}</span>
                    <Badge variant="outline" className="border-amber-500 text-amber-400">
                      {currentUser.role}
                    </Badge>
                  </div>
                  {currentUser.role === 'penjual' && (
                    <Button className="bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-full transition-all duration-300 hover:scale-105" onClick={() => window.location.href = '/dashboard'}>
                      Dashboard
                    </Button>
                  )}
                  {currentUser.role === 'admin' && (
                    <Button className="bg-red-500 text-white hover:bg-red-400 rounded-full transition-all duration-300 hover:scale-105" onClick={() => window.location.href = '/admin'}>
                      Admin
                    </Button>
                  )}
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-105" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 rounded-full transition-all duration-300 hover:scale-105" onClick={() => setShowRegisterModal(true)}>
                    {t.daftar}
                  </Button>
                  <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full transition-all duration-300 hover:scale-105" onClick={() => setShowLoginModal(true)}>
                    {t.login}
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105" onClick={() => setShowGuideModal(true)} aria-label="Panduan memulai bisnis">
              {t.mulaiSekarang}
            </Button>
            <Button size="lg" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105" onClick={() => setShowCourierMap(true)} aria-label="Pesan layanan pengiriman">
              <Truck className="w-5 h-5 mr-2" />
              {t.orderOjek}
            </Button>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Cara Kerja MyBisnis
          </h2>
          <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
            Proses sederhana untuk memulai bisnis online Anda
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                number: '1', 
                title: 'Daftar Gratis', 
                description: 'Pilih role Anda sebagai Pembeli, Penjual, atau Pengirim dan lengkapi data diri untuk memulai.',
                icon: <User className="w-8 h-8 text-amber-400" />,
                color: 'from-blue-500 to-blue-600'
              },
              { 
                number: '2', 
                title: 'Setup Profil', 
                description: 'Untuk penjual: buat toko dengan nama custom. Untuk pengirim: upload informasi kendaraan.',
                icon: <Map className="w-8 h-8 text-amber-400" />,
                color: 'from-green-500 to-green-600'
              },
              { 
                number: '3', 
                title: 'Upload Produk', 
                description: 'Tambahkan produk dengan foto, harga, dan deskripsi. Atur pengiriman untuk setiap item.',
                icon: <Package className="w-8 h-8 text-amber-400" />,
                color: 'from-purple-500 to-purple-600'
              },
              { 
                number: '4', 
                title: 'Mulai Jual', 
                description: 'Terima order, proses pembayaran, dan kirim produk. Kelola bisnis dari dashboard.',
                icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
                color: 'from-red-500 to-red-600'
              }
            ].map((step, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
                <CardContent className="p-6 text-center">
                  <div className="text-amber-400 font-bold text-lg mb-2">
                    Step {step.number}
                  </div>
                  <div className="mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Fitur Unggulan
          </h2>
          <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mengembangkan bisnis UMKM
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Store className="w-12 h-12 text-amber-400" />,
                title: 'Toko Online Profesional',
                description: 'Buat toko online dengan brand custom, domain pilihan, dan desain responsif.'
              },
              {
                icon: <ShoppingCart className="w-12 h-12 text-amber-400" />,
                title: 'Marketplace Terintegrasi',
                description: 'Jual produk di marketplace dengan sistem pembayaran dan pengiriman terpadu.'
              },
              {
                icon: <Truck className="w-12 h-12 text-amber-400" />,
                title: 'Layanan Pengiriman',
                description: 'Kelola pengiriman dengan tracking real-time dan multiple kurir.'
              },
              {
                icon: <CreditCard className="w-12 h-12 text-amber-400" />,
                title: 'Payment Gateway',
                description: 'Terima pembayaran via QRIS, transfer bank, dan e-wallet.'
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-amber-400" />,
                title: 'Analytics Dashboard',
                description: 'Monitor penjualan, pengunjung, dan performa bisnis secara real-time.'
              },
              {
                icon: <HeadphonesIcon className="w-12 h-12 text-amber-400" />,
                title: 'Support 24/7',
                description: 'Tim support siap membantu Anda kapan saja dibutuhkan.'
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Products */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Produk Lokal Populer
          </h2>
          <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
            Jelajahi berbagai produk UMKM terbaik di marketplace kami
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                name: 'Lolosi Bakar',
                category: 'Ikan',
                price: 'Rp 25.000',
                store: 'Dapur Pesisir',
                description: 'Ikan lolosi segar dibakar perlahan, gurih, wangi, cocok dimakan rame-rame.',
                image: '🐟',
                rating: 4.9,
                clicks: 210,
                orders: 98,
              },
              {
                name: 'Barber Home Service',
                category: 'Jasa',
                price: 'Rp 30.000',
                store: 'Barber Panggilan',
                description: 'Potong rambut rapi, barber datang langsung ke rumah kamu.',
                image: '💈',
                rating: 4.8,
                clicks: 180,
                orders: 76,
              },
              {
                name: "Tinutuan Ma'Ja",
                category: 'Makanan Vegan',
                price: 'Rp 25.000',
                store: 'Dapur Sehat',
                description: 'Bubur Manado asli, sehat, hangat, tanpa MSG.',
                image: '🥣',
                rating: 4.9,
                clicks: 165,
                orders: 82,
              },
              {
                name: 'Yondok Bokaka',
                category: 'Sayuran',
                price: 'Rp 10.000',
                store: 'Kebun Kampung',
                description: 'Sayur kampung segar, dipetik pagi, langsung dijual.',
                image: '🥬',
                rating: 4.7,
                clicks: 132,
                orders: 54,
              },
              {
                name: 'Goroho Songara',
                category: 'Olahan Pisang',
                price: 'Rp 15.000',
                store: 'Dapur Goroho',
                description: 'Pisang goroho goreng khas, renyah di luar, lembut di dalam.',
                image: '🍌',
                rating: 4.8,
                clicks: 190,
                orders: 91,
              },
              {
                name: 'Durian Bakan',
                category: 'Buah',
                price: 'Rp 100.000',
                store: 'Kebun Durian',
                description: 'Durian lokal legit, manis pahit pas, daging tebal.',
                image: '🥭',
                rating: 4.9,
                clicks: 240,
                orders: 64,
              },
              {
                name: 'Kopi Korot',
                category: 'Minuman',
                price: 'Rp 10.000',
                store: 'Kopi Kampung',
                description: 'Kopi hitam khas kampung, kuat dan bikin melek.',
                image: '☕',
                rating: 4.6,
                clicks: 155,
                orders: 70,
              },
              {
                name: 'Sangkara Nangka',
                category: 'Pisang Goreng',
                price: 'Rp 10.000',
                store: 'Gorengan Sore',
                description: 'Pisang goreng nangka, harum, legit, teman ngopi sore.',
                image: '🍯',
                rating: 4.7,
                clicks: 148,
                orders: 63,
              },
              {
                name: 'Kangkong Cha Mertua',
                category: 'Sayur Masak',
                price: 'Rp 15.000',
                store: 'Dapur Rumah',
                description: 'Tumis kangkung pedas khas rumah, dijamin nagih.',
                image: '🥘',
                rating: 4.8,
                clicks: 172,
                orders: 79,
              },
              {
                name: 'Daging Segar',
                category: 'Daging',
                price: 'Rp 125.000 / KG',
                store: 'Lapak Daging',
                description: 'Daging segar potong harian, siap masak.',
                image: '🥩',
                rating: 4.9,
                clicks: 198,
                orders: 58,
              },
              {
                name: 'Ikan Fresco Segar',
                category: 'Ikan',
                price: 'Rp 50.000',
                store: 'Nelayan Pagi',
                description: 'Ikan laut segar, baru naik dari perahu.',
                image: '🐠',
                rating: 4.8,
                clicks: 186,
                orders: 73,
              },
              {
                name: 'Nasi Kuning Kampung',
                category: 'Makanan',
                price: 'Rp 15.000',
                store: 'Dapur Pagi',
                description: 'Nasi kuning sederhana, lauk lengkap, rasa rumah.',
                image: '🍚',
                rating: 4.9,
                clicks: 220,
                orders: 101,
              },
            ].map((product, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer">
                <CardContent className="p-4">
                  <div className="text-4xl mb-3 text-center">{product.image}</div>
                  <h3 className="font-semibold text-amber-400 mb-1">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-1">{product.category} • {product.store}</p>
                  <p className="text-xl font-bold text-white mb-2">{product.price}</p>
                  <p className="text-slate-300 text-sm">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.location.href = '/marketplace'
            }}
          >
            Lihat Marketplace
          </Button>
        </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Dukungan Untuk UMKM
          </h2>
          <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
            Kami berkomitmen membantu pengusaha kecil menjangkau pasar lebih luas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'UMKM Bergabung', icon: <Store className="w-8 h-8 text-amber-400" /> },
              { number: '50,000+', label: 'Produk Terjual', icon: <ShoppingCart className="w-8 h-8 text-amber-400" /> },
              { number: '100+', label: 'Kota Tercover', icon: <MapPin className="w-8 h-8 text-amber-400" /> },
              { number: '24/7', label: 'Support', icon: <HeadphonesIcon className="w-8 h-8 text-amber-400" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Website Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Order Website Profesional
          </h2>
          <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
            Butuh website khusus untuk bisnis Anda? Kami buatkan website profesional dengan harga terjangkau
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {[
        {
          name: 'Paket Pemula',
          price: 'Rp 250.000',
          pages: '1 Page',
          domain: 'Domain Random',
          features: [
            '1 halaman landing page',
            'Domain random (.site / .web)',
            'Design simple & cepat',
            'Mobile friendly',
            'Cocok untuk coba-coba bisnis'
          ],
          type: 'pemula'
        },
        {
          name: 'Paket Starter',
          price: 'Rp 500.000',
          pages: '1 Page',
          domain: 'Domain sesuai nama',
          features: [
            '1 halaman website',
            'Domain sesuai nama usaha',
            'Desain lebih rapi',
            'Mobile friendly',
            'Cocok untuk UMKM kecil'
          ],
          type: 'starter'
        },
        {
          name: 'Paket Standard',
          price: 'Rp 1.500.000',
          pages: '1–3 Pages',
          domain: '.com',
          features: [
            '1–3 halaman website',
            'Domain .com',
            'Desain profesional',
            'SEO basic',
            'Fast loading'
          ],
          type: 'standard'
        },
        {
          name: 'Paket Pro',
          price: 'Rp 5.000.000',
          pages: '1–5 Pages',
          domain: 'Sesuai request',
          features: [
            '1–5 halaman',
            'Domain sesuai request',
            'UI/UX profesional',
            'SEO optimasi',
            'Fast loading'
          ],
          type: 'pro'
        },
        {
          name: 'Paket Advance',
          price: 'Rp 10.000.000',
          pages: '5–10 Pages',
          domain: '2 Domain + backlink',
          features: [
            '5–10 halaman website',
            '2 domain',
            'Backlink',
            'SEO optimasi',
            'Fast performance'
          ],
          type: 'advance'
        },
        {
          name: 'Paket Enterprise',
          price: 'Rp 15.000.000',
          pages: 'Unlimited',
          domain: '2–5 Domain',
          features: [
            'Unlimited halaman',
            '2–5 domain backup',
            'SEO full',
            'Fast loading',
            'API integration',
            'Backup data'
          ],
          type: 'enterprise'
        },
        {
          name: 'Paket International',
          price: 'Rp 25.000.000',
          pages: 'Sesuai request',
          domain: 'International',
          features: [
            'Semua fitur enterprise',
            'Multi bahasa',
            'Maps integration',
            'Message integration',
            'Support 1 tahun',
            'International ready'
          ],
          type: 'international'
        }
      ].map((pkg, index) => (
        <Card
          key={index}
          className={`bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer ${
            selectedWebsiteType === pkg.type ? 'ring-2 ring-amber-500' : ''
          }`}
          onClick={() => setSelectedWebsiteType(pkg.type)}
        >
          <CardHeader>
            <CardTitle className="text-amber-400">{pkg.name}</CardTitle>
            <div className="text-3xl font-bold text-amber-400">{pkg.price}</div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-1">{pkg.pages}</p>
            <p className="text-slate-400 text-sm mb-3">{pkg.domain}</p>
            <ul className="space-y-1 text-slate-300 text-sm">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => setShowWebsiteOrder(true)}
            >
              <Globe className="w-5 h-5 mr-2" />
              Order Website Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* Project Credit */}
      <div className="bg-slate-800 border-t border-slate-700 py-8">
        <div className="text-center text-slate-400">
          <p>Kotabunan Project / Sample App untuk Testing</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t-2 border-slate-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
            MyBisnis by IntauMongondow
          </div>
          <p className="text-slate-400 mb-6">
            Platform UMKM Digital Indonesia. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="https://bali.enterprises" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors">
              bali.enterprises
            </a>
            <a href="https://visa.biz.id" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors">
              visa.biz.id
            </a>
            <a href="https://mybisnis.shop/proposal" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors">
              Proposal
            </a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400">{t.login}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Masuk ke akun MyBisnis Anda
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="bg-slate-700 border-slate-600 text-slate-100 pr-10" 
                  placeholder="email@example.com" 
                  required 
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <button
                    type="button"
                    className="text-slate-400 hover:text-amber-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                className="bg-slate-700 border-slate-600 text-slate-100" 
                placeholder="••••••" 
                required 
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : t.login}
            </Button>
            {/* CTA ke Daftar */}
            <div className="text-center text-sm text-slate-400 mt-4">
              Belum punya akun?{' '}
              <button
                type="button"
                className="text-amber-400 hover:text-amber-300 underline"
                onClick={() => {
                  setShowLoginModal(false)
                  setShowRegisterModal(true)
                }}
              >
                Daftar di sini
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400">{t.daftar}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Buat akun baru untuk memulai bisnis Anda
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" name="name" className="bg-slate-700 border-slate-600 text-slate-100" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" className="bg-slate-700 border-slate-600 text-slate-100" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" name="whatsapp" className="bg-slate-700 border-slate-600 text-slate-100" required />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select name="role" onValueChange={handleRoleSelect}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                    <SelectValue placeholder="Pilih role Anda" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="pembeli">Pembeli</SelectItem>
                    <SelectItem value="penjual">Penjual</SelectItem>
                    <SelectItem value="pengirim">Pengirim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input id="lokasi" name="lokasi" className="bg-slate-700 border-slate-600 text-slate-100" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showRegisterPassword ? "text" : "password"} 
                  className="bg-slate-700 border-slate-600 text-slate-100 pr-10" 
                  required 
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <button
                    type="button"
                    className="text-slate-400 hover:text-amber-400"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : t.daftar}
            </Button>
            <div className="text-center text-sm text-slate-400 mt-4">
              Sudah punya akun?{' '}
              <button
                type="button"
                className="text-amber-400 hover:text-amber-300 underline"
                onClick={() => {
                  setShowRegisterModal(false)
                  setShowLoginModal(true)
                }}
              >
                Login di sini
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Guide Modal with Formulir Penjual */}
      <Dialog open={showGuideModal} onOpenChange={setShowGuideModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400">Panduan Memulai MyBisnis</DialogTitle>
            <DialogDescription className="text-slate-400">
              Pelajari cara menggunakan platform MyBisnis untuk mengembangkan bisnis Anda
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="pembeli" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="pembeli" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Pembeli</TabsTrigger>
              <TabsTrigger value="penjual" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Penjual</TabsTrigger>
              <TabsTrigger value="pengirim" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Pengirim</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pembeli" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-400">Panduan untuk Pembeli</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Daftar Akun</h4>
                      <p className="text-slate-400">Buat akun dengan email dan nomor WhatsApp aktif</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Jelajahi Produk</h4>
                      <p className="text-slate-400">Cari produk UMKM berkualitas dari berbagai kategori</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Beli & Bayar</h4>
                      <p className="text-slate-400">Pilih produk dan bayar dengan berbagai metode pembayaran</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="penjual" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-400">Panduan untuk Penjual</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Daftar Akun Penjual</h4>
                      <p className="text-slate-400">Pilih role "Penjual" saat registrasi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Setup Toko</h4>
                      <p className="text-slate-400">Buat toko dengan nama, deskripsi, dan metode pembayaran</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Upload Produk</h4>
                      <p className="text-slate-400">Tambahkan produk dengan foto dan detail lengkap</p>
                    </div>
                  </div>
                </div> 
              </div>
            </TabsContent>
            
            <TabsContent value="pengirim" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-400">Panduan untuk Pengirim</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Daftar Akun Pengirim</h4>
                      <p className="text-slate-400">Pilih role "Pengirim" saat registrasi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Upload Data Kendaraan</h4>
                      <p className="text-slate-400">Lengkapi data kendaraan dan zona pengiriman</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-amber-300">Terima Order</h4>
                      <p className="text-slate-400">Terima order pengiriman dan selesaikan dengan baik</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Enhanced Courier Map Modal with Leaflet and Chat */}
      <Dialog open={showCourierMap} onOpenChange={setShowCourierMap}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400 flex items-center gap-2">
              <Truck className="w-6 h-6" />
              {t.orderOjek} - {t.trackingPengiriman}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Pilih driver pengiriman dan lacak perjalanan secara real-time
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-amber-400">{t.driverTerdekat}</h3>
                <Badge className={isTracking ? "bg-green-500" : "bg-slate-500"}>
                  {isTracking ? 'Tracking Aktif' : 'Pilih Driver'}
                </Badge>
              </div>
              
              {/* Leaflet Map */}
              <div className="h-96 bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
                {typeof window !== 'undefined' && (
                  <MapContainer
                    center={[userLocation?.lat || -6.2088, userLocation?.lng || 106.8456]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    whenReady={() => setMapReady(true)}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && (
                      <Marker position={[userLocation.lat, userLocation.lng]}>
                        <Popup>
                          <div className="text-slate-900">
                            <strong>Lokasi Anda</strong>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                    {couriers.filter(c => c.status === 'online').map((courier) => (
                      <Marker 
                        key={courier.id}
                        position={[courier.lat, courier.lng]}
                        eventHandlers={{
                          click: () => handleSelectCourier(courier)
                        }}
                      >
                        <Popup>
                          <div className="text-slate-900 p-2">
                            <div className="font-semibold">{courier.name}</div>
                            <div className="text-sm">{courier.type} - {courier.vehicle}</div>
                            <div className="text-sm">Status: {courier.status}</div>
                            <div className="text-sm">Rating: {courier.rating}/5.0</div>
                            <div className="text-sm">Orders: {courier.completedOrders}</div>
                            <Button 
                              size="sm" 
                              className="mt-2 bg-amber-500 text-slate-900 hover:bg-amber-400 w-full"
                              onClick={() => handleSelectCourier(courier)}
                            >
                              {t.pilihDriver}
                            </Button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
              
              {/* Selected Courier Info */}
              {selectedCourier && (
                <Card className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-amber-400">{selectedCourier.name}</h4>
                        <p className="text-slate-300 text-sm">{selectedCourier.type} - {selectedCourier.vehicle}</p>
                        <p className="text-slate-400 text-xs">Zona: {selectedCourier.zone}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-300">{selectedCourier.rating}/5.0</span>
                        </div>
                        <Badge className={selectedCourier.status === 'online' ? 'bg-green-500' : 'bg-slate-500'}>
                          {selectedCourier.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">{t.estimasiWaktu}:</span>
                        <span className="text-amber-400 font-semibold">{estimatedTime} menit</span>
                      </div>
                      <div>
                        <span className="text-slate-400">{t.biayaPengiriman}:</span>
                        <span className="text-amber-400 font-semibold">Rp {deliveryCost.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-full mt-4"
                      onClick={startOrder}
                      disabled={!isTracking}
                    >
                      {isTracking ? 'Sedang Dalam Perjalanan...' : 'Mulai Order'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Chat Section */}
            {selectedCourier && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {t.chatDriver} - {selectedCourier.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Phone className="w-4 h-4 mr-1" />
                      {selectedCourier.phone}
                    </Button>
                  </div>
                </div>
                
                <Card className="bg-slate-700/50 border-slate-600 flex-1">
                  <CardContent className="p-4 h-96 flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-slate-400 py-8">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Belum ada pesan. Mulai chat dengan driver.</p>
                        </div>
                      ) : (
                        chatMessages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[70%] p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-amber-500 text-slate-900' 
                                  : 'bg-slate-600 text-slate-100'
                              }`}
                            >
                              <div className="text-xs opacity-70 mb-1">
                                {msg.sender === 'user' ? 'Anda' : selectedCourier.name} • {new Date(msg.timestamp).toLocaleTimeString()}
                              </div>
                              <div>{msg.message}</div>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={chatEndRef} />
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t.kirimPesan}
                        className="flex-1 bg-slate-600 border-slate-500 text-slate-100"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-amber-500 text-slate-900 hover:bg-amber-400"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Website Order Modal */}
      <Dialog open={showWebsiteOrder} onOpenChange={setShowWebsiteOrder}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400">Order Website Profesional</DialogTitle>
            <DialogDescription className="text-slate-400">
              Pilih jenis website yang sesuai dengan kebutuhan bisnis Anda
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWebsiteOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { type: 'personal', icon: <User className="w-6 h-6" />, name: 'Website Orang/Tokoh' },
                { type: 'fruits', icon: <Apple className="w-6 h-6" />, name: 'Jualan Buah/Sayur' },
                { type: 'coffee', icon: <Coffee className="w-6 h-6" />, name: 'Kedai Kopi' },
                { type: 'shop', icon: <Building2 className="w-6 h-6" />, name: 'Toko Online' },
                { type: 'office', icon: <Building2 className="w-6 h-6" />, name: 'Kantor' },
                { type: 'company', icon: <Building2 className="w-6 h-6" />, name: 'Perusahaan' }
              ].map((item, index) => (
                <Card 
                  key={index} 
                  className={`bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer ${
                    selectedWebsiteType === item.type ? 'ring-2 ring-amber-500' : ''
                  }`}
                  onClick={() => setSelectedWebsiteType(item.type)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-2 flex justify-center">{item.icon}</div>
                    <h3 className="font-semibold text-amber-400">{item.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Label htmlFor="package">Pilih Paket</Label>
              <Select name="package">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Pilih paket website" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="pemula">
                    Paket Pemula — Rp 250.000 (1 Page)
                  </SelectItem>
                  <SelectItem value="starter">
                    Paket Starter — Rp 500.000 (1 Page)
                  </SelectItem>
                  <SelectItem value="standard">
                    Paket Standard — Rp 1.500.000 (1–3 Pages)
                  </SelectItem>
                  <SelectItem value="pro">
                    Paket Pro — Rp 5.000.000 (1–5 Pages)
                  </SelectItem>
                  <SelectItem value="advance">
                    Paket Advance — Rp 10.000.000 (5–10 Pages)
                  </SelectItem>
                  <SelectItem value="enterprise">
                    Paket Enterprise — Rp 15.000.000 (Unlimited)
                  </SelectItem>
                  <SelectItem value="international">
                    Paket International — Rp 25.000.000 (International)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" name="name" className="bg-slate-700 border-slate-600 text-slate-100 rounded-lg" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" className="bg-slate-700 border-slate-600 text-slate-100 rounded-lg" required />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsi Website</Label>
              <Textarea id="description" name="description" className="bg-slate-700 border-slate-600 text-slate-100 rounded-lg" rows={4} placeholder="Jelaskan kebutuhan website Anda..." />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full">
              Order Website Sekarang
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}