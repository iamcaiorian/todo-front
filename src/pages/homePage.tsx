import { useEffect, useState } from 'react'
import { MagnifyingGlass, PlusCircle } from 'phosphor-react'
import { getTodolists, deleteTodolist, createTodolist, updateTodolist } from '../services/todolistService'
import type { Todolist } from '../@types/Todolist'
import type { TaskStats } from '../@types/TaskStats'
import TodolistCard from '../components/todolistCard'
import TodolistCreateUpdateModal from '../components/modals/todolistCreateUpdateModal'
import DeleteModal from '../components/modals/deleteModal'
import { getTasks } from '../services/taskServices'


export default function HomePage() {
  const [lists, setLists] = useState<Todolist[]>([])
  const [stats, setStats] = useState<Record<number, TaskStats>>({})
  const [search, setSearch] = useState('')
  const [modalList, setModalList] = useState<Todolist | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const allLists = await getTodolists()
    setLists(allLists)

    const entries = await Promise.all(
      allLists.map(async list => {
        const tasks = await getTasks(list.id)
        const total = tasks.length
        const completed = tasks.filter(t => t.done).length
        return [ list.id, { total, completed } ] as [number, TaskStats]
      })
    )
    
    const map = Object.fromEntries(entries) as Record<number, TaskStats>
    setStats(map)
  }

  const filtered = lists.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-16">
        <div className="flex items-center space-x-3">
          <img src="/src/assets/logoApp.png" className="h-16" />
        </div>

        <div className="relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='pesquisar por um "to do"'
            className="w-md px-4 py-1 bg-zinc-800 text-zinc-500 rounded-sm placeholder-zinc-500 focus:outline-none"
          />
          <MagnifyingGlass className="absolute right-3 top-2 text-zinc-500" size={16} weight='regular' />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setModalList({} as Todolist)}
          className="
            border-2
            bg-zinc-800
            border-dashed
            border-zinc-600
            rounded-lg cursor-pointer
            w-full min-h-[168px] h-full flex
            items-center
            justify-center
            text-zinc-600
            hover:border-zinc-500
            hover:text-zinc-400
          "      
        >
          <PlusCircle size={48} weight='fill'/>
        </button>

        {filtered.map(list => {
          const s = stats[list.id] || { total: 0, completed: 0 }
          return (
            <TodolistCard
              key={list.id}
              todolist={list}
              completedCount={s.completed}
              totalCount={s.total}
              onClick={() => window.location.href = `/todolists/${list.id}`}
              onEdit={() => setModalList(list)}
              onDelete={() => setDeleteId(list.id)}
            />
          )
        })}
      </div>

      <TodolistCreateUpdateModal
        isOpen={!!modalList}
        initialData={modalList!}
        onSave={async data => {
          if (modalList?.id) {
            await updateTodolist(modalList.id, data)
          } else {
            await createTodolist(data)
          }
          setModalList(null)
          await load()
        }}
        onClose={() => setModalList(null)}
      />

      <DeleteModal
        isOpen={deleteId !== null}
        message='Você realmente deseja apagar essa lista?'
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) await deleteTodolist(deleteId)
          setDeleteId(null)
          load()
        }}
      />
    </div>
  )
}