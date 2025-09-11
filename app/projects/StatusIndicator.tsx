"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ProjectStatus } from './lib/types'
import { projectsStore, useProjects } from './lib/store'

type StatusIndicatorProps = {
  projectTitle: string
  className?: string
}

const STATUSES: ProjectStatus[] = ['green', 'yellow', 'red']

export default function StatusIndicator({ projectTitle, className = '' }: StatusIndicatorProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const projects = useProjects()
  const status: ProjectStatus = useMemo(() => {
    return (projects.find((p) => p.title === projectTitle)?.status ?? 'yellow') as ProjectStatus
  }, [projects, projectTitle])

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      if (!el.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', handlePointerDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`${className}`}>
      <button
        type="button"
        aria-label="Change project status"
        onClick={() => setOpen(true)}
        className={`h-10 w-10 ${statusToBg(status)} rotate-[-8deg] rounded-md shadow-sm transition-transform active:scale-[0.98]`}
      />

      {open && (
        <div className="absolute bottom-full right-0 mb-2 z-40">
          <div className="bg-white p-3 shadow-2xl rounded-lg">
            <div className="flex items-center gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`Set status ${s}`}
                  onClick={() => {
                    projectsStore.setProjectStatus(projectTitle, s)
                    setOpen(false) // auto-close only after selecting
                  }}
                  className={`h-6 w-6 rounded-md ${statusToBg(s)} transition-transform hover:scale-105 active:scale-95 focus:outline-none`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function statusToBg(status: ProjectStatus): string {
    if (status === 'green') return 'bg-green-600'
    if (status === 'yellow') return 'bg-yellow-600'
    return 'bg-red-600'
}


