import {
  Award,
  BookText,
  Braces,
  ChartColumnBig,
  Database,
  FileCode2,
  GitBranch,
  Globe2,
  Info,
  Layers,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../../shadcn/components/ui/badge";
import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SideFromRightMotionProv,
  SlideLeftMotionProv,
  SlideRightMotionProv,
  ZoomInMotionProv,
} from "../animations/DynamicMotion";
import ToolTip from "../common/ToolTip";
import { Typography } from "../common/Typography";
import PageContainer from "../components/containers/PageContainer";

type SkillGroup = {
  title: string;
  summary: string;
  icon: LucideIcon;
  items: string[];
};

type DomainScore = {
  label: string;
  score: number;
  rationale: string;
};

type Certification = {
  title: string;
  provider: string;
  year: string;
};

type GithubRepo = {
  language: string | null;
  fork: boolean;
};

type LanguageMetric = {
  language: string;
  count: number;
  share: number;
};

type GithubSignalResult = {
  metrics: LanguageMetric[];
  notice: string | null;
};

const GITHUB_ACCOUNTS = ["kc878", "kentchristian"] as const;

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    summary: "Core programming languages used for web and backend delivery.",
    icon: FileCode2,
    items: ["JavaScript", "PHP", "Python", "Java"],
  },
  {
    title: "Frameworks & Libraries",
    summary: "Production-ready frameworks and state/data utilities.",
    icon: Layers,
    items: ["Next.js", "React", "Laravel", "Django", "Zustand", "TanStack React Query"],
  },
  {
    title: "Architecture & Tools",
    summary: "Patterns and tooling for scalable and maintainable projects.",
    icon: Braces,
    items: ["Micro-Frontend (MFE)", "REST API Development", "Storybook", "MkDocs", "pnpm", "Rsbuild", "Docker"],
  },
  {
    title: "Databases",
    summary: "Relational data modeling and query-centric application storage.",
    icon: Database,
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Version Control & Delivery",
    summary: "Source control and deployment platforms across teams.",
    icon: GitBranch,
    items: ["Git", "GitHub", "GitLab", "Vercel", "GitHub Pages"],
  },
  {
    title: "Networking & Security",
    summary: "Infrastructure and access-control foundations for secure systems.",
    icon: ShieldCheck,
    items: [
      "IP Addressing",
      "VLANs",
      "ACLs",
      "Firewall Setup",
      "Cisco Router/Switch Configuration",
    ],
  },
  {
    title: "Documentation",
    summary: "Clear, versioned, docs-as-code workflows.",
    icon: BookText,
    items: ["Technical Writing", "Docs-as-Code", "Markdown"],
  },
  {
    title: "Soft Skills",
    summary: "Execution and collaboration capabilities for team outcomes.",
    icon: MessageSquareText,
    items: ["Problem Solving", "Collaboration", "Time Management", "Technical Communication"],
  },
];

const CERTIFICATIONS: Certification[] = [
  {
    title: "Problem Solving and Innovation",
    provider: "Wadhwani Foundation",
    year: "2025",
  },
  {
    title: "Impactful Writing Skills",
    provider: "Wadhwani Foundation",
    year: "2025",
  },
  {
    title: "Introduction to ITIL V4",
    provider: "Simplilearn",
    year: "2025",
  },
  {
    title: "CCNAv7: Introduction to Networks",
    provider: "Cisco Networking Academy",
    year: "2021",
  },
  {
    title: "Techstars Startup Weekend",
    provider: "USTP, Cagayan de Oro",
    year: "2023",
  },
];

const DOMAIN_SCORES: DomainScore[] = [
  {
    label: "Web Engineering",
    score: 92,
    rationale:
      "Driven by JavaScript, React, Next.js, Laravel, Django, REST APIs, and micro-frontend architecture experience.",
  },
  {
    label: "Architecture & Delivery",
    score: 87,
    rationale:
      "Grounded in MFE concepts, API design, Storybook workflows, Rsbuild, Docker, and platform delivery through Vercel/GitHub Pages.",
  },
  {
    label: "Documentation & Technical Writing",
    score: 89,
    rationale: "Backed by technical writing, docs-as-code practices, MkDocs, and markdown-first documentation workflows.",
  },
  {
    label: "Communication & Collaboration",
    score: 86,
    rationale: "Reflected through technical communication, collaboration habits, and structured stakeholder-facing writing.",
  },
  {
    label: "Networking & Security",
    score: 79,
    rationale: "Supported by IP addressing, VLANs, ACLs, firewall setup, and Cisco routing/switching foundations.",
  },
];

