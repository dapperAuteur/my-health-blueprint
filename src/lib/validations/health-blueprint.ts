// lib/validations/health-blueprint.ts
import { z } from 'zod'

const healthGoalSchema = z.object({
  goal1: z.string().optional(),
  goal2: z.string().optional(),
  goal3: z.string().optional()
})

const keyMetricSchema = z.object({
  metric: z.string(),
  currentAverage: z.string(),
  targetGoal: z.string(),
  trackingMethod: z.string()
})

const monthlyPlanSchema = z.object({
  primaryFocus: z.string(),
  week1: z.string(),
  week2: z.string(),
  week3: z.string(),
  week4: z.string(),
  successTarget: z.string()
})

const familySupportSchema = z.object({
  encourager: z.string(),
  exercisePartner: z.string(),
  goalSharer: z.string()
})

const obstacleSchema = z.object({
  challenge: z.string(),
  plan: z.string()
})

const checkInDatesSchema = z.object({
  month1: z.string(),
  month2: z.string(),
  month3: z.string()
})

const appSchema = z.object({
  name: z.string(),
  purpose: z.string()
})

export const healthBlueprintSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  healthGoals: healthGoalSchema,
  keyMetrics: z.array(keyMetricSchema),
  month1Plan: monthlyPlanSchema,
  month2Plan: monthlyPlanSchema,
  month3Plan: monthlyPlanSchema,
  whyStatement: z.string().optional(),
  achievementBenefits: z.string().optional(),
  mostImportantBenefit: z.string().optional(),
  healthBuddy: z.string().optional(),
  connectionMethods: z.array(z.string()),
  familySupport: familySupportSchema,
  obstacles: z.array(obstacleSchema),
  emergencyPlan: z.array(z.string()),
  checkInDates: checkInDatesSchema,
  apps: z.array(appSchema),
  equipment: z.array(z.string()),
  learningResources: z.array(z.string()),
  weeklyRewards: z.string().optional(),
  monthlyRewards: z.string().optional(),
  ninetyDayReward: z.string().optional(),
  commitments: z.array(z.string()),
  completedAt: z.date().optional(),
  lastSavedAt: z.date()
})