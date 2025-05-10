export interface Task {
    id: number
    title: string
    description?: string
    deadline?: string
    done: boolean
    priority: number
    todolist_id: number
    created_at?: string
    updated_at?: string
}