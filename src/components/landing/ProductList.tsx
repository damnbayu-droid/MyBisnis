
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { sampleProductsId, sampleProductsEn } from '@/constants/landing-data'
import Link from 'next/link'

export default function ProductList({ language }: { language: 'id' | 'en' }) {
    const products = language === 'id' ? sampleProductsId : sampleProductsEn

    return (
        <section className="py-20 px-4 bg-slate-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {language === 'id' ? 'Produk Lokal Populer' : 'Popular Local Products'}
                </h2>
                <p className="text-center text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                    {language === 'id' ? 'Jelajahi berbagai produk UMKM terbaik di marketplace kami' : 'Explore the best MSME products in our marketplace'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <Card key={index} className="bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer">
                            <CardContent className="p-4">
                                <div className="text-4xl mb-3 text-center">{product.image}</div>
                                <h3 className="font-semibold text-amber-400 mb-1">{product.name}</h3>
                                <p className="text-slate-400 text-sm mb-1">{product.category} • {product.store}</p>
                                <p className="text-xl font-bold text-white mb-2">{product.price}</p>
                                <p className="text-slate-300 text-sm">{product.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 flex justify-center">
                    <Link href="/marketplace">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
                        >
                            {language === 'id' ? 'Lihat Marketplace' : 'View Marketplace'}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
