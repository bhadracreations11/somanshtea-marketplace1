'use client'

import { Globe, ChevronDown } from 'lucide-react'
import { useLanguageCurrency } from '@/components/providers/LanguageCurrencyProvider'
import { useState } from 'react'

export default function LanguageCurrencySelector() {
  const { language, currency, setLanguage, setCurrency, languages, currencies } = useLanguageCurrency()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">{language.flag} {language.code.toUpperCase()}</span>
        <span className="text-gray-600">•</span>
        <span className="font-medium">{currency.symbol} {currency.code}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border z-50">
            {/* Language Selection */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-3">Select Language</h3>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang)
                      setIsOpen(false)
                    }}
                    className={`p-3 rounded-lg text-left hover:bg-gray-50 ${
                      language.code === lang.code ? 'bg-somansh-green bg-opacity-10 border border-somansh-green' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <div>
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-gray-600">{lang.nativeName}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Selection */}
            <div className="p-4">
              <h3 className="font-semibold mb-3">Select Currency</h3>
              <div className="max-h-60 overflow-y-auto">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr)
                      setIsOpen(false)
                    }}
                    className={`w-full p-3 rounded-lg text-left hover:bg-gray-50 flex justify-between items-center ${
                      currency.code === curr.code ? 'bg-somansh-green bg-opacity-10' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium">{curr.name}</div>
                      <div className="text-sm text-gray-600">{curr.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{curr.symbol} {curr.code}</div>
                      {curr.code !== 'INR' && curr.markup > 0 && (
                        <div className="text-xs text-red-600">+{curr.markup}% international fee</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Example */}
            <div className="p-4 border-t bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">Example: 250 INR tea</div>
              <div className="font-medium">
                In {currency.code}: {currency.symbol}
                {convertPrice(250, currency.code).toFixed(2)}
                {currency.code !== 'INR' && currency.markup > 0 && (
                  <span className="text-sm text-gray-600 ml-2">
                    (includes {currency.markup}% international fee)
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Helper function
function convertPrice(inrPrice: number, currencyCode: string): number {
  const exchangeRates: Record<string, number> = {
    'INR': 1, 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095,
    'CAD': 0.016, 'AUD': 0.018, 'JPY': 1.78
  }
  const markups: Record<string, number> = {
    'INR': 0, 'USD': 15, 'EUR': 15, 'GBP': 15,
    'CAD': 15, 'AUD': 15, 'JPY': 15
  }
  
  const rate = exchangeRates[currencyCode] || 0.012
  const markup = markups[currencyCode] || 15
  let converted = inrPrice * rate
  if (currencyCode !== 'INR' && markup > 0) {
    converted *= (1 + markup / 100)
  }
  return Number(converted.toFixed(2))
}