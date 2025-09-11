// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    const magicToken = await prisma.magicToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!magicToken || magicToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Delete the used token
    await prisma.magicToken.delete({
      where: { token }
    })

    return NextResponse.json({ 
      success: true, 
      userId: magicToken.userId 
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    )
  }
}