"use client"

import { useEffect, useRef } from 'react'

export default function Perspective() {
    const videoTag = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then(stream => {
            if (!videoTag.current) return
            videoTag.current.srcObject = stream
        })
    }, [])

    return <div className="flex flex-col items-center justify-center h-screen">
        <video
            className="w-[600px] h-auto top-[300px] left-[300px] bg-[#aaaaaa]"
            ref={videoTag}
            autoPlay
        ></video>

        <canvas
        ></canvas>
    </div>
}