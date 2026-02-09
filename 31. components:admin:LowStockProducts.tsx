import { AlertTriangle } from 'lucide-react'

interface Product {
  id: string
  name_english: string
  stock_quantity: number
  min_stock_threshold: number
}

export default function LowStockProducts({ products }: { products: Product[] }) {
  return (
    <div className="admin-card">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <h2 className="text-xl font-semibold">Low Stock Alert</h2>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div>
              <p className="font-medium">{product.name_english}</p>
              <p className="text-sm text-gray-600">Threshold: {product.min_stock_threshold}</p>
            </div>
            <div className={`px-3 py-1 rounded-full ${product.stock_quantity < 5 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {product.stock_quantity} left
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-gray-500 text-center py-4">All products have sufficient stock</p>
        )}
      </div>
    </div>
  )
}