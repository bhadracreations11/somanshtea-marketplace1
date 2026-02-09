'use client'

import { ShoppingBag, Menu } from 'lucide-react'
import Link from 'next/link'
import LanguageCurrencySelector from './LanguageCurrencySelector'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-somansh-green">
            Soman's Tea
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-somansh-green transition-colors">Home</Link>
            <Link href="/products" className="hover:text-somansh-green transition-colors">Products</Link>
            <Link href="/about" className="hover:text-somansh-green transition-colors">About</Link>
            <Link href="/contact" className="hover:text-somansh-green transition-colors">Contact</Link>
            <Link href="/admin" className="hover:text-somansh-green transition-colors">Admin</Link>
            
            <LanguageCurrencySelector />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-somansh-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
            <div className="md:hidden">
              <LanguageCurrencySelector />
            </div>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}