// app/page.tsx - Home Page
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HeartIcon, ChartBarIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setEmailSent(true)
      } else {
        alert('Failed to send magic link. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HeartIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Health Blueprint</span>
          </div>
          <a 
            href="https://gro.witus.online" 
            target="_blank"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Alumni Community
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Personal
            <span className="text-blue-600 block">Health Blueprint</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your health data into a personalized 90-day action plan. 
            Join thousands who&apos;ve created lasting health improvements through data-driven decisions.
          </p>
        </div>

        {/* Email Form */}
        <div className="max-w-md mx-auto mb-16">
          {!emailSent ? (
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                Get Started
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Enter your email to create or access your Health Blueprint
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    'Sending...'
                  ) : (
                    <>
                      Continue with Email
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRightIcon className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">
                  Check Your Email!
                </h2>
                <p className="text-green-700 mb-4">
                  We&apos;ve sent a magic link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-green-600">
                  Click the link in your email to access your Health Blueprint. 
                  The link will expire in 1 hour.
                </p>
                <button
                  onClick={() => setEmailSent(false)}
                  className="mt-4 text-green-700 hover:text-green-800 underline"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Planning</h3>
            <p className="text-gray-600">
              Turn your health metrics into actionable goals with a personalized 90-day roadmap.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
            <p className="text-gray-600">
              Connect with Health Buddies and join our alumni community for ongoing support.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Results</h3>
            <p className="text-gray-600">
              Build lasting habits with proven frameworks that adapt to your lifestyle.
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-4xl mx-auto">
          <blockquote className="text-xl text-gray-700 mb-4">
            &quot;The Health Blueprint helped me finally understand my patterns and create a plan that actually works. 
            I&apos;ve improved my sleep by 23% and energy levels by 40% in just 90 days.&quot;
          </blockquote>
          <cite className="text-gray-500">— Sarah M., Course Graduate</cite>
        </div>
      </div>
    </div>
  )
}
