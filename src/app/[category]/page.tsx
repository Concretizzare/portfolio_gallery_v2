'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCategoryBySlug } from '@/lib/utils'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter()

  useEffect(() => {
    const loadCategory = async () => {
      const { category } = await params
      const categoryData = getCategoryBySlug(category)

      if (categoryData) {
        // Store the initial state in sessionStorage and redirect to homepage
        sessionStorage.setItem('initialCategory', category)
        sessionStorage.removeItem('initialProject')
        router.replace('/')
      } else {
        // Invalid category, redirect to homepage
        router.replace('/')
      }
    }

    loadCategory()
  }, [params, router])

  // Show loading state while redirecting
  return (
    <div className="h-screen w-screen bg-[#0A0A0B] flex items-center justify-center">
      <div className="animate-pulse text-[#6B6B70]">Loading...</div>
    </div>
  )
}
