
export type LanguageMetrics = {
  name: string;
  language: string | null;
}

export type ReducerType = {
  [lang: string]: number
}


// for hook
export type ReturnType = {
  data: QueryReturnType | undefined,
  isLoading: boolean,
  isError: boolean,
  status: 'pending' | 'error' | 'success',
}

export type QueryReturnType = {
  metrics: Record<string, number>,
  total: number,
}