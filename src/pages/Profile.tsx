import { ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';
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
import { useNavigate } from 'react-router-dom';

import { Button } from '../../shadcn/components/ui/button';
import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SlideLeftMotionProv,
  SlideRightMotionProv,
  ZoomInMotionProv,
} from '../animations/DynamicMotion';
import { Typography } from '../common/Typography';
import PageContainer from '../components/containers/PageContainer';
import ProfileRadarChart from '../components/profile/ProfileRadarChart';
import { images } from '../lib/constants/images';
import { buildProfileDashboardData } from '../lib/profile/profile-stats';

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

const Profile = () => {
  const navigate = useNavigate();
  const { coreStats, radarMetrics, projectTracks, derivedSkills, insights } =
    useMemo(buildProfileDashboardData, []);

  return (
    <PageContainer className="h-full overflow-x-hidden">
      <DynamicMotionProvider>
        <div className="mx-auto w-full max-w-7xl space-y-4">
          <FadeUpMotionProv>
            <section className="rounded-2xl border border-border/80 bg-background/70 p-4 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Typography
                    variant="overline"
                    className="text-emerald-500 dark:text-emerald-300"
                  >
                    Full Profile
                  </Typography>
                  <Typography
                    variant="h2"
                    className="mt-1 text-2xl sm:text-3xl"
                  >
                    Career Overview
                  </Typography>
                  <Typography
                    variant="body-sm"
                    className="mt-2 text-muted-foreground"
                  >
                    Skills, projects, derived strengths, and key delivery
                    insights.
                  </Typography>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <ArrowLeft size={16} />
                  Back Home
                </Button>
              </div>
            </section>
          </FadeUpMotionProv>

          <div className="grid gap-4 xl:grid-cols-[minmax(19rem,0.9fr)_1.3fr]">
            <SlideRightMotionProv className="space-y-4" delay={0.06}>
              <article className="overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-emerald-500/10 via-background to-amber-500/10">
                <div className="relative h-56">
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
                  <Typography
                    variant="overline"
                    className="text-emerald-500 dark:text-emerald-300"
                  >
                    Professional Focus
                  </Typography>
                  <Typography variant="h3" className="mt-1 text-lg sm:text-xl">
                    Kent Christian // Full-Stack Web Developer
                  </Typography>
                  <Typography
                    variant="body-sm"
                    className="mt-2 text-muted-foreground"
                  >
                    Career focus is web development, reflected through role
                    history, delivery initiatives, and applied capabilities.
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
                      <Typography
                        variant="caption"
                        className="text-muted-foreground"
                      >
                        {stat.label}
                      </Typography>
                    </div>
                  ))}
                </div>
              </article>

              <ZoomInMotionProv>
                <article className="rounded-2xl border border-sky-500/25 bg-linear-to-br from-slate-500/10 via-background to-sky-500/10 p-4">
                  <Typography
                    variant="h4"
                    className="flex items-center gap-2 text-lg"
                  >
                    <FaChartLine
                      className="text-sky-500 dark:text-sky-300"
                      size={18}
                    />
                    Derived Skills
                  </Typography>
                  <div className="mt-3 space-y-3">
                    {derivedSkills.map((skill) => {
                      const SkillIcon =
                        DERIVED_SKILL_ICONS[skill.label] ?? FaChartLine;

                      return (
                        <div key={skill.label}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex size-6 items-center justify-center rounded-md border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300">
                                <SkillIcon size={13} />
                              </span>
                              <Typography variant="body-sm">
                                {skill.label}
                              </Typography>
                            </div>
                            <Typography
                              variant="body-sm"
                              className="font-semibold"
                            >
                              {skill.score}%
                            </Typography>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-muted/70">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-slate-600 via-sky-500 to-cyan-500"
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                          <Typography
                            variant="caption"
                            className="mt-1 block text-muted-foreground"
                          >
                            {skill.note}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </ZoomInMotionProv>
            </SlideRightMotionProv>

            <SlideLeftMotionProv className="space-y-4" delay={0.1}>
              <article className="rounded-2xl border border-border/80 bg-background/70 p-4">
                <Typography variant="h4" className="text-lg">
                  Skill Radar (Web Chart)
                </Typography>
                <Typography
                  variant="body-sm"
                  className="mt-1 text-muted-foreground"
                >
                  Capability signal inferred from projects and responsibilities.
                </Typography>

                <div className="mt-4 flex justify-center">
                  <ProfileRadarChart metrics={radarMetrics} />
                </div>
              </article>

              <article className="rounded-2xl border border-cyan-500/25 bg-linear-to-br from-cyan-500/10 via-background to-teal-500/10 p-4">
                <Typography
                  variant="h4"
                  className="flex items-center gap-2 text-lg"
                >
                  <FaProjectDiagram
                    className="text-cyan-500 dark:text-cyan-300"
                    size={18}
                  />
                  Project Distribution
                </Typography>
                <div className="mt-3 space-y-3">
                  {projectTracks.map((track) => {
                    const TrackIcon =
                      PROJECT_TRACK_ICONS[track.label] ?? FaProjectDiagram;

                    return (
                      <div key={track.label}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex size-6 items-center justify-center rounded-md border border-cyan-500/35 bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                              <TrackIcon size={13} />
                            </span>
                            <Typography variant="body-sm">
                              {track.label}
                            </Typography>
                          </div>
                          <Typography
                            variant="caption"
                            className="font-semibold text-muted-foreground"
                          >
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

              <ZoomInMotionProv>
                <article className="rounded-2xl border border-amber-500/25 bg-linear-to-br from-amber-500/10 via-background to-slate-500/10 p-4">
                  <Typography
                    variant="h4"
                    className="flex items-center gap-2 text-lg"
                  >
                    <FaLightbulb
                      className="text-amber-500 dark:text-amber-300"
                      size={18}
                    />
                    Insights Learned
                  </Typography>
                  <div className="mt-3 space-y-2">
                    {insights.map((insight) => {
                      const InsightIcon =
                        INSIGHT_ICONS[insight.title] ?? FaLightbulb;

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
                              <Typography
                                variant="body-sm"
                                className="font-semibold"
                              >
                                {insight.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-muted-foreground"
                              >
                                {insight.detail}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </ZoomInMotionProv>
            </SlideLeftMotionProv>
          </div>
        </div>
      </DynamicMotionProvider>
    </PageContainer>
  );
};

export default Profile;
