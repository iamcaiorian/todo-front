interface Props {
  isOpen: boolean
  message: string
  onCancel(): void
  onConfirm(): void
}

export default function DeleteModal({ isOpen, message, onCancel, onConfirm }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-sm bg-zinc-800 rounded-lg p-4">
        <p className="text-white text-xl font-semibold mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-zinc-500 text-zinc-50 rounded hover:bg-zinc-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-700 text-zinc-50 rounded hover:bg-red-800 cursor-pointer"
          >
            Apagar
          </button>
        </div>
      </div>
    </div>
  )
}