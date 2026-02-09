'use client'

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Color {
  id: string
  color_name: string
  color_value: string
  color_type: string
}

export default function ColorPaletteEditor() {
  const [colors, setColors] = useState<Color[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadColors()
  }, [])

  const loadColors = async () => {
    const { data } = await supabase.from('color_palette').select('*')
    if (data) setColors(data)
  }

  const handleColorChange = (color: Color, newValue: string) => {
    setColors(colors.map(c => 
      c.id === color.id ? { ...c, color_value: newValue } : c
    ))
    
    if (color.color_type === 'primary') {
      document.documentElement.style.setProperty('--primary-color', newValue)
    } else if (color.color_type === 'secondary') {
      document.documentElement.style.setProperty('--secondary-color', newValue)
    }
  }

  const saveColors = async () => {
    setSaving(true)
    for (const color of colors) {
      await supabase
        .from('color_palette')
        .update({ color_value: color.color_value })
        .eq('id', color.id)
      
      if (color.color_type === 'primary') {
        await supabase.from('site_settings').upsert({
          setting_key: 'primary_color',
          setting_value: color.color_value,
          setting_type: 'color'
        })
      } else if (color.color_type === 'secondary') {
        await supabase.from('site_settings').upsert({
          setting_key: 'secondary_color',
          setting_value: color.color_value,
          setting_type: 'color'
        })
      }
    }
    setSaving(false)
    alert('Colors saved!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Color Palette</h1>
          <p className="text-gray-600">Change Somansh Green & Gold globally</p>
        </div>
        <button onClick={saveColors} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {colors.map((color) => (
          <div key={color.id} className="admin-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{color.color_name}</h3>
                <p className="text-gray-600 capitalize">{color.color_type} Color</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded border" style={{ backgroundColor: color.color_value }} />
                <span className="font-mono">{color.color_value}</span>
              </div>
            </div>
            <HexColorPicker color={color.color_value} onChange={(newColor) => handleColorChange(color, newColor)} />
            <input type="text" value={color.color_value} onChange={(e) => handleColorChange(color, e.target.value)} className="input-field font-mono mt-4" />
          </div>
        ))}
      </div>
    </div>
  )
}