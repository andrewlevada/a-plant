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

export function areThereActiveTodos(project: Project): boolean {
  if (project.todos.length === 0) return false
  return project.todos.some((t) => !t.done)
}

export function reorderTodosWithinProject(
  projects: Project[],
  projectTitle: string,
  fromIndex: number,
  toIndex: number,
): Project[] {
  if (fromIndex === toIndex) return projects

  return projects.map((p) => {
    // skipping until we find the target project
    if (p.title !== projectTitle) return p

    const nextTodos = p.todos.slice()
    const [moved] = nextTodos.splice(fromIndex, 1)
    if (!moved) return p
    
    const clampedTo = Math.max(0, Math.min(toIndex, nextTodos.length))
    nextTodos.splice(clampedTo, 0, moved)
    return { ...p, todos: nextTodos }
  })
}


