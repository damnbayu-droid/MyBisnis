'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Mail, Phone } from 'lucide-react'
import { toast } from 'sonner'

export default function HelpSupportPage() {

    const handleContactSupport = (method: string) => {
        toast.info(`Membuka layanan ${method}...`)
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <Link href="/" className="text-amber-500 hover:text-amber-400 flex items-center gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Help & Support</h1>
                    <p className="text-slate-400 mt-2">Pusat bantuan MyBisnis. Cari jawaban atau hubungi kami.</p>
                </div>

                {/* Contact Channels */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-slate-800 hover:border-amber-500/50 transition-colors cursor-pointer" onClick={() => handleContactSupport('Live Chat')}>
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                            <div className="p-3 bg-amber-500/10 rounded-full text-amber-500">
                                <MessageCircle className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-white">Live Chat</h3>
                            <p className="text-sm text-slate-400">Chat langsung dengan tim support kami (09:00 - 17:00).</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => handleContactSupport('Email')}>
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-white">Email Support</h3>
                            <p className="text-sm text-slate-400">Kirim pertanyaan detail, kami balas dalam 24 jam.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer" onClick={() => handleContactSupport('WhatsApp')}>
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                            <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-white">WhatsApp</h3>
                            <p className="text-sm text-slate-400">Hubungi kami via WhatsApp untuk respon cepat.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Pertanyaan Umum (FAQ)</h2>
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        <AccordionItem value="item-1" className="border border-slate-800 rounded-lg px-4 bg-slate-900">
                            <AccordionTrigger className="text-slate-200 hover:text-amber-500 hover:no-underline">Bagaimana cara mendaftar sebagai Seller?</AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                Anda bisa mendaftar dengan klik tombol "Daftar" di halaman utama, lalu pilih opsi "Daftar sebagai Penjual". Lengkapi data toko Anda dan mulai berjualan.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border border-slate-800 rounded-lg px-4 bg-slate-900">
                            <AccordionTrigger className="text-slate-200 hover:text-amber-500 hover:no-underline">Apakah ada biaya layanan?</AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                Pendaftaran gratis 100%. Kami hanya mengenakan biaya administrasi kecil sebesar 1-2% untuk setiap transaksi yang berhasil.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border border-slate-800 rounded-lg px-4 bg-slate-900">
                            <AccordionTrigger className="text-slate-200 hover:text-amber-500 hover:no-underline">Bagaimana cara menarik dana penjualan?</AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                Dana penjualan akan masuk ke Saldo Penjual setelah pesanan selesai. Anda bisa menariknya kapan saja ke rekening bank terdaftar dengan minimal penarikan Rp 50.000.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        </div>
    )
}
