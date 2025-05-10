import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Task } from '../../@types/Task'
import { PriorityOption, PRIORITY_OPTIONS, PRIORITY_LABELS } from '../../constants/priorityOption'

interface Form {
  title: string
  description?: string
  deadline?: string
  priority: 0 | 1 | 2
}

interface Props {
  isOpen: boolean
  initialData?: Task
  onSave(data: Form): Promise<void>
  onClose(): void
}

export default function TaskCreateUpdateModal({ isOpen, initialData, onSave, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      title:       '',
      description: '',
      deadline:    undefined,
      priority:    PriorityOption.Media,
    },
  })

  useEffect(() => {
    if (initialData?.id) {
      reset({
        title:       initialData.title,
        description: initialData.description ?? '',
        deadline:    initialData.deadline?.split('T')[0],
        priority:    initialData.priority as PriorityOption,
      })
    } else {
      reset({
        title:       '',
        description: '',
        deadline:    undefined,
        priority:    PriorityOption.Media,
      })
    }
  }, [initialData, reset])

  if (!isOpen) return null

  const selectedPriority = watch('priority')

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSave)}
        className="w-full max-w-md bg-zinc-800 rounded-lg p-4 relative"
      >
        <h2 className="text-zinc-50 text-2xl mb-6">
          {initialData ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>

        <label className="block mb-4 text-zinc-50">
          Título *
          <input
            {...register('title', { required: 'Título obrigatório' })}
            className="mt-1 w-full bg-transparent border border-zinc-400 rounded px-3 py-2 text-zinc-50 placeholder-zinc400"
            placeholder="Título"
          />
          {errors.title && (
            <p className="text-rose-400 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </label>

        <label className="block mb-4 text-zinc-50">
          Descrição
          <textarea
            {...register('description')}
            className="mt-1 w-full bg-transparent border border-zinc-400 rounded px-3 py-2 text-zinc-50 placeholder-zinc400 h-24"
            placeholder="Descrição"
          />
        </label>

        <label className="block mb-4 text-zinc-50">
          Prazo
          <input
            type="date"
            {...register('deadline')}
            className="mt-1 w-full bg-transparent border border-zinc-400 rounded px-3 py-2 text-zinc-50"
          />
        </label>

        <label className="block mb-6 text-zinc-50">
          Prioridade *
          <div className="mt-2 flex items-center space-x-3">
            {PRIORITY_OPTIONS.map(prio => {
              const isSelected = selectedPriority === prio
              const base = 'px-3 py-1 rounded-full border-2 font-semibold transition'
              const active  = {
                [PriorityOption.Baixa]:  'bg-green-700 border-green-700 text-zinc-50',
                [PriorityOption.Media]:  'bg-yellow-500 border-yellow-500 text-zinc-50',
                [PriorityOption.Alta]:   'bg-red-700 border-red-700 text-zinc-50',
              }[prio]
              const inactive = {
                [PriorityOption.Baixa]:  'border-green-700 text-green-700 bg-green-700/28',
                [PriorityOption.Media]:  'border-yellow-500 text-yellow-500 bg-yellow-500/28',
                [PriorityOption.Alta]:   'border-red-700 text-red-700 bg-red-700/28',
              }[prio]

              return (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setValue('priority', prio)}
                  className={`${base} ${
                    isSelected ? active : inactive
                  }`}
                >
                  {PRIORITY_LABELS[prio]}
                </button>
              )
            })}
          </div>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-500 text-zinc-50 rounded hover:bg-zinc-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 text-zinc-50 rounded hover:bg-sky-700 cursor-pointer"
          >
            {initialData ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  )
}