export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  direction: 'ltr' | 'rtl'
}

export const LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    direction: 'ltr'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr'
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    direction: 'ltr'
  }
]

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'welcome': 'Welcome to Soman\'s Tea',
    'products': 'Products',
    'about': 'About Us',
    'contact': 'Contact',
    'add_to_cart': 'Add to Cart',
    'price': 'Price',
    'description': 'Description',
    'buy_now': 'Buy Now',
    'free_shipping': 'Free Shipping Worldwide',
    'premium_tea': 'Premium Indian Tea'
  },
  hi: {
    'welcome': 'सोमन चाय में आपका स्वागत है',
    'products': 'उत्पाद',
    'about': 'हमारे बारे में',
    'contact': 'संपर्क करें',
    'add_to_cart': 'कार्ट में जोड़ें',
    'price': 'मूल्य',
    'description': 'विवरण',
    'buy_now': 'अभी खरीदें',
    'free_shipping': 'विश्वव्यापी मुफ़्त शिपिंग',
    'premium_tea': 'प्रीमियम भारतीय चाय'
  },
  mr: {
    'welcome': 'सोमन च्या मध्ये आपले स्वागत आहे',
    'products': 'उत्पादने',
    'about': 'आमच्याबद्दल',
    'contact': 'संपर्क',
    'add_to_cart': 'कार्टमध्ये जोडा',
    'price': 'किंमत',
    'description': 'वर्णन',
    'buy_now': 'आत्ताच विकत घ्या',
    'free_shipping': 'जगभरात विनामूल्य शिपिंग',
    'premium_tea': 'प्रीमियम भारतीय चहा'
  },
  fr: {
    'welcome': 'Bienvenue chez Soman\'s Tea',
    'products': 'Produits',
    'about': 'À propos de nous',
    'contact': 'Contact',
    'add_to_cart': 'Ajouter au panier',
    'price': 'Prix',
    'description': 'Description',
    'buy_now': 'Acheter maintenant',
    'free_shipping': 'Livraison gratuite dans le monde entier',
    'premium_tea': 'Thé indien premium'
  }
}

export function getTranslation(key: string, language: string = 'en'): string {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key
}