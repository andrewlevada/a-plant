"use client"

import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import { useCreateProjectModalOpen, uiStore } from './lib/uiStore'
import { projectsStore } from './lib/store'
import { useToast } from '../components/toast/useToast'

export default function ProjectCreateModal() {
  const isOpen = useCreateProjectModalOpen()
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  const createProject = () => {
    if (!canSubmit) return
    projectsStore.addProject(title.trim())
    uiStore.closeCreateProject()
    showToast('A new project — so exciting 🌱')
  }

  const canSubmit = title.trim().length > 0

  return (
    <Modal isOpen={isOpen} onClose={() => uiStore.closeCreateProject()}>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        className="w-full text-[16px] rounded-md border border-black/12 p-3 outline-none focus:ring-2 focus:ring-black/6"
      />

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={() => uiStore.closeCreateProject()}
          className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={createProject}
          disabled={!canSubmit}
          className={`text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Create
        </button>
      </div>
    </Modal>
  )
}


