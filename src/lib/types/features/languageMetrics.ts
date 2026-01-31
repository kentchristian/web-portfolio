
export type LanguageMetrics = {
  name: string;
  language: string;
}

export type ReducerType = {
  [lang: string]: number
}


// for hook
export type QueryReturnType = {
  data: MetricsReturnType;
  isLoading: boolean,
  isError: boolean,
  status: 'pending' | 'error' | 'success',
}


export type MetricType = {
  lang: string;
  frequencyCount: number;
}
export type MetricsReturnType = {
  metrics: MetricType[];
  total: number;
}
