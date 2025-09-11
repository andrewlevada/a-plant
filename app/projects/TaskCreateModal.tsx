"use client"

import { useEffect, useRef, useState } from 'react'
import { useCreateTaskModalOpen, uiStore } from './lib/uiStore'
import { useProjects, projectsStore } from './lib/store'
import { useToast } from '../components/toast/useToast'

export default function TaskCreateModal() {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isOpen = useCreateTaskModalOpen()
  const projects = useProjects()
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setText('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        uiStore.closeCreateTask()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const canSubmit = text.trim().length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black/90">
      <div className="absolute inset-0 bg-black/40" onClick={() => uiStore.closeCreateTask()} />

      <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg p-5">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="A new task"
          className="w-full text-[16px] rounded-md border border-black/12 p-3 outline-none focus:ring-2 focus:ring-black/6"
        />

        <div className="mt-4 flex flex-wrap gap-[6px]">
          {projects.slice().sort((a, b) => a.title.localeCompare(b.title)).map((p) => (
            <button
              key={p.title}
              className={`text-[13px] px-2.5 py-1.5 rounded-md border border-black/15 bg-white hover:bg-black/5 active:bg-black/10 transition-colors ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!canSubmit) return
                projectsStore.addTodo(p.title, text.trim())
                setText('')
                uiStore.closeCreateTask()
                showToast('Created the task 🤍')
              }}
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


