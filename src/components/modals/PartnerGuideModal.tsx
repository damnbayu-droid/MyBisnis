'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText, Send, UserCheck } from 'lucide-react'

interface PartnerGuideModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onOpenForm: () => void
}

export default function PartnerGuideModal({ isOpen, onOpenChange, onOpenForm }: PartnerGuideModalProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl bg-slate-900 border-slate-800 text-slate-100 p-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />

                <DialogHeader className="mb-6">
                    <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        Cara Kerja & Pendaftaran
                    </DialogTitle>
                    <p className="text-center text-slate-400 mt-2">
                        Panduan singkat untuk memulai perjalanan bisnis Anda bersama kami.
                    </p>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Steps List */}
                    <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-4">
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 bg-slate-900 p-1">
                                <div className="w-4 h-4 rounded-full bg-amber-500 box-content border-4 border-slate-900" />
                            </div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-amber-500" />
                                Submit Data
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Isi formulir pendaftaran dengan data bisnis Anda yang valid.
                            </p>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 bg-slate-900 p-1">
                                <div className="w-4 h-4 rounded-full bg-slate-700 box-content border-4 border-slate-900" />
                            </div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-slate-500" />
                                Verifikasi
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Tim kami akan memverifikasi data dan menghubungi Anda via Email/Whatsapp.
                            </p>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 bg-slate-900 p-1">
                                <div className="w-4 h-4 rounded-full bg-slate-700 box-content border-4 border-slate-900" />
                            </div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-slate-500" />
                                Aktif & Berjualan
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Toko Anda aktif! Mulai upload produk dan terima pesanan.
                            </p>
                        </div>
                    </div>

                    {/* CTA Section - Fixed at bottom of visual flow */}
                    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                        <h4 className="text-white font-semibold mb-3 text-center">Siap Bergabung?</h4>
                        <Button
                            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-6 text-lg rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all hover:-translate-y-1"
                            onClick={() => {
                                onOpenChange(false)
                                onOpenForm()
                            }}
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Submit Now
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-3">
                            Klik tombol di atas untuk membuka formulir pendaftaran.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
