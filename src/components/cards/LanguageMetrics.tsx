import FrequenceScore from "../../common/FrequencyScore";
import { useGetMetrics } from "../../lib/hooks/useGetMetrics";
import type { MetricType } from "../../lib/types/features/languageMetrics";
import { getAverage } from "../../lib/utils/computations/getAverage";
import CardContainer from "../containers/CardContainer";

const LanguageMetrics = () => {
  const { data, isLoading, isError, status } = useGetMetrics();

  const metrics = data?.metrics ?? [];
  const total = data?.total ?? 0;
  const isEmpty = !isError && metrics.length === 0;

  return (
    <CardContainer
      loading={{
        isLoading: status === 'pending' || isLoading,
      }}
      empty={{
        isEmpty,
      }}
      className="p-4 flex flex-col gap-2 w-full h-50 justify-center items-center"
    >
      {isError ? (
        <p className="text-sm text-muted-foreground">
          Unable to load GitHub language data.
        </p>
      ) : (
        metrics.map((item: MetricType) => (
          <FrequenceScore
            key={item.lang}
            label={item.lang}
            average={getAverage(item.frequencyCount, total)}
            id={item.lang}
          />
        ))
      )}
    </CardContainer>
  );
};

export default LanguageMetrics
