import DashboardStats from '@/components/admin/DashboardStats'
import RecentOrders from '@/components/admin/RecentOrders'
import LowStockProducts from '@/components/admin/LowStockProducts'
import { getDashboardStats, getRecentOrders, getLowStockProducts } from '@/lib/data'

export default async function AdminDashboard() {
  const [stats, recentOrders, lowStockProducts] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
    getLowStockProducts()
  ])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Sole & Whole Controller</p>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <RecentOrders orders={recentOrders} />
        <LowStockProducts products={lowStockProducts} />
      </div>
    </div>
  )
}