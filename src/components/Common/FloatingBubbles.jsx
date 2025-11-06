import React from 'react'
import { motion } from 'framer-motion'

function FloatingBubbles() {
  // Generate random bubbles with different sizes, positions, and durations
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // Random horizontal position (0-100%)
    size: 60 + Math.random() * 80, // Random size between 60-140px
    duration: 8 + Math.random() * 8, // Random duration between 8-16s
    delay: Math.random() * 5, // Random delay 0-5s
    opacity: 0.03 + Math.random() * 0.05, // Very transparent (0.03-0.08)
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute"
          style={{
            left: `${bubble.left}%`,
            bottom: '-150px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-100, -window.innerHeight - 200],
            opacity: [0, bubble.opacity, bubble.opacity, 0],
            x: [0, Math.sin(bubble.id) * 30, -Math.sin(bubble.id) * 30, 0], // Slight side-to-side movement
            rotate: [0, 360], // Gentle rotation
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <img
            src="https://mehh.ae/images/logo2.png"
            alt="Floating logo"
            className="w-full h-full object-contain"
            style={{
              filter: 'brightness(1.5)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingBubbles
