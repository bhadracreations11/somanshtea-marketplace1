import { supabase } from './supabase'

export async function getSiteSettings() {
  const { data } = await supabase
    .from('site_settings')
    .select('setting_key, setting_value')
  
  const settings: Record<string, string> = {}
  data?.forEach(setting => {
    settings[setting.setting_key] = setting.setting_value
  })
  
  return {
    primary_color: settings.primary_color || '#2E8B57',
    secondary_color: settings.secondary_color || '#D4AF37',
    primary_font: settings.primary_font || 'Noto Sans Devanagari',
    secondary_font: settings.secondary_font || 'Marathi Calligraphy'
  }
}

export async function getContentBlocks(pageSlug: string) {
  const { data } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('page_slug', pageSlug)
    .eq('is_active', true)
  
  const blocks: Record<string, any> = {}
  data?.forEach(block => {
    blocks[block.block_key] = block
  })
  
  return blocks
}

export async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(6)
  
  return data || []
}

export async function getDashboardStats() {
  const [
    { count: productsCount },
    { count: ordersCount },
    { data: revenueData }
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total_amount').eq('order_status', 'completed')
  ])
  
  const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0
  
  return {
    products: productsCount || 0,
    orders: ordersCount || 0,
    revenue: totalRevenue,
    customers: ordersCount || 0
  }
}

export async function getRecentOrders(limit: number = 5) {
  const { data } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return data || []
}

export async function getLowStockProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .lt('stock_quantity', 10)
    .eq('is_active', true)
  
  return data || []
}