export interface Todolist {
    id: number
    title: string
    subtitle?: string
    color?: string
    tasks: { done: boolean }[]
    created_at?: string
    updated_at?: string
}
  