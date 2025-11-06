import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoUpload from '../components/Upload/VideoUpload'
import { videoService } from '../services/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function Upload() {
  const navigate = useNavigate()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [alertEmail, setAlertEmail] = useState(null)

  useEffect(() => {
    // Get email from session storage
    const email = sessionStorage.getItem('alertEmail')
    if (!email) {
      toast.error('Please enter your email first')
      navigate('/')
      return
    }
    setAlertEmail(email)
  }, [navigate])

  const handleUpload = async (file, onProgress) => {
    try {
      const video = await videoService.uploadVideo(file, onProgress)
      console.log('Uploaded video:', video)
      toast.success('Video uploaded successfully!')

      // Start analysis automatically with alert email
      setIsAnalyzing(true)
      const analysisResult = await videoService.analyzeVideo(video.id, alertEmail)
      console.log('Analysis result:', analysisResult)
      toast.success('Analysis started! You will receive alerts at ' + alertEmail)

      setTimeout(() => {
        console.log('Navigating to analysis page for video ID:', video.id)
        navigate(`/analysis/${video.id}`)
      }, 2000)
    } catch (error) {
      toast.error('Upload failed. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 uppercase tracking-wider">
          Upload Surveillance Video
        </h1>
        <div className="h-1 w-32 bg-gradient-button mx-auto mb-6"></div>
        <p className="text-xl text-white/80">
          Upload your CCTV footage to detect abandoned luggage and security threats
        </p>
        {alertEmail && (
          <div className="mt-6 inline-block px-6 py-3 bg-primary-500/20 border border-primary-500/40 rounded-full">
            <p className="text-sm text-primary-300">
              Security alerts will be sent to: <strong className="text-white">{alertEmail}</strong>
            </p>
          </div>
        )}
      </div>

      <VideoUpload onUpload={handleUpload} />

      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 card p-8 text-center"
        >
          <div className="inline-flex items-center space-x-3 text-primary-300">
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="font-medium uppercase tracking-wider">Starting AI Analysis...</span>
          </div>
          <p className="text-sm text-white/70 mt-4">
            Analyzing video for abandoned luggage and security threats... This may take a few minutes.
          </p>
        </motion.div>
      )}

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          { emoji: '📹', title: 'Supported Formats', desc: 'MP4, AVI, MOV, MKV', delay: 0 },
          { emoji: '💾', title: 'Max File Size', desc: '500 MB', delay: 0.1 },
          { emoji: '⚡', title: 'Processing Time', desc: '2-5 minutes typically', delay: 0.2 },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.3 }
            }}
            className="card p-8 text-center cursor-pointer"
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {item.emoji}
            </motion.div>
            <h3 className="font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h3>
            <p className="text-sm text-white/70">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Upload