import { repoV1 } from "../../../global-config";
import { gitHubApi } from "../axios/axiosClient";

import { type LanguageMetrics, type MetricsReturnType, type MetricType } from "../types/features/languageMetrics";

export const getLanguageMetrics = async (): Promise<MetricsReturnType> => {
  try {
    const { data } = await gitHubApi.get<any>(
      `${repoV1}/repos?per_page=100`
    );

    // normalized data
    const filteredData: LanguageMetrics[] = data.map((repo: any) => ({
      name: repo.name,
      language: repo.language,
    })) ?? [];

    
    // get the the frequeny total count for all the programming language 
    let totalCount = 0;
    filteredData.forEach((item: any) => {
      if(item.language){
        totalCount += 1
      }
    })

    let metrics: MetricType[] = [];

    filteredData.forEach((item: LanguageMetrics) => {
      const language = item.language;
      const languageObj = metrics.find(l => l.lang === language);
      const langExist = metrics.some(l => l.lang === language);
      

      if(language){
        const metric = {
          lang: language,
          frequencyCount: 1,
        }

        if(langExist && languageObj){

          // take the object which is languageObj
          const count = languageObj?.frequencyCount + 1
          // find the index where that language exist 
          const index = metrics.findIndex(item => item.lang === language);         
          // safe if find 
          index !== -1 && metrics.splice(
            index, 1, {...metrics[index], frequencyCount: count}
          ) 
          
        }else{
          metrics.push(metric);
        }
      }
      
    })
    
    return {
      metrics: metrics,
      total: totalCount,
    }
    
  } catch (error: any) {

    // wrap or throw a descriptive error
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

