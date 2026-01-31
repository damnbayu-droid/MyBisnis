import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LayoutDashboard, Settings, HelpCircle, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useState } from 'react'
import SettingsModal from '@/components/modals/SettingsModal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe2 } from 'lucide-react'
import { translations } from '@/constants/landing-data'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeaderProps {
    currentUser: any
    onLogout: () => void
    onOpenLogin: () => void
    onOpenRegister: () => void
}

export default function Header({
    currentUser,
    onLogout,
    onOpenLogin,
    onOpenRegister
}: HeaderProps) {
    const { language, setLanguage } = useLanguage()
    const t = translations[language]
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const pathname = usePathname()

    // Dynamic Branding Logic
    const getBranding = () => {
        if (pathname.startsWith('/marketplace')) return 'MyMarketplace'
        if (pathname.startsWith('/akun')) return 'MyAccount'
        if (pathname.startsWith('/proposal')) return 'MyProposal'
        if (pathname.startsWith('/store')) return 'MyStore'
        if (pathname.startsWith('/courier')) return 'MyDriver'
        if (pathname.startsWith('/dashboard')) {
            if (currentUser?.role === 'seller') return 'MyStore'
            if (currentUser?.role === 'driver') return 'MyDriver'
            return 'MyDashboard'
        }
        if (pathname.startsWith('/admin')) return 'MyAdmin'
        return 'MyBisnis'
    }

    const brandingName = getBranding()

    return (
        <>
            <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div
                                className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent cursor-pointer"
                                onClick={() => window.location.href = '/'}
                            >
                                {brandingName}
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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-slate-700 text-amber-500 hover:bg-slate-600 border border-slate-600 rounded-lg px-4 gap-2">
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700 text-slate-200" align="end">
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none text-white">{currentUser.name}</p>
                                                <p className="text-xs leading-none text-slate-400">{currentUser.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-slate-700" />

                                        <Link href="/akun">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 hover:text-white">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Akun Saya</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href="/dashboard">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 hover:text-white">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Toko Saya</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href="/courier">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 hover:text-white">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Driver Panel</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        {currentUser.role === 'admin' && (
                                            <Link href="/admin">
                                                <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 hover:text-white text-red-400">
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    <span>Admin Panel</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        )}

                                        <Link href="/settings">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 hover:text-white">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Setting & Privasi</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href="/help-support">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 hover:text-white">
                                                <HelpCircle className="mr-2 h-4 w-4" />
                                                <span>Help & Support</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        <DropdownMenuSeparator className="bg-slate-700" />

                                        <DropdownMenuItem className="cursor-pointer hover:bg-red-900/20 text-red-500 hover:text-red-400" onClick={onLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 rounded-full transition-all duration-300 hover:scale-105" onClick={onOpenRegister}>
                                        {t.daftar}
                                    </Button>
                                    <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full transition-all duration-300 hover:scale-105" onClick={onOpenLogin}>
                                        {t.login}
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    )
}
