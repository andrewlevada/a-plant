"use client"

import { useEffect, useState } from 'react'
import { useProjects, projectsStore } from './lib/store'
import { normalizeProjects } from './lib/normalization'

export default function EditDataButton() {
  const projects = useProjects()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      setErrorMessage('')
      setValue(JSON.stringify(projects, null, 2))
    }
  }, [projects, isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
      >
        Edit data
      </button>
      
      {!isOpen ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black/90">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-lg p-4">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-[320px] text-[13px] rounded-md border border-black/20 p-3 outline-none focus:ring-2 focus:ring-black/10"
              style={{ fontFamily: 'JetBrains Mono' }}
              spellCheck={false}
            />

            {errorMessage && (
              <div className="mt-2 text-[13px] text-red-600">{errorMessage}</div>
            )}

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsOpen(false)
                }}
                className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setErrorMessage('')
                  try {
                    const parsed = JSON.parse(value)
                    const normalized = normalizeProjects(parsed)
                    projectsStore.setAll(normalized)
                    setIsOpen(false)
                  } catch (err: unknown) {
                    const message = (err as { message?: unknown })?.message
                    setErrorMessage(typeof message === 'string' ? message : 'Invalid JSON')
                  }
                }}
                className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


