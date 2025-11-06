import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlay, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { formatDuration, formatDateTime, getStatusColor } from '../../utils/helpers'

function VideoList({ videos }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="w-5 h-5" />
      case 'processing':
        return <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      case 'failed':
        return <FiAlertCircle className="w-5 h-5" />
      default:
        return <FiClock className="w-5 h-5" />
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-500/40 text-green-300'
      case 'processing':
        return 'bg-primary-500/20 border-primary-500/40 text-primary-300'
      case 'failed':
        return 'bg-red-500/20 border-red-500/40 text-red-300'
      default:
        return 'bg-white/10 border-white/20 text-white/70'
    }
  }

  return (
    <div className="grid gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="card p-6 hover:shadow-2xl transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-button rounded-xl shadow-lg">
                <FiPlay className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  {video.original_filename}
                </h3>
                <div className="flex items-center space-x-3 mt-2 text-sm text-white/60">
                  <span>⏱️ {formatDuration(video.duration)}</span>
                  <span>•</span>
                  <span>📅 {formatDateTime(video.upload_time)}</span>
                  {video.width && video.height && (
                    <>
                      <span>•</span>
                      <span>📐 {video.width}x{video.height}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${getStatusStyle(video.status)}`}>
                {getStatusIcon(video.status)}
                <span className="capitalize uppercase tracking-wider">{video.status}</span>
              </div>

              {video.status === 'completed' && (
                <Link
                  to={`/analysis/${video.id}`}
                  className="btn-primary text-sm px-6"
                >
                  View Analysis
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VideoList