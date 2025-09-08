export type ProjectStatus = 'green' | 'yellow' | 'red'

export type Todo = {
  text: string
  done: boolean
}

export type Project = {
  title: string
  status: ProjectStatus
  todos: Todo[]
}


