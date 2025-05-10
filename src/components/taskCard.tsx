import { Check, Trash, X } from 'phosphor-react'
import type { Task } from '../@types/Task'

interface Props {
    task: Task
    onToggleDone(id: number, done: boolean): void
    onEdit(task: Task): void
    onDelete(id: number): void
}

export default function TaskCard({ task, onEdit, onDelete, onToggleDone }: Props) {
    return (
        <div
            onDoubleClick={e => { e.stopPropagation(); onEdit(task) }}
            className="flex flex-col w-full bg-zinc-900 rounded-lg shadow cursor-pointer"
        >
            <div className='w-full flex justify-between items-center bg-zinc-950 py-2 px-2.5 rounded-t-lg'>
                <span className={`text-xs select-non ${task.done ? 'text-zinc-500' : 'text-zinc-300'}`}>
                    {task.deadline ? new Date(task.deadline).toLocaleDateString('pt-BR') : 'Sem prazo'}
                </span>

                <button
                    onClick={e => { e.stopPropagation(); onDelete(task.id) }}
                    className="text-zinc-400 hover:text-zinc-100"
                >
                    <Trash size={14} />
                </button>
            </div>

            <div className="w-full p-3 flex flex-col items-start space-y-1">
                <h3 className={`text-zinc-50 font-semibold ${task.done ? 'line-through text-zinc-500' : ''}`}>
                    {task.title}
                </h3>

                {task.description && (
                    <p className={`text-zinc-300 text-sm line-clamp-3 ${task.done ? 'line-through text-zinc-500' : ''}`}>
                        {task.description}
                    </p>
                )}

                <div className='w-full flex justify-end'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onToggleDone(task.id, !task.done)
                        }}
                        className="text-zinc-500 hover:text-zinc-50 cursor-pointer p-1 hover:bg-zinc-800 rounded-full"
                    >
                        {task.done
                            ? <X size={16} weight="bold" />
                            : <Check size={16} weight="bold" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
