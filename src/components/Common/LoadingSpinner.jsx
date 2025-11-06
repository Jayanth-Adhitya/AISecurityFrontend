import React from 'react'

function LoadingSpinner({ size = 'md', message = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className={`${sizeClasses[size]} border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin`}></div>
      {message && (
        <p className="mt-4 text-white/80 uppercase tracking-wider text-sm">{message}</p>
      )}
    </div>
  )
}

export default LoadingSpinner