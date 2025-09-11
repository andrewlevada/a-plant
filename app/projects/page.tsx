"use client"

import { useMemo } from 'react'
import StatusIndicator from './StatusIndicator'
import ClearDoneButton from './ClearDoneButton'
import AddTaskButton from './AddTaskButton'
import EditDataButton from './EditDataButton'
import { useProjects } from './lib/store'

export default function ProjectsPage() {
  const projects = useProjects()

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
        <div className="w-full flex items-center gap-3 justify-center mb-6">
          <EditDataButton />
          <ClearDoneButton />
        </div>

        <div className="flex flex-wrap gap-5">
          {sortedProjects.map((project) => (
            <div
              key={project.title}
              className="relative w-full sm:w-[260px] bg-white text-slate-900 rounded-lg shadow-s p-5 overflow-visible"
              style={project.todos.length === 0 || project.todos.every(t => t.done) ? { backgroundColor: '#FFFFFF30', border: 'none', boxShadow: 'none' } : {}}
            >
              <StatusIndicator
                projectTitle={project.title}
                className="absolute -top-3 -right-3"
              />

              <h2 className="text-[20px] leading-[1.2] font-semibold mb-3">
                {project.title}
              </h2>

              <ul className="space-y-1.5">
                {project.todos.map((todo) => (
                  <li
                    key={todo.id}
                    onClick={() => {
                      // direct import safe in client
                      import('./lib/store').then(({ projectsStore }) => {
                        projectsStore.toggleTodo(project.title, todo.id)
                      })
                    }}
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

      <AddTaskButton />
    </div>
  )
}
