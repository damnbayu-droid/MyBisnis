'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Store, Truck, Upload, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface RoleUpgradeModalProps {
    isOpen: boolean
    onClose: () => void
    currentUser: any
    onUpgradeSuccess: (newRole: string) => void
}

export default function RoleUpgradeModal({ isOpen, onClose, currentUser, onUpgradeSuccess }: RoleUpgradeModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('seller')

    // Form States
    const [storeName, setStoreName] = useState('')
    const [storeType, setStoreType] = useState('')
    const [driverType, setDriverType] = useState('')

    const handleUpgrade = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API Call
        setTimeout(() => {
            setIsLoading(false)
            toast.success(`Berhasil upgrade ke akun ${activeTab === 'seller' ? 'Penjual' : 'Driver'}!`)
            onUpgradeSuccess(activeTab === 'seller' ? 'seller' : 'driver')
            onClose()
        }, 1500)

        // In real app: Call API to update public.users role or create related profile (stores/couriers table)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        Upgrade Akun Bisnis
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Mulai berjualan atau menjadi driver untuk meningkatkan penghasilan Anda.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="seller" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                        <TabsTrigger value="seller" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                            <Store className="w-4 h-4 mr-2" /> Penjual
                        </TabsTrigger>
                        <TabsTrigger value="driver" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                            <Truck className="w-4 h-4 mr-2" /> Driver
                        </TabsTrigger>
                    </TabsList>

                    {/* SELLER FORM */}
                    <TabsContent value="seller" className="space-y-4 py-4">
                        <form onSubmit={handleUpgrade} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="storeName">Nama Toko</Label>
                                    <Input
                                        id="storeName"
                                        className="bg-slate-800 border-slate-700"
                                        placeholder="Contoh: Toko Berkah"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storeType">Jenis Toko</Label>
                                    <Select onValueChange={setStoreType} required>
                                        <SelectTrigger className="bg-slate-800 border-slate-700">
                                            <SelectValue placeholder="Pilih Jenis Toko" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                            <SelectItem value="retail">Retail / Kelontong</SelectItem>
                                            <SelectItem value="fnb">Makanan & Minuman</SelectItem>
                                            <SelectItem value="fashion">Fashion & Pakaian</SelectItem>
                                            <SelectItem value="electronic">Elektronik & Gadget</SelectItem>
                                            <SelectItem value="service">Jasa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="storeDesc">Keterangan Toko</Label>
                                <Textarea
                                    id="storeDesc"
                                    className="bg-slate-800 border-slate-700"
                                    placeholder="Jelaskan apa yang Anda jual..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="storeAddress">Alamat Toko</Label>
                                <Input
                                    id="storeAddress"
                                    className="bg-slate-800 border-slate-700"
                                    placeholder="Alamat lengkap toko fisik (jika ada)"
                                />
                            </div>

                            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm text-slate-400">
                                <p className="flex items-center gap-2 mb-2 text-amber-500 font-semibold">
                                    <AlertCircle className="w-4 h-4" /> Link Toko Otomatis
                                </p>
                                <p>Link toko Anda akan dibuat secara otomatis: <span className="text-white font-mono">mybisnis.com/store/{storeName.toLowerCase().replace(/\s+/g, '-')}</span></p>
                            </div>

                            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
                                <p className="mb-2 font-semibold text-white">Metode Pembayaran yang didukung:</p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">QRIS</span>
                                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">Bank Transfer</span>
                                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">Cash / COD</span>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">*Anda dapat mengatur detail pembayaran di Dashboard setelah terdaftar.</p>
                            </div>

                            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" disabled={isLoading}>
                                {isLoading ? 'Memproses...' : 'Daftar Jadi Penjual'}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* DRIVER FORM */}
                    <TabsContent value="driver" className="space-y-4 py-4">
                        <form onSubmit={handleUpgrade} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="driverType">Jenis Kendaraan</Label>
                                <Select onValueChange={setDriverType} required>
                                    <SelectTrigger className="bg-slate-800 border-slate-700">
                                        <SelectValue placeholder="Pilih Jenis Kendaraan" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="ojek">Ojek (Motor)</SelectItem>
                                        <SelectItem value="bentor">Bentor / Becak / Delman (Roda 3/Hewan)</SelectItem>
                                        <SelectItem value="car">Taxi / Mobil Pribadi</SelectItem>
                                        <SelectItem value="pickup">Pickup / Box / Truk</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Upload Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Foto Kendaraan</Label>
                                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
                                        <Upload className="w-8 h-8 text-slate-500 mb-2" />
                                        <span className="text-xs text-slate-400">Upload Foto</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Foto Plat Nomor</Label>
                                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
                                        <Upload className="w-8 h-8 text-slate-500 mb-2" />
                                        <span className="text-xs text-slate-400">Upload Foto</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Foto STNK (Aktif/Non-Aktif)</Label>
                                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
                                        <Upload className="w-8 h-8 text-slate-500 mb-2" />
                                        <span className="text-xs text-slate-400">Upload Foto</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Foto Diri (Driver)</Label>
                                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
                                        <Upload className="w-8 h-8 text-slate-500 mb-2" />
                                        <span className="text-xs text-slate-400">Upload Foto</span>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" disabled={isLoading}>
                                {isLoading ? 'Memproses...' : 'Daftar Jadi Driver'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
