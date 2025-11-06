import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiActivity, FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMobileMenu}>
              <img
                src="https://mehh.ae/images/logo2.png"
                alt="MEHH Logo"
                className="h-8 sm:h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-xl font-bold text-white uppercase tracking-wide">
                  AI Security
                </span>
                <span className="text-[10px] sm:text-xs text-primary-300 uppercase tracking-widest hidden sm:block">
                  Luggage Monitoring
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-wider text-sm font-medium ${
                isActive('/')
                  ? 'bg-gradient-button text-white shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-wider text-sm font-medium ${
                isActive('/upload')
                  ? 'bg-gradient-button text-white shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-wider text-sm font-medium ${
                isActive('/dashboard')
                  ? 'bg-gradient-button text-white shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Side - Live Badge & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Live Badge */}
            <motion.div
              className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500/20 border border-primary-500/40 text-primary-300 rounded-full backdrop-blur-sm cursor-pointer"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 10px rgba(0, 210, 255, 0.3)',
                  '0 0 20px rgba(0, 210, 255, 0.6)',
                  '0 0 10px rgba(0, 210, 255, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <FiActivity className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">Live</span>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/20 backdrop-blur-md bg-white/10"
          >
            <nav className="px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-sm font-medium ${
                  isActive('/')
                    ? 'bg-gradient-button text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Home
              </Link>
              <Link
                to="/upload"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-sm font-medium ${
                  isActive('/upload')
                    ? 'bg-gradient-button text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Upload
              </Link>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-sm font-medium ${
                  isActive('/dashboard')
                    ? 'bg-gradient-button text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Dashboard
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header