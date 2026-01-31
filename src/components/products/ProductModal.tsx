import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Share2, Edit2, Save, X, Trash2, ShoppingCart, Star, ChevronLeft, ChevronRight, Circle } from 'lucide-react'
import { toast } from 'sonner'
import { Product } from '@/constants/landing-data'
import { cn } from '@/lib/utils'

interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    product: Product | null
    isEditable?: boolean
    onSave?: (updatedProduct: Product) => void
    onDelete?: (productName: string) => void
}

export default function ProductModal({
    isOpen,
    onClose,
    product,
    isEditable = false,
    onSave,
    onDelete
}: ProductModalProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedProduct, setEditedProduct] = useState<Product | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Reset editing state and image index when modal opens/product changes
    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0)
            if (product && !editedProduct) {
                setEditedProduct(product)
            }
        }
    }, [isOpen, product])

    if (!product) return null

    const handleShare = () => {
        // Dummy share logic
        const shareUrl = `${window.location.origin}/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`
        navigator.clipboard.writeText(shareUrl)
        toast.success("Link produk disalin ke clipboard!")
    }

    const handleSave = () => {
        if (editedProduct && onSave) {
            onSave(editedProduct)
            setIsEditing(false)
            toast.success("Perubahan produk berhasil disimpan!")
        }
    }

    const currentProduct = isEditing && editedProduct ? editedProduct : product

    // Mock multiple images for carousel (limit to 3 as requested)
    const images = [currentProduct.image, currentProduct.image, currentProduct.image]

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                setIsEditing(false)
                setEditedProduct(null)
                onClose()
            }
        }}>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pr-10">
                    <div className="flex justify-between items-start">
                        <DialogTitle className="text-xl font-bold text-amber-500">
                            {isEditing ? 'Edit Produk' : 'Detail Produk'}
                        </DialogTitle>
                        <div className="flex gap-2">
                            {!isEditing && (
                                <Button variant="ghost" size="icon" onClick={handleShare} className="text-slate-400 hover:text-blue-400">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            )}
                            {isEditable && !isEditing && (
                                <Button variant="ghost" size="icon" onClick={() => {
                                    setEditedProduct(product)
                                    setIsEditing(true)
                                }} className="text-slate-400 hover:text-amber-400">
                                    <Edit2 className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Image Carousel */}
                    <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center text-6xl shadow-inner relative group overflow-hidden">
                        {/* Current Image */}
                        <div className="transition-transform duration-300 transform">
                            {images[currentImageIndex]}
                        </div>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                            </>
                        )}

                        {/* Pagination Dots */}
                        {images.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all",
                                            currentImageIndex === idx ? "bg-amber-500 w-4" : "bg-white/50 hover:bg-white"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Nama Produk</Label>
                            {isEditing ? (
                                <Input
                                    value={editedProduct?.name}
                                    onChange={(e) => setEditedProduct({ ...editedProduct!, name: e.target.value })}
                                    className="bg-slate-800 border-slate-700"
                                />
                            ) : (
                                <h3 className="font-bold text-lg text-white">{product.name}</h3>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Harga</Label>
                                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                    {isEditing ? (
                                        <Input
                                            value={editedProduct?.price}
                                            onChange={(e) => setEditedProduct({ ...editedProduct!, price: e.target.value })}
                                            className="bg-slate-800 border-slate-700 h-8"
                                        />
                                    ) : (
                                        <p className="font-bold text-amber-400 text-lg">{product.price}</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                    {isEditing ? (
                                        <Input
                                            value={editedProduct?.category}
                                            onChange={(e) => setEditedProduct({ ...editedProduct!, category: e.target.value })}
                                            className="bg-slate-800 border-slate-700 h-8"
                                        />
                                    ) : (
                                        <p className="text-slate-400">{product.category}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Deskripsi</Label>
                            {isEditing ? (
                                <Textarea
                                    value={editedProduct?.description}
                                    onChange={(e) => setEditedProduct({ ...editedProduct!, description: e.target.value })}
                                    className="bg-slate-800 border-slate-700 min-h-[100px]"
                                />
                            ) : (
                                <p className="text-slate-300 text-sm leading-relaxed p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        {!isEditing && (
                            <div className="flex gap-4 text-xs text-slate-500 pt-2 border-t border-slate-800">
                                <span>Terjual: <span className="text-white">{product.orders}</span></span>
                                <span>Rating: <span className="text-amber-400">★ {product.rating}</span></span>
                            </div>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <DialogFooter className="gap-2 sm:gap-0 mt-4">
                        <div className="flex w-full gap-2">
                            <Button variant="destructive" className="flex-1" onClick={() => {
                                setIsEditing(false)
                                setEditedProduct(null)
                            }}>
                                Batal
                            </Button>
                            <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900" onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" /> Simpan
                            </Button>
                        </div>
                        {isEditable && onDelete && (
                            <Button variant="ghost" onClick={() => onDelete(editedProduct!.name)} className="mt-2 w-full text-red-500 hover:text-red-600 hover:bg-red-900/10">
                                <Trash2 className="w-4 h-4 mr-2" /> Hapus Produk
                            </Button>
                        )}
                    </DialogFooter>
                ) : (
                    <DialogFooter className="gap-2 mt-4">
                        <Button variant="outline" className="flex-1 border-slate-700 hover:bg-slate-800 text-slate-300 py-6" onClick={() => toast.success("Produk ditambahkan ke keranjang")}>
                            <ShoppingCart className="w-5 h-5 mr-2" /> Keranjang
                        </Button>
                        <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-6 text-lg shadow-lg shadow-amber-500/20" onClick={() => toast.success("Melanjutkan ke pembayaran...")}>
                            Bayar Sekarang
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
