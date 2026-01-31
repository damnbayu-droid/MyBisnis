
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { websitePackagesId, websitePackagesEn } from '@/constants/landing-data'
import { Globe, Check } from 'lucide-react'

interface PricingProps {
    language: 'id' | 'en';
    selectedWebsiteType: string;
    setSelectedWebsiteType: (type: string) => void;
    onOpenOrderModal: () => void;
}

export default function Pricing({ language, selectedWebsiteType, setSelectedWebsiteType, onOpenOrderModal }: PricingProps) {
    const packages = language === 'id' ? websitePackagesId : websitePackagesEn

    return (
        <section className="py-20 px-4 bg-slate-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {language === 'id' ? 'Order Website Profesional' : 'Order Professional Website'}
                </h2>
                <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                    {language === 'id'
                        ? 'Butuh website khusus untuk bisnis Anda? Kami buatkan website profesional dengan harga terjangkau'
                        : 'Need a custom website for your business? We build professional websites at affordable prices'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {packages.map((pkg, index) => (
                        <Card
                            key={index}
                            className={`bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer ${selectedWebsiteType === pkg.type ? 'ring-2 ring-amber-500' : ''
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
                                <ul className="space-y-1 text-slate-300 text-sm max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
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
                        onClick={onOpenOrderModal}
                    >
                        <Globe className="w-5 h-5 mr-2" />
                        {language === 'id' ? 'Order Website Sekarang' : 'Order Website Now'}
                    </Button>
                </div>
            </div>
        </section>
    )
}
