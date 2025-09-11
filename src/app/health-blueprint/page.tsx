// app/health-blueprint/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import HealthBlueprintForm from '@/components/HealthBlueprintForm'

export default function HealthBlueprintPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [isValidUser, setIsValidUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      window.location.href = '/'
      return
    }

    // Verify user exists
    fetch(`/api/users/${userId}`)
      .then(response => {
        if (response.ok) {
          setIsValidUser(true)
        } else {
          window.location.href = '/'
        }
      })
      .catch(() => {
        window.location.href = '/'
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isValidUser || !userId) {
    return null // Will redirect
  }

  return <HealthBlueprintForm userId={userId} />
}