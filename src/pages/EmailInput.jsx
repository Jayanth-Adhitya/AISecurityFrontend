import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaEnvelope, FaShieldAlt } from 'react-icons/fa'
import FloatingBubbles from '../components/Common/FloatingBubbles'
import ParticleBackground from '../components/Common/ParticleBackground'

function EmailInput() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email address')
      setIsValid(false)
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address')
      setIsValid(false)
      return
    }

    // Store email in session storage
    sessionStorage.setItem('alertEmail', email)
    toast.success('Email saved! You can now upload a video.')

    // Navigate to upload page
    navigate('/upload')
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setIsValid(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Bubbles */}
      <FloatingBubbles />
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: [0, -10, 0],
            }}
            transition={{
              scale: { delay: 0.2, type: 'spring', stiffness: 200 },
              rotate: { delay: 0.2, type: 'spring', stiffness: 100 },
              y: { delay: 1, duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
            className="mb-8 cursor-pointer"
          >
            <img
              src="https://mehh.ae/images/logo2.png"
              alt="MEHH Logo"
              className="h-24 w-auto mx-auto mb-6 drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(0, 210, 255, 0.5))',
              }}
            />
          </motion.div>

          <motion.h1
            className="text-6xl font-bold text-white mb-4 uppercase tracking-wider"
            animate={{
              textShadow: [
                '0 0 20px rgba(0, 210, 255, 0.5)',
                '0 0 30px rgba(0, 210, 255, 0.8)',
                '0 0 20px rgba(0, 210, 255, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            AI Security
          </motion.h1>
          <motion.div
            className="h-1 w-32 bg-gradient-button mx-auto mb-6"
            animate={{
              width: ['128px', '160px', '128px'],
              boxShadow: [
                '0 0 10px rgba(0, 210, 255, 0.5)',
                '0 0 20px rgba(0, 210, 255, 0.8)',
                '0 0 10px rgba(0, 210, 255, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="text-2xl text-primary-300 uppercase tracking-widest">
            Luggage Monitoring System
          </p>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-10 mb-8"
        >
          <div className="flex items-start space-x-5 mb-8">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-button rounded-full flex items-center justify-center shadow-lg">
                <FaEnvelope className="text-white text-2xl" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3 uppercase tracking-wide">
                Enter Your Email Address
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                We'll send you instant security alerts when abandoned luggage is detected in your video.
                Your email is used only for this session and is not stored permanently.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your.email@example.com"
                className={`input text-lg ${
                  !isValid ? 'border-red-500 ring-2 ring-red-500' : ''
                }`}
                required
              />
              {!isValid && (
                <p className="mt-2 text-sm text-red-300">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-5 backdrop-blur-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-bold text-yellow-300 mb-2 uppercase tracking-wider">
                    Security Alert System
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Alerts will be sent immediately when luggage is detected as abandoned for more than 10 seconds.
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 210, 255, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 10px 25px rgba(0, 210, 255, 0.3)',
                  '0 15px 35px rgba(0, 210, 255, 0.5)',
                  '0 10px 25px rgba(0, 210, 255, 0.3)',
                ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              type="submit"
              className="btn-primary w-full py-5 text-base relative overflow-hidden group"
            >
              <motion.span
                className="relative z-10"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Continue to Upload Video 🚀
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1
                }}
              />
            </motion.button>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
        >
          {[
            { emoji: '🎯', label: 'AI-Powered Detection', delay: 0 },
            { emoji: '⚡', label: 'Real-time Alerts', delay: 0.1 },
            { emoji: '🔒', label: 'Secure & Private', delay: 0.2 },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + feature.delay }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -3, 3, -3, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              className="card p-6 cursor-pointer"
            >
              <motion.div
                className="text-5xl mb-3"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {feature.emoji}
              </motion.div>
              <div className="text-sm font-bold text-white uppercase tracking-wider">
                {feature.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default EmailInput
