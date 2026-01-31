
'use client'

import { statsId, statsEn } from '@/constants/landing-data'

export default function Stats({ language }: { language: 'id' | 'en' }) {
    const stats = language === 'id' ? statsId : statsEn

    return (
        <section className="py-20 px-4 bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {language === 'id' ? 'Dukungan Untuk UMKM' : 'Support for MSMEs'}
                </h2>
                <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                    {language === 'id'
                        ? 'Kami berkomitmen membantu pengusaha kecil menjangkau pasar lebih luas'
                        : 'We are committed to helping small entrepreneurs reach wider markets'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div key={index} className="text-center">
                                <div className="mb-4 flex justify-center"><Icon className="w-8 h-8 text-amber-400" /></div>
                                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
                                <div className="text-slate-300">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
