
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { howItWorksStepsId, howItWorksStepsEn } from '@/constants/landing-data'

export default function HowItWorks({ language }: { language: 'id' | 'en' }) {
    const steps = language === 'id' ? howItWorksStepsId : howItWorksStepsEn

    return (
        <section className="py-20 px-4 bg-slate-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {language === 'id' ? 'Cara Kerja MyBisnis' : 'How MyBisnis Works'}
                </h2>
                <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                    {language === 'id' ? 'Proses sederhana untuk memulai bisnis online Anda' : 'Simple process to start your online business'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <Card key={index} className="bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
                                <CardContent className="p-6 text-center">
                                    <div className="text-amber-400 font-bold text-lg mb-2">
                                        Step {step.number}
                                    </div>
                                    <div className="mb-4 flex justify-center">
                                        <Icon className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-amber-400 mb-2">{step.title}</h3>
                                    <p className="text-slate-300">{step.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
