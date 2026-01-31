'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            toast.success('Pengaturan berhasil disimpan!')
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-black font-sans text-white p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <Link href="/dashboard" className="text-amber-500 hover:text-amber-400 flex items-center gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Setting & Privasi</h1>
                    <p className="text-slate-400 mt-2">Kelola informasi akun dan preferensi aplikasi Anda.</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="bg-slate-900 border border-slate-800">
                        <TabsTrigger value="profile">Profil</TabsTrigger>
                        <TabsTrigger value="account">Akun & Keamanan</TabsTrigger>
                        <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Informasi Publik</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Nama Lengkap</Label>
                                        <Input defaultValue="Bayu Tester" className="bg-slate-900 border-slate-700 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Username</Label>
                                        <Input defaultValue="bayu_dev" className="bg-slate-900 border-slate-700 text-white" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-white">Bio Singkat</Label>
                                        <Input defaultValue="Digital Entrepreneur based in Bali" className="bg-slate-900 border-slate-700 text-white" />
                                    </div>
                                </div>
                                <Button className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold" disabled={isLoading} onClick={handleSave}>
                                    {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Account Tab */}
                    <TabsContent value="account">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Email & Password</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-white">Email Utama</Label>
                                    <Input defaultValue="bayu@example.com" disabled className="bg-slate-900 border-slate-700 opacity-50 text-white" />
                                    <p className="text-xs text-slate-500">Hubungi support untuk mengubah email.</p>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-950">
                                        Ganti Password
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white">Preferensi Notifikasi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Email Notifikasi</Label>
                                        <p className="text-sm text-slate-300">Terima update tentang pesanan via email.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Push Notification</Label>
                                        <p className="text-sm text-slate-300">Notifikasi langsung ke perangkat Anda.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Info Promo</Label>
                                        <p className="text-sm text-slate-300">Berita promo dan penawaran menarik.</p>
                                    </div>
                                    <Switch />
                                </div>
                                <Button className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold" onClick={handleSave}>
                                    Simpan Preferensi
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
