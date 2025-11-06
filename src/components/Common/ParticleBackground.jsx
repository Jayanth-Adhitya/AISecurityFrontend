import React from 'react'
import { motion } from 'framer-motion'

function ParticleBackground() {
  // Create floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-400"
          style={{
            left: `${particle.left}%`,
            top: '100%',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
          }}
          animate={{
            y: [-50, -window.innerHeight - 100],
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground
