"use client"

import Image from "next/image";
import grassImage from "./grass.png";

export default function Trees() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center relative">
      <div className="flex">
        {Array.from({ length: 8 }).map((_, index) => {
          const chaoticGaps = [4, 120, 35, 60, 10, 90, 25, 75]; // More chaotic gap values
          return (
            <div 
              key={index} 
              className="h-[1000px] bg-[#006cc3]" 
              style={{ width: '40px', marginRight: `${chaoticGaps[index]}px` }}
            ></div>
          );
        })}
      </div>

      {/* Message bubble */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[280px]">
          {/* Message content */}
          <div className="bg-[#E9E9E9] rounded-3xl p-4">
            <div className="relative aspect-square">
              <Image
                src={grassImage}
                alt="Grass"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
          {/* Message tail */}
          <div 
            className="absolute -right-2 bottom-[15px] w-4 h-4 overflow-hidden"
            style={{
              clipPath: 'polygon(50% 0, 0 0, 0 100%)',
              transform: 'rotate(-45deg)',
              backgroundColor: '#E9E9E9'
            }}
          />
        </div>
      </div>
    </div>
  );
}
