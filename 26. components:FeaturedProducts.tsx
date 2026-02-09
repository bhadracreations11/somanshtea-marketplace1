import { Star, ShoppingBag } from 'lucide-react'

interface Product {
  id: string
  name_english: string
  name_marathi: string
  price: number
  images: string[]
}

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Teas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img src={product.images[0] || '/images/tea-default.jpg'} alt={product.name_english} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name_english}</h3>
              <p className="text-gray-600 marathi-text mb-4">{product.name_marathi}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-somansh-green">₹{product.price}</span>
                <button className="btn-secondary flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}