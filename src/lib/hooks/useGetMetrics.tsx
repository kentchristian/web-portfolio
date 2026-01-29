import { useQuery } from "@tanstack/react-query";
import { type LanguageMetrics, type ReturnType } from "../types/features/languageMetrics";
import { getLanguageMetrics } from "../services/get";

export const useGetMetrics = (): ReturnType => {
  
  
  const { data, isLoading, isError, status} = useQuery<LanguageMetrics[], Error>({ 
  queryKey: ['todos'], 
  queryFn:  () => getLanguageMetrics(),
  enabled: true,
 })

  return { data, isLoading, isError, status}
}



//return 