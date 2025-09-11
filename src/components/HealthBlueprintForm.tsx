// components/HealthBlueprintForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline'

// Types
interface HealthGoal {
  goal1: string
  goal2: string
  goal3: string
}

interface KeyMetric {
  metric: string
  currentAverage: string
  targetGoal: string
  trackingMethod: string
}

interface MonthlyPlan {
  primaryFocus: string
  week1: string
  week2: string
  week3: string
  week4: string
  successTarget: string
}

interface HealthBlueprintData {
  id?: string
  userId: string
  name: string
  email: string
  
  // Part 1: Health Goals
  healthGoals: HealthGoal
  
  // Part 2: Key Metrics
  keyMetrics: KeyMetric[]
  
  // Part 3: 90-Day Plan
  month1Plan: MonthlyPlan
  month2Plan: MonthlyPlan
  month3Plan: MonthlyPlan
  
  // Part 4: Why Statement
  whyStatement: string
  achievementBenefits: string
  mostImportantBenefit: string
  
  // Part 5: Support System
  healthBuddy: string
  connectionMethods: string[]
  familySupport: {
    encourager: string
    exercisePartner: string
    goalSharer: string
  }
  
  // Part 6: Obstacles
  obstacles: Array<{
    challenge: string
    plan: string
  }>
  emergencyPlan: string[]
  
  // Part 7: Check-in Schedule
  checkInDates: {
    month1: string
    month2: string
    month3: string
  }
  
  // Part 8: Resources
  apps: Array<{ name: string; purpose: string }>
  equipment: string[]
  learningResources: string[]
  
  // Part 9: Celebration
  weeklyRewards: string
  monthlyRewards: string
  ninetyDayReward: string
  
  // Part 10: Commitment
  commitments: string[]
  
  completedAt?: Date
  lastSavedAt: Date
}

const FORM_STEPS = [
  { id: 1, title: 'Health Goals', description: 'Set your top 3 health priorities' },
  { id: 2, title: 'Key Metrics', description: 'Choose numbers to track' },
  { id: 3, title: '90-Day Plan', description: 'Create your action roadmap' },
  { id: 4, title: 'Your Why', description: 'Define your motivation' },
  { id: 5, title: 'Support System', description: 'Build your health team' },
  { id: 6, title: 'Obstacles', description: 'Plan for challenges' },
  { id: 7, title: 'Resources', description: 'Tools and learning materials' },
  { id: 8, title: 'Celebration', description: 'Reward your progress' },
  { id: 9, title: 'Commitment', description: 'Final commitment and review' }
]

