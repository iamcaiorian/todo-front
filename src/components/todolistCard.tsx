import { PencilSimple, Trash } from 'phosphor-react'
import type { Todolist } from '../@types/Todolist'

interface Props {
  todolist: Todolist
  completedCount: number
  totalCount: number
  onClick(): void
  onEdit(): void
  onDelete(): void
}

export default function TodolistCard({ todolist, completedCount, totalCount, onClick, onEdit, onDelete }: Props) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-lg
        overflow-hidden
        shadow-lg
        hover:shadow-xl
        bg-zinc-800
        transition-transform
        duration-200
        ease-out
        hover:-translate-y-1
        flex
        flex-col
        h-full
      "
    >
      <div
        className="h-10 flex justify-end pr-2"
        style={{ backgroundColor: todolist.color }}
      >
        <button
          onClick={e => { e.stopPropagation(); onEdit() }}
          className="text-zinc-50 hover:text-zinc-400 mr-2 cursor-pointer"
        >
          <PencilSimple size={18} />
        </button>

        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          className="text-zinc-50 hover:text-zinc-400 cursor-pointer"
        >
          <Trash size={18} />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-zinc-50 text-xl font-semibold mb-1 truncate">
            {todolist.title}
          </h3>
          {todolist.subtitle && (
            <p className="text-zinc-200 text-sm line-clamp-2 break-words">
              {todolist.subtitle}
            </p>
          )}
        </div>

        <div className='pt-2 flex justify-end'>
          <span className=" bg-zinc-700 text-zinc-50 px-3 py-1 text-xs font-bold rounded-full">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>
    </div>
  )
}
