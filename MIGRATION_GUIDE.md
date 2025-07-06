# Next.js App Router Migration Guide

## 1. Current Codebase Analysis

### Current Structure
```
src/
├── components/
│   ├── FeedbackModal.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── ScrollToTop.tsx
├── dummyDatabase/
│   └── feedback.ts
├── layout/
│   └── AppLayout.tsx
├── pages/
│   ├── AdminDashboard.tsx
│   ├── AdminLogin.tsx
│   └── SubmitFeedback.tsx
├── utils/
│   ├── feedback.ts
│   └── index.ts
├── App.tsx
├── index.css
└── index.tsx
```

### Current Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "lucide-react": "^0.441.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.18",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.50.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.1",
    "typescript": "^5.5.4",
    "vite": "^5.2.0",
    "tailwindcss": "3.4.17",
    "autoprefixer": "latest",
    "postcss": "latest"
  }
}
```

## 2. Target Next.js App Router Structure

```
app/
├── admin/
│   ├── dashboard/
│   │   └── page.tsx
│   └── login/
│       └── page.tsx
├── components/
│   ├── FeedbackModal.tsx
│   ├── Footer.tsx
│   └── Header.tsx
├── lib/
│   ├── data/
│   │   └── feedback.ts
│   └── types/
│       └── feedback.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

## 3. Migration Steps

### Step 1: Initialize Next.js Project

```bash
# Create new Next.js project
npx create-next-app@latest lasu-feedback-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd lasu-feedback-nextjs
```

### Step 2: Install Required Dependencies

```bash
npm install lucide-react@^0.441.0
```

### Step 3: Update package.json

```json
{
  "name": "lasu-feedback-nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.441.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.18",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "autoprefixer": "^10.0.1",
    "eslint": "^8.50.0",
    "eslint-config-next": "14.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.5.4"
  }
}
```

## 4. File Migrations

### Root Layout (app/layout.tsx)
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LASU Anonymous Feedback System',
  description: 'Anonymous feedback system for LASU community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

### Home Page (app/page.tsx)
```tsx
import SubmitFeedback from './components/SubmitFeedback'

export default function Home() {
  return <SubmitFeedback />
}
```

### Admin Login Page (app/admin/login/page.tsx)
```tsx
import AdminLogin from '../../components/AdminLogin'

export default function AdminLoginPage() {
  return <AdminLogin />
}
```

### Admin Dashboard Page (app/admin/dashboard/page.tsx)
```tsx
import AdminDashboard from '../../components/AdminDashboard'

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
```

### Updated Header Component (app/components/Header.tsx)
```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldIcon, LogOutIcon } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <header className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-6 w-6" />
          <span className="text-xl font-bold">Anonymous Feedback System</span>
        </Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {pathname !== '/admin/dashboard' && (
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center space-x-1 px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  <ShieldIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              )}
              <button 
                onClick={() => alert("log out")} 
                className="flex items-center space-x-1 px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            pathname !== '/admin/login' && (
              <Link 
                href="/admin/login" 
                className="flex items-center space-x-1 px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                <ShieldIcon className="h-5 w-5" />
                <span>Admin Login</span>
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
```

### Submit Feedback Component (app/components/SubmitFeedback.tsx)
```tsx
'use client'

import React, { useState } from 'react'
import { SendIcon, CheckCircleIcon, ShieldIcon, EyeOffIcon, FileTextIcon } from 'lucide-react'

const SubmitFeedback = () => {
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const categories = ['Academics', 'Hostel', 'Administrative Issues', 'Facilities', 'Welfare', 'Others']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category && message.trim()) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }
  }

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Share Your Feedback Anonymously
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help improve your school by providing honest feedback without
            revealing your identity. Your input matters and can make a real
            difference.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <EyeOffIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Anonymous</h3>
            <p className="text-gray-600">
              We don&apos;t collect any personal information. Your identity remains
              completely protected.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <ShieldIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">
              Your feedback is securely handled and only accessible to
              authorized personnel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <FileTextIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
            <p className="text-gray-600">
              Your feedback helps identify issues and implement meaningful
              improvements.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Submit Your Feedback
          </h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="font-medium text-green-800">
                  Feedback Submitted Successfully!
                </h3>
                <p className="text-green-700 mt-1">
                  Thank you for helping improve your school. Your feedback has
                  been received.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select 
                  id="category" 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Feedback
                </label>
                <textarea 
                  id="message" 
                  value={message} 
                  onChange={e => setMessage(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Please describe your feedback, suggestion or concern in detail..." 
                  required
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                >
                  <SendIcon className="h-4 w-4 mr-2" />
                  Submit Feedback
                </button>
              </div>
            </form>
          )}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Privacy Notice:</strong> This system is designed to be
              completely anonymous. We do not track IP addresses, require login
              credentials, or collect any personally identifiable information
              when you submit feedback.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SubmitFeedback
```

