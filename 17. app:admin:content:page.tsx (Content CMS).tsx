'use client'

import { useState, useEffect } from 'react'
import { Search, Edit, Save, X, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ContentBlock {
  id: string
  page_slug: string
  block_key: string
  content_type: string
  content_text: string | null
  image_url: string | null
  image_alt: string | null
}

export default function ContentCMS() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadContentBlocks()
  }, [])

  const loadContentBlocks = async () => {
    const { data } = await supabase
      .from('content_blocks')
      .select('*')
      .order('page_slug')
    if (data) setBlocks(data)
  }

  const saveBlock = async (block: ContentBlock) => {
    await supabase
      .from('content_blocks')
      .upsert({
        ...block,
        updated_at: new Date().toISOString()
      })
    setBlocks(blocks.map(b => b.id === block.id ? block : b))
    setEditingBlock(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
          <p className="text-gray-600">Edit every text and image on every page</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search content blocks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 input-field" />
        </div>

        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold">{block.block_key}</div>
                  <div className="text-sm text-gray-500">{block.page_slug}</div>
                </div>
                <button onClick={() => setEditingBlock(block)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1">
                  <Edit className="h-4 w-4" /> Edit
                </button>
              </div>

              {block.content_type === 'text' && <div>{block.content_text}</div>}
              {block.content_type === 'image' && block.image_url && <img src={block.image_url} alt={block.image_alt || ''} className="max-w-xs rounded" />}

              {editingBlock?.id === block.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-4">
                    {block.content_type === 'text' ? (
                      <textarea value={editingBlock.content_text || ''} onChange={(e) => setEditingBlock({...editingBlock, content_text: e.target.value})} rows={4} className="input-field" />
                    ) : (
                      <div>
                        <input type="file" id="image-upload" className="hidden" />
                        <label htmlFor="image-upload" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer">
                          <Upload className="h-4 w-4" /> Upload New Image
                        </label>
                      </div>
                    )}
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setEditingBlock(null)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                        <X className="h-4 w-4" /> Cancel
                      </button>
                      <button onClick={() => saveBlock(editingBlock)} className="btn-primary flex items-center gap-2">
                        <Save className="h-4 w-4" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}