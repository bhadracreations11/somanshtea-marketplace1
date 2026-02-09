'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, Percent, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { CURRENCIES } from '@/lib/currency'

interface InternationalSettings {
  default_international_markup: number
  free_shipping_threshold: number
  eu_vat_rate: number
  us_tax_rate: number
  enable_auto_currency: boolean
  enable_language_detection: boolean
}

export default function InternationalSettings() {
  const [settings, setSettings] = useState<InternationalSettings>({
    default_international_markup: 15,
    free_shipping_threshold: 5000,
    eu_vat_rate: 20,
    us_tax_rate: 8,
    enable_auto_currency: true,
    enable_language_detection: true
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .in('setting_key', [
        'default_international_markup',
        'free_shipping_threshold',
        'eu_vat_rate',
        'us_tax_rate',
        'enable_auto_currency',
        'enable_language_detection'
      ])
    
    const loadedSettings: any = {}
    data?.forEach(setting => {
      if (setting.setting_type === 'number') {
        loadedSettings[setting.setting_key] = Number(setting.setting_value)
      } else if (setting.setting_type === 'boolean') {
        loadedSettings[setting.setting_key] = setting.setting_value === 'true'
      }
    })
    
    setSettings(prev => ({ ...prev, ...loadedSettings }))
  }

  const saveSettings = async () => {
    setSaving(true)
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      setting_key: key,
      setting_value: String(value),
      setting_type: typeof value === 'boolean' ? 'boolean' : 'number'
    }))
    
    for (const update of updates) {
      await supabase
        .from('site_settings')
        .upsert(update)
    }
    
    // Update all currencies markup
    if (settings.default_international_markup) {
      await supabase
        .from('currency_rates')
        .update({ markup: settings.default_international_markup })
        .neq('code', 'INR')
    }
    
    setSaving(false)
    alert('International settings saved!')
  }

  const calculateExample = (basePrice: number) => {
    const markup = settings.default_international_markup
    const vat = settings.eu_vat_rate
    const total = basePrice * (1 + markup/100) * (1 + vat/100)
    return total.toFixed(2)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">International Settings</h1>
        <p className="text-gray-600">Configure global pricing, taxes, and shipping</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pricing Settings */}
        <div className="admin-card">
          <div className="flex items-center gap-3 mb-6">
            <Percent className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Pricing & Markup</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Default International Markup (%)
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={settings.default_international_markup}
                onChange={(e) => setSettings({...settings, default_international_markup: Number(e.target.value)})}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0%</span>
                <span className="font-bold">{settings.default_international_markup}%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Free Shipping Threshold (INR)
              </label>
              <input
                type="number"
                value={settings.free_shipping_threshold}
                onChange={(e) => setSettings({...settings, free_shipping_threshold: Number(e.target.value)})}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Tax Settings */}
        <div className="admin-card">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">Regional Taxes</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                EU VAT Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={settings.eu_vat_rate}
                onChange={(e) => setSettings({...settings, eu_vat_rate: Number(e.target.value)})}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                US Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="15"
                value={settings.us_tax_rate}
                onChange={(e) => setSettings({...settings, us_tax_rate: Number(e.target.value)})}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Auto Detection */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold mb-6">Auto Detection</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Currency Detection</p>
                <p className="text-sm text-gray-600">Detect currency based on user location</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enable_auto_currency}
                  onChange={(e) => setSettings({...settings, enable_auto_currency: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-somansh-green"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language Detection</p>
                <p className="text-sm text-gray-600">Detect language from browser</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enable_language_detection}
                  onChange={(e) => setSettings({...settings, enable_language_detection: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-somansh-green"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Price Example */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold mb-6">Price Calculation Example</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Product Price (INR):</span>
                  <span className="font-medium">₹250</span>
                </div>
                <div className="flex justify-between">
                  <span>International Markup ({settings.default_international_markup}%):</span>
                  <span className="font-medium">+{settings.default_international_markup}%</span>
                </div>
                <div className="flex justify-between">
                  <span>EU VAT ({settings.eu_vat_rate}%):</span>
                  <span className="font-medium">+{settings.eu_vat_rate}%</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Final Price (EUR):</span>
                  <span className="text-somansh-green">€{calculateExample(250)}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              Example calculation for EU customer: ₹250 tea → €{calculateExample(250)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save International Settings'}
        </button>
      </div>
    </div>
  )
}