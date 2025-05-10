export const PriorityOption = {
    Baixa: 0 as const,
    Media: 1 as const,
    Alta:  2 as const,
}

export type PriorityOption = typeof PriorityOption[keyof typeof PriorityOption]

export const PRIORITY_OPTIONS = [
    PriorityOption.Baixa,
    PriorityOption.Media,
    PriorityOption.Alta,
] as const

export const PRIORITY_LABELS: Record<PriorityOption, string> = {
    [PriorityOption.Baixa]: 'Baixa',
    [PriorityOption.Media]: 'Média',
    [PriorityOption.Alta]:  'Alta',
}
