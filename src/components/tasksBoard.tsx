import type { Task } from '../@types/Task'
import TaskCard from './taskCard'
  
const COLUMNS = [
    { id: 'high',   title: 'Alta',       headerBg: 'bg-red-900'    },
    { id: 'medium', title: 'Média',      headerBg: 'bg-yellow-900' },
    { id: 'low',    title: 'Baixa',      headerBg: 'bg-green-900'  },
    { id: 'done',   title: 'Concluídas', headerBg: 'bg-zinc-800'  },
] as const
  
interface Props {
    tasks: Task[]
    onToggleDone(id: number, done: boolean): void
    onEdit(task: Task): void
    onDelete(id: number): void
}

export default function TaskBoard({ tasks, onToggleDone, onEdit, onDelete }: Props) {
    const grouped = {
        high:   tasks.filter(t => !t.done && t.priority === 2),
        medium: tasks.filter(t => !t.done && t.priority === 1),
        low:    tasks.filter(t => !t.done && t.priority === 0),
        done:   tasks.filter(t => t.done),
    }
  
    return (
        <div>
            <div className="flex w-full justify-between overflow-x-auto">
                {COLUMNS.map(col => {
                    return (
                        <div
                            key={col.id}
                            className={`rounded-lg ${col.headerBg}`}
                        >
                            <div className="flex-1 min-w-[240px] flex flex-col">
                                <div className={`px-3 py-2 text-zinc-50 font-bold rounded-t-lg`}>
                                    {col.title}
                                </div>

                                <div
                                    className="p-3 space-y-3 h-[500px] overflow-y-auto scrollbar"
                                >
                                    {grouped[col.id].map(task => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onToggleDone={onToggleDone}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
  