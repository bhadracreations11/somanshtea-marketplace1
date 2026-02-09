'use client'

import { useState, useEffect } from 'react'
import { Upload, Check, Trash2, Download } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Font {
  id: string
  font_name: string
  font_family: string
  font_file_url: string | null
  is_active: boolean
}

export default function TypographyEditor() {
  const [fonts, setFonts] = useState<Font[]>([])
  const [activeFont, setActiveFont] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadFonts()
    loadActiveFont()
  }, [])

  const loadFonts = async () => {
    const { data } = await supabase
      .from('font_library')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setFonts(data)
  }

  const loadActiveFont = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'primary_font')
      .single()
    if (data) setActiveFont(data.setting_value)
  }

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `fonts/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('fonts')
      .upload(filePath, file)

    if (uploadError) {
      alert('Upload failed')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('fonts')
      .getPublicUrl(filePath)

    const fontFamily = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '')

    const { error: dbError } = await supabase
      .from('font_library')
      .insert({
        font_name: fontFamily,
        font_family: fontFamily,
        font_file_url: publicUrl,
        font_type: fileExt
      })

    if (!dbError) {
      await loadFonts()
    }

    setUploading(false)
  }

  const setAsActiveFont = async (fontFamily: string) => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: 'primary_font',
        setting_value: fontFamily,
        setting_type: 'font'
      })

    if (!error) {
      setActiveFont(fontFamily)
      document.documentElement.style.setProperty('--font-primary', fontFamily)
    }
  }

  const deleteFont = async (id: string) => {
    if (!confirm('Delete this font?')) return
    await supabase.from('font_library').delete().eq('id', id)
    setFonts(fonts.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Typography & Design Bank</h1>
          <p className="text-gray-600">Upload .ttf/.woff Marathi fonts</p>
        </div>
        <div>
          <input type="file" id="font-upload" accept=".ttf,.woff,.woff2" onChange={handleFontUpload} className="hidden" />
          <label htmlFor="font-upload" className="btn-primary flex items-center gap-2 cursor-pointer">
            <Upload className="h-4 w-4" /> Upload Font
          </label>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="text-xl font-semibold mb-4">Current Active Font</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl" style={{ fontFamily: activeFont }}>
            {activeFont || 'Noto Sans Devanagari'}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="text-xl font-semibold mb-4">Font Library</h2>
        <div className="space-y-4">
          {fonts.map((font) => (
            <div key={font.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="text-xl mb-2" style={{ fontFamily: font.font_family }}>
                  {font.font_name}
                </div>
                <div className="text-sm text-gray-500">{font.font_type}</div>
              </div>
              <div className="flex gap-2">
                {activeFont !== font.font_family && (
                  <button onClick={() => setAsActiveFont(font.font_family)} className="px-3 py-1 bg-somansh-green text-white rounded-md hover:bg-green-700 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Set Active
                  </button>
                )}
                {activeFont === font.font_family && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md">Active</span>
                )}
                <button onClick={() => deleteFont(font.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center gap-1">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}