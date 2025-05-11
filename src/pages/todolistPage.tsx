import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CaretDown, CaretLeft, Check, Layout, ListDashes, Plus } from 'phosphor-react'
import { getTasks, updateTask, deleteTask, createTask } from '../services/taskServices'
import type { Todolist } from '../@types/Todolist'
import type { Task } from '../@types/Task'
import TaskRow from '../components/taskRow'
import TaskCreateUpdateModal from '../components/modals/taskCreateUpdateModal'
import DeleteModal from '../components/modals/deleteModal'
import { getTodolist } from '../services/todolistService'
import { PriorityOption, PRIORITY_OPTIONS, PRIORITY_LABELS } from '../constants/priorityOption'
import { VIEW_MODE } from '../constants/viewMode'
import type { ViewMode } from '../constants/viewMode'
import TaskBoard from '../components/tasksBoard'

export default function TodolistPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()

  const [todolist, setTodolist] = useState<Todolist | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE.List)
  const [modalTask, setModalTask] = useState<Task | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<PriorityOption | null>(null)
  const completedCount = tasks.filter(t => t.done).length
  const totalCount = tasks.length

  useEffect(() => {
    if (!id) return
    load()
  }, [id])

  async function load() {
    const list = await getTodolist(Number(id))
    setTodolist(list)

    const ts = await getTasks(+id!)
    setTasks(ts)
  }

  const visibleTasks = tasks
    .filter(t => priorityFilter === null || t.priority === priorityFilter)
    .sort((a, b) => {
      if (a.done === b.done) return 0
      return a.done ? 1 : -1
    })
 

  return (
    <div className="p-6">
      <div className='w-full flex items-center mb-16 justify-between'>
        <div>
          <img src="/src/assets/logoApp.png" className="h-16" />
        </div>

        <button
          onClick={() =>
            setViewMode(m => m === VIEW_MODE.List ? VIEW_MODE.Board : VIEW_MODE.List)
          }
          className="text-zinc-50 hover:bg-zinc-800 p-2 rounded-sm cursor-pointer"
          title={viewMode === VIEW_MODE.List ? 'Mudar para visualização em quadros' : 'Mudar para visualização em lista'}
        >
          {viewMode === VIEW_MODE.List
            ? <Layout size={24} weight='regular' />
            : <ListDashes size={24} weight='regular' />
          }
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className='flex items-center  py-2 gap-4'>
          <button onClick={() => nav(-1)} className="text-zinc-50 hover:text-zinc-300">
            <CaretLeft size={20} weight="bold" />
          </button>

          <h1 className="text-3xl font-bold text-zinc-50 truncate max-w-[480px]">
            { todolist?.title }
          </h1>

          <span className="flex items-center bg-zinc-700 text-zinc-50 text-xs font-bold rounded-full h-6 px-4">
            {completedCount}/{totalCount}
          </span>
        </div>

          <div className="flex items-center space-x-3">
            {viewMode === VIEW_MODE.List && (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 bg-transparent border-2 text-zinc-50 px-4 py-2 rounded hover:bg-zinc-800 cursor-pointer"
                  type="button"
                >
                  <span>
                    {priorityFilter === null
                      ? 'Todas'
                      : PRIORITY_LABELS[priorityFilter]}
                  </span>
                  <CaretDown
                    size={16}
                    weight="bold"
                    className="transform transition-transform duration-250 group-hover:-rotate-180"
                  />
                </button>

                <ul className="
                    absolute right-0 w-40 bg-zinc-800 border border-zinc-700 rounded shadow-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                    transition-opacity duration-150
                ">
                  <li>
                    <button
                      onClick={() => setPriorityFilter(null)}
                      className="w-full text-left text-zinc-50 px-4 py-2 hover:bg-zinc-700"
                    >
                      Todas
                    </button>
                  </li>
            
                  {PRIORITY_OPTIONS.map(prio => (
                    <li key={prio}>
                      <button
                        onClick={() => setPriorityFilter(prio)}
                        className="w-full text-zinc-50 flex items-center justify-between px-4 py-2 hover:bg-zinc-700"
                      >
                        <span>{PRIORITY_LABELS[prio]}</span>
                        {priorityFilter === prio && <span><Check size={14} weight="bold" /></span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setModalTask({} as Task)}
              className="flex items-center space-x-2 bg-sky-600 text-zinc-50 px-4 py-2 rounded hover:bg-sky-700 cursor-pointer"
            >
              <span>Tarefa</span> <Plus size={20} weight='bold' />
            </button>
          </div>
      </div>

      {viewMode === VIEW_MODE.List ? (
        <div className="space-y-3">
          {visibleTasks.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              onToggleDone={async (tid, done) => {
                await updateTask(tid, { done })
                setTasks(prev =>
                  prev.map(t =>
                    t.id === tid
                      ? { ...t, done }
                      : t
                  )
                )
              }}
              onEdit={t => setModalTask(t)}
              onDelete={tid => setDeleteId(tid)}
            />
          ))}
        </div>
      ) : (
        <TaskBoard
          tasks={tasks}
          onEdit={t => setModalTask(t)}
          onDelete={tid => setDeleteId(tid)} 
          onToggleDone={async (id: number, done: boolean) => {
            await updateTask(id, { done })
            setTasks(prev =>
              prev.map(task =>
                task.id === id ? { ...task, done } : task
              )
            )
          }}
        />
      ) }

      <TaskCreateUpdateModal
        isOpen={!!modalTask}
        initialData={modalTask!}
        onSave={async formData => {
          if (modalTask?.id) {
            await updateTask(modalTask.id, formData)
          } else {
            await createTask({ ...formData, todolist_id: Number(id) })
          }
          setModalTask(null)  
          await load()
        }}
        onClose={() => setModalTask(null)}
      />

      <DeleteModal
        isOpen={deleteId !== null}
        message='Você realmente deseja apagar essa tarefa?'
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) await deleteTask(deleteId)
          setDeleteId(null)
          load()
        }}
      />
    </div>
  )
}