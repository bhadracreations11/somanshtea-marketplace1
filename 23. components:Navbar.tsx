import { ShoppingBag, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-somansh-green">
            Soman's Tea
          </Link>
          
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-somansh-green">Home</Link>
            <Link href="/products" className="hover:text-somansh-green">Products</Link>
            <Link href="/about" className="hover:text-somansh-green">About</Link>
            <Link href="/contact" className="hover:text-somansh-green">Contact</Link>
            <Link href="/admin" className="hover:text-somansh-green">Admin</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-somansh-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
            <Menu className="md:hidden h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  )
}