export default function HealthBlueprintForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  const [formData, setFormData] = useState<HealthBlueprintData>({
    userId,
    name: '',
    email: '',
    healthGoals: { goal1: '', goal2: '', goal3: '' },
    keyMetrics: [
      { metric: 'Sleep (hours/night)', currentAverage: '', targetGoal: '', trackingMethod: '' },
      { metric: 'Steps (per day)', currentAverage: '', targetGoal: '', trackingMethod: '' },
      { metric: 'Exercise (minutes/week)', currentAverage: '', targetGoal: '', trackingMethod: '' },
      { metric: 'Energy Level (1-10)', currentAverage: '', targetGoal: '', trackingMethod: '' }
    ],
    month1Plan: { primaryFocus: '', week1: '', week2: '', week3: '', week4: '', successTarget: '' },
    month2Plan: { primaryFocus: '', week1: '', week2: '', week3: '', week4: '', successTarget: '' },
    month3Plan: { primaryFocus: '', week1: '', week2: '', week3: '', week4: '', successTarget: '' },
    whyStatement: '',
    achievementBenefits: '',
    mostImportantBenefit: '',
    healthBuddy: '',
    connectionMethods: [],
    familySupport: { encourager: '', exercisePartner: '', goalSharer: '' },
    obstacles: [
      { challenge: '', plan: '' },
      { challenge: '', plan: '' },
      { challenge: '', plan: '' }
    ],
    emergencyPlan: ['', '', ''],
    checkInDates: { month1: '', month2: '', month3: '' },
    apps: [{ name: '', purpose: '' }],
    equipment: [],
    learningResources: [],
    weeklyRewards: '',
    monthlyRewards: '',
    ninetyDayReward: '',
    commitments: [],
    lastSavedAt: new Date()
  })

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      saveProgress()
    }, 30000) // Auto-save every 30 seconds

    return () => clearTimeout(autoSave)
  }, [formData])

  // Load existing data on mount
  useEffect(() => {
    loadExistingData()
  }, [])

  const loadExistingData = async () => {
    try {
      const response = await fetch(`/api/health-blueprint/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
        setLastSaved(new Date(data.lastSavedAt))
      }
    } catch (error) {
      console.error('Failed to load existing data:', error)
    }
  }

  const saveProgress = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/health-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lastSavedAt: new Date() })
      })
      
      if (response.ok) {
        setLastSaved(new Date())
      }
    } catch (error) {
      console.error('Failed to save progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(currentStep + 1)
      saveProgress()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/health-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          completedAt: new Date(),
          lastSavedAt: new Date() 
        })
      })
      
      if (response.ok) {
        router.push('/health-blueprint/success')
      }
    } catch (error) {
      console.error('Failed to submit blueprint:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = <K extends keyof HealthBlueprintData>(
    section: K,
    value: HealthBlueprintData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [section]: value }));
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <HealthGoalsStep data={formData.healthGoals} onChange={(value) => updateFormData('healthGoals', value)} />
      case 2:
        return <KeyMetricsStep data={formData.keyMetrics} onChange={(value) => updateFormData('keyMetrics', value)} />
      case 3:
        return <NinetyDayPlanStep 
          month1={formData.month1Plan} 
          month2={formData.month2Plan} 
          month3={formData.month3Plan}
          onMonth1Change={(value) => updateFormData('month1Plan', value)}
          onMonth2Change={(value) => updateFormData('month2Plan', value)}
          onMonth3Change={(value) => updateFormData('month3Plan', value)}
        />
      case 4:
        return <WhyStatementStep 
          whyStatement={formData.whyStatement}
          achievementBenefits={formData.achievementBenefits}
          mostImportantBenefit={formData.mostImportantBenefit}
          onWhyChange={(value) => updateFormData('whyStatement', value)}
          onBenefitsChange={(value) => updateFormData('achievementBenefits', value)}
          onImportantChange={(value) => updateFormData('mostImportantBenefit', value)}
        />
      case 5:
        return <SupportSystemStep 
          healthBuddy={formData.healthBuddy}
          connectionMethods={formData.connectionMethods}
          familySupport={formData.familySupport}
          onBuddyChange={(value) => updateFormData('healthBuddy', value)}
          onMethodsChange={(value) => updateFormData('connectionMethods', value)}
          onFamilyChange={(value) => updateFormData('familySupport', value)}
        />
      case 6:
        return <ObstaclesStep 
          obstacles={formData.obstacles}
          emergencyPlan={formData.emergencyPlan}
          onObstaclesChange={(value) => updateFormData('obstacles', value)}
          onEmergencyChange={(value) => updateFormData('emergencyPlan', value)}
        />
      case 7:
        return <ResourcesStep 
          apps={formData.apps}
          equipment={formData.equipment}
          learningResources={formData.learningResources}
          onAppsChange={(value) => updateFormData('apps', value)}
          onEquipmentChange={(value) => updateFormData('equipment', value)}
          onLearningChange={(value) => updateFormData('learningResources', value)}
        />
      case 8:
        return <CelebrationStep 
          weeklyRewards={formData.weeklyRewards}
          monthlyRewards={formData.monthlyRewards}
          ninetyDayReward={formData.ninetyDayReward}
          onWeeklyChange={(value) => updateFormData('weeklyRewards', value)}
          onMonthlyChange={(value) => updateFormData('monthlyRewards', value)}
          onNinetyDayChange={(value) => updateFormData('ninetyDayReward', value)}
        />
      case 9:
        return <CommitmentStep 
          commitments={formData.commitments}
          onChange={(value) => updateFormData('commitments', value)}
          formData={formData}
        />
      default:
        return <div>Step not found</div>
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">My Health Blueprint</h1>
          {lastSaved && (
            <p className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / FORM_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between">
          {FORM_STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id < currentStep ? 'bg-green-500 text-white' :
                step.id === currentStep ? 'bg-blue-600 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {step.id < currentStep ? <CheckIcon className="w-5 h-5" /> : step.id}
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center max-w-20">{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Step {currentStep}: {FORM_STEPS[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">{FORM_STEPS[currentStep - 1].description}</p>
        </div>

        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Previous
        </button>

        <button
          onClick={saveProgress}
          disabled={isLoading}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Progress'}
        </button>

        {currentStep < FORM_STEPS.length ? (
          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Submitting...' : 'Complete Blueprint'}
            <CheckIcon className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  )
}

// Individual Step Components
function HealthGoalsStep({ data, onChange }: { data: HealthGoal, onChange: (value: HealthGoal) => void }) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Write your top 3 health goals in simple, clear words that motivate you.</p>
      
      {(['goal1', 'goal2', 'goal3'] as const).map((goalKey, index) => (
        <div key={goalKey}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal {index + 1}:
          </label>
          <input
            type="text"
            value={data[goalKey]}
            onChange={(e) => onChange({ ...data, [goalKey]: e.target.value })}
            placeholder={`e.g., "I want to sleep better and wake up feeling rested"`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ))}
    </div>
  )
}

function KeyMetricsStep({ data, onChange }: { data: KeyMetric[], onChange: (value: KeyMetric[]) => void }) {
  const updateMetric = (index: number, field: keyof KeyMetric, value: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addMetric = () => {
    onChange([...data, { metric: '', currentAverage: '', targetGoal: '', trackingMethod: '' }])
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Choose 3-5 numbers you&apos;ll track regularly to measure your progress.</p>
      
      {data.map((metric, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metric:</label>
              <input
                type="text"
                value={metric.metric}
                onChange={(e) => updateMetric(index, 'metric', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Average:</label>
              <input
                type="text"
                value={metric.currentAverage}
                onChange={(e) => updateMetric(index, 'currentAverage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Goal:</label>
              <input
                type="text"
                value={metric.targetGoal}
                onChange={(e) => updateMetric(index, 'targetGoal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How I&apos;ll Track:</label>
              <select
                value={metric.trackingMethod}
                onChange={(e) => updateMetric(index, 'trackingMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select method...</option>
                <option value="Phone app">Phone app</option>
                <option value="Fitness tracker">Fitness tracker</option>
                <option value="Manual tracking">Manual tracking</option>
                <option value="Wearable device">Wearable device</option>
                <option value="Daily journal">Daily journal</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addMetric}
        className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
      >
        + Add Another Metric
      </button>
    </div>
  )
}

function NinetyDayPlanStep({ 
  month1, month2, month3, 
  onMonth1Change, onMonth2Change, onMonth3Change 
}: {
  month1: MonthlyPlan, month2: MonthlyPlan, month3: MonthlyPlan,
  onMonth1Change: (value: MonthlyPlan) => void,
  onMonth2Change: (value: MonthlyPlan) => void,
  onMonth3Change: (value: MonthlyPlan) => void
}) {
  const MonthPlan = ({ 
    title, data, onChange, description 
  }: { 
    title: string, data: MonthlyPlan, onChange: (value: MonthlyPlan) => void, description: string 
  }) => (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Focus:</label>
          <input
            type="text"
            value={data.primaryFocus}
            onChange={(e) => onChange({ ...data, primaryFocus: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="What's your main health focus this month?"
          />
        </div>
        
        {(['week1', 'week2', 'week3', 'week4'] as const).map((week, index) => (
          <div key={week}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Week {index + 1}:</label>
            <input
              type="text"
              value={data[week]}
              onChange={(e) => onChange({ ...data, [week]: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder={`What will you do in week ${index + 1}?`}
            />
          </div>
        ))}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Success Target:</label>
          <input
            type="text"
            value={data.successTarget}
            onChange={(e) => onChange({ ...data, successTarget: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="How many days out of 30 will you complete this habit?"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Create a progressive plan that builds one habit at a time.</p>
      
      <MonthPlan 
        title="Month 1 (Days 1-30): Foundation Building"
        description="Pick ONE habit to focus on"
        data={month1}
        onChange={onMonth1Change}
      />
      
      <MonthPlan 
        title="Month 2 (Days 31-60): Building Momentum"
        description="Keep your first habit + add ONE more"
        data={month2}
        onChange={onMonth2Change}
      />
      
      <MonthPlan 
        title="Month 3 (Days 61-90): Making it Stick"
        description="Master both habits + fine-tune"
        data={month3}
        onChange={onMonth3Change}
      />
    </div>
  )
}

function WhyStatementStep({ 
  whyStatement, achievementBenefits, mostImportantBenefit,
  onWhyChange, onBenefitsChange, onImportantChange 
}: {
  whyStatement: string, achievementBenefits: string, mostImportantBenefit: string,
  onWhyChange: (value: string) => void,
  onBenefitsChange: (value: string) => void,
  onImportantChange: (value: string) => void
}) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Understanding your personal motivation will help you stay committed when things get challenging.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I want to improve my health because:
        </label>
        <textarea
          value={whyStatement}
          onChange={(e) => onWhyChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write about what motivates you to get healthier..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          When I achieve these goals, I will:
        </label>
        <textarea
          value={achievementBenefits}
          onChange={(e) => onBenefitsChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Describe what your life will be like when you reach your health goals..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          The most important benefit for me will be:
        </label>
        <textarea
          value={mostImportantBenefit}
          onChange={(e) => onImportantChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="What's the #1 thing you're most excited about?"
        />
      </div>
    </div>
  )
}

function SupportSystemStep({ 
  healthBuddy, connectionMethods, familySupport,
  onBuddyChange, onMethodsChange, onFamilyChange 
}: {
  healthBuddy: string, 
  connectionMethods: string[], 
  familySupport: HealthBlueprintData['familySupport'],
  onBuddyChange: (value: string) => void,
  onMethodsChange: (value: string[]) => void,
  onFamilyChange: (value: HealthBlueprintData['familySupport']) => void
}) {
  const connectionOptions = [
    'Weekly text check-ins',
    'Monthly coffee/call to share progress',
    'Exercise together',
    'Share tracking data',
    'Daily motivation texts',
    'Weekend workout sessions'
  ]

  const toggleConnection = (method: string) => {
    if (connectionMethods.includes(method)) {
      onMethodsChange(connectionMethods.filter(m => m !== method))
    } else {
      onMethodsChange([...connectionMethods, method])
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Build a support system to help you stay accountable and motivated.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">My Health Buddy:</label>
        <input
          type="text"
          value={healthBuddy}
          onChange={(e) => onBuddyChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Someone from class who will check in with you weekly"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">How we&apos;ll stay connected:</label>
        <div className="space-y-2">
          {connectionOptions.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={connectionMethods.includes(option)}
                onChange={() => toggleConnection(option)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4">Family & Friends Support:</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who will encourage me:</label>
            <input
              type="text"
              value={familySupport.encourager}
              onChange={(e) => onFamilyChange({ ...familySupport, encourager: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who will exercise with me:</label>
            <input
              type="text"
              value={familySupport.exercisePartner}
              onChange={(e) => onFamilyChange({ ...familySupport, exercisePartner: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who I&apos;ll share my goals with:</label>
            <input
              type="text"
              value={familySupport.goalSharer}
              onChange={(e) => onFamilyChange({ ...familySupport, goalSharer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ObstaclesStep({ 
  obstacles, emergencyPlan, 
  onObstaclesChange, onEmergencyChange 
}: {
  obstacles: Array<{challenge: string, plan: string}>, emergencyPlan: string[],
  onObstaclesChange: (value: Array<{challenge: string, plan: string}>) => void,
  onEmergencyChange: (value: string[]) => void
}) {
  const updateObstacle = (index: number, field: 'challenge' | 'plan', value: string) => {
    const newObstacles = [...obstacles]
    newObstacles[index] = { ...newObstacles[index], [field]: value }
    onObstaclesChange(newObstacles)
  }

  const updateEmergencyStep = (index: number, value: string) => {
    const newPlan = [...emergencyPlan]
    newPlan[index] = value
    onEmergencyChange(newPlan)
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Plan for challenges before they happen so you&apos;re ready to overcome them.</p>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Potential Challenges & Solutions:</h4>
        {obstacles.map((obstacle, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge {index + 1}:
                </label>
                <input
                  type="text"
                  value={obstacle.challenge}
                  onChange={(e) => updateObstacle(index, 'challenge', e.target.value)}
                  placeholder="What might get in your way?"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">My Plan:</label>
                <input
                  type="text"
                  value={obstacle.plan}
                  onChange={(e) => updateObstacle(index, 'plan', e.target.value)}
                  placeholder="How will you handle this challenge?"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Emergency Plan (if I get completely off track):</h4>
        {emergencyPlan.map((step, index) => (
          <div key={index} className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Step {index + 1}:</label>
            <input
              type="text"
              value={step}
              onChange={(e) => updateEmergencyStep(index, e.target.value)}
              placeholder="What's your comeback strategy?"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ResourcesStep({ 
  apps, equipment, learningResources,
  onAppsChange, onEquipmentChange, onLearningChange 
}: {
  apps: Array<{name: string, purpose: string}>, equipment: string[], learningResources: string[],
  onAppsChange: (value: Array<{name: string, purpose: string}>) => void,
  onEquipmentChange: (value: string[]) => void,
  onLearningChange: (value: string[]) => void
}) {
  const addApp = () => {
    onAppsChange([...apps, { name: '', purpose: '' }])
  }

  const updateApp = (index: number, field: 'name' | 'purpose', value: string) => {
    const newApps = [...apps]
    newApps[index] = { ...newApps[index], [field]: value }
    onAppsChange(newApps)
  }

  const equipmentOptions = [
    'Fitness tracker/smartwatch',
    'Scale',
    'Blood pressure monitor',
    'Heart rate monitor',
    'Sleep tracking device',
    'Resistance bands',
    'Dumbbells',
    'Yoga mat',
    'Other'
  ]

  const toggleEquipment = (item: string) => {
    if (equipment.includes(item)) {
      onEquipmentChange(equipment.filter(e => e !== item))
    } else {
      onEquipmentChange([...equipment, item])
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Identify the tools and resources that will support your health journey.</p>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Apps I&apos;ll Use:</h4>
        {apps.map((app, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <input
                type="text"
                value={app.name}
                onChange={(e) => updateApp(index, 'name', e.target.value)}
                placeholder="App name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={app.purpose}
                onChange={(e) => updateApp(index, 'purpose', e.target.value)}
                placeholder="What I'll use it for"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addApp}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
        >
          + Add Another App
        </button>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Equipment I Have:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {equipmentOptions.map((item) => (
            <label key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={equipment.includes(item)}
                onChange={() => toggleEquipment(item)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Learning Resources:</h4>
        <textarea
          value={learningResources.join('\n')}
          onChange={(e) => onLearningChange(e.target.value.split('\n').filter(r => r.trim()))}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="List books, podcasts, YouTube channels, websites, etc. (one per line)"
        />
      </div>
    </div>
  )
}

function CelebrationStep({ 
  weeklyRewards, monthlyRewards, ninetyDayReward,
  onWeeklyChange, onMonthlyChange, onNinetyDayChange 
}: {
  weeklyRewards: string, monthlyRewards: string, ninetyDayReward: string,
  onWeeklyChange: (value: string) => void,
  onMonthlyChange: (value: string) => void,
  onNinetyDayChange: (value: string) => void
}) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Plan how you&apos;ll celebrate your progress to stay motivated throughout your journey.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weekly Wins (small rewards):
        </label>
        <input
          type="text"
          value={weeklyRewards}
          onChange={(e) => onWeeklyChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., favorite healthy meal, extra episode of a show, new workout playlist"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Achievements (medium rewards):
        </label>
        <input
          type="text"
          value={monthlyRewards}
          onChange={(e) => onMonthlyChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., new workout clothes, massage, day trip, special dinner out"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          90-Day Success (big celebration):
        </label>
        <input
          type="text"
          value={ninetyDayReward}
          onChange={(e) => onNinetyDayChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., weekend getaway, new fitness equipment, spa day, celebration dinner"
        />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Celebration Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Choose rewards that support your health goals</li>
          <li>• Make sure rewards are meaningful to YOU</li>
          <li>• Set up rewards before you need them</li>
          <li>• Share your celebrations with your support system</li>
        </ul>
      </div>
    </div>
  )
}

function CommitmentStep({ 
  commitments, onChange, formData 
}: {
  commitments: string[], onChange: (value: string[]) => void, formData: HealthBlueprintData
}) {
  const commitmentOptions = [
    'Following this blueprint for 90 days',
    'Tracking my key numbers daily',
    'Checking in with my Health Buddy weekly',
    'Joining the alumni community at gro.witus.online',
    'Sharing my progress in the community forum',
    'Helping support other people on their health journeys',
    'Being patient with myself when I have setbacks',
    'Celebrating my wins, no matter how small'
  ]

  const toggleCommitment = (commitment: string) => {
    if (commitments.includes(commitment)) {
      onChange(commitments.filter(c => c !== commitment))
    } else {
      onChange([...commitments, commitment])
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Review your Health Blueprint and make your final commitments.</p>
      
      {/* Blueprint Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4">📋 Your Health Blueprint Summary:</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Goals:</strong> {[formData.healthGoals.goal1, formData.healthGoals.goal2, formData.healthGoals.goal3].filter(Boolean).join(', ')}</p>
          <p><strong>Key Metrics:</strong> {formData.keyMetrics.filter(m => m.metric).length} metrics selected</p>
          <p><strong>Health Buddy:</strong> {formData.healthBuddy || 'Not specified'}</p>
          <p><strong>Month 1 Focus:</strong> {formData.month1Plan.primaryFocus || 'Not specified'}</p>
        </div>
      </div>
      
      {/* Commitments */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">I commit to:</h4>
        <div className="space-y-3">
          {commitmentOptions.map((commitment) => (
            <label key={commitment} className="flex items-start">
              <input
                type="checkbox"
                checked={commitments.includes(commitment)}
                onChange={() => toggleCommitment(commitment)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <span className="ml-3 text-gray-700">{commitment}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">🎉 You&apos;re Ready to Start!</h4>
        <p className="text-sm text-green-800">
          Once you complete your blueprint, you&apos;ll receive a personalized PDF summary and access to our alumni community 
          where you can track your progress and connect with other health-focused individuals.
        </p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">🚀 Next Course: Intervention Design</h4>
        <p className="text-sm text-blue-800">
          Ready to take your health tracking to the next level? Learn how to design personalized health experiments 
          and create custom protocols that work for YOUR unique body and lifestyle.
        </p>
        <p className="text-sm text-blue-800 mt-2">
          <strong>Early Bird Special:</strong> Graduates get 25% off if you enroll within 48 hours of completing this blueprint.
        </p>
      </div>
    </div>
  )
}