import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Todolist } from '../../@types/Todolist'
import { ColorOption, COLOR_OPTIONS } from '../../constants/colorOption' 

interface Form {
  title: string
  subtitle?: string
  color?: string
}

interface Props {
  isOpen: boolean
  initialData?: Todolist
  onSave(data: Form): Promise<void>
  onClose(): void
}

export default function TodolistCreateUpdateModal({ isOpen, initialData, onSave, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      title:    '',
      subtitle: '',
      color:    COLOR_OPTIONS[0],
    },
  })

  useEffect(() => {
    if (initialData?.id) {
      reset({
        title:    initialData.title,
        subtitle: initialData.subtitle ?? '',
        color:    initialData.color as ColorOption,
      })
    } else {
      reset({
        title:    '',
        subtitle: '',
        color:    COLOR_OPTIONS[0],
      })
    }
  }, [initialData, reset])

  if (!isOpen) return null

  const selectedColor = watch('color')

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSave)}
        className="w-full max-w-md bg-zinc-800 rounded-lg p-4 relative"
      >
        <h2 className="text-zinc-50 text-2xl mb-6">
          {initialData?.title ? 'Editar Lista' : 'Nova Lista'}
        </h2>

        <label className="block mb-4 text-zinc-50">
          Título *
          <input
            {...register('title', { required: 'Título obrigatório' })}
            className="mt-1 w-full bg-transparent border border-zinc-400 rounded px-3 py-2 text-zinc-50 placeholder-zinc-400"
            placeholder="Título"
          />
          {errors.title && (
            <p className="text-rose-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </label>

        <label className="block mb-4 text-zinc-50">
          Subtítulo
          <input
            {...register('subtitle')}
            className="mt-1 w-full bg-transparent border border-zinc-400 rounded px-3 py-2 text-zinc-50 placeholder-zinc-400"
            placeholder="Subtítulo"
          />
        </label>

        <label className="block mb-6 text-zinc-50">
          Cor
          <div className="flex items-center space-x-3">
            {COLOR_OPTIONS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setValue('color', color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? 'border-white'
                    : 'border-transparent hover:border-zinc-500'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
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
            {initialData?.title ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  )
}