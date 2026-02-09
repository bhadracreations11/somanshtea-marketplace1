export interface Currency {
  code: string
  name: string
  symbol: string
  country: string
  exchangeRate: number // 1 INR = X currency
  markup: number // Additional percentage for international (default 15%)
}

export const CURRENCIES: Currency[] = [
  // Indian Subcontinent
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', exchangeRate: 1, markup: 0 },
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States', exchangeRate: 0.012, markup: 15 },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union', exchangeRate: 0.011, markup: 15 },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom', exchangeRate: 0.0095, markup: 15 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', country: 'Canada', exchangeRate: 0.016, markup: 15 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia', exchangeRate: 0.018, markup: 15 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan', exchangeRate: 1.78, markup: 15 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China', exchangeRate: 0.086, markup: 15 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore', exchangeRate: 0.016, markup: 15 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'UAE', exchangeRate: 0.044, markup: 10 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', country: 'Saudi Arabia', exchangeRate: 0.045, markup: 10 },
  
  // European Currencies
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland', exchangeRate: 0.0105, markup: 15 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', country: 'Sweden', exchangeRate: 0.12, markup: 15 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', country: 'Norway', exchangeRate: 0.13, markup: 15 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', country: 'Denmark', exchangeRate: 0.082, markup: 15 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', country: 'Poland', exchangeRate: 0.048, markup: 15 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', country: 'Czech Republic', exchangeRate: 0.27, markup: 15 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary', exchangeRate: 4.2, markup: 15 },
  
  // Asian Currencies
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea', exchangeRate: 16, markup: 15 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand', exchangeRate: 0.43, markup: 15 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia', exchangeRate: 0.057, markup: 15 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia', exchangeRate: 188, markup: 15 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', country: 'Vietnam', exchangeRate: 295, markup: 15 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', country: 'Philippines', exchangeRate: 0.67, markup: 15 },
  
  // Middle East
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', country: 'Qatar', exchangeRate: 0.044, markup: 10 },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', country: 'Oman', exchangeRate: 0.0046, markup: 10 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', country: 'Kuwait', exchangeRate: 0.0037, markup: 10 },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', country: 'Bahrain', exchangeRate: 0.0045, markup: 10 },
  
  // African Currencies
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa', exchangeRate: 0.22, markup: 15 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', country: 'Egypt', exchangeRate: 0.37, markup: 15 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria', exchangeRate: 18, markup: 15 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', country: 'Kenya', exchangeRate: 1.9, markup: 15 },
  
  // South American Currencies
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil', exchangeRate: 0.059, markup: 15 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', country: 'Mexico', exchangeRate: 0.20, markup: 15 },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', country: 'Argentina', exchangeRate: 10, markup: 15 },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', country: 'Chile', exchangeRate: 11, markup: 15 },
  
  // More Currencies
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', country: 'Russia', exchangeRate: 1.1, markup: 15 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', country: 'Turkey', exchangeRate: 0.39, markup: 15 },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', country: 'Israel', exchangeRate: 0.044, markup: 15 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand', exchangeRate: 0.020, markup: 15 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong', exchangeRate: 0.094, markup: 15 },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', country: 'Taiwan', exchangeRate: 0.38, markup: 15 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', country: 'Pakistan', exchangeRate: 3.3, markup: 5 },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh', exchangeRate: 1.3, markup: 5 },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', country: 'Sri Lanka', exchangeRate: 3.9, markup: 5 },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', country: 'Nepal', exchangeRate: 1.6, markup: 0 },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', country: 'Bhutan', exchangeRate: 1, markup: 0 },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', country: 'Maldives', exchangeRate: 0.18, markup: 5 },
]

export function convertPrice(
  inrPrice: number,
  targetCurrency: string,
  includeMarkup: boolean = true
): number {
  const currency = CURRENCIES.find(c => c.code === targetCurrency)
  if (!currency) return inrPrice
  
  let converted = inrPrice * currency.exchangeRate
  
  if (includeMarkup && currency.markup > 0 && targetCurrency !== 'INR') {
    converted *= (1 + currency.markup / 100)
  }
  
  return Number(converted.toFixed(2))
}

export function formatPrice(
  amount: number,
  currencyCode: string,
  locale: string = 'en-IN'
): string {
  const currency = CURRENCIES.find(c => c.code === currencyCode)
  if (!currency) return `${amount}`
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export function getCurrencyByCountry(countryCode: string): Currency {
  const countryMap: Record<string, string> = {
    'IN': 'INR', 'US': 'USD', 'GB': 'GBP', 'CA': 'CAD', 'AU': 'AUD',
    'JP': 'JPY', 'CN': 'CNY', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR',
    'ES': 'EUR', 'NL': 'EUR', 'BE': 'EUR', 'CH': 'CHF', 'SE': 'SEK',
    'NO': 'NOK', 'DK': 'DKK', 'AE': 'AED', 'SA': 'SAR', 'QA': 'QAR',
    'SG': 'SGD', 'MY': 'MYR', 'TH': 'THB', 'KR': 'KRW', 'BR': 'BRL',
    'MX': 'MXN', 'RU': 'RUB', 'ZA': 'ZAR', 'NZ': 'NZD', 'HK': 'HKD',
    'TW': 'TWD', 'PK': 'PKR', 'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR',
    'BT': 'BTN', 'MV': 'MVR'
  }
  
  const code = countryMap[countryCode.toUpperCase()] || 'USD'
  return CURRENCIES.find(c => c.code === code) || CURRENCIES[0]
}

export function detectUserCurrency(): Currency {
  if (typeof window === 'undefined') return CURRENCIES[0]
  
  // Try to detect from browser
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const language = navigator.language
  
  // Simple detection logic
  if (language.includes('IN')) return CURRENCIES[0]
  if (language.includes('US')) return CURRENCIES[1]
  if (language.includes('GB')) return CURRENCIES[3]
  if (language.includes('FR') || language.includes('DE') || language.includes('ES')) return CURRENCIES[2]
  
  // Default to USD
  return CURRENCIES[1]
}