import axios from 'axios'

// Use environment variable for API URL, fallback to relative path
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
  : '/api/v1'

// Debug: Log the API URL
console.log('🔗 API Base URL:', API_BASE_URL)
console.log('🔗 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning page
  },
})

export const videoService = {
  // Upload video
  uploadVideo: async (file, onUploadProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
    return response.data
  },

  // Start analysis
  analyzeVideo: async (videoId, alertEmail = null) => {
    const params = alertEmail ? { alert_email: alertEmail } : {}
    const response = await api.post(`/analyze/${videoId}`, null, { params })
    return response.data
  },

  // Get video details
  getVideo: async (videoId) => {
    const response = await api.get(`/videos/${videoId}`)
    return response.data
  },

  // Get video summary
  getVideoSummary: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/summary`)
    return response.data
  },

  // List videos
  listVideos: async (skip = 0, limit = 10) => {
    const response = await api.get(`/videos?skip=${skip}&limit=${limit}`)
    return response.data
  },

  // Get video frames
  getVideoFrames: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/frames`);
    return response.data;
  },

  // Get video detections
  getVideoDetections: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/detections?limit=10000`); // Fetch all detections
    return response.data;
  },

  // Query
  query: async (question, videoId = null) => {
    const response = await api.post('/query', {
      question,
      video_id: videoId,
    })
    return response.data
  },
}