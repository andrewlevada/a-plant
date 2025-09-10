"use client"

type Props = {
  onClick: () => void
  disabled?: boolean
}

export default function ClearDoneButton({ onClick, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors ${disabled ? 'opacity-20 cursor-not-allowed' : ''}`}
      aria-label="Clear struck-through todos"
    >
      Clear struck-through todos
    </button>
  )
}


