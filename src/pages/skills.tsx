import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookText,
  Braces,
  Database,
  FileCode2,
  GitBranch,
  Globe2,
  Info,
  Layers,
  MessageSquareText,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { FaCode, FaGithub } from "react-icons/fa";
import {
  SiCplusplus,
  SiCss3,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiRuby,
  SiRust,
  SiSwift,
  SiTypescript,
} from "react-icons/si";
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
  icon: LucideIcon;
  iconClassName: string;
  barClassName: string;
};

type Certification = {
  title: string;
  provider: string;
  year: string;
  image: string;
  imageAlt: string;
  overlayImage?: string;
  overlayImageAlt?: string;
  certificateImage?: string;
  certificateImageAlt?: string;
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

type LanguageTheme = {
  icon: IconType;
  chipClassName: string;
  barClassName: string;
  shareClassName: string;
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
    title: "Social Engineering Assessment",
    provider: "CyTech x Aquila",
    year: "2026",
    image: "/certificates/cytech-social-engineering.svg",
    imageAlt: "Social Engineering Assessment certificate preview",
    certificateImage: "/certificates/cert_social_engineering.png",
    certificateImageAlt: "Social Engineering Assessment certificate",
  },
  {
    title: "Cloud Security Fundamentals Quiz",
    provider: "CyTech x Aquila",
    year: "2026",
    image: "/certificates/cytech-cloud-security.svg",
    imageAlt: "Cloud Security Fundamentals Quiz certificate preview",
    certificateImage: "/certificates/cert_basic_cloud_security.png",
    certificateImageAlt: "Cloud Security Fundamentals Quiz certificate",
  },
  {
    title: "Problem Solving and Innovation",
    provider: "Wadhwani Foundation",
    year: "2025",
    image: "/certificates/wadhwani-problem-solving.svg",
    imageAlt: "Problem Solving and Innovation certificate preview",
    overlayImage: "/certificates/wadhwani-problem-solving-overlay.svg",
    overlayImageAlt: "Problem Solving and Innovation certificate full preview",
    certificateImage: "/certificates/cert_problem_solving.jpeg",
    certificateImageAlt: "Problem Solving and Innovation certificate",
  },
  {
    title: "Impactful Writing Skills",
    provider: "Wadhwani Foundation",
    year: "2025",
    image: "/certificates/wadhwani-impactful-writing.svg",
    imageAlt: "Impactful Writing Skills certificate preview",
    overlayImage: "/certificates/wadhwani-impactful-writing-overlay.svg",
    overlayImageAlt: "Impactful Writing Skills certificate full preview",
    certificateImage: "/certificates/cert_impactful_writing.jpeg",
    certificateImageAlt: "Impactful Writing Skills certificate",
  },
  {
    title: "Introduction to ITIL V4",
    provider: "Simplilearn",
    year: "2025",
    image: "/certificates/simplilearn-itil.svg",
    imageAlt: "Introduction to ITIL V4 certificate preview",
    certificateImage: "/certificates/cert_simplearn.jpeg",
    certificateImageAlt: "Introduction to ITIL V4 certificate",
  },
  {
    title: "CCNAv7: Introduction to Networks",
    provider: "Cisco Networking Academy",
    year: "2021",
    image: "/certificates/cisco-ccna.svg",
    imageAlt: "CCNAv7 Introduction to Networks certificate preview",
    certificateImage: "/certificates/cert_ccn_intro.jpeg",
    certificateImageAlt: "CCNAv7 Introduction to Networks certificate",
  },
  {
    title: "Techstars Startup Weekend",
    provider: "USTP, Cagayan de Oro",
    year: "2023",
    image: "/certificates/techstars-weekend.svg",
    imageAlt: "Techstars Startup Weekend certificate preview",
  },
];

