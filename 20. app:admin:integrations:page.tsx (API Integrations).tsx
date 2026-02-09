'use client'

import { useState, useEffect } from 'react'
import { Key, Lock, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Integration {
  id: string
  service_name: string
  is_active: boolean
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({})

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    const { data } = await supabase.from('integrations').select('*')
    if (data) setIntegrations(data)
  }

  const saveIntegration = async (serviceName: string) => {
    await supabase
      .from('integrations')
      .upsert({
        service_name: serviceName,
        api_key_encrypted: apiKeys[serviceName],
        is_active: true
      })
    alert('API Key saved!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Payment gateways and shipping services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Payment Gateway</h3>
              <p className="text-sm text-gray-600">Razorpay/Stripe</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input type="password" value={apiKeys.razorpay || ''} onChange={(e) => setApiKeys({...apiKeys, razorpay: e.target.value})} className="input-field" placeholder="rzp_test_..." />
            </div>
            <button onClick={() => saveIntegration('razorpay')} className="btn-primary flex items-center gap-2 w-full">
              <Save className="h-4 w-4" /> Save Payment Keys
            </button>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Shipping Service</h3>
              <p className="text-sm text-gray-600">Shiprocket/Delhivery</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input type="password" value={apiKeys.shiprocket || ''} onChange={(e) => setApiKeys({...apiKeys, shiprocket: e.target.value})} className="input-field" placeholder="shp_..." />
            </div>
            <button onClick={() => saveIntegration('shiprocket')} className="btn-primary flex items-center gap-2 w-full">
              <Save className="h-4 w-4" /> Save Shipping Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}