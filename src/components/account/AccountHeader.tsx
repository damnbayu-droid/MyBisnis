'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Bell,
    ShoppingCart,
    LogOut,
    LayoutDashboard,
    Store,
    Truck,
    User,
    Settings,
    HelpCircle,
    MessageSquare,
    Wallet,
    Globe2
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation'

interface AccountHeaderProps {
    currentUser?: {
        name: string
        email: string
        role: string
        photoUrl?: string
    }
}

export default function AccountHeader({ currentUser }: AccountHeaderProps) {
    const router = useRouter()
    const { language, setLanguage } = useLanguage()
    // Mock Notifications
    const notifications = [
        { id: 1, title: 'Pesanan Diterima', desc: 'Pesanan #INV-2024001 telah sampai di tujuan.', unread: true, time: '2m ago' },
        { id: 2, title: 'Promo Spesial', desc: 'Diskon 50% untuk pengiriman pertama Anda!', unread: false, time: '1h ago' },
        { id: 3, title: 'Login Terdeteksi', desc: 'Login baru dari perangkat Mac OS.', unread: false, time: '5h ago' },
    ]

    const handleLogout = () => {
        // Implement logout logic here
        router.push('/')
    }

    return (
        <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition-opacity">
                        {language === 'id' ? 'MyAkun' : 'MyAccount'}
                    </span>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switch */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-300 hover:text-amber-400 hover:bg-slate-800"
                        onClick={() => {
                            // Simple toggle logic assuming useLanguage hook is missing in this file imports or we need to add it.
                            // Checking imports... useLanguage is NOT imported. I need to add it.
                        }}
                    >
                        {/* Wait, I can't add logic here without hook. I will do multi_replace to add hook import first. */}
                    </Button>


                    {/* Notifications & Messages */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:text-amber-400 hover:bg-slate-800 relative">
                                <Bell className="w-5 h-5" />
                                <Badge className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1 h-4 min-w-[16px] flex items-center justify-center">
                                    {notifications.filter(n => n.unread).length}
                                </Badge>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-slate-900 border-slate-700 p-0 text-slate-200" align="end">
                            <div className="p-3 border-b border-slate-800 font-semibold text-white flex justify-between items-center">
                                <span>Notifikasi</span>
                                <span className="text-xs text-amber-500 cursor-pointer">Tandai Saldo</span>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className={`p-3 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors ${notif.unread ? 'bg-slate-800/20' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm ${notif.unread ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>{notif.title}</h4>
                                            <span className="text-[10px] text-slate-500">{notif.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 line-clamp-2">{notif.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 text-center border-t border-slate-800">
                                <Button variant="ghost" size="sm" className="text-xs text-amber-500 hover:text-amber-400 w-full">
                                    Lihat Semua Aktivitas
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Separator */}
                    <div className="h-6 w-px bg-slate-700 mx-1"></div>

                    {/* Register CTA (if not registered as Seller/Driver) */}
                    {/* Assuming for this demo "currentUser" might not be fully populated with detailed role info, 
                        or we want to show upsell regardless. Adjust logic as needed. */}
                    <div className="hidden md:flex gap-2">
                        <Link href="/dashboard?role=seller">
                            <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-900">
                                <Store className="w-4 h-4 mr-2" /> Mulai Jual
                            </Button>
                        </Link>
                    </div>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-600 hover:border-amber-400 transition-colors">
                                <div className="bg-slate-700 w-full h-full flex items-center justify-center text-white font-bold">
                                    {currentUser?.name?.charAt(0) || 'U'}
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 text-slate-200" align="end">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">{currentUser?.name || 'Guest'}</p>
                                    <p className="text-xs leading-none text-slate-400">{currentUser?.email || 'guest@example.com'}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                <User className="mr-2 h-4 w-4" /> Akun Saya
                            </DropdownMenuItem>
                            <Link href="/dashboard">
                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                <Wallet className="mr-2 h-4 w-4" /> Dompet Saya
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <Link href="/help-support">
                                <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                    <HelpCircle className="mr-2 h-4 w-4" /> Pusat Bantuan
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-400 cursor-pointer" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Keluar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
