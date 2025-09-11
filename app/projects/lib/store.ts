"use client"

import { useRef, useSyncExternalStore } from 'react'
import { normalizeProjects } from './normalization'
import type { Project, ProjectStatus } from './types'
import { addTodoToProjects, areThereActiveTodos, toggleTodoById } from './todos'

const STORAGE_KEY = 'projectsData'

type Listener = () => void

class ProjectsStore {
  private projects: Project[] = []
  private listeners: Set<Listener> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getSnapshot = (): Project[] => {
    return this.projects
  }

  private emit() {
    for (const l of this.listeners) l()
  }

  private persist(next: Project[]) {
    this.projects = next
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      alert('Sorry, free space in the localStorage has run out. Try deleting some of the tasks or projects')
    }
    this.emit()
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      const normalized = normalizeProjects(parsed)
      this.projects = normalized
      this.emit()
    } catch {
      // ignore invalid storage
    }
  }

  setAll(projects: Project[]) {
    this.persist(projects)
  }

  addTodo(projectTitle: string, text: string) {
    const next = addTodoToProjects(this.projects, projectTitle, text)
    this.persist(next)
  }

  toggleTodo(projectTitle: string, todoId: string) {
    const next = toggleTodoById(this.projects, projectTitle, todoId)
    this.persist(next)
  }

  clearDone(): number {
    const doneCount = this.projects.reduce((count, p) => count + p.todos.filter(t => t.done).length, 0)
    if (doneCount === 0) return 0
    const next = this.projects.map(p => ({ ...p, todos: p.todos.filter(t => !t.done) }))
    this.persist(next)
    return doneCount
  }

  setProjectStatus(projectTitle: string, nextStatus: ProjectStatus) {
    const next = this.projects.map(p => (p.title === projectTitle ? { ...p, status: nextStatus } : p))
    this.persist(next)
  }

  areThereActiveTodos(projectTitle: string): boolean {
    const project = this.projects.find(p => p.title === projectTitle)
    if (!project) return false
    return areThereActiveTodos(project)
  }
}

export const projectsStore = new ProjectsStore()

const EMPTY_PROJECTS: Project[] = []
const getServerSnapshot = (): Project[] => EMPTY_PROJECTS

export function useProjects(): Project[] {
  const subscribeRef = useRef(projectsStore.subscribe)
  const getSnapshotRef = useRef(projectsStore.getSnapshot)
  // useSyncExternalStore ensures correct behavior across SSR/CSR
  return useSyncExternalStore(subscribeRef.current, getSnapshotRef.current, getServerSnapshot)
}


