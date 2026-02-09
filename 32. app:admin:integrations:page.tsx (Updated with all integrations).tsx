'use client'

import { useState, useEffect } from 'react'
import { Key, Package, Globe, Save, TestTube } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Integrations() {
  const [razorpayKey, setRazorpayKey] = useState('')
  const [razorpaySecret, setRazorpaySecret] = useState('')
  const [shiprocketKey, setShiprocketKey] = useState('')
  const [shiprocketSecret, setShiprocketSecret] = useState('')
  const [shipglobalKey, setShipglobalKey] = useState('')
  const [shipglobalSecret, setShipglobalSecret] = useState('')
  const [testing, setTesting] = useState<string>('')

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    const { data } = await supabase.from('integrations').select('*')
    
    data?.forEach(integration => {
      if (integration.service_name === 'razorpay') {
        setRazorpayKey(integration.api_key_encrypted || '')
        setRazorpaySecret(integration.api_secret_encrypted || '')
      } else if (integration.service_name === 'shiprocket') {
        setShiprocketKey(integration.api_key_encrypted || '')
        setShiprocketSecret(integration.api_secret_encrypted || '')
      } else if (integration.service_name === 'shipglobal') {
        setShipglobalKey(integration.api_key_encrypted || '')
        setShipglobalSecret(integration.api_secret_encrypted || '')
      }
    })
  }

  const saveIntegration = async (serviceName: string, config: any) => {
    await supabase
      .from('integrations')
      .upsert({
        service_name: serviceName,
        api_key_encrypted: config.key,
        api_secret_encrypted: config.secret,
        is_active: true,
        config: config
      })
    
    setTesting(`✅ ${serviceName} credentials saved successfully!`)
    setTimeout(() => setTesting(''), 3000)
  }

  const testRazorpay = async () => {
    try {
      const response = await fetch('/api/integrations/razorpay/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: razorpayKey, secret: razorpaySecret })
      })
      const data = await response.json()
      setTesting(data.success ? '✅ Razorpay connection successful!' : '❌ Razorpay test failed')
    } catch {
      setTesting('❌ Razorpay test failed')
    }
  }

  const testShiprocket = async () => {
    try {
      const response = await fetch('/api/integrations/shiprocket/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: shiprocketKey, secret: shiprocketSecret })
      })
      const data = await response.json()
      setTesting(data.success ? '✅ Shiprocket connection successful!' : '❌ Shiprocket test failed')
    } catch {
      setTesting('❌ Shiprocket test failed')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600">Payment gateways and international shipping services</p>
      </div>

      {testing && (
        <div className={`p-4 rounded-lg ${testing.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {testing}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Razorpay Integration */}
        <div className="admin-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Razorpay Payment Gateway</h3>
              <p className="text-gray-600">Process Indian and international payments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input
                type="password"
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
                className="input-field"
                placeholder="rzp_test_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Secret</label>
              <input
                type="password"
                value={razorpaySecret}
                onChange={(e) => setRazorpaySecret(e.target.value)}
                className="input-field"
                placeholder="..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => saveIntegration('razorpay', { key: razorpayKey, secret: razorpaySecret })}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" /> Save
              </button>
              <button
                onClick={testRazorpay}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" /> Test
              </button>
            </div>
          </div>
        </div>

        {/* Shiprocket Integration */}
        <div className="admin-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Shiprocket (Domestic)</h3>
              <p className="text-gray-600">Shipping within India</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={shiprocketKey}
                onChange={(e) => setShiprocketKey(e.target.value)}
                className="input-field"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={shiprocketSecret}
                onChange={(e) => setShiprocketSecret(e.target.value)}
                className="input-field"
                placeholder="..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => saveIntegration('shiprocket', { key: shiprocketKey, secret: shiprocketSecret })}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" /> Save
              </button>
              <button
                onClick={testShiprocket}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" /> Test
              </button>
            </div>
          </div>
        </div>

        {/* ShipGlobal Integration */}
        <div className="admin-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">ShipGlobal (International)</h3>
              <p className="text-gray-600">Worldwide shipping for EU, US, etc.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input
                type="password"
                value={shipglobalKey}
                onChange={(e) => setShipglobalKey(e.target.value)}
                className="input-field"
                placeholder="sg_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Secret</label>
              <input
                type="password"
                value={shipglobalSecret}
                onChange={(e) => setShipglobalSecret(e.target.value)}
                className="input-field"
                placeholder="..."
              />
            </div>
            <button
              onClick={() => saveIntegration('shipglobal', { key: shipglobalKey, secret: shipglobalSecret })}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" /> Save International Shipping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}