### Admin Login Component (app/components/AdminLogin.tsx)
```tsx
'use client'

import React, { useState } from 'react'
import { LockIcon, AlertCircleIcon } from 'lucide-react'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <LockIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">
              Access the feedback management dashboard
            </p>
          </div>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
              <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input 
                id="username" 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
```

### Types Definition (app/lib/types/feedback.ts)
```tsx
export type FeedbackItem = {
  id: string
  category: string
  message: string
  date: string
  status: 'pending' | 'resolved'
}
```

### Data File (app/lib/data/feedback.ts)
```tsx
import { FeedbackItem } from '../types/feedback'

export const DummyFeedBackItems: FeedbackItem[] = [
  {
    id: '1',
    category: 'Academics',
    message: "The physics lab equipment needs maintenance. Many instruments aren't working properly.",
    date: '2023-11-01T14:30:00',
    status: 'pending'
  },
  {
    id: '2',
    category: 'Hostel',
    message: 'There have been frequent water shortages in Block C for the past week.',
    date: '2023-11-03T09:15:00',
    status: 'resolved'
  },
  {
    id: '3',
    category: 'Facilities',
    message: "The library's air conditioning system is too cold and makes it uncomfortable to study for long periods.",
    date: '2023-11-04T16:45:00',
    status: 'pending'
  }
]
```

### Admin Dashboard Component (app/components/AdminDashboard.tsx)
```tsx
'use client'

import { useMemo, useState } from 'react'
import { CheckCircleIcon, ClockIcon, FilterIcon, SearchIcon, BarChart3Icon, CheckIcon, XIcon } from 'lucide-react'
import { FeedbackItem } from '../lib/types/feedback'
import FeedbackModal from './FeedbackModal'
import { DummyFeedBackItems } from '../lib/data/feedback'

const AdminDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)
  const [feedBackList, setFeedBackList] = useState<FeedbackItem[]>(DummyFeedBackItems)
  
  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>()
    feedBackList.forEach(item => uniqueCategories.add(item.category))
    return Array.from(uniqueCategories)
  }, [feedBackList])
  
  // Filter feedback items
  const filteredItems = useMemo(() => {
    return feedBackList.filter(item => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false
      }
      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false
      }
      // Search query
      if (searchQuery && !item.message.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    })
  }, [feedBackList, statusFilter, categoryFilter, searchQuery])
  
  // Stats
  const stats = useMemo(() => {
    const total = feedBackList.length
    const pending = feedBackList.filter(item => item.status === 'pending').length
    const resolved = feedBackList.filter(item => item.status === 'resolved').length
    const categoryCounts: Record<string, number> = {}
    feedBackList.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    })
    return {
      total,
      pending,
      resolved,
      categoryCounts
    }
  }, [feedBackList])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Handle status update and close modal
  const handleStatusUpdate = (id: string, status: 'pending' | 'resolved') => {
    alert("update status")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Feedback Dashboard
        </h1>
        <p className="text-gray-600">
          Manage and respond to anonymous feedback from your school community
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <BarChart3Icon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Feedback
              </p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <CheckCircleIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.resolved}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex items-center mb-4 md:mb-0">
            <FilterIcon className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">Filters:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Status Filter */}
            <div>
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value as any)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            {/* Category Filter */}
            <div>
              <select 
                value={categoryFilter} 
                onChange={e => setCategoryFilter(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category} ({stats.categoryCounts[category] || 0})
                  </option>
                ))}
              </select>
            </div>
            {/* Search */}
            <div className="relative">
              <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search feedback..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Feedback Items ({filteredItems.length})
          </h2>
        </div>
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No feedback items match your filters
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors" 
                onClick={() => setSelectedFeedback(item)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center mb-2 md:mb-0">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status === 'resolved' ? (
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ClockIcon className="h-3 w-3 mr-1" />
                      )}
                      {item.status === 'resolved' ? 'Resolved' : 'Pending'}
                    </span>
                    <div 
                      className="ml-4" 
                      onClick={e => e.stopPropagation()}
                    >
                      {item.status === 'pending' ? (
                        <button 
                          onClick={() => handleStatusUpdate(item.id, 'resolved')} 
                          className="flex items-center text-sm text-green-600 hover:text-green-800"
                        >
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Mark Resolved
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStatusUpdate(item.id, 'pending')} 
                          className="flex items-center text-sm text-amber-600 hover:text-amber-800"
                        >
                          <XIcon className="h-4 w-4 mr-1" />
                          Mark Pending
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 line-clamp-2">{item.message}</p>
                <button 
                  className="text-purple-600 text-sm mt-2 hover:text-purple-800" 
                  onClick={e => {
                    e.stopPropagation()
                    setSelectedFeedback(item)
                  }}
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Feedback Modal */}
      {selectedFeedback && (
        <FeedbackModal 
          feedback={selectedFeedback} 
          onClose={() => setSelectedFeedback(null)} 
          onStatusChange={handleStatusUpdate} 
        />
      )}
    </div>
  )
}

export default AdminDashboard
```

