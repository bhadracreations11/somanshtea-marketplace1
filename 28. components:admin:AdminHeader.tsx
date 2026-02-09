'use client'

import { Bell, User, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminHeader() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [])

  return (
    <header className="bg-white border-b">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-somansh-green" />
          <span className="font-semibold">Sole Admin Controller</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-somansh-green rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">{user?.email || 'Admin'}</p>
              <p className="text-sm text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}