const DOMAIN_SCORES: DomainScore[] = [
  {
    label: "Web Engineering",
    score: 92,
    rationale:
      "Driven by JavaScript, React, Next.js, Laravel, Django, REST APIs, and micro-frontend architecture experience.",
    icon: Globe2,
    iconClassName: "border-sky-500/35 bg-sky-500/15 text-sky-700 dark:text-sky-300",
    barClassName: "from-sky-500 via-cyan-500 to-blue-500",
  },
  {
    label: "Architecture & Delivery",
    score: 87,
    rationale:
      "Grounded in MFE concepts, API design, Storybook workflows, Rsbuild, Docker, and platform delivery through Vercel/GitHub Pages.",
    icon: Layers,
    iconClassName: "border-indigo-500/35 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
    barClassName: "from-indigo-500 via-blue-500 to-cyan-500",
  },
  {
    label: "Documentation & Technical Writing",
    score: 89,
    rationale: "Backed by technical writing, docs-as-code practices, MkDocs, and markdown-first documentation workflows.",
    icon: BookText,
    iconClassName: "border-emerald-500/35 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    barClassName: "from-emerald-500 via-teal-500 to-lime-500",
  },
  {
    label: "Communication & Collaboration",
    score: 86,
    rationale: "Reflected through technical communication, collaboration habits, and structured stakeholder-facing writing.",
    icon: MessageSquareText,
    iconClassName: "border-fuchsia-500/35 bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
    barClassName: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    label: "Networking & Security",
    score: 79,
    rationale: "Supported by IP addressing, VLANs, ACLs, firewall setup, and Cisco routing/switching foundations.",
    icon: ShieldCheck,
    iconClassName: "border-amber-500/35 bg-amber-500/15 text-amber-700 dark:text-amber-300",
    barClassName: "from-amber-500 via-orange-500 to-red-500",
  },
];

const LANGUAGE_THEMES: Record<string, LanguageTheme> = {
  JavaScript: {
    icon: SiJavascript,
    chipClassName: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    barClassName: "from-amber-400 via-yellow-400 to-amber-500",
    shareClassName: "text-amber-700 dark:text-amber-300",
  },
  TypeScript: {
    icon: SiTypescript,
    chipClassName: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    barClassName: "from-blue-500 via-sky-500 to-cyan-500",
    shareClassName: "text-sky-700 dark:text-sky-300",
  },
  PHP: {
    icon: SiPhp,
    chipClassName: "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    barClassName: "from-indigo-500 via-violet-500 to-blue-500",
    shareClassName: "text-indigo-700 dark:text-indigo-300",
  },
  Python: {
    icon: SiPython,
    chipClassName: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    barClassName: "from-emerald-500 via-teal-500 to-cyan-500",
    shareClassName: "text-emerald-700 dark:text-emerald-300",
  },
  Java: {
    icon: SiOpenjdk,
    chipClassName: "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-300",
    barClassName: "from-orange-500 via-red-500 to-rose-500",
    shareClassName: "text-orange-700 dark:text-orange-300",
  },
  HTML: {
    icon: SiHtml5,
    chipClassName: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    barClassName: "from-rose-500 via-orange-500 to-amber-500",
    shareClassName: "text-rose-700 dark:text-rose-300",
  },
  CSS: {
    icon: SiCss3,
    chipClassName: "border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
    barClassName: "from-cyan-500 via-blue-500 to-indigo-500",
    shareClassName: "text-cyan-700 dark:text-cyan-300",
  },
  Go: {
    icon: SiGo,
    chipClassName: "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300",
    barClassName: "from-teal-500 via-cyan-500 to-blue-500",
    shareClassName: "text-teal-700 dark:text-teal-300",
  },
  Rust: {
    icon: SiRust,
    chipClassName: "border-stone-500/40 bg-stone-500/10 text-stone-700 dark:text-stone-300",
    barClassName: "from-stone-500 via-amber-500 to-orange-500",
    shareClassName: "text-stone-700 dark:text-stone-300",
  },
  Ruby: {
    icon: SiRuby,
    chipClassName: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
    barClassName: "from-red-500 via-rose-500 to-fuchsia-500",
    shareClassName: "text-red-700 dark:text-red-300",
  },
  Kotlin: {
    icon: SiKotlin,
    chipClassName: "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    barClassName: "from-violet-500 via-fuchsia-500 to-pink-500",
    shareClassName: "text-violet-700 dark:text-violet-300",
  },
  Swift: {
    icon: SiSwift,
    chipClassName: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    barClassName: "from-amber-500 via-orange-500 to-red-500",
    shareClassName: "text-amber-700 dark:text-amber-300",
  },
  "C++": {
    icon: SiCplusplus,
    chipClassName: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    barClassName: "from-blue-500 via-indigo-500 to-violet-500",
    shareClassName: "text-blue-700 dark:text-blue-300",
  },
};

