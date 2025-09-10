"use client"

import { useEffect, useMemo, useState } from 'react'
import type { Project, ProjectStatus } from './lib/types'
import { normalizeProjects } from './lib/normalization'
import DataEditorModal from './DataEditorModal'
import AddTaskButton from './AddTaskButton'
import ClearDoneButton from './ClearDoneButton'
import TaskCreateModal from './TaskCreateModal'
import { useToast } from '../components/toast/useToast'
import { addTodoToProjects } from './lib/todos'

const STORAGE_KEY = 'projectsData'

function statusToBg(status: ProjectStatus): string {
  if (status === 'green') return 'bg-green-600'
  if (status === 'yellow') return 'bg-yellow-600'
  return 'bg-red-600'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editorValue, setEditorValue] = useState('')
  const [editorError, setEditorError] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { showToast } = useToast()

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      const normalized = normalizeProjects(parsed)
      setProjects(normalized)
    } catch {
      // ignore invalid storage
    }
  }, [])

  const saveProjects = (next: Project[]) => {
    setProjects(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      alert('Sorry, free space in the localStorage has run out. Try deleting some of the tasks or projects')
    }
  }

  const toggleTodo = (projectTitle: string, todoId: string) => {
    const next = projects.map((project) => {
      if (project.title !== projectTitle) return project
      return {
        ...project,
        todos: project.todos.map((t) => (t.id === todoId ? { ...t, done: !t.done } : t)),
      }
    })
    saveProjects(next)
  }

  const openEditor = () => {
    setEditorError('')
    setEditorValue(JSON.stringify(projects, null, 2))
    setIsModalOpen(true)
  }

  const closeEditor = () => {
    setIsModalOpen(false)
  }

  const doneCount = useMemo(() => {
    return projects.reduce((count, project) => count + project.todos.filter((t) => t.done).length, 0)
  }, [projects])

  const clearDone = () => {
    if (doneCount === 0) return
    const next = projects.map((project) => ({
      ...project,
      todos: project.todos.filter((t) => !t.done),
    }))
    saveProjects(next)
    showToast(`Ah, a new day! ${doneCount} less todos. Time to get to work`)
  }

  const sortedProjects = useMemo(() => {
    const rank = { red: 0, yellow: 1, green: 2 } as const
    return projects.slice().sort((a, b) => rank[a.status] - rank[b.status])
  }, [projects])

  return (
    <div
      className="px-20 sm:px-20 md:px-20 py-20 bg-[#B5A897] min-h-screen"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="w-full flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={openEditor}
              className="text-[14px] px-3 py-1.5 rounded-md border border-black/20 bg-white text-slate-800 hover:bg-white/80 active:bg-white/70 transition-colors"
            >
              Edit data
            </button>
            
            <ClearDoneButton onClick={clearDone} disabled={doneCount === 0} />
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {sortedProjects.map((project) => (
            <div
              key={project.title}
              className="relative w-full sm:w-[260px] bg-white text-slate-900 rounded-lg shadow-s p-5 overflow-visible"
              style={(project.todos.length == 0) ? { backgroundColor: '#FFFFFF30', border: 'none', boxShadow: 'none' } : {}}
            >
              <div
                className={`absolute -top-3 -right-3 h-10 w-10 ${statusToBg(
                  project.status,
                )} rotate-[-8deg] rounded-md`}
                aria-hidden="true"
              />

              <h2 className="text-[20px] leading-[1.2] font-semibold mb-3">
                {project.title}
              </h2>

              <ul className="space-y-1.5">
                {project.todos.map((todo) => (
                  <li
                    key={todo.id}
                    onClick={() => toggleTodo(project.title, todo.id)}
                    className={`text-[14px] leading-[1.5] font-normal relative cursor-pointer select-none transition-opacity duration-150 ${todo.done ? 'line-through opacity-80' : ''}`}
                  >
                    {todo.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <DataEditorModal
          isOpen={isModalOpen}
          initialValue={editorValue}
          errorMessage={editorError}
          onClose={closeEditor}
          onSave={(val) => {
            setEditorError('')
            try {
              const parsed = JSON.parse(val)
              const normalized = normalizeProjects(parsed)
              saveProjects(normalized)
              setIsModalOpen(false)
            } catch (err: unknown) {
              const message = (err as { message?: unknown })?.message
              setEditorError(typeof message === 'string' ? message : 'Invalid JSON')
            }
          }}
        />
      )}

      <TaskCreateModal
        isOpen={isCreateOpen}
        projects={sortedProjects}
        onClose={() => setIsCreateOpen(false)}
        onCreate={(projectTitle, text) => {
          const next = addTodoToProjects(projects, projectTitle, text)
          saveProjects(next)
          setIsCreateOpen(false)
          showToast('Created the task 🤍')
        }}
      />

      <AddTaskButton onClick={() => setIsCreateOpen(true)} />
    </div>
  )
}
