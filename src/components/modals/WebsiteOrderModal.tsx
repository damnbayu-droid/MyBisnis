
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { websiteTypes } from '@/constants/landing-data'

interface WebsiteOrderModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    selectedWebsiteType: string
    setSelectedWebsiteType: (type: string) => void
}

export default function WebsiteOrderModal({ isOpen, onOpenChange, selectedWebsiteType, setSelectedWebsiteType }: WebsiteOrderModalProps) {
    const handleWebsiteOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            websiteType: formData.get('websiteType'),
            package: formData.get('package'),
            description: formData.get('description'),
        }

        // Send to Formspree
        try {
            const response = await fetch('https://formspree.io/f/mjgbkpr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })

            if (response.ok) {
                alert('Order website berhasil dikirim! Kami akan menghubungi Anda segera.')
                onOpenChange(false)
            } else {
                alert('Gagal mengirim order. Silakan coba lagi.')
            }
        } catch (error) {
            alert('Terjadi kesalahan saat mengirim order')
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-amber-400">Order Website Profesional</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Pilih jenis website yang sesuai dengan kebutuhan bisnis Anda
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleWebsiteOrder} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {websiteTypes.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <Card
                                    key={index}
                                    className={`bg-slate-700/50 border-slate-600 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer ${selectedWebsiteType === item.type ? 'ring-2 ring-amber-500' : ''
                                        }`}
                                    onClick={() => setSelectedWebsiteType(item.type)}
                                >
                                    <CardContent className="p-4 text-center">
                                        <div className="mb-2 flex justify-center"><Icon className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-amber-400">{item.name}</h3>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    <div>
                        <Label htmlFor="package">Pilih Paket</Label>
                        <Select name="package">
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                                <SelectValue placeholder="Pilih paket website" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-700 border-slate-600">
                                <SelectItem value="pemula">
                                    Paket Pemula — Rp 250.000 (1 Page)
                                </SelectItem>
                                <SelectItem value="starter">
                                    Paket Starter — Rp 500.000 (1 Page)
                                </SelectItem>
                                <SelectItem value="standard">
                                    Paket Standard — Rp 1.500.000 (1–3 Pages)
                                </SelectItem>
                                <SelectItem value="pro">
                                    Paket Pro — Rp 5.000.000 (1–5 Pages)
                                </SelectItem>
                                <SelectItem value="advance">
                                    Paket Advance — Rp 10.000.000 (5–10 Pages)
                                </SelectItem>
                                <SelectItem value="enterprise">
                                    Paket Enterprise — Rp 15.000.000 (Unlimited)
                                </SelectItem>
                                <SelectItem value="international">
                                    Paket International — Rp 25.000.000 (Custom)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input name="name" className="bg-slate-700 border-slate-600 text-slate-100" required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" className="bg-slate-700 border-slate-600 text-slate-100" required />
                        </div>
                    </div>
                    <input type="hidden" name="websiteType" value={selectedWebsiteType} />
                    <div>
                        <Label htmlFor="description">Deskripsi Kebutuhan Website</Label>
                        <Textarea name="description" className="bg-slate-700 border-slate-600 text-slate-100" placeholder="Jelaskan kebutuhan website Anda secara detail..." />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 hover:from-amber-500 hover:to-amber-700 rounded-full">
                        Kirim Order Order
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
