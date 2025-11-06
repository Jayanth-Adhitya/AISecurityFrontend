export const formatDuration = (seconds) => {
  if (!seconds) return '00:00'
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString()
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-100'
    case 'processing':
      return 'text-blue-600 bg-blue-100'
    case 'failed':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Color name to hex mapping for common car colors
 */
const COLOR_NAME_TO_HEX = {
  'white': '#FFFFFF',
  'black': '#000000',
  'gray': '#808080',
  'silver': '#C0C0C0',
  'red': '#FF0000',
  'blue': '#0000FF',
  'green': '#008000',
  'yellow': '#FFFF00',
  'orange': '#FFA500',
  'brown': '#A52A2A',
  'beige': '#F5F5DC',
  'gold': '#FFD700',
  'purple': '#800080',
  'pink': '#FFC0CB',
  'unknown': '#808080' // Default gray
}

/**
 * Convert color name to hex code
 * @param {string} colorName - Color name (e.g., 'red', 'blue')
 * @returns {string} - Hex color code (e.g., '#FF0000')
 */
export const colorNameToHex = (colorName) => {
  if (!colorName || typeof colorName !== 'string') {
    return COLOR_NAME_TO_HEX.unknown
  }

  const normalizedName = colorName.toLowerCase().trim()
  return COLOR_NAME_TO_HEX[normalizedName] || COLOR_NAME_TO_HEX.unknown
}

/**
 * Calculate contrasting text color (black or white) based on background color
 * @param {string} bgColor - Background color (hex format like '#FF0000' or color name like 'red')
 * @returns {string} - Contrasting text color ('#000000' or '#FFFFFF')
 */
export const getContrastingTextColor = (bgColor) => {
  // Handle invalid or missing colors
  if (!bgColor || typeof bgColor !== 'string') {
    return '#FFFFFF' // Default to white text
  }

  let hexColor

  // Check if it's already a hex color
  if (bgColor.startsWith('#')) {
    hexColor = bgColor
  } else {
    // Convert color name to hex
    hexColor = colorNameToHex(bgColor)
  }

  // Remove # if present
  const color = hexColor.replace('#', '')

  // Ensure we have a valid 6-character hex color
  if (color.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(color)) {
    return '#FFFFFF' // Default to white text for invalid colors
  }

  // Convert hex to RGB
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)

  // Calculate luminance using the formula: 0.299*R + 0.587*G + 0.114*B
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black text for light backgrounds, white text for dark backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}
