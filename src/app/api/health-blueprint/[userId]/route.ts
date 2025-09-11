// app/api/health-blueprint/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const blueprint = await prisma.healthBlueprint.findFirst({
      where: { userId: params.userId }
    })
    
    if (!blueprint) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 })
    }
    
    // Transform data back to frontend format
    const formattedBlueprint = {
      id: blueprint.id,
      userId: blueprint.userId,
      name: blueprint.name,
      email: blueprint.email,
      healthGoals: {
        goal1: blueprint.goal1 || '',
        goal2: blueprint.goal2 || '',
        goal3: blueprint.goal3 || ''
      },
      keyMetrics: blueprint.keyMetrics,
      month1Plan: blueprint.month1Plan,
      month2Plan: blueprint.month2Plan,
      month3Plan: blueprint.month3Plan,
      whyStatement: blueprint.whyStatement || '',
      achievementBenefits: blueprint.achievementBenefits || '',
      mostImportantBenefit: blueprint.mostImportantBenefit || '',
      healthBuddy: blueprint.healthBuddy || '',
      connectionMethods: blueprint.connectionMethods,
      familySupport: blueprint.familySupport,
      obstacles: blueprint.obstacles,
      emergencyPlan: blueprint.emergencyPlan,
      checkInDates: blueprint.checkInDates,
      apps: blueprint.apps,
      equipment: blueprint.equipment,
      learningResources: blueprint.learningResources,
      weeklyRewards: blueprint.weeklyRewards || '',
      monthlyRewards: blueprint.monthlyRewards || '',
      ninetyDayReward: blueprint.ninetyDayReward || '',
      commitments: blueprint.commitments,
      completedAt: blueprint.completedAt,
      lastSavedAt: blueprint.lastSavedAt
    }
    
    return NextResponse.json(formattedBlueprint)
  } catch (error) {
    console.error('Error fetching health blueprint:', error)
    return NextResponse.json(
      { error: 'Failed to fetch health blueprint' },
      { status: 500 }
    )
  }
}