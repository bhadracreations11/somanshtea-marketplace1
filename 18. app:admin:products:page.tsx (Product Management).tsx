'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  sku: string
  name_english: string
  name_marathi: string
  price: number
  stock_quantity: number
  is_active: boolean
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Full CRUD for tea products with inventory tracking</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="admin-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{product.name_english}</h3>
                <p className="text-gray-600 marathi-text">{product.name_marathi}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-bold text-somansh-green">₹{product.price}</span>
                  <span className={`px-2 py-1 rounded text-sm ${product.stock_quantity > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Stock: {product.stock_quantity}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingProduct(product)} className="p-2 hover:bg-gray-100 rounded">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => deleteProduct(product.id)} className="p-2 hover:bg-red-50 rounded">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
          </div>
        ))}
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="admin-card max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SKU</label>
                  <input type="text" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <input type="number" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">English Name</label>
                <input type="text" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Marathi Name</label>
                <input type="text" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                <input type="number" className="input-field" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}