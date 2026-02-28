import { Sparkles, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import type { IconType } from 'react-icons';
import {
  FaBook,
  FaBookOpen,
  FaBullseye,
  FaChartLine,
  FaClipboardCheck,
  FaCode,
  FaCubes,
  FaFileAlt,
  FaLaptopCode,
  FaLightbulb,
  FaLink,
  FaProjectDiagram,
  FaRocket,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';

import { Button } from '../../../shadcn/components/ui/button';
import { Typography } from '../../common/Typography';
import { images } from '../../lib/constants/images';
import cytechExperienceData from '../../lib/data/cytech-experience-data.json';
import experienceData from '../../lib/data/experience-data.json';

type ProfileStatsModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type ExperienceSignal = {
  company: string;
  companyUrl?: string;
  role: string;
  skills: string[];
  description: string[];
};

type RadarMetric = {
  label: string;
  score: number;
};

type ProjectTrack = {
  label: string;
  count: number;
  share: number;
};

type DerivedSkill = {
  label: string;
  score: number;
  note: string;
};

type Insight = {
  title: string;
  detail: string;
};

type DashboardData = {
  coreStats: {
    label: string;
    value: string;
  }[];
  radarMetrics: RadarMetric[];
  projectTracks: ProjectTrack[];
  derivedSkills: DerivedSkill[];
  insights: Insight[];
};

type DomainDefinition = {
  label: string;
  keywords: string[];
};

type TrackDefinition = {
  label: string;
  keywords: string[];
};

const RADAR_SIZE = 280;
const RADAR_CENTER = RADAR_SIZE / 2;
const RADAR_RADIUS = 98;
const RADAR_LEVELS = [0.25, 0.5, 0.75, 1];

const RADAR_DOMAINS: DomainDefinition[] = [
  {
    label: 'Frontend',
    keywords: ['react', 'frontend', 'ui', 'ux', 'storybook', 'theming', 'next.js'],
  },
  {
    label: 'Backend',
    keywords: ['api', 'backend', 'django', 'laravel', 'database', 'integration', 'celery'],
  },
  {
    label: 'Architecture',
    keywords: ['micro-frontend', 'architecture', 'scalable', 'performance', 'docker', 'system'],
  },
  {
    label: 'Docs',
    keywords: ['technical writing', 'documentation', 'docs-as-code', 'mkdocs', 'markdown'],
  },
  {
    label: 'Delivery',
    keywords: ['stakeholder', 'collaboration', 'agile', 'testing', 'debugging', 'team'],
  },
];

const PROJECT_TRACKS: TrackDefinition[] = [
  {
    label: 'Product Engineering',
    keywords: ['developer', 'frontend', 'full-stack', 'web', 'engineering', 'dashboard'],
  },
  {
    label: 'Documentation',
    keywords: ['writer', 'documentation', 'mkdocs', 'docs-as-code', 'markdown'],
  },
  {
    label: 'Quality & Ops',
    keywords: ['qa', 'quality', 'testing', 'debugging', 'monitoring', 'data entry'],
  },
  {
    label: 'Strategy',
    keywords: ['startup', 'strategic', 'planning', 'pitch', 'stakeholder', 'business'],
  },
];

const DERIVED_SKILL_ICONS: Record<string, IconType> = {
  'Full-Stack Execution': FaLaptopCode,
  'Product Reliability': FaShieldAlt,
  'Knowledge Sharing': FaBookOpen,
  'Delivery Momentum': FaRocket,
};

const PROJECT_TRACK_ICONS: Record<string, IconType> = {
  'Product Engineering': FaCubes,
  Documentation: FaFileAlt,
  'Quality & Ops': FaClipboardCheck,
  Strategy: FaBullseye,
};

const INSIGHT_ICONS: Record<string, IconType> = {
  'Integration-heavy delivery': FaLink,
  'Docs included in execution': FaBook,
  'Cross-team collaboration is a core pattern': FaUsers,
};

const toPercentScore = (hits: number, total: number) => {
  if (total <= 0) {
    return 0;
  }
  const rawScore = Math.round((hits / total) * 100);
  return Math.max(58, Math.min(98, rawScore));
};

const getRadarPoint = (
  index: number,
  total: number,
  scorePercent: number,
  radius = RADAR_RADIUS
) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const distance = (scorePercent / 100) * radius;

  return {
    x: RADAR_CENTER + Math.cos(angle) * distance,
    y: RADAR_CENTER + Math.sin(angle) * distance,
  };
};

const getRadarPointsString = (
  metrics: RadarMetric[],
  valueSelector: (metric: RadarMetric) => number,
  radius = RADAR_RADIUS
) =>
  metrics
    .map((metric, index) => {
      const point = getRadarPoint(index, metrics.length, valueSelector(metric), radius);
      return `${point.x},${point.y}`;
    })
    .join(' ');

const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const ProfileStatsModal = ({ isOpen, setIsOpen }: ProfileStatsModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const dashboardData = useMemo<DashboardData>(() => {
    const entries = [...cytechExperienceData, ...experienceData] as ExperienceSignal[];
    const normalizedEntries = entries.map((entry) =>
      `${entry.role} ${entry.company} ${entry.skills.join(' ')} ${entry.description.join(' ')}`.toLowerCase()
    );

    const initiativeCount = entries.length;
    const organizationCount = new Set(
      entries.map((entry) => (entry.companyUrl?.trim() ? entry.companyUrl : entry.company))
    ).size;
    const uniqueSkills = new Set(
      entries.flatMap((entry) => entry.skills.map((skill) => skill.trim().toLowerCase()))
    ).size;
    const insightPoints = entries.reduce((sum, entry) => sum + entry.description.length, 0);

    const radarMetrics = RADAR_DOMAINS.map((domain) => {
      const hits = normalizedEntries.reduce((sum, entryText) => {
        const hasMatch = domain.keywords.some((keyword) => entryText.includes(keyword));
        return sum + (hasMatch ? 1 : 0);
      }, 0);

      return {
        label: domain.label,
        score: toPercentScore(hits, initiativeCount),
      };
    });

    const projectBuckets = PROJECT_TRACKS.map((track) => ({
      label: track.label,
      count: 0,
    }));

    for (const entryText of normalizedEntries) {
      const foundTrack = PROJECT_TRACKS.find((track) =>
        track.keywords.some((keyword) => entryText.includes(keyword))
      );

      if (!foundTrack) {
        projectBuckets[0].count += 1;
        continue;
      }

      const trackIndex = PROJECT_TRACKS.findIndex((track) => track.label === foundTrack.label);
      projectBuckets[trackIndex].count += 1;
    }

    const projectTracks = projectBuckets
      .filter((track) => track.count > 0)
      .map((track) => ({
        ...track,
        share: Math.round((track.count / initiativeCount) * 100),
      }));

    const scoreByLabel = new Map(radarMetrics.map((metric) => [metric.label, metric.score]));
    const frontendScore = scoreByLabel.get('Frontend') ?? 0;
    const backendScore = scoreByLabel.get('Backend') ?? 0;
    const architectureScore = scoreByLabel.get('Architecture') ?? 0;
    const docsScore = scoreByLabel.get('Docs') ?? 0;
    const deliveryScore = scoreByLabel.get('Delivery') ?? 0;

    const derivedSkills: DerivedSkill[] = [
      {
        label: 'Full-Stack Execution',
        score: clampScore((frontendScore + backendScore) / 2),
        note: 'Combines UI delivery with backend API execution.',
      },
      {
        label: 'Product Reliability',
        score: clampScore((architectureScore + backendScore + deliveryScore) / 3),
        note: 'Shows stability focus across architecture and production workflows.',
      },
      {
        label: 'Knowledge Sharing',
        score: clampScore((docsScore + deliveryScore) / 2),
        note: 'Reflects documentation depth and cross-team communication.',
      },
      {
        label: 'Delivery Momentum',
        score: clampScore((initiativeCount / 12) * 100),
        note: 'Pace signal based on completed initiatives in the profile timeline.',
      },
    ];

    const integrationProjects = normalizedEntries.filter((entryText) =>
      ['api', 'integration', 'backend', 'rest'].some((keyword) => entryText.includes(keyword))
    ).length;
    const documentationProjects = normalizedEntries.filter((entryText) =>
      ['documentation', 'technical writing', 'mkdocs', 'docs-as-code', 'markdown'].some(
        (keyword) => entryText.includes(keyword)
      )
    ).length;
    const collaborationProjects = normalizedEntries.filter((entryText) =>
      ['stakeholder', 'team', 'collaboration', 'cross-functional'].some((keyword) =>
        entryText.includes(keyword)
      )
    ).length;

    const insights: Insight[] = [
      {
        title: 'Integration-heavy delivery',
        detail: `${integrationProjects}/${initiativeCount} initiatives involved APIs, integration, or backend pipelines.`,
      },
      {
        title: 'Docs included in execution',
        detail: `${documentationProjects}/${initiativeCount} initiatives included structured documentation workflows.`,
      },
      {
        title: 'Cross-team collaboration is a core pattern',
        detail: `${collaborationProjects}/${initiativeCount} initiatives highlight stakeholder and team coordination.`,
      },
    ];

    return {
      coreStats: [
        { label: 'Initiatives', value: `${initiativeCount}` },
        { label: 'Unique Skills', value: `${uniqueSkills}` },
        { label: 'Organizations', value: `${organizationCount}` },
        { label: 'Insight Points', value: `${insightPoints}` },
      ],
      radarMetrics,
      projectTracks,
      derivedSkills,
      insights,
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const { coreStats, radarMetrics, projectTracks, derivedSkills, insights } = dashboardData;
  const dataPolygonPoints = getRadarPointsString(radarMetrics, (metric) => metric.score);

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-black/65 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Profile skills and project insights modal"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-6">
          <div>
            <Typography variant="h3" className="text-xl sm:text-2xl">
              Career Overview
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground">
              Skills, projects, derived strengths, and key insights.
            </Typography>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            aria-label="Close profile stats modal"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <X size={16} />
          </Button>
        </div>

        <div className="themed-scrollbar h-full overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[minmax(19rem,0.9fr)_1.3fr]">
            <section className="space-y-4">
              <article className="overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-emerald-500/10 via-background to-amber-500/10">
                <div className="relative h-52">
                  <img
                    src={images.profPic}
                    alt="Professional profile image"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                    <FaCode size={14} />
                    Kent Christian E. Cagadas
                  </div>
                </div>

                <div className="p-4">
                  <Typography variant="overline" className="text-emerald-500 dark:text-emerald-300">
                    Professional Focus
                  </Typography>
                  <Typography variant="h3" className="mt-1 text-lg sm:text-xl">
                    Kent Christian // Full-Stack Web Developer
                  </Typography>
                  <Typography variant="body-sm" className="mt-2 text-muted-foreground">
                    Career focus is web development, reflected through role history, delivery initiatives, and applied capabilities.
                  </Typography>
                </div>
              </article>

              <article className="rounded-2xl border border-border/80 bg-background/70 p-4">
                <Typography variant="h4" className="text-lg">
                  Core Stats
                </Typography>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {coreStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border/80 bg-muted/35 px-3 py-3"
                    >
                      <Typography variant="h3" className="text-xl">
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" className="text-muted-foreground">
                        {stat.label}
                      </Typography>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-sky-500/25 bg-linear-to-br from-slate-500/10 via-background to-sky-500/10 p-4">
                <Typography variant="h4" className="flex items-center gap-2 text-lg">
                  <FaChartLine className="text-sky-500 dark:text-sky-300" size={18} />
                  Derived Skills
                </Typography>
                <div className="mt-3 space-y-3">
                  {derivedSkills.map((skill) => {
                    const SkillIcon = DERIVED_SKILL_ICONS[skill.label] ?? FaChartLine;

                    return (
                      <div key={skill.label}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex size-6 items-center justify-center rounded-md border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300">
                              <SkillIcon size={13} />
                            </span>
                            <Typography variant="body-sm">{skill.label}</Typography>
                          </div>
                          <Typography variant="body-sm" className="font-semibold">
                            {skill.score}%
                          </Typography>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted/70">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-slate-600 via-sky-500 to-cyan-500"
                            style={{ width: `${skill.score}%` }}
                          />
                        </div>
                        <Typography variant="caption" className="mt-1 block text-muted-foreground">
                          {skill.note}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </article>
            </section>

            <section className="space-y-4">
              <article className="rounded-2xl border border-border/80 bg-background/70 p-4">
                <Typography variant="h4" className="text-lg">
                  Skill Radar (Web Chart)
                </Typography>
                <Typography variant="body-sm" className="mt-1 text-muted-foreground">
                  Capability signal inferred from projects and responsibilities.
                </Typography>

                <div className="mt-4 flex justify-center">
                  <svg viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`} className="h-[20rem] w-full max-w-[24rem]">
                    {RADAR_LEVELS.map((level) => (
                      <polygon
                        key={`radar-level-${level}`}
                        points={getRadarPointsString(radarMetrics, () => level * 100, RADAR_RADIUS)}
                        fill="none"
                        stroke="currentColor"
                        className="text-foreground/20"
                      />
                    ))}

                    {radarMetrics.map((metric, index) => {
                      const axisPoint = getRadarPoint(index, radarMetrics.length, 100);
                      return (
                        <line
                          key={`radar-axis-${metric.label}`}
                          x1={RADAR_CENTER}
                          y1={RADAR_CENTER}
                          x2={axisPoint.x}
                          y2={axisPoint.y}
                          stroke="currentColor"
                          className="text-foreground/25"
                        />
                      );
                    })}

                    <polygon
                      points={dataPolygonPoints}
                      fill="rgba(16, 185, 129, 0.26)"
                      stroke="rgba(6, 182, 212, 1)"
                      strokeWidth={2}
                    />

                    {radarMetrics.map((metric, index) => {
                      const valuePoint = getRadarPoint(index, radarMetrics.length, metric.score);
                      const labelPoint = getRadarPoint(index, radarMetrics.length, 118);
                      return (
                        <g key={`radar-label-${metric.label}`}>
                          <circle cx={valuePoint.x} cy={valuePoint.y} r={4} fill="rgba(245, 158, 11, 1)" />
                          <text
                            x={labelPoint.x}
                            y={labelPoint.y}
                            fill="currentColor"
                            fontSize="10"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {metric.label}
                          </text>
                          <text
                            x={valuePoint.x}
                            y={valuePoint.y - 10}
                            fill="currentColor"
                            fontSize="10"
                            fontWeight="700"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {metric.score}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </article>

              <article className="rounded-2xl border border-cyan-500/25 bg-linear-to-br from-cyan-500/10 via-background to-teal-500/10 p-4">
                <Typography variant="h4" className="flex items-center gap-2 text-lg">
                  <FaProjectDiagram className="text-cyan-500 dark:text-cyan-300" size={18} />
                  Project Distribution
                </Typography>
                <div className="mt-3 space-y-3">
                  {projectTracks.map((track) => {
                    const TrackIcon = PROJECT_TRACK_ICONS[track.label] ?? FaProjectDiagram;

                    return (
                      <div key={track.label}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex size-6 items-center justify-center rounded-md border border-cyan-500/35 bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                              <TrackIcon size={13} />
                            </span>
                            <Typography variant="body-sm">{track.label}</Typography>
                          </div>
                          <Typography variant="caption" className="font-semibold text-muted-foreground">
                            {track.count} projects ({track.share}%)
                          </Typography>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted/70">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-teal-600 to-cyan-500"
                            style={{ width: `${track.share}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-2xl border border-amber-500/25 bg-linear-to-br from-amber-500/10 via-background to-slate-500/10 p-4">
                <Typography variant="h4" className="flex items-center gap-2 text-lg">
                  <FaLightbulb className="text-amber-500 dark:text-amber-300" size={18} />
                  Insights Learned
                </Typography>
                <div className="mt-3 space-y-2">
                  {insights.map((insight) => {
                    const InsightIcon = INSIGHT_ICONS[insight.title] ?? FaLightbulb;

                    return (
                      <div
                        key={insight.title}
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 dark:bg-amber-500/8"
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-amber-500/35 bg-amber-500/20 text-amber-700 dark:text-amber-300">
                            <InsightIcon size={13} />
                          </span>
                          <div>
                            <Typography variant="body-sm" className="font-semibold">
                              {insight.title}
                            </Typography>
                            <Typography variant="caption" className="text-muted-foreground">
                              {insight.detail}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsModal;
