'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Truck, MapPin, TrendingUp, DollarSign, Target, Navigation, LogOut, Home, Camera, Upload, Plus, Minus, Users, Package, Star, MessageSquare, Phone, Mail } from 'lucide-react'

interface CourierData {
  courier_id: string
  user_id: string
  tipe: string
  kendaraan: string
  zona: string
  latitude: number
  longitude: number
  online: boolean
  pendapatan_harian: number
  target_pengantaran: number
  kilometer_harian: number
  created_at: string
  foto_driver?: string
  foto_kendaraan?: string
  foto_plat_nomor?: string
  foto_stnk?: string
}

interface Order {
  id: string
  customer_name: string
  customer_phone: string
  pickup_address: string
  delivery_address: string
  items: string
  status: string
  created_at: string
  completed_at?: string
}

export default function CourierDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [courierData, setCourierData] = useState<CourierData | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showOnlineModal, setShowOnlineModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    dailyEarnings: 0,
    monthlyEarnings: 0,
    dailyTarget: 0,
    dailyDistance: 0
  })

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      if (userData.role === 'pengirim') {
        fetchCourierData(userData.user_id)
        fetchOrders(userData.user_id)
      } else {
        window.location.href = '/'
      }
    } else {
      window.location.href = '/'
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
          console.log('Error getting location:', error)
        }
      )
    }
  }, [])

  const fetchCourierData = async (userId: string) => {
    try {
      const response = await fetch(`/api/couriers?user_id=${userId}`)
      const data = await response.json()

      if (response.ok && data.length > 0) {
        setCourierData(data[0])
        calculateStats(data[0])
      }
    } catch (error) {
      console.error('Error fetching courier data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async (userId: string) => {
    try {
      // Mock orders data (in real app, this would come from API)
      const mockOrders: Order[] = [
        {
          id: '1',
          customer_name: 'Budi Santoso',
          customer_phone: '+62 812-3456-7890',
          pickup_address: 'Jl. Sudirman No. 123, Jakarta',
          delivery_address: 'Jl. Gatot Subroto No. 456, Jakarta',
          items: '2 Paket - Makanan',
          status: 'pending',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          customer_name: 'Siti Nurhaliza',
          customer_phone: '+62 813-9876-5432',
          pickup_address: 'Jl. Thamrin No. 789, Jakarta',
          delivery_address: 'Jl. Rasuna Said No. 321, Jakarta',
          items: '1 Dokumen - Penting',
          status: 'completed',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          completed_at: new Date(Date.now() - 43200000).toISOString()
        }
      ]
      setOrders(mockOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const calculateStats = (courier: CourierData) => {
    const totalOrders = orders.length
    const completedOrders = orders.filter(o => o.status === 'completed').length
    const dailyEarnings = courier.pendapatan_harian
    const monthlyEarnings = dailyEarnings * 30
    const dailyTarget = courier.target_pengantaran || 10
    const dailyDistance = courier.kilometer_harian || 0

    setStats({
      totalOrders,
      completedOrders,
      dailyEarnings,
      monthlyEarnings,
      dailyTarget,
      dailyDistance
    })
  }

  const handleToggleOnline = async () => {
    if (!courierData) return

    try {
      const newStatus = !courierData.online
      const response = await fetch(`/api/couriers/${courierData.courier_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          online: newStatus,
          latitude: userLocation?.lat,
          longitude: userLocation?.lng
        })
      })

      if (response.ok) {
        setCourierData({
          ...courierData,
          online: newStatus,
          latitude: userLocation?.lat || courierData.latitude,
          longitude: userLocation?.lng || courierData.longitude
        })
        alert(newStatus ? 'Anda sekarang online!' : 'Anda sekarang offline!')
      } else {
        alert('Gagal mengubah status')
      }
    } catch (error) {
      alert('Terjadi kesalahan')
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!courierData) return

    try {
      const formData = new FormData(e.currentTarget)
      const updateData = {
        tipe: formData.get('tipe'),
        kendaraan: formData.get('kendaraan'),
        zona: formData.get('zona'),
        target_pengantaran: parseInt(formData.get('target_pengantaran') as string)
      }

      const response = await fetch(`/api/couriers/${courierData.courier_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        setCourierData({
          ...courierData,
          ...updateData
        })
        setShowProfileModal(false)
        alert('Profil berhasil diperbarui!')
      } else {
        alert('Gagal memperbarui profil')
      }
    } catch (error) {
      alert('Terjadi kesalahan')
    }
  }

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed', completed_at: new Date().toISOString() }
        : order
    ))
    alert('Pesanan selesai!')
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
          <p className="mt-4 text-slate-400">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!courierData) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">Data courier tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div 
                className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent cursor-pointer" 
                onClick={() => window.location.href = '/'}
              >
                MyBisnis
              </div>
              <Badge variant="outline" className="border-amber-500 text-amber-400">
                Courier Dashboard
              </Badge>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300 text-sm">
                  {courierData.tipe.toUpperCase()} - {courierData.kendaraan}
                </span>
                <Badge className={courierData.online ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}>
                  {courierData.online ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-full"
                onClick={() => window.location.href = '/marketplace'}
              >
                <Home className="w-4 h-4 mr-2" />
                Marketplace
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-full"
                onClick={() => setShowProfileModal(true)}
              >
                Profile
              </Button>
              <Button 
                size="sm"
                className={courierData.online ? 'bg-red-500 text-white hover:bg-red-400' : 'bg-green-500 text-white hover:bg-green-400'}
                onClick={handleToggleOnline}
              >
                {courierData.online ? 'Go Offline' : 'Go Online'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-full"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Order</CardTitle>
              <Package className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">{stats.totalOrders}</div>
              <p className="text-xs text-slate-400">Semua pesanan</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Selesai</CardTitle>
              <Users className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">{stats.completedOrders}</div>
              <p className="text-xs text-slate-400">Pesanan selesai</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Target Hari Ini</CardTitle>
              <Target className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">{stats.dailyTarget}</div>
              <p className="text-xs text-slate-400">Pengantaran</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Pendapatan Hari Ini</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">
                Rp {stats.dailyEarnings.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-slate-400">Penghasilan</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Pendapatan Bulanan</CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">
                Rp {stats.monthlyEarnings.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-slate-400">Estimasi</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Jarak Hari Ini</CardTitle>
              <Navigation className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">{stats.dailyDistance} km</div>
              <p className="text-xs text-slate-400">Kilometer</p>
            </CardContent>
          </Card>
        </div>

        {/* Location and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-amber-400">Lokasi & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Status Saat Ini</Label>
                <Badge className={courierData.online ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}>
                  {courierData.online ? 'Online - Menerima Pesanan' : 'Offline - Tidak Menerima Pesanan'}
                </Badge>
              </div>
              <div>
                <Label className="text-slate-300">Zona Operasional</Label>
                <p className="text-slate-300">{courierData.zona || 'Belum ditetapkan'}</p>
              </div>
              <div>
                <Label className="text-slate-300">Koordinat GPS</Label>
                <p className="text-slate-300">
                  {courierData.latitude && courierData.longitude 
                    ? `Lat: ${courierData.latitude}, Lng: ${courierData.longitude}`
                    : 'Belum tersedia'
                  }
                </p>
              </div>
              <Button 
                className="w-full bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-full"
                onClick={handleToggleOnline}
              >
                {courierData.online ? 'Go Offline' : 'Go Online'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-amber-400">Informasi Kendaraan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Tipe Pengiriman</Label>
                <p className="text-slate-300 capitalize">{courierData.tipe}</p>
              </div>
              <div>
                <Label className="text-slate-300">Kendaraan</Label>
                <p className="text-slate-300">{courierData.kendaraan || 'Belum diisi'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {courierData.foto_driver && (
                  <div>
                    <Label className="text-slate-300">Foto Driver</Label>
                    <div className="w-full h-24 bg-slate-600 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>
                )}
                {courierData.foto_kendaraan && (
                  <div>
                    <Label className="text-slate-300">Foto Kendaraan</Label>
                    <div className="w-full h-24 bg-slate-600 rounded-lg flex items-center justify-center">
                      <Truck className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-amber-400">Pesanan Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Belum ada pesanan hari ini</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-amber-400">{order.customer_name}</h4>
                        <p className="text-slate-300 text-sm">{order.customer_phone}</p>
                        <p className="text-slate-400 text-sm">Pickup: {order.pickup_address}</p>
                        <p className="text-slate-400 text-sm">Delivery: {order.delivery_address}</p>
                        <p className="text-slate-300 text-sm">Items: {order.items}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={
                          order.status === 'completed' ? 'bg-green-500 text-white' :
                          order.status === 'pending' ? 'bg-yellow-500 text-white' :
                          'bg-blue-500 text-white'
                        }>
                          {order.status === 'completed' ? 'Selesai' :
                           order.status === 'pending' ? 'Menunggu' : 'Proses'}
                        </Badge>
                        {order.status === 'pending' && (
                          <Button 
                            size="sm"
                            className="bg-green-500 text-white hover:bg-green-400 rounded-full"
                            onClick={() => handleCompleteOrder(order.id)}
                          >
                            Selesaikan
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Dibuat: {new Date(order.created_at).toLocaleString()}
                      {order.completed_at && (
                        <span className="ml-4">
                          Selesai: {new Date(order.completed_at).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-amber-400">Edit Profil Courier</DialogTitle>
            <DialogDescription className="text-slate-400">
              Perbarui informasi profil Anda
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipe">Tipe Pengiriman</Label>
                <Select name="tipe" defaultValue={courierData.tipe}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="ompreng">Ompreng</SelectItem>
                    <SelectItem value="bentor">Bentor</SelectItem>
                    <SelectItem value="deliv">Deliv</SelectItem>
                    <SelectItem value="roda4">Roda 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="kendaraan">Kendaraan</Label>
                <Input id="kendaraan" name="kendaraan" defaultValue={courierData.kendaraan} className="bg-slate-700 border-slate-600 text-slate-100" />
              </div>
              <div>
                <Label htmlFor="zona">Zona Operasional</Label>
                <Input id="zona" name="zona" defaultValue={courierData.zona} className="bg-slate-700 border-slate-600 text-slate-100" />
              </div>
              <div>
                <Label htmlFor="target_pengantaran">Target Pengantaran/Hari</Label>
                <Input id="target_pengantaran" name="target_pengantaran" type="number" defaultValue={courierData.target_pengantaran?.toString()} className="bg-slate-700 border-slate-600 text-slate-100" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-full">
              Simpan Perubahan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}