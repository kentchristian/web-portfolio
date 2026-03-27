import { FileText, Sparkles } from 'lucide-react';
import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { Badge } from '../../shadcn/components/ui/badge';
import { Button } from '../../shadcn/components/ui/button';
import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SideFromRightMotionProv,
} from '../animations/DynamicMotion';
import { Typography } from '../common/Typography';
import PageContainer from '../components/containers/PageContainer';
import PdfViewerModal from '../components/modals/PdfViewerModal';

const HERO_SURFACE =
  'relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-sky-100/80 via-white to-emerald-100/70 p-6 shadow-lg dark:from-zinc-900 dark:via-zinc-900 dark:to-emerald-950/60 sm:p-7';
const HERO_RADIAL_OVERLAY =
  'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_48%)]';
const CARD_STAGGER_STEP = 0.08;
const CARD_STAGGER_MAX = 0.28;

type AssessmentCard = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  context: string[];
  tags: string[];
  fileName: string;
};

const ASSESSMENTS: AssessmentCard[] = [
  {
    id: 'workplace-insights',
    title: 'Workplace Insights',
    subtitle: 'Workstyle Assessment Report',
    summary:
      'A personalized report that highlights collaboration preferences, motivators, and communication cues to support better team alignment.',
    context: [
      'Maps collaboration and teamwork patterns.',
      'Surfaces decision-making and communication tendencies.',
      'Highlights growth cues with practical next steps.',
    ],
    tags: ['Behavioral', 'Workstyle', 'PDF Report'],
    fileName: 'Workplace Insights - Kent Christian  Cagadas-Workplace-Insights.pdf',
  },
];

const baseUrl = import.meta.env.BASE_URL ?? '/';
const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

const resolveAssessmentSrc = (fileName: string) =>
  `${normalizedBaseUrl}assessments/${encodeURIComponent(fileName)}`;

const Assessments = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentCard | null>(null);

  const shouldIgnoreCardClick = (target: EventTarget | null) =>
    target instanceof HTMLElement && Boolean(target.closest('[data-card-action="true"]'));

  const handleCardClick = (assessment: AssessmentCard) => (event: MouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }
    setSelectedAssessment(assessment);
  };

  const handleCardKeyDown = (assessment: AssessmentCard) => (event: KeyboardEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setSelectedAssessment(assessment);
  };

  return (
    <PageContainer className="h-full w-full overflow-x-hidden">
      <DynamicMotionProvider>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <FadeUpMotionProv>
            <section className={HERO_SURFACE}>
              <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/10" />
              <div className="pointer-events-none absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/15" />
              <div className={HERO_RADIAL_OVERLAY} />

              <div className="relative z-10 max-w-3xl space-y-3">
                <Badge variant="outline" className="bg-background/80">
                  Assessments Library
                </Badge>
                <Typography variant="h2" className="leading-tight">
                  Assessment reports with context and quick access to full PDFs.
                </Typography>
                <Typography variant="body" className="text-muted-foreground">
                  Explore each assessment for a snapshot of focus areas, then open the full report to review deeper
                  findings.
                </Typography>
              </div>
            </section>
          </FadeUpMotionProv>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ASSESSMENTS.map((assessment, index) => (
              <SideFromRightMotionProv
                key={assessment.id}
                delay={Math.min((index + 1) * CARD_STAGGER_STEP, CARD_STAGGER_MAX)}
              >
                <article
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${assessment.title} PDF`}
                  onClick={handleCardClick(assessment)}
                  onKeyDown={handleCardKeyDown(assessment)}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-border hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.2),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(110,231,183,0.15),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div>
                      <Typography variant="h3" className="text-lg sm:text-xl">
                        {assessment.title}
                      </Typography>
                      <Typography variant="caption" className="mt-1 block text-muted-foreground">
                        {assessment.subtitle}
                      </Typography>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground/80">
                      <FileText size={18} />
                    </span>
                  </div>

                  <Typography variant="body-sm" className="text-muted-foreground">
                    {assessment.summary}
                  </Typography>

                  <div className="flex flex-wrap gap-2">
                    {assessment.tags.map((tag) => (
                      <Badge
                        key={`${assessment.id}-${tag}`}
                        variant="outline"
                        className="bg-background/70 text-foreground/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {assessment.context.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 inline-flex h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Sparkles size={14} className="text-foreground/60" />
                      Click to view the full report
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      data-card-action="true"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedAssessment(assessment);
                      }}
                    >
                      View PDF
                    </Button>
                  </div>
                </article>
              </SideFromRightMotionProv>
            ))}
          </section>
        </div>

        <PdfViewerModal
          isOpen={Boolean(selectedAssessment)}
          onClose={() => {
            setSelectedAssessment(null);
          }}
          src={selectedAssessment ? resolveAssessmentSrc(selectedAssessment.fileName) : ''}
          title={selectedAssessment?.title ?? 'Assessment'}
          ariaLabel={selectedAssessment ? `${selectedAssessment.title} PDF preview` : 'Assessment PDF preview'}
        />
      </DynamicMotionProvider>
    </PageContainer>
  );
};

export default Assessments;
