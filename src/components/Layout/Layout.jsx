import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import FloatingBubbles from '../Common/FloatingBubbles'
import ParticleBackground from '../Common/ParticleBackground'

function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Bubbles on all pages */}
      <FloatingBubbles />
      <ParticleBackground />

      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout