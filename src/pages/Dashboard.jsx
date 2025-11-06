import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VideoList from '../components/Dashboard/VideoList'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { videoService } from '../services/api'
import { motion } from 'framer-motion'

function Dashboard() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
    // Refresh every 5 seconds to update processing status
    const interval = setInterval(fetchVideos, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchVideos = async () => {
    try {
      const data = await videoService.listVideos(0, 20)
      setVideos(data)
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading videos..." />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white uppercase tracking-wider mb-4">
          Security Dashboard
        </h1>
        <div className="h-1 w-32 bg-gradient-button mx-auto mb-6"></div>
        <p className="text-xl text-white/80">Monitor and analyze surveillance footage for security threats</p>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-button rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">Analysis Overview</h2>
              <p className="text-sm text-white/70">Real-time monitoring status</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 px-6 py-3 bg-primary-500/20 border border-primary-500/40 rounded-full">
            <span className="text-sm text-white/70 uppercase tracking-wider">Total Videos:</span>
            <span className="text-2xl font-bold text-white">{videos.length}</span>
          </div>
        </div>
      </div>

      {videos.length > 0 ? (
        <VideoList videos={videos} />
      ) : (
        <div className="card p-16 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <p className="text-2xl text-white font-bold mb-3 uppercase tracking-wide">No Surveillance Videos Yet</p>
          <p className="text-white/70 mb-8">Upload CCTV footage to start monitoring for abandoned luggage and security threats</p>
          <Link to="/" className="btn-primary inline-block">
            Get Started
          </Link>
        </div>
      )}
    </motion.div>
  )
}

export default Dashboard