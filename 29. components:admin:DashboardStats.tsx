import { Package, ShoppingBag, DollarSign, Users } from 'lucide-react'

interface Stats {
  products: number
  orders: number
  revenue: number
  customers: number
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const statCards = [
    { icon: Package, label: 'Total Products', value: stats.products, color: 'bg-blue-500' },
    { icon: ShoppingBag, label: 'Total Orders', value: stats.orders, color: 'bg-green-500' },
    { icon: DollarSign, label: 'Total Revenue', value: `₹${stats.revenue}`, color: 'bg-yellow-500' },
    { icon: Users, label: 'Customers', value: stats.customers, color: 'bg-purple-500' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div key={stat.label} className="admin-card">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${stat.color} rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}