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
    return <GalleryPage key="home" />
  }

  // Handle Visual Excellence showcase (special case for Sales & Marketing)
  if (project === 'visual-excellence' && category === 'sales_marketing') {
    return <GalleryPage key={`${category}-showcase`} initialCategory={category} initialShowcase={true} />
  }

  const projectId = getProjectIdBySlug(project)

  // If invalid project, render category page
  if (!projectId) {
    return <GalleryPage key={category} initialCategory={category} />
  }

  return <GalleryPage key={`${category}-${projectId}`} initialCategory={category} initialProject={projectId} />
}
