'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Delete, Divide, Equal, Minus, Plus, X } from 'lucide-react'

export default function Calculator() {
    const [display, setDisplay] = useState('0')
    const [prevValue, setPrevValue] = useState<number | null>(null)
    const [operator, setOperator] = useState<string | null>(null)
    const [waitingForNewValue, setWaitingForNewValue] = useState(false)

    const handleNumberConfig = (num: string) => {
        if (waitingForNewValue) {
            setDisplay(num)
            setWaitingForNewValue(false)
        } else {
            setDisplay(display === '0' ? num : display + num)
        }
    }

    const handleOperatorConfig = (op: string) => {
        if (operator && !waitingForNewValue) {
            const result = calculate(parseFloat(prevValue as any), parseFloat(display), operator)
            setDisplay(String(result))
            setPrevValue(result)
        } else {
            setPrevValue(parseFloat(display))
        }
        setOperator(op)
        setWaitingForNewValue(true)
    }

    const calculate = (a: number, b: number, op: string) => {
        switch (op) {
            case '+': return a + b
            case '-': return a - b
            case '*': return a * b
            case '/': return a / b
            default: return b
        }
    }

    const handleEqual = () => {
        if (operator && prevValue !== null) {
            const result = calculate(prevValue, parseFloat(display), operator)
            setDisplay(String(result))
            setPrevValue(null)
            setOperator(null)
            setWaitingForNewValue(true)
        }
    }

    const handleClear = () => {
        setDisplay('0')
        setPrevValue(null)
        setOperator(null)
        setWaitingForNewValue(false)
    }

    return (
        <Card className="bg-slate-900 border-slate-700 w-full max-w-[320px]">
            <CardHeader className="pb-2">
                <CardTitle className="text-slate-200 text-sm">Standard Calculator</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-slate-950 p-4 rounded-lg text-right text-3xl font-mono text-white mb-4 border border-slate-800 h-16 flex items-center justify-end overflow-hidden">
                    {display}
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" onClick={handleClear} className="col-span-3 border-red-500/50 text-red-400 hover:bg-red-500/10">AC</Button>
                    <Button variant="secondary" onClick={() => handleOperatorConfig('/')} className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"><Divide className="w-4 h-4" /></Button>

                    {['7', '8', '9'].map(n => (
                        <Button key={n} variant="ghost" onClick={() => handleNumberConfig(n)} className="bg-slate-800 hover:bg-slate-700 text-slate-200">{n}</Button>
                    ))}
                    <Button variant="secondary" onClick={() => handleOperatorConfig('*')} className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"><X className="w-4 h-4" /></Button>

                    {['4', '5', '6'].map(n => (
                        <Button key={n} variant="ghost" onClick={() => handleNumberConfig(n)} className="bg-slate-800 hover:bg-slate-700 text-slate-200">{n}</Button>
                    ))}
                    <Button variant="secondary" onClick={() => handleOperatorConfig('-')} className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"><Minus className="w-4 h-4" /></Button>

                    {['1', '2', '3'].map(n => (
                        <Button key={n} variant="ghost" onClick={() => handleNumberConfig(n)} className="bg-slate-800 hover:bg-slate-700 text-slate-200">{n}</Button>
                    ))}
                    <Button variant="secondary" onClick={() => handleOperatorConfig('+')} className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"><Plus className="w-4 h-4" /></Button>

                    <Button variant="ghost" onClick={() => handleNumberConfig('0')} className="col-span-2 bg-slate-800 hover:bg-slate-700 text-slate-200">0</Button>
                    <Button variant="ghost" onClick={() => handleNumberConfig('.')} className="bg-slate-800 hover:bg-slate-700 text-slate-200">.</Button>
                    <Button variant="default" onClick={handleEqual} className="bg-emerald-500 hover:bg-emerald-600 text-white"><Equal className="w-4 h-4" /></Button>
                </div>
            </CardContent>
        </Card>
    )
}
