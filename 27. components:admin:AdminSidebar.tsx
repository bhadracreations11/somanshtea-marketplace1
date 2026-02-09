'use client'

import { 
  LayoutDashboard, 
  Type, 
  Palette, 
  FileText, 
  Package, 
  ShoppingBag, 
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/typography', icon: Type, label: 'Typography Bank' },
  { href: '/admin/colors', icon: Palette, label: 'Color Palette' },
  { href: '/admin/content', icon: FileText, label: 'Content CMS' },
  { href: '/admin/products', icon: Package, label: 'Product Management' },
  { href: '/admin/orders', icon: ShoppingBag, label: 'Order Management' },
  { href: '/admin/integrations', icon: Settings, label: 'Integrations' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-somansh-green">Sole & Whole Admin</h1>
        <p className="text-sm text-gray-600">Complete Control Panel</p>
      </div>
      
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-somansh-green text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-8 pt-8 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}