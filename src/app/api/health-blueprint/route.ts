// app/api/health-blueprint/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { healthBlueprintSchema } from '@/lib/validations/health-blueprint'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = healthBlueprintSchema.parse(body)
    
    // Check if blueprint already exists
    const existingBlueprint = await prisma.healthBlueprint.findFirst({
      where: { userId: validatedData.userId }
    })
    
    let blueprint
    
    if (existingBlueprint) {
      // Update existing blueprint
      blueprint = await prisma.healthBlueprint.update({
        where: { id: existingBlueprint.id },
        data: {
          name: validatedData.name,
          email: validatedData.email,
          goal1: validatedData.healthGoals.goal1,
          goal2: validatedData.healthGoals.goal2,
          goal3: validatedData.healthGoals.goal3,
          keyMetrics: validatedData.keyMetrics,
          month1Plan: validatedData.month1Plan,
          month2Plan: validatedData.month2Plan,
          month3Plan: validatedData.month3Plan,
          whyStatement: validatedData.whyStatement,
          achievementBenefits: validatedData.achievementBenefits,
          mostImportantBenefit: validatedData.mostImportantBenefit,
          healthBuddy: validatedData.healthBuddy,
          connectionMethods: validatedData.connectionMethods,
          familySupport: validatedData.familySupport,
          obstacles: validatedData.obstacles,
          emergencyPlan: validatedData.emergencyPlan,
          checkInDates: validatedData.checkInDates,
          apps: validatedData.apps,
          equipment: validatedData.equipment,
          learningResources: validatedData.learningResources,
          weeklyRewards: validatedData.weeklyRewards,
          monthlyRewards: validatedData.monthlyRewards,
          ninetyDayReward: validatedData.ninetyDayReward,
          commitments: validatedData.commitments,
          completedAt: validatedData.completedAt,
          lastSavedAt: new Date()
        }
      })
    } else {
      // Create new blueprint
      blueprint = await prisma.healthBlueprint.create({
        data: {
          userId: validatedData.userId,
          name: validatedData.name,
          email: validatedData.email,
          goal1: validatedData.healthGoals.goal1,
          goal2: validatedData.healthGoals.goal2,
          goal3: validatedData.healthGoals.goal3,
          keyMetrics: validatedData.keyMetrics,
          month1Plan: validatedData.month1Plan,
          month2Plan: validatedData.month2Plan,
          month3Plan: validatedData.month3Plan,
          whyStatement: validatedData.whyStatement,
          achievementBenefits: validatedData.achievementBenefits,
          mostImportantBenefit: validatedData.mostImportantBenefit,
          healthBuddy: validatedData.healthBuddy,
          connectionMethods: validatedData.connectionMethods,
          familySupport: validatedData.familySupport,
          obstacles: validatedData.obstacles,
          emergencyPlan: validatedData.emergencyPlan,
          checkInDates: validatedData.checkInDates,
          apps: validatedData.apps,
          equipment: validatedData.equipment,
          learningResources: validatedData.learningResources,
          weeklyRewards: validatedData.weeklyRewards,
          monthlyRewards: validatedData.monthlyRewards,
          ninetyDayReward: validatedData.ninetyDayReward,
          commitments: validatedData.commitments,
          completedAt: validatedData.completedAt,
          lastSavedAt: new Date()
        }
      })
    }
    
    return NextResponse.json(blueprint)
  } catch (error) {
    console.error('Error saving health blueprint:', error)
    return NextResponse.json(
      { error: 'Failed to save health blueprint' },
      { status: 500 }
    )
  }
}