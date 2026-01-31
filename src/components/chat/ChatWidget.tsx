'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, X, MessageCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Halo! Saya My-Ai. Ada yang bisa saya bantu tentang MyBisnis atau seputar umkm dan Transportasi digital?' }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
        }
    }, [messages, isOpen])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            // Prepare context for the API
            // We send the last 10 messages to keep context without overloading tokens
            const contextMessages = [...messages, userMessage].slice(-10)

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: contextMessages })
            })

            if (!response.ok) {
                throw new Error('Network error')
            }

            const data = await response.json()

            if (data.error) {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan pada server.' }])
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, saya sedang mengalami gangguan. Coba lagi nanti.' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            <div className={cn(
                "transition-all duration-300 ease-in-out transform origin-bottom-right mb-4",
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none absolute"
            )}>
                <Card className="w-[350px] md:w-[400px] h-[500px] shadow-2xl border-amber-500/30 bg-slate-900 flex flex-col overflow-hidden ring-1 ring-slate-700">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center ring-1 ring-amber-500/50 border border-slate-700">
                                <Bot className="w-7 h-7 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-100 text-lg">My-Ai</h3>
                                <p className="text-xs text-amber-500 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4 bg-slate-950/50" ref={scrollRef}>
                        <div className="flex flex-col gap-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={cn(
                                    "flex w-full",
                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                )}>
                                    <div className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-amber-600 text-white rounded-tr-none"
                                            : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start w-full">
                                    <div className="bg-slate-800 text-slate-400 border border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-2">
                                        <Bot className="w-4 h-4 animate-spin text-amber-500" /> Sedang mengetik...
                                    </div>
                                </div>
                            )}
                            {/* Dummy div for auto scroll */}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanya My-Ai..."
                                className="bg-slate-800 border-slate-700 text-slate-100 focus:ring-amber-500/50 focus:border-amber-500"
                            />
                            <Button type="submit" size="icon" className="bg-amber-500 hover:bg-amber-600 text-slate-900 shrink-0" disabled={isLoading || !input.trim()}>
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                        <p className="text-[10px] text-center text-slate-500 mt-2">
                            My-Ai dapat membuat kesalahan. Cek ulang info penting.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Floating Toggle Button */}
            <Button
                className={cn(
                    "h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-slate-700 px-5 flex items-center gap-3",
                    isOpen ? "bg-slate-800 text-slate-400 scale-0 opacity-0 absolute" : "bg-slate-900 text-amber-500 hover:bg-slate-800 hover:text-amber-400"
                )}
                onClick={() => setIsOpen(true)}
            >
                <span className="font-bold text-base md:text-lg pt-0.5">My-Ai</span>
                <MessageCircle className="w-8 h-8 md:w-9 md:h-9" />
                <span className="sr-only">Open Chat</span>
            </Button>
        </div>
    )
}
