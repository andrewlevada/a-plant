"use client"

import { useMemo } from 'react'
import { useProjects, projectsStore } from './lib/store'
import { useToast } from '../components/toast/useToast'

export default function ClearDoneButton() {
  const projects = useProjects()
  const { showToast } = useToast()
  const doneCount = useMemo(() => projects.reduce((c, p) => c + p.todos.filter(t => t.done).length, 0), [projects])
  const disabled = doneCount === 0
  return (
    <button
      onClick={() => {
        const cleared = projectsStore.clearDone()
        if (cleared > 0) {
          showToast(`Ah, a new day! ${cleared} less todos. Time to get to work`)
        }
      }}
      disabled={disabled}
      className={`text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors ${disabled ? 'opacity-20 cursor-not-allowed' : ''}`}
      aria-label="Clear struck-through todos"
    >
      Clear struck-through todos
    </button>
  )
}


