import FrequenceScore from "../../common/FrequencyScore";
import { useGetMetrics } from "../../lib/hooks/useGetMetrics";
import type { MetricType } from "../../lib/types/features/languageMetrics";
import { getAverage } from "../../lib/utils/computations/getAverage";
import CardContainer from "../containers/CardContainer";

const LanguageMetrics = () => {

  const { data, isLoading, status } = useGetMetrics();

  const total = data?.total;

  return (
    <CardContainer
      loading={{
        isLoading: status === 'pending' || isLoading,
      }}
      empty={{
        isEmpty: !data
      }}
      className="p-4 flex flex-col gap-2 w-full h-50 justify-center items-center">
      {data?.metrics?.map((item: MetricType) => (
        <FrequenceScore
          label={item.lang}
          average={getAverage(item.frequencyCount, total)}
          id={item.lang}
        />
      ))}
    </CardContainer>

  )
}

export default LanguageMetrics