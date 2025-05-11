import { useState } from 'react'
import { PencilSimple, Trash } from 'phosphor-react'
import type { Task } from '../@types/Task'

interface Props {
  task: Task
  onToggleDone(id: number, done: boolean): void
  onEdit(task: Task): void
  onDelete(id: number): void
}

const PRIORITY_BG = ['bg-green-600','bg-yellow-500','bg-red-600']
const PRIORITY_LABEL = ['Baixa','Média','Alta']

export default function TaskRow({
  task,
  onToggleDone,
  onEdit,
  onDelete,
}: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setExpanded(e => !e)}
        className={`
          flex items-center justify-between
          bg-zinc-800
          p-4 cursor-pointer
          hover:shadow-md transition-shadow
          hover:bg-zinc-700
          ${expanded ? 'rounded-t-md' : 'rounded-md'}
        `}
      >
        <div className="flex items-center space-x-5">
          <input
            type="checkbox"
            checked={task.done}
            onClick={e => e.stopPropagation()}
            onChange={e => onToggleDone(task.id, e.target.checked)}
            className="w-4 h-4 text-sky-500 border-2 border-sky-500 rounded-sm cursor-pointer"
          />

          <span className={`
            px-2 py-0.5 text-xs font-semibold text-zinc-50 rounded-full
            ${PRIORITY_BG[task.priority]}
          `}>
            {PRIORITY_LABEL[task.priority]}
          </span>

          <span className={`
            ${task.done ? 'line-through text-zinc-500 text-lg' : 'text-zinc-50 text-lg'}
            truncate max-w-[600px]
          `}>
            {task.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {task.deadline && (
            <span className="text-zinc-400 text-sm select-none">
              {new Date(task.deadline).toLocaleDateString('pt-BR')}
            </span>
          )}

          <button
            onClick={e => { e.stopPropagation(); onEdit(task) }}
            className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
          >
            <PencilSimple size={18} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); onDelete(task.id) }}
            className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="
          bg-zinc-700 text-zinc-50
          px-4 py-4
          rounded-b-md
          border-t border-zinc-600
          text-sm font-medium
          whitespace-pre-wrap break-words
        ">
          {task.description || "*Adicione uma descrição na sua tarefa.*"}
        </div>
      )}
    </div>
  )
}
