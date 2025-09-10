import { generateId } from './todos'
import type { Project, ProjectStatus, Todo } from './types'

export function normalizeProjects(input: unknown): Project[] {
  if (!Array.isArray(input)) {
    throw new Error('Expected an array of projects at root')
  }

  return input.map((raw) => {
    const title = typeof (raw)?.title === 'string' ? (raw).title : ''
    if (!title) throw new Error('Project title is required')

    const rawStatus = typeof (raw)?.status === 'string' ? (raw).status : 'yellow'
    const status: ProjectStatus =
      rawStatus === 'green' || rawStatus === 'yellow' || rawStatus === 'red'
        ? rawStatus
        : 'yellow'

    const rawTodos = Array.isArray((raw)?.todos) ? (raw).todos : []
    const todos: Todo[] = rawTodos
      .map((t: unknown) => {
        if (typeof t === 'string') {
          return { id: '', text: t, done: false }
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
          const maybeId = (t as { id?: unknown }).id
          const id = typeof maybeId === 'string' ? maybeId : ''
          return { id, text, done }
        }

        return null
      })
      .filter((x: Todo | null): x is Todo => Boolean(x)) // filter out nulls from the previous step
      .map(fillInMissingId)

    return { title, status, todos }
  })
}

function fillInMissingId(todo: Todo): Todo {
  return { ...todo, id: todo.id && todo.id.length > 0 ? todo.id : generateId() }
}


