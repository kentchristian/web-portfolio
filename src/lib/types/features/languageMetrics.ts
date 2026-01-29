
export type LanguageMetrics = {
  name: string;
  language: string | null;
}

export type ReducerType = {
  [lang: string]: number
}


// for hook
export type ReturnType = {
  data: LanguageMetrics[] | undefined,
  isLoading: boolean,
  isError: boolean,
  status: 'pending' | 'error' | 'success',
}
