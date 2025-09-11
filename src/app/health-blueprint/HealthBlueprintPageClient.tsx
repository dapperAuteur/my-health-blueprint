'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import HealthBlueprintForm from '@/components/HealthBlueprintForm'

export default function HealthBlueprintPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams.get('userId')
  const [isValidUser, setIsValidUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const validateUser = useCallback(() => {
    if (!userId) {
      router.push('/')
      return
    }

    // Verify user exists
    fetch(`/api/users/${userId}`)
      .then(response => {
        if (response.ok) {
          setIsValidUser(true)
        } else {
          router.push('/')
        }
      })
      .catch(() => {
        router.push('/')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId, router])

  useEffect(() => {
    validateUser()
  }, [validateUser])

  if (isLoading) {
    // This is handled by Suspense, but kept as a fallback.
    return null
  }

  if (!isValidUser || !userId) {
    return null // Will be redirected by the effect.
  }

  return <HealthBlueprintForm userId={userId} />
}