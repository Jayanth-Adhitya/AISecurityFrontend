import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud, FiFilm, FiX } from 'react-icons/fi'
import { formatFileSize } from '../../utils/helpers'
import { motion } from 'framer-motion'

function VideoUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
      setUploadProgress(0)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024, // 500MB
  })

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      await onUpload(selectedFile, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(progress)
      })
      setSelectedFile(null)
      setUploadProgress(0)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setUploadProgress(0)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive
              ? 'border-primary-500 bg-primary-500/20 scale-105'
              : 'border-white/30 hover:border-primary-500/50 card'
            }
          `}
        >
          <input {...getInputProps()} />
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragActive ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-button rounded-full flex items-center justify-center shadow-2xl">
              <FiUploadCloud className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <p className="text-2xl font-bold text-white mb-3 uppercase tracking-wide">
            {isDragActive ? 'Drop Your Video Here' : 'Drag & Drop Your Video'}
          </p>
          <p className="text-base text-white/70 mb-6">
            or click to browse from your computer
          </p>
          <div className="inline-block px-6 py-3 bg-white/10 border border-white/20 rounded-full">
            <p className="text-sm text-white/80 uppercase tracking-wider">
              MP4, AVI, MOV, MKV • Max 500MB
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-gradient-button rounded-xl shadow-lg">
                <FiFilm className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{selectedFile.name}</h3>
                <p className="text-sm text-white/60 mt-2 uppercase tracking-wider">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {!isUploading && (
              <button
                onClick={removeFile}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6 text-white/70 hover:text-white" />
              </button>
            )}
          </div>

          {isUploading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/80 mb-3 uppercase tracking-wider">
                <span className="font-bold">Uploading...</span>
                <span className="font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="bg-gradient-button h-3 rounded-full shadow-lg"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {!isUploading && (
            <button
              onClick={handleUpload}
              className="w-full btn-primary py-4"
            >
              Upload Video
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default VideoUpload