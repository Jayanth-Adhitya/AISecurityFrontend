import React, { useState, useEffect, useRef } from 'react';
import { videoService } from '../../services/api';
import { getContrastingTextColor } from '../../utils/helpers';
import LoadingSpinner from '../Common/LoadingSpinner';
import Alert from '../Common/Alert';
import { FiPlay, FiPause, FiRewind, FiFastForward } from 'react-icons/fi';

const VideoPlayer = ({ videoId }) => {
  const [frames, setFrames] = useState([]);
  const [detections, setDetections] = useState([]);
  const [playbackFps, setPlaybackFps] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const framesData = await videoService.getVideoFrames(videoId);
        if (framesData && framesData.frames) {
          setFrames(framesData.frames);
          setPlaybackFps(framesData.playback_fps || 2);
        } else {
          setFrames([]);
        }
        const detectionsData = await videoService.getVideoDetections(videoId);
        if (detectionsData && detectionsData.detections) {
          setDetections(detectionsData.detections);
        } else {
          setDetections([]);
        }
      } catch (err) {
        setError('Failed to load video data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [videoId]);

  const drawDetections = (frame) => {
    const canvas = canvasRef.current;
    if (!canvas || !frame) return;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    // Use backend URL from environment variable
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    // For ngrok, we need to fetch with proper headers first
    const imageUrl = `${backendUrl}${frame.url}`;

    // Fetch image with ngrok header bypass
    fetch(imageUrl, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const objectUrl = URL.createObjectURL(blob);
      image.src = objectUrl;
    })
    .catch(err => {
      console.error('Failed to load image:', err);
      // Fallback to direct URL
      image.src = imageUrl;
    });

    image.onload = () => {
      // Get container width for responsive scaling
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const imageAspectRatio = image.width / image.height;

      // Calculate scaled dimensions to fit container
      let displayWidth = Math.min(image.width, containerWidth);
      let displayHeight = displayWidth / imageAspectRatio;

      // Set canvas to display size
      canvas.width = displayWidth;
      canvas.height = displayHeight;

      // Calculate scale factor for detections
      const scaleX = displayWidth / image.width;
      const scaleY = displayHeight / image.height;

      // Draw image scaled to canvas size
      ctx.drawImage(image, 0, 0, displayWidth, displayHeight);

      const frameDetections = detections.filter(d => d.frame_number === frame.frame_number);
      frameDetections.forEach(det => {
        const color = det.color || '#FF0000';
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        // Scale detection coordinates
        const x1 = det.bbox_x1 * scaleX;
        const y1 = det.bbox_y1 * scaleY;
        const width = (det.bbox_x2 - det.bbox_x1) * scaleX;
        const height = (det.bbox_y2 - det.bbox_y1) * scaleY;

        ctx.strokeRect(x1, y1, width, height);

        const text = `${det.object_class} (${(det.confidence * 100).toFixed(1)}%)`;

        // Scale font size based on display size
        const fontSize = Math.max(10, Math.min(14, displayWidth / 60));
        ctx.font = `${fontSize}px Arial`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        // Draw background rectangle with the detection color
        ctx.fillStyle = color;
        ctx.fillRect(x1, y1 - textHeight - 5, textWidth + 4, textHeight + 4);

        // Draw text with contrasting color based on background
        ctx.fillStyle = getContrastingTextColor(color);
        ctx.fillText(text, x1 + 2, y1 - 5);
      });
    };
    image.onerror = () => {
      setError(`Failed to load image: ${image.src}`);
    }
  };

  useEffect(() => {
    if (frames.length > 0 && currentFrameIndex < frames.length) {
      drawDetections(frames[currentFrameIndex]);
    }
  }, [currentFrameIndex, frames, detections]);

  useEffect(() => {
    if (isPlaying && frames.length > 0) {
      const interval = setInterval(() => {
        setCurrentFrameIndex(prevIndex => (prevIndex + 1) % frames.length);
      }, 1000 / playbackFps);
      return () => clearInterval(interval);
    }
  }, [isPlaying, frames, playbackFps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    setCurrentFrameIndex(parseInt(e.target.value, 10));
  };

  if (loading) {
    return <LoadingSpinner message="Loading video player..." />;
  }

  if (error) {
    return <Alert type="error" title="Error" message={error} />;
  }

  if (frames.length === 0) {
    return <Alert type="info" title="No frames" message="No frames available for this video." />;
  }

  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 uppercase tracking-wide text-center">
        Video Playback
      </h3>

      {/* Canvas Container - Responsive */}
      <div ref={containerRef} className="relative w-full bg-black/20 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-w-full block"
          style={{ maxHeight: '70vh' }}
        />
      </div>

      {/* Frame Info */}
      <div className="mt-3 text-center text-sm text-white/60">
        Frame {currentFrameIndex + 1} of {frames.length}
      </div>

      {/* Slider */}
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max={frames.length > 0 ? frames.length - 1 : 0}
          value={currentFrameIndex}
          onChange={handleSliderChange}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #00d2ff 0%, #00d2ff ${(currentFrameIndex / (frames.length - 1)) * 100}%, rgba(255,255,255,0.2) ${(currentFrameIndex / (frames.length - 1)) * 100}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-3 sm:space-x-4 mt-6">
        <button
          onClick={() => setCurrentFrameIndex(0)}
          className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
          aria-label="Rewind to start"
        >
          <FiRewind className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-4 sm:p-5 rounded-full bg-gradient-button text-white hover:shadow-lg transition-all hover:scale-110"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FiPause className="w-6 h-6 sm:w-7 sm:h-7" /> : <FiPlay className="w-6 h-6 sm:w-7 sm:h-7" />}
        </button>

        <button
          onClick={() => setCurrentFrameIndex(frames.length - 1)}
          className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
          aria-label="Fast forward to end"
        >
          <FiFastForward className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
