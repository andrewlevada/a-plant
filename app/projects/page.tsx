"use client"

import { useMemo } from 'react'
import ProjectCard from './ProjectCard'
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
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <AddTaskButton />
    </div>
  )
}
