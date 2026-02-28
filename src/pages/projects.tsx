import { ExternalLink, GitFork, Github, Lock, Search, Sparkles, Star, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../../shadcn/components/ui/badge";
import { Button } from "../../shadcn/components/ui/button";
import { DynamicMotionProvider, FadeUpMotionProv } from "../animations/DynamicMotion";
import PageContainer from "../components/containers/PageContainer";

const GITHUB_ACCOUNTS = ["kc878", "kentchristian"] as const;
const numberFormatter = new Intl.NumberFormat("en-US");
const LOCKED_HIGHLIGHT_KEYS = new Set(["mkdocs-template"]);
const PROTECTED_DOCUMENTATION_PATTERNS = [
  "docs-template",
  "mkdocs-template",
  "mkdocs",
  "cytech crnd documentation",
  "cytech crnd documentaiton",
] as const;

type HighlightTarget = {
  key: string;
  title: string;
  summary: string;
  lookupTerms: string[];
  searchTerm: string;
  pinnedLinks?: {
    label: string;
    url: string;
  }[];
};

const HIGHLIGHT_TARGETS: HighlightTarget[] = [
  {
    key: "forked-pos",
    title: "Forked POS",
    summary: "Forked POS project used for OJT work and process improvements.",
    lookupTerms: ["forked_pos", "forked pos", "forked-pos"],
    searchTerm: "forked_pos",
    pinnedLinks: [
      {
        label: "logicbaseojt_msuiit",
        url: "https://github.com/piscodev/logicbaseojt_msuiit",
      },
    ],
  },
  {
    key: "ojt-monitoring",
    title: "OJT Monitoring",
    summary: "Monitoring app for internship tracking, status updates, and reporting.",
    lookupTerms: ["ojt_monitoring", "ojt monitoring", "ojt-monitoring"],
    searchTerm: "ojt_monitoring",
  },
  {
    key: "appointment-system",
    title: "Appointment System",
    summary: "Gakkcons appointment system across frontend, backend, and mobile repos.",
    lookupTerms: ["appointment_system", "appointment system", "appointment-system"],
    searchTerm: "appointment system",
    pinnedLinks: [
      {
        label: "gakkcons-frontend",
        url: "https://github.com/KC878/gakkcons-frontend",
      },
      {
        label: "gakkcons-mobile",
        url: "https://github.com/Hanz0u/gakkcons-mobile",
      },
      {
        label: "gakkcons-backend",
        url: "https://github.com/KC878/gakkcons-backend",
      },
    ],
  },
  {
    key: "mkdocs-template",
    title: "Cytech CRND Documentaiton (MkDocs)",
    summary: "Documentation template and starter structure for technical docs.",
    lookupTerms: [
      "docs-template",
      "docs template",
      "mkdocs",
      "mkdocs-template",
      "mkdocs docs template",
    ],
    searchTerm: "mkdocs docs template",
  },
];

type GithubUser = {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
};

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  archived: boolean;
  fork: boolean;
  owner: {
    login: string;
  };
};

type RepoWithSource = GithubRepo & {
  source: string;
};

type AccountBundle = {
  account: string;
  user: GithubUser;
  repos: GithubRepo[];
};

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  const payload = (await response.json()) as T | { message?: string };
  if (!response.ok) {
    const fallback = `Request failed with status ${response.status}`;
    const message =
      typeof payload === "object" && payload && "message" in payload && payload.message
        ? payload.message
        : fallback;
    throw new Error(message);
  }

  return payload as T;
}

