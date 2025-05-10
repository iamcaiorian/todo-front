import { api } from '../utils/axios'
import type { Todolist } from '../@types/Todolist'

export const getTodolists = (): Promise<Todolist[]> =>
  api.get('/todolists').then(res => res.data)

export const getTodolist = (id: number): Promise<Todolist> =>
  api.get(`/todolists/${id}`).then(res => res.data)

export const createTodolist = (data: Partial<Todolist>): Promise<Todolist> =>
  api.post('/todolists', { todolist: data }).then(res => res.data)

export const updateTodolist = (id: number, data: Partial<Todolist>): Promise<Todolist> =>
  api.patch(`/todolists/${id}`, { todolist: data }).then(res => res.data)

export const deleteTodolist = (id: number): Promise<void> =>
  api.delete(`/todolists/${id}`).then(() => {})