const LANGUAGE_GRADIENTS = [
  "from-sky-500 via-cyan-500 to-teal-500",
  "from-indigo-500 via-blue-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-emerald-500 via-lime-500 to-green-500",
  "from-fuchsia-500 via-pink-500 to-rose-500",
];

const FALLBACK_LANGUAGE_METRICS: LanguageMetric[] = [
  { language: "JavaScript", count: 4, share: 40 },
  { language: "PHP", count: 2, share: 20 },
  { language: "Python", count: 2, share: 20 },
  { language: "Java", count: 2, share: 20 },
];

const GITHUB_FALLBACK_NOTICE =
  "Live GitHub language data is temporarily unavailable. Showing a curated language profile.";

async function fetchGithubLanguageSignal(signal: AbortSignal): Promise<GithubSignalResult> {
  const settledResults = await Promise.allSettled(
    GITHUB_ACCOUNTS.map(async (account) => {
      const response = await fetch(`https://api.github.com/users/${account}/repos?per_page=100&sort=updated`, {
        signal,
        headers: { Accept: "application/vnd.github+json" },
      });

      const payload = (await response.json()) as GithubRepo[] | { message?: string };
      if (!response.ok) {
        const message =
          typeof payload === "object" && payload && "message" in payload && payload.message
            ? payload.message
            : `GitHub request failed with status ${response.status}`;
        throw new Error(message);
      }

      return payload as GithubRepo[];
    })
  );

  const successfulResponses = settledResults.filter((result) => result.status === "fulfilled");
  if (successfulResponses.length === 0) {
    return {
      metrics: FALLBACK_LANGUAGE_METRICS,
      notice: GITHUB_FALLBACK_NOTICE,
    };
  }

  const repoLanguageCount = new Map<string, number>();
  for (const result of successfulResponses) {
    for (const repo of result.value) {
      if (repo.fork || !repo.language) {
        continue;
      }
      repoLanguageCount.set(repo.language, (repoLanguageCount.get(repo.language) ?? 0) + 1);
    }
  }

  const totalLanguageRepos = [...repoLanguageCount.values()].reduce((sum, count) => sum + count, 0);
  if (totalLanguageRepos === 0) {
    return {
      metrics: FALLBACK_LANGUAGE_METRICS,
      notice: GITHUB_FALLBACK_NOTICE,
    };
  }

  const metrics = [...repoLanguageCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([language, count]) => ({
      language,
      count,
      share: totalLanguageRepos > 0 ? Math.round((count / totalLanguageRepos) * 100) : 0,
    }));

  const failedCount = settledResults.length - successfulResponses.length;
  const notice =
    failedCount > 0
      ? `Partial GitHub data: ${successfulResponses.length}/${settledResults.length} accounts loaded.`
      : null;

  return { metrics, notice };
}

