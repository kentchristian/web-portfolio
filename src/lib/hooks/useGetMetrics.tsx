import { useQuery } from "@tanstack/react-query";
import { type MetricsReturnType, type QueryReturnType } from "../types/features/languageMetrics";
import { getLanguageMetrics } from "../services/get";

export const useGetMetrics = (): QueryReturnType => {
  
  
  const { data, isLoading, isError, status} = useQuery<MetricsReturnType, Error>({ 
  queryKey: ['todos'], 
  queryFn:  () => getLanguageMetrics(),
  enabled: true,
 })

  return { 
    data: data ?? { 
      metrics: [],
      total: 0,
    },
  isLoading, isError, status}
}



//return 