### Feedback Modal Component (app/components/FeedbackModal.tsx)
```tsx
'use client'

import React from 'react'
import { XIcon, CheckCircleIcon, ClockIcon, CalendarIcon, TagIcon, MessageSquareIcon } from 'lucide-react'
import { FeedbackItem } from '../lib/types/feedback'

interface FeedbackModalProps {
  feedback: FeedbackItem
  onClose: () => void
  onStatusChange: (id: string, status: 'pending' | 'resolved') => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  feedback,
  onClose,
  onStatusChange
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Feedback Details
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            {/* Status Banner */}
            <div className={`w-full rounded-lg p-4 mb-4 ${
              feedback.status === 'resolved' 
                ? 'bg-green-50 border border-green-100' 
                : 'bg-amber-50 border border-amber-100'
            }`}>
              <div className="flex items-center">
                {feedback.status === 'resolved' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                ) : (
                  <ClockIcon className="h-6 w-6 text-amber-600 mr-3" />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    feedback.status === 'resolved' ? 'text-green-800' : 'text-amber-800'
                  }`}>
                    {feedback.status === 'resolved' ? 'Resolved Feedback' : 'Pending Review'}
                  </h3>
                  <p className={`text-sm ${
                    feedback.status === 'resolved' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {feedback.status === 'resolved' 
                      ? 'This feedback has been addressed' 
                      : 'This feedback is awaiting review'
                    }
                  </p>
                </div>
              </div>
            </div>
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted on</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(feedback.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TagIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">
                    {feedback.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Message Content */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquareIcon className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800">
              Feedback Message
            </h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            <p className="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed">
              {feedback.message}
            </p>
          </div>
        </div>
        {/* Actions Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            {feedback.status === 'pending' ? (
              <button 
                onClick={() => onStatusChange(feedback.id, 'resolved')} 
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm"
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Mark as Resolved
              </button>
            ) : (
              <button 
                onClick={() => onStatusChange(feedback.id, 'pending')} 
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm"
              >
                <ClockIcon className="h-5 w-5 mr-2" />
                Mark as Pending
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
```

### Footer Component (app/components/Footer.tsx)
```tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Anonymous Feedback System</h3>
            <p className="text-gray-400 text-sm mt-1">
              Making schools better through honest communication
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              Your privacy is our priority. All submissions are 100% anonymous.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              © {new Date().getFullYear()} School Feedback System
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

### Global Styles (app/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Next.js Configuration (next.config.js)
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

### Tailwind Configuration (tailwind.config.ts)
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

## 5. Key Changes and Breaking Points

### Routing Changes
- **React Router → Next.js App Router**: Replace `react-router-dom` with Next.js file-based routing
- **Link Component**: Change from `react-router-dom` Link to `next/link`
- **Navigation**: Replace `useLocation` with `usePathname` from `next/navigation`

### Component Changes
- **Client Components**: Add `'use client'` directive to components using hooks or event handlers
- **Server Components**: Default components are server-side rendered
- **Layout**: Move from component-based layout to Next.js layout system

### Import Changes
- **Absolute Imports**: Update import paths to use Next.js structure
- **Type Imports**: Ensure proper TypeScript imports for Next.js types

## 6. Testing Instructions

### Step 1: Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to verify the home page loads correctly.

### Step 2: Route Testing
1. **Home Page** (`/`): Should display the feedback submission form
2. **Admin Login** (`/admin/login`): Should display the login form
3. **Admin Dashboard** (`/admin/dashboard`): Should display the dashboard with dummy data

### Step 3: Functionality Testing
1. **Feedback Submission**: Test form submission and success message
2. **Admin Dashboard**: Test filtering, searching, and modal functionality
3. **Navigation**: Test header navigation between pages
4. **Responsive Design**: Test on different screen sizes

### Step 4: Build Testing
```bash
npm run build
npm start
```
Verify the production build works correctly.

## 7. Potential Issues and Solutions

### Common Issues
1. **Hydration Errors**: Ensure client/server state consistency
2. **Import Errors**: Update all import paths to match new structure
3. **TypeScript Errors**: Ensure all types are properly imported
4. **CSS Issues**: Verify Tailwind classes work correctly

### Solutions
- Use `'use client'` for interactive components
- Update import paths systematically
- Check TypeScript configuration
- Test CSS classes in development mode

## 8. Performance Optimizations

### Next.js Benefits
- **Automatic Code Splitting**: Pages are automatically split
- **Image Optimization**: Use `next/image` for optimized images
- **Static Generation**: Pages can be statically generated
- **Server Components**: Reduce client-side JavaScript

### Recommendations
- Convert static components to Server Components where possible
- Use Next.js Image component for any images
- Implement proper error boundaries
- Add loading states for better UX

This migration guide provides a complete roadmap for converting your React + Vite application to Next.js App Router while maintaining all existing functionality and design.