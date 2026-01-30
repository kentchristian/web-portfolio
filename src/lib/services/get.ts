import { repoV1 } from "../../../global-config";
import { gitHubApi } from "../axios/axiosClient";
import { type LanguageMetrics, type QueryReturnType, type ReducerType } from "../types/features/languageMetrics";



export const getLanguageMetrics = async (): Promise<QueryReturnType> => {
  try {
    const { data } = await gitHubApi.get<any>(
      `${repoV1}/repos?per_page=100`
    );

    // normalized data
    const filteredData = data.map((repo: any) => ({
      name: repo.name,
      language: repo.language,


    })) ?? [];


    // get frequency per language
    const metrics = filteredData.reduce((acc: Record<string, number>, item: LanguageMetrics) => {
      const lang = item.language;
      lang
        ? (acc[lang] = (acc[lang] || 0) + 1)
        : null

      return acc;
    }, {} as ReducerType)


    // over all sum all languages' value
    let sum = 0; 
    Object.entries(metrics).forEach(([_key, value]) => {
      sum += Number(value);
    })

    // return the processed data 
    return {
      metrics,
      total: sum,
    }

  } catch (error: any) {

    // wrap or throw a descriptive error
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};