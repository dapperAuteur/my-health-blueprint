// app/health-blueprint/success/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, ArrowDownTrayIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SuccessPage() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  
  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    // PDF generation logic here
    setTimeout(() => setIsGeneratingPDF(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Your Health Blueprint is Complete!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Congratulations! You've created a personalized roadmap for the next 90 days. 
          Your journey to better health starts now.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Download PDF */}
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <ArrowDownTrayIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Download Your Blueprint</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get a PDF copy of your complete health plan
          </p>
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* Join Community */}
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <UserGroupIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Join Alumni Community</h3>
          <p className="text-sm text-gray-600 mb-4">
            Connect with other graduates at gro.witus.online
          </p>
          <Link
            href="https://gro.witus.online"
            target="_blank"
            className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
          >
            Join Community
          </Link>
        </div>

        {/* Next Course */}
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <AcademicCapIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Continue Learning</h3>
          <p className="text-sm text-gray-600 mb-4">
            Ready for "Intervention Design"? 25% off for graduates!
          </p>
          <Link
            href="/courses/intervention-design?discount=GRADUATE25"
            className="block w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-center"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-4">🚀 Your Next Steps:</h3>
        <div className="space-y-3 text-blue-800">
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <p>Start implementing your Month 1 plan tomorrow</p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <p>Set up your tracking apps and connect with your Health Buddy</p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <p>Join the alumni community for ongoing support and accountability</p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            <p>Schedule your Month 1 check-in date in your calendar</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Questions? Email us at{' '}
          <a href="mailto:support@witus.online" className="text-blue-600 hover:underline">
            support@witus.online
          </a>
        </p>
      </div>
    </div>
  )
}