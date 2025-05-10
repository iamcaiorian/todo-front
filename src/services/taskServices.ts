import { api } from '../utils/axios'
import type { Task } from '../@types/Task'

export const getTasks = (todolistId: number): Promise<Task[]> =>
  api.get(`/todolists/${todolistId}/tasks`).then(res => res.data)

export const getTask = (id: number): Promise<Task> =>
  api.get(`/tasks/${id}`).then(res => res.data)

export const createTask = (payload: Partial<Task> & { todolist_id: number }): Promise<Task> =>
  api.post('/tasks', { task: payload }).then(res => res.data)

export const updateTask = (id: number, payload: Partial<Task>): Promise<Task> =>
  api.patch(`/tasks/${id}`, { task: payload }).then(res => res.data)

export const deleteTask = (id: number): Promise<void> =>
  api.delete(`/tasks/${id}`).then(() => {})