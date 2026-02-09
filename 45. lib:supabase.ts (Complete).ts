import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function for admin authentication
export const checkAdminAccess = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) return false
    
    // Check if user is the specific admin
    const isAdmin = session.user.email === 'contact@somanshtea.com'
    
    if (!isAdmin) {
      // Sign out non-admin users
      await supabase.auth.signOut()
      return false
    }
    
    return true
  } catch (error) {
    console.error('Auth check failed:', error)
    return false
  }
}

// Secure file upload helper
export const uploadFile = async (
  bucket: string,
  file: File,
  path: string
): Promise<{ url: string; error: string | null }> => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      return { url: '', error: uploadError.message }
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return { url: publicUrl, error: null }
  } catch (error: any) {
    return { url: '', error: error.message }
  }
}

// Secure data fetching with admin check
export const withAdmin = async <T>(
  callback: () => Promise<T>
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const isAdmin = await checkAdminAccess()
    
    if (!isAdmin) {
      return { data: null, error: 'Unauthorized access' }
    }
    
    const data = await callback()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}