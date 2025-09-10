"use client"

import { useEffect, useRef, useState } from 'react'
import type { Project } from './lib/types'

type Props = {
  isOpen: boolean
  projects: Project[]
  onClose: () => void
  onCreate: (projectTitle: string, text: string) => void
}

export default function TaskCreateModal({ isOpen, projects, onClose, onCreate }: Props) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setText('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const canSubmit = text.trim().length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black/90">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg p-5">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="A new task"
          className="w-full text-[16px] rounded-md border border-black/12 p-3 outline-none focus:ring-2 focus:ring-black/6"
        />

        <div className="mt-4 flex flex-wrap gap-[6px]">
          {projects.sort((a, b) => a.title.localeCompare(b.title)).map((p) => (
            <button
              key={p.title}
              className={`text-[13px] px-2.5 py-1.5 rounded-md border border-black/15 bg-white hover:bg-black/5 active:bg-black/10 transition-colors ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => canSubmit && onCreate(p.title, text.trim())}
              disabled={!canSubmit}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


