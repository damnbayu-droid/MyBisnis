
import Link from 'next/link';

export default function Footer({ language }: { language: 'id' | 'en' }) {
    return (
        <footer className="bg-slate-950 py-12 px-6 border-t border-slate-900 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-sky-500">MyBisnis</h2>
                    <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                        {language === 'id' ? 'Opereted By' : 'Operated by'} PT Indonesian Visas Agency
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                        {language === 'id'
                            ? 'Platform marketplace UMKM digital terlengkap dan transportasi di Indonesia. Solusi terintegrasi untuk Penjual, Pembeli, dan Driver lokal.'
                            : 'Most complete digital MSME marketplace platform and transportation in Indonesia. Integrated solution for Sellers, Buyers, and local Drivers.'}
                    </p>
                    <div className="pt-4 border-t border-slate-900">
                        <p className="text-xs text-slate-600">
                            &copy; {new Date().getFullYear()} MyBisnis. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Corporate Structure Column */}
                <div className="space-y-4">
                    <h3 className="font-bold text-white mb-2">Bali Enterprises Group</h3>
                    <div className="space-y-3 text-sm text-slate-400">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500 uppercase">
                                {language === 'id' ? 'Perusahaan Induk' : 'Holding Company'}
                            </span>
                            <a href="https://bali.enterprises" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                                bali.enterprises
                            </a>
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">
                                {language === 'id' ? 'Lainnya' : 'Others'}
                            </span>
                            <a href="https://indonesianvisas.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">indonesianvisas.com</a>
                            <a href="https://balihelp.id" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">balihelp.id</a>
                            <a href="https://kotabunan.shop" target="_blank" rel="noopener noreferrer" className="text-sky-500 font-medium">kotabunan.shop</a>
                            <a href="https://indodesign.website" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">indodesign.website</a>
                        </div>
                    </div>
                </div>

                {/* Platform Column */}
                <div className="space-y-4">
                    <h3 className="font-bold text-white mb-2">Platform</h3>
                    <ul className="space-y-3">
                        <li><Link href="/info" className="text-slate-400 hover:text-sky-500 transition-colors">{language === 'id' ? 'Informasi' : 'Information'}</Link></li>
                        <li><Link href="/proposal" className="text-slate-400 hover:text-sky-500 transition-colors">{language === 'id' ? 'Investasi & Proposal' : 'Investment & Proposal'}</Link></li>
                        <li><Link href="/akun" className="text-slate-400 hover:text-sky-500 transition-colors">{language === 'id' ? 'Demo Akun' : 'Account Demo'}</Link></li>
                        <li><Link href="/demo/lapak" className="text-slate-400 hover:text-sky-500 transition-colors">{language === 'id' ? 'Demo Dashboard' : 'Dashboard Demo'}</Link></li>
                        <li><Link href="/demo/marketplace" className="text-slate-400 hover:text-sky-500 transition-colors">{language === 'id' ? 'Demo Marketplace' : 'Marketplace Demo'}</Link></li>
                        <li><Link href="/demo/store" className="text-slate-400 hover:text-sky-500 transition-colors">{language === 'id' ? 'Demo Store' : 'Store Demo'}</Link></li>
                    </ul>
                </div>

                {/* Connect Column */}
                <div className="space-y-4">
                    <h3 className="font-bold text-white mb-2">{language === 'id' ? 'Hubungi Kami' : 'Connect'}</h3>
                    <ul className="space-y-3">
                        <li className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500">{language === 'id' ? 'Pertanyaan Umum' : 'General Inquiry'}</span>
                            <a href="mailto:info@bali.enterprises" className="text-slate-400 hover:text-sky-500 transition-colors">info@bali.enterprises</a>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500">{language === 'id' ? 'Kontak CEO' : 'Direct CEO'}</span>
                            <a href="mailto:ceo@indonesianvisas.agency" className="text-slate-400 hover:text-sky-500 transition-colors">ceo@indonesianvisas.agency</a>
                        </li>
                        <li className="mt-2">
                            <a href="https://wa.me/61423854701" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full hover:bg-emerald-500/20 transition-colors font-bold border border-emerald-500/20">
                                Chat WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
