'use client'

import React from 'react'
import Calculator from '@/components/dashboard/Calculator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Home } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function DemoDriverPage() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans pt-[34px]">
            <header className="bg-slate-900 border-b border-slate-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/proposal" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                            MyDashboard
                        </Link>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs border border-slate-700 uppercase">
                            DRIVER (DEMO)
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
                            <h3 className="text-white font-bold">Verifikasi Driver</h3>
                            <p className="text-slate-400 text-sm">Upload dokumen kendaraan untuk mulai menerima order.</p>
                        </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" onClick={() => toast.success("Dokumen terupload (Demo)")}>
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
                                    <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.success("Order diambil (Demo)")}>Ambil Order</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Calculator />
                    </div>
                </div>
            </main>
        </div>
    )
}
