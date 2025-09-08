import type { Project, ProjectStatus, Todo } from './types'

export function normalizeProjects(input: unknown): Project[] {
  if (!Array.isArray(input)) {
    throw new Error('Expected an array of projects at root')
  }
  return input.map((raw) => {
    const title = typeof (raw as any)?.title === 'string' ? (raw as any).title : ''
    if (!title) throw new Error('Project title is required')

    const rawStatus = typeof (raw as any)?.status === 'string' ? (raw as any).status : 'yellow'
    const status: ProjectStatus =
      rawStatus === 'green' || rawStatus === 'yellow' || rawStatus === 'red'
        ? rawStatus
        : 'yellow'

    const rawTodos = Array.isArray((raw as any)?.todos) ? (raw as any).todos : []
    const todos: Todo[] = rawTodos
      .map((t: unknown) => {
        if (typeof t === 'string') {
          return { text: t, done: false }
        }
        if (
          t !== null &&
          typeof t === 'object' &&
          'text' in t &&
          typeof (t as { text?: unknown }).text === 'string'
        ) {
          const text = (t as { text: string }).text
          const doneValue = (t as { done?: unknown }).done
          const done = typeof doneValue === 'boolean' ? doneValue : Boolean(doneValue)
          return { text, done }
        }
        return null
      })
      .filter((x: Todo | null): x is Todo => Boolean(x))

    return { title, status, todos }
  })
}


