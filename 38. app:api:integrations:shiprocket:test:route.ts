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

    // Get Shiprocket token
    const tokenResponse = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: key,
        password: secret
      })
    })

    if (tokenResponse.status === 200) {
      return NextResponse.json({
        success: true,
        message: 'Shiprocket connection successful'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid Shiprocket credentials'
      }, { status: 401 })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Connection failed'
    }, { status: 500 })
  }
}