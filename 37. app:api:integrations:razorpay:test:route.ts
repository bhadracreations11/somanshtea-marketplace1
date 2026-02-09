import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { key, secret } = await request.json()
    
    if (!key || !secret) {
      return NextResponse.json(
        { success: false, error: 'Missing credentials' },
        { status: 400 }
      )
    }

    // Test Razorpay API connection
    const auth = Buffer.from(`${key}:${secret}`).toString('base64')
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      return NextResponse.json({
        success: true,
        message: 'Razorpay connection successful'
      })
    } else {
      const error = await response.json()
      return NextResponse.json({
        success: false,
        error: error.error?.description || 'Invalid credentials'
      }, { status: response.status })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Connection failed'
    }, { status: 500 })
  }
}