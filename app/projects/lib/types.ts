export type Project = {
  title: string
  status: ProjectStatus
  todos: Todo[]
}

export type ProjectStatus = 'green' | 'yellow' | 'red'

export type Todo = {
  id: string
  text: string
  done: boolean
}
