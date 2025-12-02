'use client'

import { use } from 'react'
import GalleryPage from '../page'
import { getCategoryBySlug } from '@/lib/utils'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params)
  const categoryData = getCategoryBySlug(category)

  // If invalid category, render homepage
  if (!categoryData) {
    return <GalleryPage />
  }

  return <GalleryPage initialCategory={category} />
}
