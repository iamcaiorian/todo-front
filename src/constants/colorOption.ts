export const ColorOption = {
  Lime:   '#84CC16',
  Blue:   '#3B82F6',
  Purple: '#A855F7',
  Rose:   '#F43F5E',
  Orange: '#F97316',
} as const

export type ColorOption = typeof ColorOption[keyof typeof ColorOption]

export const COLOR_OPTIONS = Object.values(ColorOption) as ColorOption[]
