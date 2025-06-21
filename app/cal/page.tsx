"use client"

import { useState, useEffect } from 'react'

const startFrom = 6
const daysInThisMonth = 30

export default function June2025() {
  const [dayHues, setDayHues] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Generate random hues only on client side
    const hues = Array.from({ length: daysInThisMonth }, () => Math.floor(Math.random() * 360))
    setDayHues(hues)
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Huge background text */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-0">
        <h1 className="text-gray-300 opacity-20 text-[20vw] leading-none font-bold whitespace-nowrap overflow-hidden" 
            style={{ fontFamily: 'var(--font-primary)' }}>
          my<br/>june<br/>2025
        </h1>
      </div>
      
      <style jsx>{`
        @keyframes hue-flicker {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(400deg); }
        }
        
        .day-cell {
          animation: hue-flicker 2.5s ease-in-out infinite;
        }
      `}</style>
      <div className="w-[700px] h-[600px] grid grid-cols-7 grid-rows-6 relative z-10">
        {Array.from({ length: 42 }, (_, i) => {
          const isEmpty = i < startFrom || i >= startFrom + daysInThisMonth
          const dayNumber = i - startFrom + 1
          const hue = mounted ? dayHues[i - startFrom] : 0

          return isEmpty ? (
            <div key={i} className="bg-transparent">
              <p className="text-transparent text-xs"></p>
            </div>
          ) : (
            <div 
              key={i} 
              className={mounted ? "day-cell" : ""}
              style={mounted ? {
                backgroundColor: `hsl(${hue}, 35%, 50%)`
              } : undefined}
            >
              <p className="mt-1 ml-1.5 text-white mix-blend-difference">{dayNumber}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
