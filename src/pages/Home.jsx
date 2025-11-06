import React from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiAlertCircle, FiEye, FiZap } from 'react-icons/fi'
import { motion } from 'framer-motion'

function Home() {
  const features = [
    {
      icon: FiShield,
      title: 'Real-Time Detection',
      description: 'Instantly identify abandoned luggage and suspicious items in your surveillance footage.',
      color: 'from-primary-400 to-primary-600',
    },
    {
      icon: FiAlertCircle,
      title: 'Smart Alerts',
      description: 'Get immediate email notifications when potential security threats are detected.',
      color: 'from-secondary-400 to-secondary-600',
    },
    {
      icon: FiEye,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI monitors luggage proximity to owners and detects anomalous behavior patterns.',
      color: 'from-primary-500 to-secondary-500',
    },
  ]

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 sm:py-20 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 uppercase tracking-wider">
            AI Security
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-button mx-auto mb-6"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-300 uppercase tracking-widest">
            Luggage Monitoring System
          </h2>
        </motion.div>
        <p className="text-base sm:text-xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
          Protect your premises with cutting-edge AI technology that monitors surveillance footage
          for abandoned luggage and suspicious behavior in real-time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Link to="/upload" className="btn-primary px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base">
            Start Monitoring
          </Link>
          <Link to="/dashboard" className="btn-secondary px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base">
            View Dashboard
          </Link>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              delay: index * 0.2,
              type: 'spring',
              stiffness: 100,
              damping: 10
            }}
            whileHover={{
              scale: 1.08,
              rotate: [0, -2, 2, -2, 0],
              y: -10,
              transition: { duration: 0.4 }
            }}
            whileTap={{ scale: 0.95 }}
            className="card p-6 sm:p-8 cursor-pointer"
          >
            <motion.div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 shadow-2xl`}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                delay: index * 0.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 uppercase tracking-wide">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className="card p-6 sm:p-12 mx-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-3 sm:mb-4 uppercase tracking-wider">
          How It Works
        </h2>
        <div className="h-1 w-20 sm:w-24 bg-gradient-button mx-auto mb-8 sm:mb-12"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {[
            { step: 1, title: 'Upload Video', desc: 'Upload CCTV surveillance footage', icon: FiShield },
            { step: 2, title: 'AI Processing', desc: 'AI analyzes every frame for threats', icon: FiEye },
            { step: 3, title: 'Detection', desc: 'Identify abandoned luggage instantly', icon: FiAlertCircle },
            { step: 4, title: 'Get Alerts', desc: 'Receive real-time email notifications', icon: FiZap },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-button rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 sm:mb-6 shadow-lg">
                <item.icon className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1 sm:mb-2 uppercase tracking-wide text-xs sm:text-base">{item.title}</h3>
              <p className="text-[10px] sm:text-sm text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4">
        {[
          { label: 'Detection Accuracy', value: '98.5%', icon: '🎯' },
          { label: 'Response Time', value: '< 2s', icon: '⚡' },
          { label: 'Videos Monitored', value: '1,234+', icon: '📹' },
          { label: 'Threats Detected', value: '567', icon: '🚨' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
            whileHover={{
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.4 }
            }}
            whileTap={{ scale: 0.95 }}
            className="card p-4 sm:p-8 text-center cursor-pointer"
          >
            <motion.div
              className="text-3xl sm:text-5xl mb-3 sm:mb-4"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                delay: index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {stat.icon}
            </motion.div>
            <motion.p
              className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {stat.value}
            </motion.p>
            <p className="text-white/70 uppercase tracking-wider text-[10px] sm:text-sm leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Home