
'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Truck, MapPin, Navigation, Banknote,
    MessageSquare, Phone, Send, User,
    Bike, Car, Armchair, ChevronRight, CheckCircle2,
    XCircle, Clock, Star, AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { translations, mockCouriers, Courier } from '@/constants/landing-data'

// Dynamic Map Imports
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false })

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers not showing in production build usually, but we are using custom logic mostly.
// Defining custom icons if needed, but for now relying on default.

interface CourierMapModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    userLocation: { lat: number; lng: number } | null
    language: 'id' | 'en'
}

type OrderStep = 'details' | 'finding' | 'bargain' | 'payment' | 'tracking' | 'finished'
type VehicleType = 'ojek' | 'bentor' | 'mobil'

export default function CourierMapModal({ isOpen, onOpenChange, userLocation, language }: CourierMapModalProps) {
    const t = translations[language]

    // State
    const [step, setStep] = useState<OrderStep>('details')
    const [vehicleType, setVehicleType] = useState<VehicleType>('ojek')
    const [subType, setSubType] = useState('')
    const [notes, setNotes] = useState('')
    const [pickup, setPickup] = useState('')
    const [dropoff, setDropoff] = useState('')

    // Bargaining State
    const [userPrice, setUserPrice] = useState('15000')
    const [driverPrice, setDriverPrice] = useState('25000')
    const [bargainRound, setBargainRound] = useState(0)
    const [offers, setOffers] = useState<{ from: 'user' | 'driver', price: number }[]>([])

    // Payment & Tracking
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [selectedDriver, setSelectedDriver] = useState<Courier | null>(null)
    const [chatMessage, setChatMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'driver', text: string }[]>([])

    // Simulations
    const [driverLocation, setDriverLocation] = useState<{ lat: number, lng: number } | null>(null)
    const [orderStatus, setOrderStatus] = useState<'finding' | 'active' | 'arrived' | 'finished'>('finding')

    // Reset on Open
    useEffect(() => {
        if (isOpen) {
            setStep('details')
            setBargainRound(0)
            setOffers([])
            setChatHistory([])
            setOrderStatus('finding')
            // Set default location text if available
            if (userLocation) {
                setPickup("Lokasi Anda Saat Ini")
            }
        }
    }, [isOpen, userLocation])

    // Mock Finding Driver
    const handleCariDriver = () => {
        if (!pickup || !dropoff) {
            toast.error("Mohon isi lokasi jemput dan tujuan")
            return
        }
        setStep('finding')
        setOrderStatus('finding')

        // Simulate finding a driver after 3 seconds with animation
        setTimeout(() => {
            // Algorithm: Find best driver based on Score and Distance
            // User Request: "Follow the nearest available... and follow the score"
            // "Set Receiving Order from User is slower then higher score even he is the nearest" -> High Score = Faster Priority.

            const sortedDrivers = [...mockCouriers].sort((a, b) => {
                // Simple weighting: Score contributes 70%, Distance (negated) 30%?
                // Or simply: Sort by Score Descending. The app will "offer" the order to them first.
                // Since this is a direct booking simulation, let's pick the one with highest score that is close.

                // Let's assume all are "close enough". Sort by Score.
                return b.score - a.score
            })

            const bestDriver = sortedDrivers[0]

            setStep('bargain')
            setDriverPrice('25000') // Initial Driver Offer
            setOffers([{ from: 'driver', price: 25000 }])
            setSelectedDriver(bestDriver)
            setDriverLocation({ lat: bestDriver.lat, lng: bestDriver.lng })
            toast.info(`Driver ditemukan: ${bestDriver.name} (Score: ${bestDriver.score})`)
        }, 3000)
    }

    // Bargain Logic
    const handleBargain = (action: 'accept' | 'offer') => {
        if (action === 'accept') {
            setUserPrice(driverPrice)
            toast.success("Harga disepakati!")
            setStep('payment')
        } else {
            if (bargainRound >= 3) {
                toast.error("Batas negosiasi tercapai. Silakan terima tawaran driver atau cari driver lain.")
                return
            }

            // User offers new price
            const newPrice = parseInt(userPrice)
            setOffers(prev => [...prev, { from: 'user', price: newPrice }])

            // Simulate Driver Response
            setTimeout(() => {
                const driverNewPrice = Math.max(newPrice, parseInt(driverPrice) - 2000)
                if (driverNewPrice <= newPrice + 1000) {
                    setDriverPrice(newPrice.toString())
                    setOffers(prev => [...prev, { from: 'driver', price: newPrice }])
                    toast.success("Driver menyetujui tawaran Anda!")
                    setStep('payment')
                } else {
                    setDriverPrice(driverNewPrice.toString())
                    setOffers(prev => [...prev, { from: 'driver', price: driverNewPrice }])
                    setBargainRound(prev => prev + 1)
                }
            }, 1000)
        }
    }

    // Finalize Order
    const handleOrder = () => {
        setStep('tracking')
        setOrderStatus('active')
        setChatHistory([{ sender: 'driver', text: 'Halo, saya segera meluncur ke titik jemput!' }])
        toast.info("Order dibuat! Driver sedang menuju lokasi.")

        // Simulate Driver Movement
        startDriverSimulation()
    }

    // Cancel Order
    const handleCancel = () => {
        if (confirm("Batalkan pesanan?")) {
            setStep('details')
            setOrderStatus('finding')
            toast.info("Pesanan dibatalkan")
            // Reset logic
        }
    }

    // Driver Simulation Logic
    const startDriverSimulation = () => {
        if (!selectedDriver || !userLocation) return

        let progress = 0
        const interval = setInterval(() => {
            progress += 0.1
            if (progress >= 1) {
                clearInterval(interval)
                setOrderStatus('arrived')
                toast.success(`Driver ${selectedDriver.name} telah sampai!`)
                setChatHistory(prev => [...prev, { sender: 'driver', text: 'Saya sudah sampai kak!' }])

                // Finish Order simulation
                setTimeout(() => {
                    setOrderStatus('finished')
                    setStep('finished')
                    toast.success("Perjalanan selesai. Terima kasih!")
                }, 5000)
            } else {
                // Interpolate position
                const lat = selectedDriver.lat + (userLocation.lat - selectedDriver.lat) * progress
                const lng = selectedDriver.lng + (userLocation.lng - selectedDriver.lng) * progress
                setDriverLocation({ lat, lng })
            }
        }, 1000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {/* FIXED UI: max-w-5xl, h-[85vh], Fixed Width Sidebar */}
            <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 max-w-5xl w-[95vw] h-[85vh] p-0 gap-0 overflow-hidden flex flex-col md:flex-row shadow-2xl">

                {/* LEFT: MAP SECTION (Flex-1 fills remaining space) */}
                <div className={`relative flex-1 h-[40vh] md:h-full bg-slate-900 border-r border-slate-800`}>
                    {typeof window !== 'undefined' && (
                        <MapContainer
                            center={[userLocation?.lat || -6.2088, userLocation?.lng || 106.8456]}
                            zoom={15}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap'
                                className='opacity-80 sepia-[.3] invert-[.9] grayscale-[.5]' // Dark Mode Map Style Hack
                            />

                            {/* User Marker */}
                            <Marker position={[userLocation?.lat || -6.2088, userLocation?.lng || 106.8456]}>
                                <Popup>Lokasi Jemput</Popup>
                            </Marker>

                            {/* Driver Marker (Simulation) */}
                            {step === 'tracking' && driverLocation && (
                                <>
                                    <Marker position={[driverLocation.lat, driverLocation.lng]}>
                                        <Popup>Driver Anda</Popup>
                                    </Marker>
                                    <Polyline
                                        positions={[
                                            [driverLocation.lat, driverLocation.lng],
                                            [userLocation?.lat || -6.2088, userLocation?.lng || 106.8456]
                                        ]}
                                        color="#f59e0b" // Amber-500
                                        dashArray="10, 10"
                                        weight={4}
                                    />
                                </>
                            )}

                            {/* Mock Driver Markers (Only show when not tracking specific driver) */}
                            {step !== 'tracking' && step !== 'finished' && mockCouriers.map(c => (
                                <Marker key={c.id} position={[c.lat, c.lng]}>
                                    <Popup>{c.name} ({c.vehicle})</Popup>
                                </Marker>
                            ))}

                            {/* Infinity Circle Animation on Finding */}
                            {step === 'finding' && userLocation && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
                                    <div className="w-64 h-64 bg-amber-500/10 rounded-full animate-ping"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/20 rounded-full animate-pulse"></div>
                                </div>
                            )}
                        </MapContainer>
                    )}

                    {/* Loading Overlay "Speeding Driver" */}
                    {step === 'finding' && (
                        <div className="absolute inset-0 z-[1001] bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none">
                            <div className="relative">
                                {/* Speeding Animation */}
                                <div className="animate-bounce">
                                    {vehicleType === 'mobil' ? <Car className="w-24 h-24 text-amber-500" /> :
                                        vehicleType === 'bentor' ? <Armchair className="w-24 h-24 text-amber-500" /> :
                                            <Bike className="w-24 h-24 text-amber-500" />}
                                </div>
                                <div className="w-24 h-4 bg-black/30 rounded-full blur-md mt-2 mx-auto animate-pulse"></div>
                                <div className="absolute top-1/2 -right-12 space-y-2">
                                    <div className="w-8 h-1 bg-white/50 rounded-full animate-[slide_1s_infinite]"></div>
                                    <div className="w-12 h-1 bg-white/30 rounded-full animate-[slide_1.2s_infinite]"></div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mt-8 shadow-black drop-shadow-md">Mencari {subType || vehicleType}...</h3>
                            <Button
                                variant="destructive"
                                className="mt-8 pointer-events-auto shadow-lg hover:scale-105 transition-transform"
                                onClick={() => {
                                    setStep('details')
                                    toast.info("Pencarian dibatalkan")
                                }}
                            >
                                <XCircle className="w-4 h-4 mr-2" /> Batal Cari
                            </Button>
                        </div>
                    )}

                    {/* Floating Back Button on Mobile */}
                    <div className="absolute top-4 left-4 z-[500] md:hidden">
                        <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
                            Kembali
                        </Button>
                    </div>
                </div>

                {/* RIGHT: OPTIONS PANEL (Fixed Width on Desktop) */}
                <div className="w-full md:w-[400px] h-full flex flex-col bg-slate-950 border-l border-slate-800 shadow-xl z-20 flex-shrink-0">

                    {/* Header */}
                    <div className="p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
                        <DialogTitle className="text-xl font-bold text-amber-500 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                {step === 'tracking' || step === 'finished' ? 'Perjalanan' : 'Order Ojek'}
                            </span>
                            {step === 'bargain' && <Badge variant="secondary" className="animate-pulse">Sedang Nego</Badge>}
                        </DialogTitle>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">

                        {/* STEP 1: ORDER DETAILS */}
                        {step === 'details' && (
                            <>
                                <Tabs defaultValue="ojek" onValueChange={(v) => {
                                    setVehicleType(v as VehicleType)
                                    setSubType('')
                                }} className="w-full">
                                    <TabsList className="grid grid-cols-3 w-full bg-slate-800 p-1 rounded-xl">
                                        <TabsTrigger value="ojek" className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 font-bold transition-all">
                                            <Bike className="w-4 h-4 mr-2" /> Ojek
                                        </TabsTrigger>
                                        <TabsTrigger value="bentor" className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 font-bold transition-all">
                                            <Armchair className="w-4 h-4 mr-2" /> Bentor
                                        </TabsTrigger>
                                        <TabsTrigger value="mobil" className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900 font-bold transition-all">
                                            <Car className="w-4 h-4 mr-2" /> Mobil
                                        </TabsTrigger>
                                    </TabsList>

                                    <div className="mt-6 space-y-6">
                                        {/* Sub-Options Grid */}
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-400 uppercase tracking-wider font-bold">Tipe Kendaraan</Label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {(vehicleType === 'ojek' ? ['Ojek', 'Delivery', 'Lainnya'] :
                                                    vehicleType === 'bentor' ? ['Bentor', 'Becak', 'Bajai', 'Delman', 'Lainnya'] :
                                                        ['Mobil', 'Pickup', 'Truck']).map((opt) => (
                                                            <div
                                                                key={opt}
                                                                onClick={() => setSubType(opt)}
                                                                className={`cursor-pointer p-3 rounded-xl border-2 transition-all flex items-center justify-center text-center ${subType === opt ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                                                            >
                                                                <span className="text-sm">{opt}</span>
                                                            </div>
                                                        ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-400 uppercase tracking-wider font-bold">Rute Perjalanan</Label>
                                                <div className="space-y-3 relative">
                                                    {/* Connecting Line */}
                                                    <div className="absolute left-3.5 top-8 bottom-8 w-0.5 bg-slate-700 border-l border-dashed border-slate-600 z-0"></div>

                                                    <div className="relative z-10">
                                                        <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-slate-950"></div>
                                                        <Input
                                                            value={pickup}
                                                            onChange={e => setPickup(e.target.value)}
                                                            placeholder="Lokasi Jemput"
                                                            className="pl-8 bg-slate-900 border-slate-800 h-10"
                                                        />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-slate-950"></div>
                                                        <Input
                                                            value={dropoff}
                                                            onChange={e => setDropoff(e.target.value)}
                                                            placeholder="Tujuan Pengantaran"
                                                            className="pl-8 bg-slate-900 border-slate-800 h-10"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-400 uppercase tracking-wider font-bold">Catatan</Label>
                                                <Textarea
                                                    value={notes}
                                                    onChange={e => setNotes(e.target.value)}
                                                    placeholder="Contoh: Jemput depan pagar hitam, jangan ngebut..."
                                                    className="bg-slate-900 border-slate-800 resize-none h-20 text-sm"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-400 uppercase tracking-wider font-bold">Tawaran Harga (Rp)</Label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-2.5 text-amber-500 font-bold">Rp</span>
                                                    <Input
                                                        type="number"
                                                        value={userPrice}
                                                        onChange={e => setUserPrice(e.target.value)}
                                                        className="pl-10 bg-slate-900 border-slate-800 font-bold text-lg text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tabs>

                                <Button
                                    className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 text-lg font-bold py-6 mt-4 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                                    onClick={handleCariDriver}
                                >
                                    Cari Driver Sekarang
                                </Button>
                            </>
                        )}

                        {/* STEP 2: BARGAINING */}
                        {step === 'bargain' && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <Card className="bg-slate-900 border-amber-500/30 border-2 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <User className="w-24 h-24" />
                                    </div>
                                    <CardContent className="p-5 space-y-5 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                                                <User className="w-7 h-7 text-slate-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl text-white">{selectedDriver?.name || 'Pak Budi'}</h4>
                                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                                    <Badge variant="outline" className="text-amber-500 border-amber-500/50">{vehicleType}</Badge>
                                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                                                <div className="text-xs text-slate-500 mb-1">Tawaran Kamu</div>
                                                <div className="line-through text-slate-400 text-sm">Rp {parseInt(userPrice).toLocaleString('id-ID')}</div>
                                            </div>
                                            <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/50">
                                                <div className="text-xs text-amber-500 mb-1 font-bold">Harga Driver</div>
                                                <div className="text-xl font-bold text-white">Rp {parseInt(driverPrice).toLocaleString('id-ID')}</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <Button variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500" onClick={handleCancel}>
                                                Tolak / Batal
                                            </Button>
                                            <Button className="flex-1 bg-green-600 text-white hover:bg-green-500 font-bold shadow-lg shadow-green-500/20" onClick={() => handleBargain('accept')}>
                                                Terima Deal
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                    <Label className="text-slate-300 font-semibold">Nego Harga Lagi?</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            value={userPrice}
                                            onChange={e => setUserPrice(e.target.value)}
                                            className="bg-slate-950 border-slate-800 font-bold"
                                        />
                                        <Button
                                            className="bg-amber-500 text-slate-950 font-bold px-6"
                                            onClick={() => handleBargain('offer')}
                                            disabled={bargainRound >= 3}
                                        >
                                            Tawar ({3 - bargainRound})
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-500 text-center">Kesempatan nego: {3 - bargainRound}x lagi</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PAYMENT */}
                        {step === 'payment' && (
                            <div className="space-y-8 animate-in zoom-in duration-300 py-4">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-500/10">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Deal Tercapai!</h3>
                                        <p className="text-slate-400 text-sm">Silakan pilih metode pembayaran</p>
                                    </div>
                                    <div className="bg-amber-500/10 py-4 rounded-xl border border-amber-500/30">
                                        <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">Total Tagihan</p>
                                        <div className="text-4xl font-bold text-white tracking-tight">
                                            Rp {parseInt(driverPrice).toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-slate-400 uppercase text-xs font-bold tracking-wider">Metode Pembayaran</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Cash', 'QRIS', 'Transfer', 'Saldo'].map(m => (
                                            <div
                                                key={m}
                                                onClick={() => setPaymentMethod(m.toLowerCase())}
                                                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-2 ${paymentMethod === m.toLowerCase() ? 'bg-amber-500 text-slate-900 font-bold border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                                            >
                                                {m === 'Cash' && <Banknote className="w-4 h-4" />}
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full bg-amber-500 text-slate-950 font-bold py-6 text-lg rounded-xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform" onClick={handleOrder}>
                                    Panggil Driver Sekarang
                                </Button>
                            </div>
                        )}

                        {/* STEP 4: TRACKING & FINISHED */}
                        {(step === 'tracking' || step === 'finished') && (
                            <div className="flex flex-col h-full animate-in slide-in-from-right duration-500">
                                {/* Driver Card */}
                                <Card className="bg-slate-900 border-slate-800 mb-4 shadow-lg">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-700">
                                            <User className="w-6 h-6 text-slate-900" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-lg truncate text-white">{selectedDriver?.name}</h4>
                                            <div className="flex gap-2 text-xs text-slate-400 items-center">
                                                <Badge variant="secondary" className="bg-slate-800">{vehicleType}</Badge>
                                                <span className="truncate">AB 1234 XY</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost" className="hover:bg-slate-800 text-green-500">
                                                <Phone className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </CardContent>

                                    {/* Order Status Bar */}
                                    <div className="px-4 pb-4">
                                        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
                                            <div className="flex justify-between items-center text-sm mb-2">
                                                <span className="text-slate-400">Status:</span>
                                                <span className={`font-bold ${orderStatus === 'finished' ? 'text-green-500' : 'text-amber-500'}`}>
                                                    {orderStatus === 'active' ? 'Menuju Lokasi...' :
                                                        orderStatus === 'arrived' ? 'Driver Sampai' :
                                                            'Selesai'}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${orderStatus === 'finished' ? 'bg-green-500' : 'bg-amber-500'}`}
                                                    style={{ width: orderStatus === 'active' ? '50%' : orderStatus === 'arrived' ? '80%' : '100%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Chat */}
                                <div className="flex-1 bg-slate-900 rounded-xl p-4 mb-4 overflow-y-auto space-y-4 border border-slate-800 shadow-inner">
                                    {chatHistory.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                                            <MessageSquare className="w-10 h-10 mb-2" />
                                            <p className="text-sm">Belum ada pesan</p>
                                        </div>
                                    ) : (
                                        chatHistory.map((m, i) => (
                                            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-md ${m.sender === 'user' ? 'bg-amber-500 text-slate-950 rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                                                    {m.text}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Order Finished / Chat Input */}
                                {step === 'finished' ? (
                                    <div className="space-y-3">
                                        <Button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-green-500/20" onClick={() => onOpenChange(false)}>
                                            Selesai & Beri Rating
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Input
                                                value={chatMessage}
                                                onChange={e => setChatMessage(e.target.value)}
                                                placeholder="Kirim pesan ke driver..."
                                                className="bg-slate-900 border-slate-800 h-11"
                                                onKeyPress={(e) => e.key === 'Enter' && chatMessage.trim() && setChatHistory(prev => [...prev, { sender: 'user', text: chatMessage }])}
                                            />
                                            <Button size="icon" className="h-11 w-11 bg-amber-500 text-slate-950 hover:bg-amber-400 shrink-0" onClick={() => {
                                                if (chatMessage.trim()) {
                                                    setChatHistory(prev => [...prev, { sender: 'user', text: chatMessage }])
                                                    setChatMessage('')
                                                }
                                            }}>
                                                <Send className="w-5 h-5" />
                                            </Button>
                                        </div>
                                        <Button variant="destructive" className="w-full opacity-80 hover:opacity-100" onClick={handleCancel}>
                                            Batalkan Pesanan
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
