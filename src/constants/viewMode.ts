export const VIEW_MODE = {
    List: 'list',
    Board: 'board',
  } as const
  
  export type ViewMode = typeof VIEW_MODE[keyof typeof VIEW_MODE]