const Skills = () => {
  const [languageMetrics, setLanguageMetrics] = useState<LanguageMetric[]>([]);
  const [isLanguageLoading, setIsLanguageLoading] = useState(true);
  const [languageError, setLanguageError] = useState<string | null>(null);
  const [languageNotice, setLanguageNotice] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadGithubLanguageSignal = async () => {
      setIsLanguageLoading(true);
      setLanguageError(null);
      setLanguageNotice(null);

      try {
        const result = await fetchGithubLanguageSignal(controller.signal);
        setLanguageMetrics(result.metrics);
        setLanguageNotice(result.notice);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        const message = error instanceof Error ? error.message : "Failed to fetch language signal.";
        setLanguageError(null);
        setLanguageMetrics(FALLBACK_LANGUAGE_METRICS);
        setLanguageNotice(`${GITHUB_FALLBACK_NOTICE} (${message})`);
      } finally {
        setIsLanguageLoading(false);
      }
    };

    loadGithubLanguageSignal();
    return () => {
      controller.abort();
    };
  }, []);

  const totalSkillEntries = useMemo(
    () => SKILL_GROUPS.reduce((total, group) => total + group.items.length, 0),
    []
  );
  const topGithubLanguage = languageMetrics[0]?.language ?? "Unavailable";

  return (
    <PageContainer className="h-full overflow-x-hidden">
      <DynamicMotionProvider>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 pb-6 sm:gap-6">
          <FadeUpMotionProv>
            <section className="relative overflow-hidden rounded-2xl border bg-card/80 p-5 shadow-sm sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_48%)]" />
              <div className="relative z-10">
                <Badge variant="secondary" className="mb-3">
                  Skills Matrix
                </Badge>
                <Typography variant="h2" className="leading-tight">
                  Skills, Certifications, and Real Code Signals
                </Typography>
                <Typography variant="body" className="mt-2 max-w-3xl text-muted-foreground">
                  Organized by capability areas with a domain-level view and language signal derived from public GitHub repositories.
                </Typography>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border bg-background/65 p-3">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Skill Entries
                    </Typography>
                    <Typography variant="h4">{totalSkillEntries}</Typography>
                  </div>
                  <div className="rounded-xl border bg-background/65 p-3">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Capability Domains
                    </Typography>
                    <Typography variant="h4">{DOMAIN_SCORES.length}</Typography>
                  </div>
                  <div className="rounded-xl border bg-background/65 p-3">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      Top GitHub Language
                    </Typography>
                    <Typography variant="h4">{topGithubLanguage}</Typography>
                  </div>
                </div>
              </div>
            </section>
          </FadeUpMotionProv>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <SlideRightMotionProv className="xl:col-span-8">
              <article className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                <header className="mb-4">
                  <Typography variant="h3">Core Skills</Typography>
                  <Typography variant="caption" className="mt-1 text-muted-foreground">
                    Structured by technical depth, delivery workflows, and communication-oriented capabilities.
                  </Typography>
                </header>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {SKILL_GROUPS.map((group, index) => {
                    const Icon = group.icon;
                    return (
                      <motion.article
                        key={group.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                        className="group relative overflow-hidden rounded-xl border bg-background/65 p-4 transition-shadow hover:shadow-md"
                      >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="inline-flex rounded-md border bg-card p-2">
                              <Icon size={18} />
                            </span>
                            <Typography variant="body-lg" weight={600}>
                              {group.title}
                            </Typography>
                          </div>

                          <Typography variant="caption" className="mb-3 block text-muted-foreground">
                            {group.summary}
                          </Typography>

                          <div className="flex flex-wrap gap-1.5">
                            {group.items.map((item) => (
                              <Badge key={item} variant="outline" className="rounded-full px-2.5 py-0.5 text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </article>
            </SlideRightMotionProv>

            <SlideLeftMotionProv className="xl:col-span-4">
              <article className="h-full rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                <header className="mb-4">
                  <div className="flex items-center gap-2">
                    <Award size={18} />
                    <Typography variant="h3">Certifications & Trainings</Typography>
                  </div>
                  <Typography variant="caption" className="mt-1 text-muted-foreground">
                    Formal programs completed across innovation, writing, IT service management, and networking.
                  </Typography>
                </header>

                <ul className="space-y-3">
                  {CERTIFICATIONS.map((certification, index) => (
                    <motion.li
                      key={`${certification.title}-${certification.year}`}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="rounded-xl border bg-background/60 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Typography variant="body" weight={600} className="leading-tight">
                            {certification.title}
                          </Typography>
                          <Typography variant="caption" className="mt-1 block text-muted-foreground">
                            {certification.provider}
                          </Typography>
                        </div>
                        <Badge variant="secondary">{certification.year}</Badge>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </article>
            </SlideLeftMotionProv>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <ZoomInMotionProv className="xl:col-span-7">
              <article className="h-full rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                <header className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <Typography variant="h3">Capability Graph</Typography>
                    <Typography variant="caption" className="mt-1 block text-muted-foreground">
                      Relative strength by domain based on listed skills, tools, and delivery focus.
                    </Typography>
                  </div>
                  <ToolTip text="Each score is a relative capability signal from your provided stack, documentation strengths, networking background, and communication skills.">
                    <button
                      type="button"
                      aria-label="Capability graph explanation"
                      className="inline-flex rounded-md border p-2 transition hover:bg-accent/20"
                    >
                      <Info size={16} />
                    </button>
                  </ToolTip>
                </header>

                <div className="space-y-4">
                  {DOMAIN_SCORES.map((domain, index) => (
                    <div key={domain.label} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Typography variant="body" weight={600}>
                            {domain.label}
                          </Typography>
                          <ToolTip text={domain.rationale}>
                            <button
                              type="button"
                              aria-label={`Explain ${domain.label} score`}
                              className="inline-flex rounded-md border p-1 transition hover:bg-accent/20"
                            >
                              <Info size={13} />
                            </button>
                          </ToolTip>
                        </div>
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {domain.score}%
                        </Typography>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-secondary/60">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${domain.score}%` }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{ duration: 0.75, delay: index * 0.08 }}
                          className={`h-full rounded-full bg-linear-to-r ${LANGUAGE_GRADIENTS[index % LANGUAGE_GRADIENTS.length]}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </ZoomInMotionProv>

            <SideFromRightMotionProv className="xl:col-span-5" delay={0.08}>
              <article className="h-full rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                <header className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Globe2 size={18} />
                    <Typography variant="h3">GitHub Language Signal</Typography>
                  </div>
                  <ToolTip text="Computed from public repositories using the primary language field per repo. Forked repositories are excluded to better represent authored work.">
                    <button
                      type="button"
                      aria-label="GitHub language graph explanation"
                      className="inline-flex rounded-md border p-2 transition hover:bg-accent/20"
                    >
                      <Info size={16} />
                    </button>
                  </ToolTip>
                </header>

                {isLanguageLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={`language-skeleton-${index}`} className="space-y-1.5">
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-2.5 animate-pulse rounded-full bg-muted" />
                      </div>
                    ))}
                  </div>
                ) : languageMetrics.length > 0 ? (
                  <div className="space-y-4">
                    {languageMetrics.map((metric, index) => (
                      <div key={metric.language} className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <ToolTip
                            text={`${metric.count} repositories use ${metric.language} as their primary language (${metric.share}% of measured public repos).`}
                          >
                            <button
                              type="button"
                              aria-label={`Explain ${metric.language} language signal`}
                              className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 transition hover:bg-accent/20"
                            >
                              <ChartColumnBig size={12} />
                              <Typography variant="body-sm" className="text-left">
                                {metric.language}
                              </Typography>
                            </button>
                          </ToolTip>

                          <Typography variant="body-sm" className="text-muted-foreground">
                            {metric.share}%
                          </Typography>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-secondary/60">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.share}%` }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.75, delay: index * 0.08 }}
                            className={`h-full rounded-full bg-linear-to-r ${LANGUAGE_GRADIENTS[index % LANGUAGE_GRADIENTS.length]}`}
                          />
                        </div>
                      </div>
                    ))}

                    {languageNotice ? (
                      <Typography variant="caption" className="block text-amber-600 dark:text-amber-400">
                        {languageNotice}
                      </Typography>
                    ) : null}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Typography variant="body-sm" className="text-muted-foreground">
                      GitHub language data is currently unavailable.
                    </Typography>
                    <div className="flex flex-wrap gap-1.5">
                      {["JavaScript", "PHP", "Python", "Java"].map((language) => (
                        <Badge key={language} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {languageError ? (
                  <Typography variant="caption" className="mt-4 block text-red-600 dark:text-red-400">
                    {languageError}
                  </Typography>
                ) : null}

                <Typography variant="caption" className="mt-4 block text-muted-foreground">
                  Source: Public GitHub repositories from {GITHUB_ACCOUNTS.join(" and ")}.
                </Typography>
              </article>
            </SideFromRightMotionProv>
          </section>

          <FadeUpMotionProv>
            <section className="rounded-2xl border bg-card/70 p-4 shadow-sm sm:p-5">
              <Typography variant="body">
                This page combines explicit competencies with a live GitHub language signal so the profile reflects both declared strengths and recent public code activity.
              </Typography>
            </section>
          </FadeUpMotionProv>
        </div>
      </DynamicMotionProvider>
    </PageContainer>
  );
};

export default Skills;
