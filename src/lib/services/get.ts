import { repoV1, repoV2 } from '../../../global-config';
import { gitHubApi } from '../axios/axiosClient';

import {
  type LanguageMetrics,
  type MetricsReturnType,
  type MetricType,
} from '../types/features/languageMetrics';

type GithubRepo = {
  name: string;
  language: string | null;
  fork?: boolean;
};

const resolveAccounts = () =>
  [repoV1, repoV2]
    .map((account) => account.trim())
    .filter((account) => account.length > 0);

export const getLanguageMetrics = async (): Promise<MetricsReturnType> => {
  const accounts = resolveAccounts();
  if (!accounts.length) {
    throw new Error('No GitHub accounts configured.');
  }

  try {
    const settledResults = await Promise.allSettled(
      accounts.map((account) =>
        gitHubApi.get<GithubRepo[]>(
          `${account}/repos?per_page=100&sort=updated`,
        ),
      ),
    );

    const successfulResponses = settledResults.flatMap((result) =>
      result.status === 'fulfilled' ? [result.value.data] : [],
    );

    if (!successfulResponses.length) {
      const firstError = settledResults.find(
        (result) => result.status === 'rejected',
      );
      const message =
        firstError && 'reason' in firstError
          ? firstError.reason?.response?.data?.message ??
            firstError.reason?.message ??
            String(firstError.reason)
          : 'Failed to fetch GitHub repositories.';
      throw new Error(message);
    }

    const repos = successfulResponses.flatMap((repoGroup) => repoGroup ?? []);

    const filteredData: LanguageMetrics[] = repos.map((repo) => ({
      name: repo.name,
      language: repo.language,
    }));

    const languageCounts = new Map<string, number>();
    let totalCount = 0;

    for (const item of filteredData) {
      if (!item.language) {
        continue;
      }
      totalCount += 1;
      languageCounts.set(
        item.language,
        (languageCounts.get(item.language) ?? 0) + 1,
      );
    }

    const metrics: MetricType[] = [...languageCounts.entries()]
      .map(([lang, frequencyCount]) => ({
        lang,
        frequencyCount,
      }))
      .sort((a, b) => b.frequencyCount - a.frequencyCount);

    return {
      metrics,
      total: totalCount,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch users';
    throw new Error(message);
  }
};