const DEFAULT_LANGUAGE_THEME: LanguageTheme = {
  icon: FaCode,
  chipClassName: "border-muted-foreground/30 bg-muted/30 text-foreground",
  barClassName: "from-slate-500 via-slate-400 to-slate-500",
  shareClassName: "text-muted-foreground",
};

const getLanguageTheme = (language: string): LanguageTheme => LANGUAGE_THEMES[language] ?? DEFAULT_LANGUAGE_THEME;

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
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);

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

  useEffect(() => {
    if (!selectedCertificate) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedCertificate]);

  const totalSkillEntries = useMemo(
    () => SKILL_GROUPS.reduce((total, group) => total + group.items.length, 0),
    []
  );
  const topGithubLanguage = languageMetrics[0]?.language ?? "Unavailable";
  const topLanguageTheme = getLanguageTheme(topGithubLanguage);
  const TopLanguageIcon = topLanguageTheme.icon;

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
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-flex size-6 items-center justify-center rounded-md border ${topLanguageTheme.chipClassName}`}
                      >
                        <TopLanguageIcon size={13} />
                      </span>
                      <Typography variant="h4">{topGithubLanguage}</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeUpMotionProv>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:items-stretch">
            <SlideRightMotionProv className="min-h-0 xl:col-span-8">
              <article className="h-full rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
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
                        whileHover={{ y: -4, transition: { duration: 0.14, delay: 0, ease: "easeOut" } }}
                        className="group relative overflow-hidden rounded-xl border bg-background/65 p-4 transition-shadow will-change-transform hover:shadow-md"
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

            <SlideLeftMotionProv className="min-h-0 xl:col-span-4">
              <article className="flex h-full min-h-0 flex-col rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                <header className="mb-4">
                  <div className="flex items-center gap-2">
                    <Award size={18} />
                    <Typography variant="h3">Certifications & Trainings</Typography>
                  </div>
                  <Typography variant="caption" className="mt-1 text-muted-foreground">
                    Formal programs completed across security, innovation, writing, IT service
                    management, and networking.
                  </Typography>
                </header>

                <ul className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pb-1 pr-1 pt-1">
                  {CERTIFICATIONS.map((certification, index) => (
                    <motion.li
                      key={`${certification.title}-${certification.year}`}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{
                        y: -18,
                        x: 10,
                        scale: 1.015,
                        zIndex: 40,
                        transition: { type: "spring", stiffness: 320, damping: 28, mass: 0.6, delay: 0 },
                      }}
                      style={{ zIndex: CERTIFICATIONS.length - index }}
                      className={`${index === 0 ? "" : "-mt-16 sm:-mt-20"} group relative cursor-pointer overflow-hidden rounded-xl border bg-background/90 shadow-lg`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${certification.title} certificate preview`}
                      onClick={() => {
                        setSelectedCertificate(certification);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedCertificate(certification);
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="relative h-28 w-full overflow-hidden">
                          <img
                            src={certification.image}
                            alt={certification.imageAlt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/60" />
                          <div className="absolute right-2 top-2">
                            <Badge variant="secondary" className="backdrop-blur">
                              {certification.year}
                            </Badge>
                          </div>
                        </div>

                        <div className="relative z-10 p-3">
                          <Typography variant="body" weight={600} className="leading-tight text-white">
                            {certification.title}
                          </Typography>
                          <Typography variant="caption" className="mt-1 block text-white/80">
                            {certification.provider}
                          </Typography>
                        </div>
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
                          <span
                            className={`inline-flex size-6 items-center justify-center rounded-md border ${domain.iconClassName}`}
                          >
                            <domain.icon size={14} />
                          </span>
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
                          className={`h-full rounded-full bg-linear-to-r ${domain.barClassName}`}
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
                    <FaGithub size={18} />
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
                    {languageMetrics.map((metric, index) => {
                      const languageTheme = getLanguageTheme(metric.language);
                      const LanguageIcon = languageTheme.icon;

                      return (
                        <div key={metric.language} className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <ToolTip
                              text={`${metric.count} repositories use ${metric.language} as their primary language (${metric.share}% of measured public repos).`}
                            >
                              <button
                                type="button"
                                aria-label={`Explain ${metric.language} language signal`}
                                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 transition hover:bg-accent/20 ${languageTheme.chipClassName}`}
                              >
                                <LanguageIcon size={12} />
                                <Typography variant="body-sm" className="text-left">
                                  {metric.language}
                                </Typography>
                              </button>
                            </ToolTip>

                            <Typography variant="body-sm" className={languageTheme.shareClassName}>
                              {metric.share}%
                            </Typography>
                          </div>

                          <div className="h-2.5 overflow-hidden rounded-full bg-secondary/60">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${metric.share}%` }}
                              viewport={{ once: true, amount: 0.8 }}
                              transition={{ duration: 0.75, delay: index * 0.08 }}
                              className={`h-full rounded-full bg-linear-to-r ${languageTheme.barClassName}`}
                            />
                          </div>
                        </div>
                      );
                    })}

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
                      {["JavaScript", "PHP", "Python", "Java"].map((language) => {
                        const languageTheme = getLanguageTheme(language);
                        const LanguageIcon = languageTheme.icon;
                        return (
                          <Badge key={language} variant="outline" className={languageTheme.chipClassName}>
                            <LanguageIcon size={12} />
                            {language}
                          </Badge>
                        );
                      })}
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

        <AnimatePresence>
          {selectedCertificate ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-3 sm:p-5"
              onClick={() => {
                setSelectedCertificate(null);
              }}
              role="presentation"
            >
              <motion.article
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedCertificate.title} certificate`}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <header className="flex items-start justify-between gap-3 border-b px-4 py-3 sm:px-5">
                  <div>
                    <Typography variant="body-lg" weight={600}>
                      {selectedCertificate.title}
                    </Typography>
                    <Typography variant="caption" className="mt-1 block text-muted-foreground">
                      {selectedCertificate.provider} • {selectedCertificate.year}
                    </Typography>
                  </div>

                  <button
                    type="button"
                    className="inline-flex rounded-md border p-2 transition hover:bg-accent/20"
                    aria-label="Close certificate preview"
                    onClick={() => {
                      setSelectedCertificate(null);
                    }}
                  >
                    <X size={16} />
                  </button>
                </header>

                <div className="p-3 sm:p-4">
                  <img
                    src={
                      selectedCertificate.certificateImage ??
                      selectedCertificate.overlayImage ??
                      selectedCertificate.image
                    }
                    alt={
                      selectedCertificate.certificateImageAlt ??
                      selectedCertificate.overlayImageAlt ??
                      selectedCertificate.imageAlt
                    }
                    className="max-h-[80vh] w-full rounded-lg border bg-muted/20 object-contain"
                  />
                </div>
              </motion.article>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DynamicMotionProvider>
    </PageContainer>
  );
};

export default Skills;
