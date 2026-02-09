'use client'

import { useLanguageCurrency } from '@/components/providers/LanguageCurrencyProvider'
import { Info } from 'lucide-react'

interface PricingDisplayProps {
  inrPrice: number
  productName: string
  size?: 'sm' | 'md' | 'lg'
}

export default function PricingDisplay({ inrPrice, productName, size = 'md' }: PricingDisplayProps) {
  const { currency, convertPrice, formatPrice } = useLanguageCurrency()
  
  const convertedPrice = convertPrice(inrPrice)
  const isInternational = currency.code !== 'INR'
  const basePrice = inrPrice * getExchangeRate(currency.code)
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl'
  }

  return (
    <div className="space-y-2">
      <div className={`font-bold ${sizeClasses[size]} text-somansh-green`}>
        {formatPrice(convertedPrice)}
      </div>
      
      {isInternational && currency.markup > 0 && (
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Includes {currency.markup}% international fee</span>
          </div>
          <div className="text-xs">
            Base price: {formatPrice(basePrice)} + {currency.markup}% fee
          </div>
        </div>
      )}
      
      {currency.code !== 'INR' && (
        <div className="text-xs text-gray-500">
          ≈ ₹{inrPrice.toFixed(2)} in Indian Rupees
        </div>
      )}
    </div>
  )
}

// Helper function
function getExchangeRate(currencyCode: string): number {
  const rates: Record<string, number> = {
    'INR': 1, 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095,
    'CAD': 0.016, 'AUD': 0.018, 'JPY': 1.78
  }
  return rates[currencyCode] || 0.012
}