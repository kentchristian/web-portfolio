
const env = import.meta.env;

export const repoV1 = env.PUBLIC_REPO_KEYSII ?? '';
export const repoV2 = env.PUBLIC_REPO_CHRISTIAN ?? '';

export const baseGitHubApi =
  env.PUBLIC_GIT_HUB_API ?? 'https://api.github.com/users/';
