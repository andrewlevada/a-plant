"use client"

import { uiStore } from './lib/uiStore'
import ProjectCreateModal from './ProjectCreateModal'

export default function AddProjectCard() {
  return (
    <>
      <button
        onClick={() => uiStore.openCreateProject()}
        className="relative w-full sm:w-[260px] rounded-lg border border-dashed border-black/25 p-5 bg-transparent text-slate-900 grid place-items-center opacity-0 hover:opacity-100 transition-opacity"
        aria-label="Create project"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/50 group-hover:text-black/80 transition-colors">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="text-[13px] text-black/60">Create project</span>
        </div>
      </button>

      <ProjectCreateModal />
    </>
  )
}


