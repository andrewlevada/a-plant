"use client"

import { useMemo, useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import StatusIndicator from './StatusIndicator'
import type { Project } from './lib/types'

type ProjectCardProps = {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const faded = project.todos.length === 0 || project.todos.every(t => t.done)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const items = useMemo(() => project.todos.map(t => t.id), [project.todos])

  return (
    <div
      className={`relative w-full sm:w-[260px] bg-white text-slate-900 rounded-lg shadow-s p-5 overflow-visible ${className}`}
      style={faded ? { backgroundColor: '#FFFFFF30', border: 'none', boxShadow: 'none' } : {}}
    >
      <StatusIndicator
        projectTitle={project.title}
        className="absolute -top-3 -right-3"
      />

      <h2 className="text-[20px] leading-[1.2] font-semibold mb-3">
        {project.title}
      </h2>

      <DndContext
        sensors={sensors}
        onDragStart={(evt) => setActiveId(String(evt.active.id))}
        onDragCancel={() => setActiveId(null)}
        onDragEnd={(evt: DragEndEvent) => {
          const { active, over } = evt
          setActiveId(null)
          if (!over || active.id === over.id) return
          const fromIndex = project.todos.findIndex(t => t.id === active.id)
          const toIndex = project.todos.findIndex(t => t.id === over.id)
          if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return
          import('./lib/store').then(({ projectsStore }) => {
            projectsStore.reorderTodo(project.title, fromIndex, toIndex)
          })
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="space-y-0">
            {project.todos.map((todo) => (
              <SortableTodoItem key={todo.id} projectTitle={project.title} id={todo.id} text={todo.text} done={todo.done} />
            ))}
          </ul>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <DragOverlayItem text={project.todos.find(t => t.id === activeId)?.text ?? ''} done={project.todos.find(t => t.id === activeId)?.done ?? false} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

type SortableTodoItemProps = {
  id: string
  text: string
  done: boolean
  projectTitle: string
}

function SortableTodoItem({ id, text, done, projectTitle }: SortableTodoItemProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      onClick={() => {
        if (isDragging) return
        const selection = typeof window !== 'undefined' ? window.getSelection() : null
        if (selection && selection.toString().trim().length > 0) return
        import('./lib/store').then(({ projectsStore }) => {
          projectsStore.toggleTodo(projectTitle, id)
        })
      }}
      className={`group text-[14px] leading-[1.5] font-normal relative transition-opacity duration-150 flex items-start gap-2 p-1 rounded
        ${done ? 'line-through opacity-80' : ''} ${isDragging ? 'outline outline-dashed outline-slate-300' : ''}
        ${isDragging ? 'opacity-0' : 'opacity-100'} transition-opacity`}
    >
      <DragHandle
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className={`absolute -left-4 h-4 w-4 mt-[2px] flex-shrink-0 !cursor-grab active:cursor-grabbing select-none group-hover:opacity-100 opacity-0 transition-opacity`}
      />

      <span className={`cursor-pointer ${isDragging ? 'opacity-0' : 'opacity-100'} transition-opacity`}>{text}</span>
    </li>
  )
}

function DragOverlayItem({ text, done }: { text: string; done: boolean }) {
  return (
    <div className={`text-[14px] leading-[1.5] font-normal relative select-none flex items-start gap-2 py-2 -my-1 px-4 -mx-4 rounded bg-white shadow-md scale-[0.98] opacity-90 ${done ? 'line-through' : ''}`}>
      <span>{text}</span>
    </div>
  )
}

function DragHandle({ ...props }: React.HTMLAttributes<HTMLButtonElement> & { ref: React.Ref<HTMLButtonElement> }) {
  return (
    <button type="button" {...props}>
      <span className="sr-only">Drag handle</span>
      
      <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center text-black/40">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          <circle cx="2" cy="2" r="1" />
          <circle cx="2" cy="8" r="1" />
          <circle cx="8" cy="2" r="1" />
          <circle cx="8" cy="8" r="1" />
        </svg>
      </span>
    </button>
  );
}


