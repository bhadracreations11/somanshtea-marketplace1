import { CheckCircle, Clock, XCircle } from 'lucide-react'

interface Order {
  id: string
  order_number: string
  customer_name: string
  total_amount: number
  order_status: string
  created_at: string
}

export default function RecentOrders({ orders }: { orders: Order[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-600" />
      default: return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="admin-card">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{order.order_number}</p>
              <p className="text-sm text-gray-600">{order.customer_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">₹{order.total_amount}</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(order.order_status)}
                <span className="text-sm capitalize">{order.order_status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}