// app/health-blueprint/page.tsx
import { Suspense } from 'react'
import HealthBlueprintPageClient from './HealthBlueprintPageClient'

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

export default function HealthBlueprintPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HealthBlueprintPageClient />
    </Suspense>
  )
}