import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AnalysisChart from '../components/Dashboard/AnalysisChart'
import ColorDistribution from '../components/Dashboard/ColorDistribution'
import ChatBot from '../components/Chat/ChatBot'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import Alert from '../components/Common/Alert'
import { videoService } from '../services/api'
import { formatDuration } from '../utils/helpers'
import { motion } from 'framer-motion'
import { FiBriefcase, FiUsers, FiPieChart, FiClock, FiAlertTriangle } from 'react-icons/fi'
import VideoPlayer from '../components/Analysis/VideoPlayer'

function Analysis() {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      if (!summary || video?.status === 'processing') {
        fetchData()
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [videoId])

  const fetchData = async () => {
    try {
      const videoData = await videoService.getVideo(videoId)
      console.log('Video data:', videoData)
      setVideo(videoData)

      if (videoData.status === 'completed') {
        try {
          const summaryData = await videoService.getVideoSummary(videoId)
          console.log('Summary data:', summaryData)
          setSummary(summaryData)
        } catch (err) {
          console.error('Failed to load summary:', err)
          // Summary might not be ready yet
        }
      }
    } catch (error) {
      setError('Failed to load video data')
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading analysis..." />
  }

  if (error) {
    return <Alert type="error" title="Error" message={error} />
  }

  const stats = [
    {
      icon: FiBriefcase,
      label: 'Total Luggage Detected',
      value: summary?.total_luggage || 0,
      color: 'from-primary-400 to-primary-600',
      emoji: '🧳',
    },
    {
      icon: FiAlertTriangle,
      label: 'Abandoned Luggage',
      value: summary?.abandoned_count || 0,
      color: 'from-red-400 to-red-600',
      emoji: '🚨',
    },
    {
      icon: FiUsers,
      label: 'Persons Detected',
      value: summary?.total_persons || 0,
      color: 'from-green-400 to-green-600',
      emoji: '👥',
    },
    {
      icon: FiClock,
      label: 'Video Duration',
      value: formatDuration(video?.duration),
      color: 'from-secondary-400 to-secondary-600',
      emoji: '⏱️',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider">
          Security Analysis Report
        </h1>
        <div className="h-1 w-24 sm:w-32 bg-gradient-button mx-auto mb-6"></div>
        <p className="text-base sm:text-xl text-white/80 break-words px-4">{video?.original_filename}</p>
      </div>

      {/* Status Alert */}
      {video?.status === 'processing' && (
        <Alert
          type="info"
          title="Processing in progress"
          message="The video is being analyzed. This page will update automatically."
        />
      )}

      {video?.status === 'failed' && (
        <Alert
          type="error"
          title="Analysis failed"
          message="An error occurred during video analysis."
        />
      )}

      {/* Debug: Show when summary is missing */}
      {video?.status === 'completed' && !summary && (
        <Alert
          type="warning"
          title="Summary not available"
          message="Video analysis completed but summary data is not yet available. Retrying..."
        />
      )}

      {/* Stats Grid */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.3, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                type: 'spring',
                stiffness: 150,
                damping: 12
              }}
              whileHover={{
                scale: 1.12,
                y: -10,
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.95 }}
              className="card p-4 sm:p-8 cursor-pointer"
            >
              <div className="flex items-center justify-center mb-3 sm:mb-6">
                <motion.div
                  className={`w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <motion.span
                    className="text-2xl sm:text-4xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    {stat.emoji}
                  </motion.span>
                </motion.div>
              </div>
              <motion.p
                className="text-2xl sm:text-5xl font-bold text-white text-center mb-2 sm:mb-3"
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
              <p className="text-[10px] sm:text-sm text-white/70 text-center uppercase tracking-wider leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Player */}
      {video?.status === 'completed' && (
        <VideoPlayer videoId={videoId} />
      )}

      {/* Charts */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AnalysisChart data={summary} title="Luggage Detection Timeline" />
          <ColorDistribution data={summary} />
        </div>
      )}

      {/* Luggage Breakdown */}
      {summary?.luggage_types && Object.keys(summary.luggage_types).length > 0 && (
        <div className="card p-4 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center uppercase tracking-wider">
            Luggage Breakdown by Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {Object.entries(summary.luggage_types).map(([type, count]) => (
              <div key={type} className="text-center p-3 sm:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <p className="text-2xl sm:text-4xl font-bold text-primary-400 mb-2">{count}</p>
                <p className="text-xs sm:text-sm text-white/70 capitalize uppercase tracking-wider">{type}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chatbot */}
      {summary && <ChatBot videoId={parseInt(videoId)} />}
    </motion.div>
  )
}

export default Analysis