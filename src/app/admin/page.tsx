'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, Store, Package, Truck, TrendingUp, LogOut, Home, Shield, Star, Eye, EyeOff, Check, X, Crown, UserCheck, AlertTriangle, Ban, CheckCircle } from 'lucide-react'

interface User {
  user_id: string
  name: string
  email: string
  whatsapp?: string
  role: string
  status: string
  lokasi?: string
  created_at: string
  verified?: boolean
  parent_admin_id?: string
}

interface Store {
  store_id: string
  nama_toko: string
  jenis_toko?: string
  link_toko: string
  owner: {
    name: string
    email: string
  }
  verified: boolean
  created_at: string
  _count: {
    products: number
  }
}

interface SystemStats {
  totalUsers: number
  totalStores: number
  totalProducts: number
  totalCouriers: number
  totalOrders: number
  pendingVerifications: number
}

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [users, setUsers] = useState<User[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [couriers, setCouriers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [adminAction, setAdminAction] = useState<'verify' | 'hold' | 'suspend' | 'block' | 'promote' | null>(null)
  const [actionReason, setActionReason] = useState('')

  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalStores: 0,
    totalProducts: 0,
    totalCouriers: 0,
    totalOrders: 0,
    pendingVerifications: 0
  })

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role === 'admin') {
        setCurrentUser(userData)
        fetchData()
      } else {
        window.location.href = '/'
      }
    } else {
      window.location.href = '/'
    }
  }, [])

  const fetchData = async () => {
    try {
      const [usersRes, storesRes, productsRes, couriersRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/stores'),
        fetch('/api/products'),
        fetch('/api/couriers')
      ])

      const usersData = await usersRes.json()
      const storesData = await storesRes.json()
      const productsData = await productsRes.json()
      const couriersData = await couriersRes.json()

      if (usersRes.ok) setUsers(usersData)
      if (storesRes.ok) setStores(storesData.stores || storesData)
      if (productsRes.ok) setProducts(productsData.products || productsData)
      if (couriersRes.ok) setCouriers(couriersData)

      // Calculate stats
      const totalOrders = (productsData.products || productsData).reduce((sum: number, p: any) => sum + (p.jumlah_order || 0), 0)
      const pendingVerifications = (storesData.stores || storesData).filter((s: any) => !s.verified).length

      setStats({
        totalUsers: usersData.length || 0,
        totalStores: (storesData.stores || storesData).length || 0,
        totalProducts: (productsData.products || productsData).length || 0,
        totalCouriers: couriersData.length || 0,
        totalOrders,
        pendingVerifications
      })

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: string, reason?: string) => {
    try {
      let updateData: any = {}

      switch (action) {
        case 'verify':
          updateData = { verified: true }
          break
        case 'hold':
          updateData = { status: 'hold' }
          break
        case 'suspend':
          updateData = { status: 'suspended' }
          break
        case 'block':
          updateData = { status: 'blocked' }
          break
        case 'promote':
          updateData = { role: 'admin', parent_admin_id: currentUser.user_id }
          break
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        // Update local state
        if (action === 'verify') {
          setUsers(users.map(user => 
            user.user_id === userId ? { ...user, verified: true } : user
          ))
          setStores(stores.map(store => 
            store.owner.email === users.find(u => u.user_id === userId)?.email 
              ? { ...store, verified: true } 
              : store
          ))
        } else if (action === 'promote') {
          setUsers(users.map(user => 
            user.user_id === userId ? { ...user, role: 'admin', parent_admin_id: currentUser.user_id } : user
          ))
        } else {
          setUsers(users.map(user => 
            user.user_id === userId ? { ...user, status: updateData.status } : user
          ))
        }

        // Send notification (in real app, this would be handled by notification system)
        const actionMessages = {
          verify: 'Akun Anda telah diverifikasi. Lencana verified akan ditampilkan di toko Anda.',
          hold: 'Akun Anda ditahan karena belum berlangganan. Silakan lakukan pembayaran untuk mengaktifkan kembali.',
          suspend: 'Akun Anda ditangguh sementara karena melanggar ketentuan. Hubungi admin untuk informasi lebih lanjut.',
          block: 'Akun Anda diblokir karena pelanggaran berat. Anda tidak dapat mengakses platform lagi.',
          promote: 'Selamat! Anda telah dipromosikan menjadi Admin. Anda sekarang memiliki akses terbatas.'
        }

        alert(actionMessages[action] || 'Aksi berhasil dilakukan')
        setShowUserModal(false)
        setAdminAction(null)
        setActionReason('')
      } else {
        alert('Gagal melakukan aksi')
      }
    } catch (error) {
      alert('Terjadi kesalahan server')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/'
  }

  const isMasterAdmin = currentUser?.email === 'admin@email.com'
  const canManageUsers = isMasterAdmin || (currentUser?.role === 'admin' && !currentUser?.parent_admin_id)
  const canViewStats = isMasterAdmin || currentUser?.role === 'admin'

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
              <Badge variant="outline" className="border-red-500 text-red-400">
                <Shield className="w-3 h-3 mr-1" />
                Admin Dashboard
                {isMasterAdmin && <Crown className="w-3 h-3 ml-1" />}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-300">Admin: {currentUser?.name}</span>
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
        {canViewStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
                <Users className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-400">{stats.totalUsers}</div>
                <p className="text-xs text-slate-400">Registered users</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Stores</CardTitle>
                <Store className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-400">{stats.totalStores}</div>
                <p className="text-xs text-slate-400">Active stores</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Products</CardTitle>
                <Package className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-400">{stats.totalProducts}</div>
                <p className="text-xs text-slate-400">Listed products</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Couriers</CardTitle>
                <Truck className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-400">{stats.totalCouriers}</div>
                <p className="text-xs text-slate-400">Registered couriers</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Orders</CardTitle>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-400">{stats.totalOrders}</div>
                <p className="text-xs text-slate-400">Completed orders</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Pending Verifications</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">{stats.pendingVerifications}</div>
                <p className="text-xs text-slate-400">Stores pending</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Tables */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            {canManageUsers && <TabsTrigger value="users" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Users</TabsTrigger>}
            <TabsTrigger value="stores" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Stores</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Products</TabsTrigger>
            <TabsTrigger value="couriers" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Couriers</TabsTrigger>
          </TabsList>

          {canManageUsers && (
            <TabsContent value="users">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-amber-400">Users Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-600">
                          <th className="text-left p-2 text-slate-300">Name</th>
                          <th className="text-left p-2 text-slate-300">Email</th>
                          <th className="text-left p-2 text-slate-300">Role</th>
                          <th className="text-left p-2 text-slate-300">Status</th>
                          <th className="text-left p-2 text-slate-300">Verified</th>
                          <th className="text-left p-2 text-slate-300">Location</th>
                          <th className="text-left p-2 text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.user_id} className="border-b border-slate-700 hover:bg-slate-700/50">
                            <td className="p-2 text-slate-300">{user.name}</td>
                            <td className="p-2 text-slate-300">{user.email}</td>
                            <td className="p-2">
                              <Badge variant="outline" className="border-amber-500 text-amber-400">
                                {user.role}
                                {user.parent_admin_id && <Crown className="w-3 h-3 ml-1" />}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <Badge 
                                variant="outline" 
                                className={
                                  user.status === 'active' 
                                    ? 'border-green-500 text-green-400' 
                                    : user.status === 'hold'
                                    ? 'border-yellow-500 text-yellow-400'
                                    : 'border-red-500 text-red-400'
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-2">
                              {user.verified ? (
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge className="bg-slate-500 text-white">
                                  <X className="w-3 h-3 mr-1" />
                                  Not Verified
                                </Badge>
                              )}
                            </td>
                            <td className="p-2 text-slate-300">{user.lokasi || '-'}</td>
                            <td className="p-2">
                              <div className="flex gap-2">
                                {!user.verified && isMasterAdmin && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-600 text-green-400 hover:bg-green-600/20"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setAdminAction('verify')
                                      setShowUserModal(true)
                                    }}
                                  >
                                    <UserCheck className="w-4 h-4" />
                                  </Button>
                                )}
                                {user.status !== 'hold' && isMasterAdmin && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setAdminAction('hold')
                                      setShowUserModal(true)
                                    }}
                                  >
                                    <AlertTriangle className="w-4 h-4" />
                                  </Button>
                                )}
                                {user.status !== 'suspended' && isMasterAdmin && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-orange-600 text-orange-400 hover:bg-orange-600/20"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setAdminAction('suspend')
                                      setShowUserModal(true)
                                    }}
                                  >
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                )}
                                {user.status !== 'blocked' && isMasterAdmin && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setAdminAction('block')
                                      setShowUserModal(true)
                                    }}
                                  >
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                )}
                                {user.role === 'penjual' && !user.parent_admin_id && isMasterAdmin && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-purple-600 text-purple-400 hover:bg-purple-600/20"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setAdminAction('promote')
                                      setShowUserModal(true)
                                    }}
                                  >
                                    <Crown className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="stores">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">Stores Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left p-2 text-slate-300">Store Name</th>
                        <th className="text-left p-2 text-slate-300">Owner</th>
                        <th className="text-left p-2 text-slate-300">Type</th>
                        <th className="text-left p-2 text-slate-300">Products</th>
                        <th className="text-left p-2 text-slate-300">Verified</th>
                        <th className="text-left p-2 text-slate-300">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map((store) => (
                        <tr key={store.store_id} className="border-b border-slate-700 hover:bg-slate-700/50">
                          <td className="p-2 text-slate-300">{store.nama_toko}</td>
                          <td className="p-2 text-slate-300">{store.owner.name}</td>
                          <td className="p-2 text-slate-300">{store.jenis_toko || '-'}</td>
                          <td className="p-2 text-slate-300">{store._count.products}</td>
                          <td className="p-2">
                            {store.verified ? (
                              <Badge className="bg-green-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge className="bg-slate-500 text-white">
                                <X className="w-3 h-3 mr-1" />
                                Not Verified
                              </Badge>
                            )}
                          </td>
                          <td className="p-2">
                            <a 
                              href={store.link_toko} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:text-amber-300"
                            >
                              View Store
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">Products Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left p-2 text-slate-300">Product Name</th>
                        <th className="text-left p-2 text-slate-300">Store</th>
                        <th className="text-left p-2 text-slate-300">Price</th>
                        <th className="text-left p-2 text-slate-300">Clicks</th>
                        <th className="text-left p-2 text-slate-300">Orders</th>
                        <th className="text-left p-2 text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 10).map((product) => (
                        <tr key={product.product_id} className="border-b border-slate-700 hover:bg-slate-700/50">
                          <td className="p-2 text-slate-300">{product.nama_produk}</td>
                          <td className="p-2 text-slate-300">{product.store?.nama_toko}</td>
                          <td className="p-2 text-slate-300">Rp {product.harga?.toLocaleString('id-ID')}</td>
                          <td className="p-2 text-slate-300">{product.jumlah_klik}</td>
                          <td className="p-2 text-slate-300">{product.jumlah_order}</td>
                          <td className="p-2">
                            <Badge 
                              variant="outline" 
                              className={
                                product.status === 'active' 
                                  ? 'border-green-500 text-green-400' 
                                  : 'border-red-500 text-red-400'
                              }
                            >
                              {product.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="couriers">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">Couriers Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left p-2 text-slate-300">Name</th>
                        <th className="text-left p-2 text-slate-300">Type</th>
                        <th className="text-left p-2 text-slate-300">Vehicle</th>
                        <th className="text-left p-2 text-slate-300">Zone</th>
                        <th className="text-left p-2 text-slate-300">Status</th>
                        <th className="text-left p-2 text-slate-300">Daily Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {couriers.slice(0, 10).map((courier) => (
                        <tr key={courier.courier_id} className="border-b border-slate-700 hover:bg-slate-700/50">
                          <td className="p-2 text-slate-300">{courier.user?.name}</td>
                          <td className="p-2 text-slate-300 capitalize">{courier.tipe}</td>
                          <td className="p-2 text-slate-300">{courier.kendaraan || '-'}</td>
                          <td className="p-2 text-slate-300">{courier.zona || '-'}</td>
                          <td className="p-2">
                            <Badge 
                              variant="outline" 
                              className={
                                courier.online 
                                  ? 'border-green-500 text-green-400' 
                                  : 'border-red-500 text-red-400'
                              }
                            >
                              {courier.online ? 'Online' : 'Offline'}
                            </Badge>
                          </td>
                          <td className="p-2 text-slate-300">Rp {courier.pendapatan_harian?.toLocaleString('id-ID')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Action Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-amber-400">
              {adminAction === 'verify' && 'Verifikasi User'}
              {adminAction === 'hold' && 'Hold User'}
              {adminAction === 'suspend' && 'Suspend User'}
              {adminAction === 'block' && 'Block User'}
              {adminAction === 'promote' && 'Promote to Admin'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedUser && `User: ${selectedUser.name} (${selectedUser.email})`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {adminAction === 'verify' && (
              <div className="bg-green-500/20 p-4 rounded-lg border border-green-500">
                <h4 className="text-green-400 font-semibold mb-2">Verifikasi User</h4>
                <p className="text-slate-300">User ini akan diverifikasi dan mendapatkan lencana verified di toko mereka.</p>
              </div>
            )}
            
            {adminAction === 'hold' && (
              <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500">
                <h4 className="text-yellow-400 font-semibold mb-2">Hold User</h4>
                <p className="text-slate-300">User akan ditahan karena belum berlangganan atau melanggar ketentuan.</p>
                <div>
                  <Label className="text-slate-300">Alasan (opsional)</Label>
                  <Input 
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-slate-100" 
                    placeholder="Masukkan alasan hold..."
                  />
                </div>
              </div>
            )}
            
            {adminAction === 'suspend' && (
              <div className="bg-orange-500/20 p-4 rounded-lg border border-orange-500">
                <h4 className="text-orange-400 font-semibold mb-2">Suspend User</h4>
                <p className="text-slate-300">User akan ditangguh sementara karena pelanggaran.</p>
                <div>
                  <Label className="text-slate-300">Alasan</Label>
                  <Input 
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-slate-100" 
                    placeholder="Masukkan alasan suspend..."
                  />
                </div>
              </div>
            )}
            
            {adminAction === 'block' && (
              <div className="bg-red-500/20 p-4 rounded-lg border border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Block User</h4>
                <p className="text-slate-300">User akan diblokir permanen karena pelanggaran berat.</p>
                <div>
                  <Label className="text-slate-300">Alasan</Label>
                  <Input 
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-slate-100" 
                    placeholder="Masukkan alasan block..."
                  />
                </div>
              </div>
            )}
            
            {adminAction === 'promote' && (
              <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500">
                <h4 className="text-purple-400 font-semibold mb-2">Promote to Admin</h4>
                <p className="text-slate-300">User akan dipromosikan menjadi admin dengan akses terbatas.</p>
                <div className="text-sm text-slate-400 mt-2">
                  <p><strong>Akses Admin Child:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Lihat jumlah user</li>
                    <li>Lihat jumlah produk terjual</li>
                    <li>Bisa verifikasi akun</li>
                  </ul>
                  <p className="mt-2 text-yellow-400"><strong>Username: childadmin</strong></p>
                  <p className="text-yellow-400"><strong>Password: akan diberikan oleh Admin Master</strong></p>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button 
                onClick={() => {
                  if (selectedUser) {
                    handleUserAction(selectedUser.user_id, adminAction || '', actionReason)
                  }
                }}
                className="bg-red-500 text-white hover:bg-red-400"
              >
                {adminAction === 'verify' && 'Verifikasi'}
                {adminAction === 'hold' && 'Hold User'}
                {adminAction === 'suspend' && 'Suspend User'}
                {adminAction === 'block' && 'Block User'}
                {adminAction === 'promote' && 'Promote'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowUserModal(false)
                  setAdminAction(null)
                  setActionReason('')
                  setSelectedUser(null)
                }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}