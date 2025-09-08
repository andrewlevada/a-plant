"use client"

import { useState, useEffect } from 'react'

type Props = {
  isOpen: boolean
  initialValue: string
  errorMessage?: string
  onClose: () => void
  onSave: (value: string) => void
}

export default function DataEditorModal({ isOpen, initialValue, errorMessage, onClose, onSave }: Props) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black/90">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

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
              onClose()
            }}
            className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(value)
            }}
            className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}


