// app/auth/verify/page.tsx
import { Suspense } from 'react'
import VerifyToken from './VerifyToken'

function VerifyingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying your access...</p>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyingFallback />}>
      <VerifyToken />
    </Suspense>
  )
}