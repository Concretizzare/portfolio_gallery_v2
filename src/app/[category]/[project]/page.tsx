'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCategoryBySlug, getProjectIdBySlug } from '@/lib/utils'

interface ProjectPageProps {
  params: Promise<{ category: string; project: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter()

  useEffect(() => {
    const loadProject = async () => {
      const { category, project } = await params
      const categoryData = getCategoryBySlug(category)
      const projectId = getProjectIdBySlug(project)

      if (categoryData && projectId) {
        // Store the initial state in sessionStorage and redirect to homepage
        sessionStorage.setItem('initialCategory', category)
        sessionStorage.setItem('initialProject', projectId)
        router.replace('/')
      } else if (categoryData) {
        // Valid category but invalid project, go to category page
        sessionStorage.setItem('initialCategory', category)
        sessionStorage.removeItem('initialProject')
        router.replace('/')
      } else {
        // Invalid category, redirect to homepage
        router.replace('/')
      }
    }

    loadProject()
  }, [params, router])

  // Show loading state while redirecting
  return (
    <div className="h-screen w-screen bg-[#0A0A0B] flex items-center justify-center">
      <div className="animate-pulse text-[#6B6B70]">Loading...</div>
    </div>
  )
}
