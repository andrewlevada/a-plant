import type { Project, Todo } from './types'

export function generateId(prefix: string = 'todo'): string {
  const rand = Math.random().toString(36).slice(2, 10)
  const time = Date.now().toString(36)
  
  return `${prefix}-${time}-${rand}`
}

export function addTodoToProjects(projects: Project[], projectTitle: string, text: string): Project[] {
  const id = generateId('todo')
  const newTodo: Todo = { id, text, done: false }

  return projects.map((p) => {
    if (p.title !== projectTitle) return p
    return { ...p, todos: [...p.todos, newTodo] }
  })
}

export function toggleTodoById(projects: Project[], projectTitle: string, todoId: string): Project[] {
  return projects.map((p) => {
    if (p.title !== projectTitle) return p

    return {
      ...p,
      todos: p.todos.map((t) => (t.id === todoId ? { ...t, done: !t.done } : t)),
    }
  })
}


