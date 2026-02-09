'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CURRENCIES, Currency, convertPrice, formatPrice } from '@/lib/currency'
import { LANGUAGES, Language, getTranslation } from '@/lib/languages'

interface LanguageCurrencyContextType {
  language: Language
  currency: Currency
  setLanguage: (lang: Language) => void
  setCurrency: (curr: Currency) => void
  convertPrice: (inrPrice: number) => number
  formatPrice: (amount: number) => string
  t: (key: string) => string
  languages: Language[]
  currencies: Currency[]
}

const LanguageCurrencyContext = createContext<LanguageCurrencyContextType | undefined>(undefined)

export function useLanguageCurrency() {
  const context = useContext(LanguageCurrencyContext)
  if (!context) {
    throw new Error('useLanguageCurrency must be used within LanguageCurrencyProvider')
  }
  return context
}

export default function LanguageCurrencyProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(LANGUAGES[0])
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('somansh_language')
    const savedCurrency = localStorage.getItem('somansh_currency')
    
    if (savedLanguage) {
      const lang = LANGUAGES.find(l => l.code === savedLanguage)
      if (lang) setLanguage(lang)
    }
    
    if (savedCurrency) {
      const curr = CURRENCIES.find(c => c.code === savedCurrency)
      if (curr) setCurrency(curr)
    }
    
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('somansh_language', language.code)
      localStorage.setItem('somansh_currency', currency.code)
      
      // Update HTML direction for RTL languages
      document.documentElement.dir = language.direction
      document.documentElement.lang = language.code
    }
  }, [language, currency, mounted])

  const handleConvertPrice = (inrPrice: number): number => {
    return convertPrice(inrPrice, currency.code)
  }

  const handleFormatPrice = (amount: number): string => {
    return formatPrice(amount, currency.code, language.code)
  }

  const t = (key: string): string => {
    return getTranslation(key, language.code)
  }

  if (!mounted) return null

  return (
    <LanguageCurrencyContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        convertPrice: handleConvertPrice,
        formatPrice: handleFormatPrice,
        t,
        languages: LANGUAGES,
        currencies: CURRENCIES
      }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  )
}