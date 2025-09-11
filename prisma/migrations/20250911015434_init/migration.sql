-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."health_blueprints" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "goal1" TEXT,
    "goal2" TEXT,
    "goal3" TEXT,
    "keyMetrics" JSONB NOT NULL,
    "month1Plan" JSONB NOT NULL,
    "month2Plan" JSONB NOT NULL,
    "month3Plan" JSONB NOT NULL,
    "whyStatement" TEXT,
    "achievementBenefits" TEXT,
    "mostImportantBenefit" TEXT,
    "healthBuddy" TEXT,
    "connectionMethods" JSONB NOT NULL,
    "familySupport" JSONB NOT NULL,
    "obstacles" JSONB NOT NULL,
    "emergencyPlan" JSONB NOT NULL,
    "checkInDates" JSONB NOT NULL,
    "apps" JSONB NOT NULL,
    "equipment" JSONB NOT NULL,
    "learningResources" JSONB NOT NULL,
    "weeklyRewards" TEXT,
    "monthlyRewards" TEXT,
    "ninetyDayReward" TEXT,
    "commitments" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3),
    "lastSavedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_blueprints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."health_blueprints" ADD CONSTRAINT "health_blueprints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
