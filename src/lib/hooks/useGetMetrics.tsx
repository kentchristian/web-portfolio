import { useQuery } from "@tanstack/react-query";
import { type MetricsReturnType, type QueryReturnType } from "../types/features/languageMetrics";
import { getLanguageMetrics } from "../services/get";

export const useGetMetrics = (): QueryReturnType => {
  
  
  const { data, isLoading, isError, status } = useQuery<
    MetricsReturnType,
    Error
  >({
    queryKey: ['github-language-metrics'],
    queryFn: () => getLanguageMetrics(),
    enabled: true,
    staleTime: 1000 * 60 * 10,
  })

  return { 
    data: data ?? { 
      metrics: [],
      total: 0,
    },
  isLoading, isError, status}
}



//return 
