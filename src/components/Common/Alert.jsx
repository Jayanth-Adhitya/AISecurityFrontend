import React from 'react'
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi'

function Alert({ type = 'info', title, message, onClose }) {
  const styles = {
    info: {
      bg: 'bg-primary-500/20',
      border: 'border-primary-500/40',
      text: 'text-primary-300',
      icon: FiInfo,
    },
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/40',
      text: 'text-green-300',
      icon: FiCheckCircle,
    },
    warning: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/40',
      text: 'text-yellow-300',
      icon: FiAlertTriangle,
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/40',
      text: 'text-red-300',
      icon: FiXCircle,
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`${style.bg} ${style.border} ${style.text} border rounded-xl p-5 backdrop-blur-sm`}>
      <div className="flex items-start">
        <Icon className="w-6 h-6 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          {title && <h3 className="font-bold mb-1 uppercase tracking-wide">{title}</h3>}
          <p className="text-sm text-white/80">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 -mr-1 -mt-1 p-1 hover:opacity-75 transition-opacity"
          >
            <FiXCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert