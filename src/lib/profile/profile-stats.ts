import cytechExperienceData from '../data/cytech-experience-data.json';
import experienceData from '../data/experience-data.json';

export type ExperienceSignal = {
  company: string;
  companyUrl?: string;
  role: string;
  skills: string[];
  description: string[];
};

export type RadarMetric = {
  label: string;
  score: number;
};

export type ProjectTrack = {
  label: string;
  count: number;
  share: number;
};

export type DerivedSkill = {
  label: string;
  score: number;
  note: string;
};

export type Insight = {
  title: string;
  detail: string;
};

export type DashboardData = {
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

export const RADAR_SIZE = 280;
const RADAR_CENTER = RADAR_SIZE / 2;
export const RADAR_RADIUS = 98;
export const RADAR_LEVELS = [0.25, 0.5, 0.75, 1] as const;

const RADAR_DOMAINS: DomainDefinition[] = [
  {
    label: 'Frontend',
    keywords: [
      'react',
      'frontend',
      'ui',
      'ux',
      'storybook',
      'theming',
      'next.js',
    ],
  },
  {
    label: 'Backend',
    keywords: [
      'api',
      'backend',
      'django',
      'laravel',
      'database',
      'integration',
      'celery',
    ],
  },
  {
    label: 'Architecture',
    keywords: [
      'micro-frontend',
      'architecture',
      'scalable',
      'performance',
      'docker',
      'system',
    ],
  },
  {
    label: 'Docs',
    keywords: [
      'technical writing',
      'documentation',
      'docs-as-code',
      'mkdocs',
      'markdown',
    ],
  },
  {
    label: 'Delivery',
    keywords: [
      'stakeholder',
      'collaboration',
      'agile',
      'testing',
      'debugging',
      'team',
    ],
  },
];

const PROJECT_TRACKS: TrackDefinition[] = [
  {
    label: 'Product Engineering',
    keywords: [
      'developer',
      'frontend',
      'full-stack',
      'web',
      'engineering',
      'dashboard',
    ],
  },
  {
    label: 'Documentation',
    keywords: ['writer', 'documentation', 'mkdocs', 'docs-as-code', 'markdown'],
  },
  {
    label: 'Quality & Ops',
    keywords: [
      'qa',
      'quality',
      'testing',
      'debugging',
      'monitoring',
      'data entry',
    ],
  },
  {
    label: 'Strategy',
    keywords: [
      'startup',
      'strategic',
      'planning',
      'pitch',
      'stakeholder',
      'business',
    ],
  },
];

const toPercentScore = (hits: number, total: number) => {
  if (total <= 0) {
    return 0;
  }

  const rawScore = Math.round((hits / total) * 100);
  return Math.max(58, Math.min(98, rawScore));
};

export const getRadarPoint = (
  index: number,
  total: number,
  scorePercent: number,
  radius = RADAR_RADIUS,
) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const distance = (scorePercent / 100) * radius;

  return {
    x: RADAR_CENTER + Math.cos(angle) * distance,
    y: RADAR_CENTER + Math.sin(angle) * distance,
  };
};

export const getRadarPointsString = (
  metrics: RadarMetric[],
  valueSelector: (metric: RadarMetric) => number,
  radius = RADAR_RADIUS,
) =>
  metrics
    .map((metric, index) => {
      const point = getRadarPoint(
        index,
        metrics.length,
        valueSelector(metric),
        radius,
      );
      return `${point.x},${point.y}`;
    })
    .join(' ');

const clampScore = (value: number) =>
  Math.max(0, Math.min(100, Math.round(value)));

export const buildProfileDashboardData = (): DashboardData => {
  const entries = [
    ...cytechExperienceData,
    ...experienceData,
  ] as ExperienceSignal[];
  const normalizedEntries = entries.map((entry) =>
    `${entry.role} ${entry.company} ${entry.skills.join(' ')} ${entry.description.join(' ')}`.toLowerCase(),
  );

  const initiativeCount = entries.length;
  const organizationCount = new Set(
    entries.map((entry) =>
      entry.companyUrl?.trim() ? entry.companyUrl : entry.company,
    ),
  ).size;
  const uniqueSkills = new Set(
    entries.flatMap((entry) =>
      entry.skills.map((skill) => skill.trim().toLowerCase()),
    ),
  ).size;
  const insightPoints = entries.reduce(
    (sum, entry) => sum + entry.description.length,
    0,
  );

  const radarMetrics = RADAR_DOMAINS.map((domain) => {
    const hits = normalizedEntries.reduce((sum, entryText) => {
      const hasMatch = domain.keywords.some((keyword) =>
        entryText.includes(keyword),
      );
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
      track.keywords.some((keyword) => entryText.includes(keyword)),
    );

    if (!foundTrack) {
      projectBuckets[0].count += 1;
      continue;
    }

    const trackIndex = PROJECT_TRACKS.findIndex(
      (track) => track.label === foundTrack.label,
    );
    projectBuckets[trackIndex].count += 1;
  }

  const projectTracks = projectBuckets
    .filter((track) => track.count > 0)
    .map((track) => ({
      ...track,
      share:
        initiativeCount > 0
          ? Math.round((track.count / initiativeCount) * 100)
          : 0,
    }));

  const scoreByLabel = new Map(
    radarMetrics.map((metric) => [metric.label, metric.score]),
  );
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
    ['api', 'integration', 'backend', 'rest'].some((keyword) =>
      entryText.includes(keyword),
    ),
  ).length;
  const documentationProjects = normalizedEntries.filter((entryText) =>
    [
      'documentation',
      'technical writing',
      'mkdocs',
      'docs-as-code',
      'markdown',
    ].some((keyword) => entryText.includes(keyword)),
  ).length;
  const collaborationProjects = normalizedEntries.filter((entryText) =>
    ['stakeholder', 'team', 'collaboration', 'cross-functional'].some(
      (keyword) => entryText.includes(keyword),
    ),
  ).length;

  const insights: Insight[] =
    initiativeCount > 0
      ? [
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
        ]
      : [
          {
            title: 'Integration-heavy delivery',
            detail: 'No initiative data is available yet.',
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
};
