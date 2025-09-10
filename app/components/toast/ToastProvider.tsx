"use client"

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const DEFAULT_DURATION = 2200

type Toast = { id: number; message: string }

type ToastContextValue = {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counterRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hideCurrent = useCallback(() => {
    setToasts((prev) => prev.slice(1))
  }, [])

  const showToast = useCallback((message: string) => {
    const id = ++counterRef.current
    setToasts([{ id, message }])
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      hideCurrent()
    }, DEFAULT_DURATION)
  }, [hideCurrent])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto rounded-md px-3 py-2 text-white bg-sky-500 shadow-md text-[13px]">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider')
  return ctx
}


