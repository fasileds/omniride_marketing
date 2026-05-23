export interface WaitlistEntry {
  id: string
  full_name: string
  email: string
  phone: string
  role: 'traveller' | 'sender' | 'both'
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string
  category: string
  read_time_minutes: number
  published: boolean
  featured: boolean
  author_name: string
  meta_title: string
  meta_description: string
  created_at: string
  updated_at: string
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>

export type BlogPostUpdate = Partial<BlogPostInsert>

export interface WaitlistFormData {
  full_name: string
  email: string
  phone: string
  role: 'traveller' | 'sender' | 'both'
}

export interface StatCard {
  label: string
  value: number
  suffix?: string
}

export interface Testimonial {
  id: number
  name: string
  location: string
  role: string
  quote: string
  avatar: string
}

export interface CityRoute {
  from: string
  to: string
  popular: boolean
}

export interface FaqItem {
  question: string
  answer: string
  category: string
}

export interface NavItem {
  label: string
  href: string
}
