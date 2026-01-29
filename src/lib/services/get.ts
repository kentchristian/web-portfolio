import { gitHubApi } from "../axios/axiosClient";
import { type LanguageMetrics } from "../types/features/languageMetrics";



export const getLanguageMetrics = async (): Promise<LanguageMetrics[]> => {
  try {
    const { data } = await gitHubApi.get<LanguageMetrics[]>(
     `/repos?per_page=100`
    );

    return data.map((repo: any) => ({
      name: repo.name,
      language: repo.language,
    }));
  } catch (error: any) {

    // wrap or throw a descriptive error
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};