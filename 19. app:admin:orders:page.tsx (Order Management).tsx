'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Package, Truck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  order_number: string
  customer_name: string
  total_amount: number
  order_status: string
  created_at: string
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setOrders(data)
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    await supabase
      .from('orders')
      .update({ order_status: status })
      .eq('id', orderId)
    loadOrders()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Process and track customer orders</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Order #</th>
                <th className="text-left py-3">Customer</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-mono">{order.order_number}</td>
                  <td className="py-3">{order.customer_name}</td>
                  <td className="py-3">₹{order.total_amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.order_status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.order_status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td className="py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => updateOrderStatus(order.id, 'processing')} className="p-2 hover:bg-blue-50 rounded">
                        <Package className="h-4 w-4 text-blue-600" />
                      </button>
                      <button onClick={() => updateOrderStatus(order.id, 'completed')} className="p-2 hover:bg-green-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </button>
                      <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="p-2 hover:bg-red-50 rounded">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}