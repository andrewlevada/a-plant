'use client'

import { useRef, useState } from 'react'

const BLUR_PX = 3

interface VideoPlayerProps {
  src: string
  poster?: string
  width?: number
  height?: number
  className?: string
}

export default function VideoPlayer({ src, poster, width, height, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        poster={poster}
        width={width}
        height={height}
        className="w-full h-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onCanPlay={() => setIsBuffering(false)}
        onPlaying={() => setIsBuffering(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        <div
          className="relative w-12 h-12"
          style={{
            opacity: isHovered ? (isBuffering ? 0.5 : 1) : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.95)',
            filter: isHovered ? 'blur(0px)' : `blur(${BLUR_PX}px)`,
            transition: 'opacity 150ms ease-out, transform 150ms ease-out, filter 150ms ease-out',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="white"
            className="absolute inset-0"
            style={{
              opacity: isPlaying ? 0 : 1,
              filter: isPlaying ? `blur(${BLUR_PX}px)` : 'blur(0px)',
              transition: 'opacity 150ms ease-out, filter 150ms ease-out',
            }}
          >
            <polygon points="16,12 38,24 16,36" />
          </svg>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="white"
            className="absolute inset-0"
            style={{
              opacity: isPlaying ? 1 : 0,
              filter: isPlaying ? 'blur(0px)' : `blur(${BLUR_PX}px)`,
              transition: 'opacity 150ms ease-out, filter 150ms ease-out',
            }}
          >
            <rect x="14" y="12" width="8" height="24" />
            <rect x="26" y="12" width="8" height="24" />
          </svg>
        </div>
      </button>
    </div>
  )
}
