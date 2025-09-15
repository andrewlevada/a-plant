"use client"

import { useEffect } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  containerClassName?: string
  contentClassName?: string
}

export default function Modal({ isOpen, onClose, children, containerClassName = '', contentClassName = '' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 text-black/90 ${containerClassName}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg p-5 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  )
}