function formatDate(dateISO: string): string {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeLookupValue(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function dedupePinnedLinks(
  links: {
    label: string;
    url: string;
  }[]
) {
  const byUrl = new Map<string, { label: string; url: string }>();
  for (const link of links) {
    if (!byUrl.has(link.url)) {
      byUrl.set(link.url, link);
    }
  }
  return [...byUrl.values()];
}

function repoMatchesHighlight(repo: RepoWithSource, highlight: HighlightTarget): boolean {
  const repoName = normalizeLookupValue(repo.name);
  const repoDescription = normalizeLookupValue(repo.description ?? "");

  return highlight.lookupTerms.some((term) => {
    const normalizedTerm = normalizeLookupValue(term);
    return repoName.includes(normalizedTerm) || repoDescription.includes(normalizedTerm);
  });
}

function isProtectedDocumentationRepo(repo: RepoWithSource): boolean {
  const searchable = normalizeLookupValue(`${repo.name} ${repo.description ?? ""}`);
  return PROTECTED_DOCUMENTATION_PATTERNS.some((pattern) =>
    searchable.includes(normalizeLookupValue(pattern))
  );
}

export default function Projects() {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [repos, setRepos] = useState<RepoWithSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<string>("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      setNotice(null);

      try {
        const settledResults = await Promise.allSettled(
          GITHUB_ACCOUNTS.map(async (account): Promise<AccountBundle> => {
            const [user, userRepos] = await Promise.all([
              fetchJson<GithubUser>(`https://api.github.com/users/${account}`, controller.signal),
              fetchJson<GithubRepo[]>(
                `https://api.github.com/users/${account}/repos?per_page=100&sort=updated`,
                controller.signal
              ),
            ]);
            return { account, user, repos: userRepos };
          })
        );

        if (controller.signal.aborted) {
          return;
        }

        const successfulResults = settledResults.flatMap((result) =>
          result.status === "fulfilled" ? [result.value] : []
        );
        const failedAccounts = settledResults.flatMap((result, index) =>
          result.status === "rejected" ? [GITHUB_ACCOUNTS[index]] : []
        );

        if (!successfulResults.length) {
          throw new Error("Unable to load GitHub data for either account.");
        }

        setUsers(successfulResults.map(({ user }) => user));
        setRepos(
          successfulResults.flatMap(({ account, repos: accountRepos }) =>
            accountRepos.map((repo) => ({ ...repo, source: account }))
          )
        );

        if (failedAccounts.length) {
          setNotice(`Partial data loaded. Could not load: ${failedAccounts.join(", ")}.`);
        }
      } catch (fetchError: unknown) {
        if (controller.signal.aborted) {
          return;
        }
        const message =
          fetchError instanceof Error ? fetchError.message : "Unknown error while loading data.";
        setError(message);
        setUsers([]);
        setRepos([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchDashboardData();

    return () => {
      controller.abort();
    };
  }, [refreshKey]);

  const ownerFilters = useMemo(() => {
    const dynamicOwners = users.map((user) => user.login);
    return ["all", ...dynamicOwners];
  }, [users]);
  const accountMentions = useMemo(
    () => GITHUB_ACCOUNTS.map((account) => `@${account}`).join(" and "),
    []
  );

  useEffect(() => {
    if (selectedOwner !== "all" && !ownerFilters.includes(selectedOwner)) {
      setSelectedOwner("all");
    }
  }, [ownerFilters, selectedOwner]);

  const projectRepos = useMemo(
    () => repos.filter((repo) => !isProtectedDocumentationRepo(repo)),
    [repos]
  );

  const highlightedProjects = useMemo(() => {
    const reposByRecentUpdate = [...projectRepos].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return HIGHLIGHT_TARGETS.map((highlight) => {
      const isLockedProject = LOCKED_HIGHLIGHT_KEYS.has(highlight.key);
      if (isLockedProject) {
        return {
          ...highlight,
          repo: null,
          searchUrl: "",
          pinnedLinks: [],
        };
      }

      const repo = reposByRecentUpdate.find((candidateRepo) =>
        repoMatchesHighlight(candidateRepo, highlight)
      );
      const searchScope = GITHUB_ACCOUNTS.map((account) => `user:${account}`).join(" ");
      const searchQuery = `${highlight.searchTerm} ${searchScope}`.trim();
      const searchUrl = `https://github.com/search?q=${encodeURIComponent(searchQuery)}&type=repositories`;
      const pinnedLinks = dedupePinnedLinks(highlight.pinnedLinks ?? []);

      return {
        ...highlight,
        repo: repo ?? null,
        searchUrl,
        pinnedLinks,
      };
    });
  }, [projectRepos]);

  const highlightedRepoIds = useMemo(
    () => new Set(highlightedProjects.flatMap((project) => (project.repo ? [project.repo.id] : []))),
    [highlightedProjects]
  );

  const visibleRepos = useMemo(() => {
    const sortedRepos = [...projectRepos].sort((a, b) => {
      const starsRank = b.stargazers_count - a.stargazers_count;
      if (starsRank !== 0) {
        return starsRank;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    const filteredByOwner =
      selectedOwner === "all"
        ? sortedRepos
        : sortedRepos.filter((repo) => repo.source === selectedOwner);

    return filteredByOwner.filter((repo) => !highlightedRepoIds.has(repo.id));
  }, [highlightedRepoIds, projectRepos, selectedOwner]);

  const totalStars = useMemo(
    () => projectRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    [projectRepos]
  );
  const totalForks = useMemo(
    () => projectRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
    [projectRepos]
  );
  const totalFollowers = useMemo(
    () => users.reduce((sum, user) => sum + user.followers, 0),
    [users]
  );
  const languageCount = useMemo(() => {
    const languageSet = new Set(
      projectRepos.flatMap((repo) => (repo.language ? [repo.language] : []))
    );
    return languageSet.size;
  }, [projectRepos]);

  if (loading) {
    return (
      <PageContainer className="h-full w-full overflow-x-hidden">
        <div className="mx-auto grid w-full max-w-7xl animate-pulse gap-4">
          <div className="h-40 rounded-3xl border border-border bg-card/70" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="h-24 rounded-2xl border border-border bg-card/70" />
            <div className="h-24 rounded-2xl border border-border bg-card/70" />
            <div className="h-24 rounded-2xl border border-border bg-card/70" />
            <div className="h-24 rounded-2xl border border-border bg-card/70" />
          </div>
          <div className="h-96 rounded-3xl border border-border bg-card/70" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer className="h-full w-full overflow-x-hidden">
        <section className="mx-auto mt-6 w-full max-w-3xl rounded-3xl border border-red-500/40 bg-red-500/10 p-6">
          <h1 className="text-xl font-semibold">Unable to load projects</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button
            className="mt-4"
            onClick={() => {
              setRefreshKey((value) => value + 1);
            }}
          >
            Retry
          </Button>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="h-full w-full overflow-x-hidden">
      <DynamicMotionProvider>
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5">
          <FadeUpMotionProv>
            <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-cyan-100/80 via-white to-emerald-100/70 p-6 shadow-lg dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
              <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-500/15" />
              <div className="pointer-events-none absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/15" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <Badge variant="outline" className="bg-background/80">
                    <Sparkles className="size-3.5" />
                    GitHub Project Dashboard
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    One board for everything I build.
                  </h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Repositories from <strong>{accountMentions}</strong> are combined here, with
                    highlighted projects first and the full repo list organized below.
                  </p>
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
                  {users.map((user) => (
                    <a
                      key={user.login}
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card/85 px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <img
                        src={user.avatar_url}
                        alt={`${user.login} avatar`}
                        className="h-10 w-10 rounded-full border border-border object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-sm font-semibold leading-none">{user.name || user.login}</p>
                        <p className="mt-1 text-xs text-muted-foreground">@{user.login}</p>
                      </div>
                      <ExternalLink className="ml-auto size-4 opacity-60 transition group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </FadeUpMotionProv>

          <FadeUpMotionProv delay={0.05}>
            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Visible Projects",
                  value: numberFormatter.format(projectRepos.length),
                  icon: Github,
                },
                {
                  label: "Total Stars",
                  value: numberFormatter.format(totalStars),
                  icon: Star,
                },
                {
                  label: "Total Forks",
                  value: numberFormatter.format(totalForks),
                  icon: GitFork,
                },
                {
                  label: "Followers",
                  value: numberFormatter.format(totalFollowers),
                  icon: Users,
                },
              ].map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                    <metric.icon className="size-4 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
                </article>
              ))}
            </section>
          </FadeUpMotionProv>

          <FadeUpMotionProv delay={0.08}>
            <section className="rounded-3xl border border-border/70 bg-card/85 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Highlighted Projects</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Searched across both accounts for your selected projects.
                  </p>
                </div>
                <Badge variant="outline">Pinned Selection</Badge>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {highlightedProjects.map((project) => {
                  const isLockedProject = LOCKED_HIGHLIGHT_KEYS.has(project.key);
                  const hasPinnedLinks = project.pinnedLinks.length > 0;
                  const [primaryPinnedLink, ...secondaryPinnedLinks] = project.pinnedLinks;

                  return (
                    <article
                      key={project.key}
                      className="group flex h-full min-w-0 flex-col rounded-2xl border border-border/70 bg-background/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <h3 className="min-w-0 break-words text-lg font-semibold leading-tight">
                          {project.title}
                        </h3>
                        <Badge
                          variant={
                            !isLockedProject && (hasPinnedLinks || project.repo) ? "secondary" : "outline"
                          }
                        >
                          {isLockedProject
                            ? "Private"
                            : hasPinnedLinks
                              ? "Curated"
                              : project.repo
                                ? `@${project.repo.source}`
                                : "Not Found"}
                        </Badge>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>

                      {isLockedProject ? (
                        <div className="mt-4 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-muted-foreground">
                          This documentation project is protected by private-repo access control and
                          is fully excluded from public project listings.
                        </div>
                      ) : hasPinnedLinks ? (
                        <div className="mt-4 grid gap-2">
                          {project.pinnedLinks.map((link) => (
                            <Badge key={link.url} variant="outline" className="w-full justify-start sm:w-auto">
                              {link.label}
                            </Badge>
                          ))}
                        </div>
                      ) : project.repo ? (
                        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                          <div className="rounded-md bg-muted/60 px-2 py-1.5 text-center">
                            <p>Stars</p>
                            <p className="mt-0.5 font-semibold text-foreground">
                              {numberFormatter.format(project.repo.stargazers_count)}
                            </p>
                          </div>
                          <div className="rounded-md bg-muted/60 px-2 py-1.5 text-center">
                            <p>Forks</p>
                            <p className="mt-0.5 font-semibold text-foreground">
                              {numberFormatter.format(project.repo.forks_count)}
                            </p>
                          </div>
                          <div className="rounded-md bg-muted/60 px-2 py-1.5 text-center">
                            <p>Updated</p>
                            <p className="mt-0.5 font-semibold text-foreground">
                              {formatDate(project.repo.updated_at)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-md bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                          No direct match found yet. Use the search button to open GitHub results.
                        </div>
                      )}

                      {isLockedProject ? (
                        <Button size="sm" className="mt-5 w-full" disabled>
                          <Lock className="size-4" />
                          Access Restricted
                        </Button>
                      ) : hasPinnedLinks && primaryPinnedLink ? (
                        <div className="mt-5 flex flex-col gap-2">
                          <Button asChild size="sm" className="w-full justify-between gap-2 overflow-hidden">
                            <a href={primaryPinnedLink.url} target="_blank" rel="noreferrer noopener">
                              <span className="truncate">Open {primaryPinnedLink.label}</span>
                              <ExternalLink className="size-4" />
                            </a>
                          </Button>
                          {secondaryPinnedLinks.map((link) => (
                            <Button
                              key={link.url}
                              asChild
                              size="sm"
                              variant="outline"
                              className="w-full justify-between gap-2 overflow-hidden"
                            >
                              <a href={link.url} target="_blank" rel="noreferrer noopener">
                                <span className="truncate">Open {link.label}</span>
                                <ExternalLink className="size-4" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <Button asChild size="sm" className="mt-5 w-full">
                          <a
                            href={project.repo ? project.repo.html_url : project.searchUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {project.repo ? "Open Project" : "Search Project"}
                            {project.repo ? <ExternalLink className="size-4" /> : <Search className="size-4" />}
                          </a>
                        </Button>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          </FadeUpMotionProv>

          <FadeUpMotionProv delay={0.12} viewport={{ once: true, amount: 0.03 }}>
            <section className="rounded-3xl border border-border/70 bg-card/85 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Repository Board</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {languageCount} languages represented across {projectRepos.length} repositories.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ownerFilters.map((owner) => (
                    <Button
                      key={owner}
                      size="sm"
                      variant={selectedOwner === owner ? "default" : "outline"}
                      onClick={() => {
                        setSelectedOwner(owner);
                      }}
                    >
                      {owner === "all" ? "All Accounts" : `@${owner}`}
                    </Button>
                  ))}
                </div>
              </div>

              {notice && (
                <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm">
                  {notice}
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleRepos.map((repo) => (
                  <article
                    key={repo.id}
                    className="group flex h-full min-w-0 flex-col rounded-2xl border border-border/70 bg-background/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-semibold leading-tight">{repo.name}</h3>
                        <p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">
                          {repo.description || "No repository description provided yet."}
                        </p>
                      </div>
                      <Badge variant="outline">@{repo.source}</Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">{repo.language || "Unspecified"}</Badge>
                      {repo.archived && <Badge variant="outline">Archived</Badge>}
                      {repo.fork && <Badge variant="outline">Fork</Badge>}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div className="rounded-md bg-muted/60 px-2 py-1.5 text-center">
                        <p>Stars</p>
                        <p className="mt-0.5 font-semibold text-foreground">
                          {numberFormatter.format(repo.stargazers_count)}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted/60 px-2 py-1.5 text-center">
                        <p>Forks</p>
                        <p className="mt-0.5 font-semibold text-foreground">
                          {numberFormatter.format(repo.forks_count)}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted/60 px-2 py-1.5 text-center">
                        <p>Updated</p>
                        <p className="mt-0.5 font-semibold text-foreground">
                          {formatDate(repo.updated_at)}
                        </p>
                      </div>
                    </div>

                    <Button asChild size="sm" className="mt-5 w-full">
                      <a href={repo.html_url} target="_blank" rel="noreferrer noopener">
                        Open Repository
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </article>
                ))}
              </div>

              {visibleRepos.length === 0 && (
                <div className="mt-5 rounded-2xl border border-border/70 bg-background/60 p-6 text-center text-sm text-muted-foreground">
                  No repositories found for this account filter.
                </div>
              )}
            </section>
          </FadeUpMotionProv>
        </main>
      </DynamicMotionProvider>
    </PageContainer>
  );
}
