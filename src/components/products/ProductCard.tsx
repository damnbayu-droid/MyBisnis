'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Share2, Star } from 'lucide-react'
import { Product } from '@/constants/landing-data'
import { cn } from '@/lib/utils'

interface ProductCardProps {
    product: Product
    onClick?: () => void
    onAddToCart?: (e: React.MouseEvent) => void
    onShare?: (e: React.MouseEvent) => void
    onBuyNow?: (e: React.MouseEvent) => void
    isSellerView?: boolean
    onEdit?: (e: React.MouseEvent) => void
}

export default function ProductCard({
    product,
    onClick,
    onAddToCart,
    onShare,
    onBuyNow,
    isSellerView = false,
    onEdit
}: ProductCardProps) {

    // Stop propagation helper
    const handleAction = (e: React.MouseEvent, action?: (e: React.MouseEvent) => void) => {
        e.stopPropagation()
        if (action) action(e)
    }

    return (
        <div
            className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
            onClick={onClick}
        >
            {/* Photo Product */}
            <div className="aspect-square bg-slate-800 flex items-center justify-center text-6xl relative overflow-hidden">
                <span className="group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                {/* Seller Edit Overlay */}
                {isSellerView && (
                    <div className="absolute top-2 right-2 z-10">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 rounded-full bg-slate-900/80 hover:bg-amber-500 text-white"
                            onClick={(e) => handleAction(e, onEdit)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                        </Button>
                    </div>
                )}
                {/* Rating Badge (Overlay) */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-[10px] font-bold text-amber-400 border border-white/10">
                    <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-bold text-sm line-clamp-1 flex-1 mr-2 group-hover:text-amber-400 transition-colors">
                        {product.name}
                    </h3>
                </div>

                {/* Jenis / Type */}
                <div className="mb-2">
                    <Badge variant="outline" className="text-[10px] py-0 px-2 h-5 border-slate-700 text-slate-400 group-hover:border-amber-500/30 group-hover:text-amber-500/80">
                        {product.category}
                    </Badge>
                </div>

                {/* Description (10-30% approx line clamp) */}
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 h-8 leading-relaxed">
                    {product.description}
                </p>

                {/* Price */}
                <div className="mt-auto mb-3">
                    <p className="text-amber-500 font-bold text-base">{product.price}</p>
                </div>

                {/* CTA Buttons Row */}
                <div className="grid grid-cols-4 gap-2 mt-auto">
                    {/* Cart */}
                    <Button
                        size="sm"
                        variant="outline"
                        className="col-span-1 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white p-0"
                        onClick={(e) => handleAction(e, onAddToCart)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Button>

                    {/* Share */}
                    <Button
                        size="sm"
                        variant="outline"
                        className="col-span-1 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white p-0"
                        onClick={(e) => handleAction(e, onShare)}
                    >
                        <Share2 className="w-4 h-4" />
                    </Button>

                    {/* Buy Now */}
                    <Button
                        size="sm"
                        className="col-span-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs"
                        onClick={(e) => handleAction(e, onBuyNow)}
                    >
                        Beli
                    </Button>
                </div>
            </div>
        </div>
    )
}
