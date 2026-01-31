
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { featuresId, featuresEn } from '@/constants/landing-data'

export default function Features({ language }: { language: 'id' | 'en' }) {
    const features = language === 'id' ? featuresId : featuresEn

    return (
        <section className="py-20 px-4 bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {language === 'id' ? 'Fitur Unggulan' : 'Key Features'}
                </h2>
                <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                    {language === 'id' ? 'Semua yang Anda butuhkan untuk mengembangkan bisnis UMKM' : 'Everything you need to grow your MSME business'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
                                <CardContent className="p-6">
                                    <div className="mb-4"><Icon className="w-12 h-12 text-amber-400" /></div>
                                    <h3 className="text-xl font-semibold text-amber-400 mb-2">{feature.title}</h3>
                                    <p className="text-slate-300">{feature.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
