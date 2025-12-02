'use client'

import { use } from 'react'
import GalleryPage from '../../page'
import { getCategoryBySlug, getProjectIdBySlug } from '@/lib/utils'

interface ProjectPageProps {
  params: Promise<{ category: string; project: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { category, project } = use(params)
  const categoryData = getCategoryBySlug(category)

  // If invalid category, render homepage
  if (!categoryData) {
    return <GalleryPage />
  }

  // Handle Visual Excellence showcase (special case for Sales & Marketing)
  if (project === 'visual-excellence' && category === 'sales_marketing') {
    return <GalleryPage initialCategory={category} initialShowcase={true} />
  }

  const projectId = getProjectIdBySlug(project)

  // If invalid project, render category page
  if (!projectId) {
    return <GalleryPage initialCategory={category} />
  }

  return <GalleryPage initialCategory={category} initialProject={projectId} />
}
