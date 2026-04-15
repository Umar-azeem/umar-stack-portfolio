'use client'

import React from 'react'
import { GitHubProfile } from '../../components/GitHubProfile'

export default function GitHubPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <GitHubProfile />
      </div>
    </main>
  )
}
