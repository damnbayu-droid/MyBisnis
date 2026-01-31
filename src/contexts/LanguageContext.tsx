
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'id' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('id')

    // Ideally load from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
            setLanguage(savedLang)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    // Simple placeholder for translation function if needed, 
    // but mostly we will pull data objects based on language
    const t = (key: string) => key

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
