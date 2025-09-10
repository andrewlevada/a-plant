"use client"

import { useEffect } from "react"
import { isShortcutUSed } from "./lib/keyboard"

type Props = {
  onClick: () => void
}

export default function AddTaskButton({ onClick }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isShortcutUSed(e, '⌘K')) return

      e.preventDefault()
      onClick()
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClick])

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-lg bg-white text-black pl-4 pr-3 py-2 shadow-md border border-black/10"
      aria-label="Add task"
    >
      <span className="text-[14px] leading-none">Add task</span>
      <span className="ml-1 text-[12px] leading-none rounded-md border border-black/20 bg-white/80 px-1.5 py-0.5">⌘K</span>
    </button>
  )
}


