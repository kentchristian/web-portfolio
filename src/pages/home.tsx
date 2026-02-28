import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shadcn/components/ui/button';
import {
  DynamicMotionProvider,
  FadeInMotionProv,
  MotionImageMotionProv,
  SideFromRightMotionProv,
} from '../animations/DynamicMotion';
import ToolTip from '../common/ToolTip';

import { Typography } from '../common/Typography';
import ContentDisplay from '../components/cards/ContentDisplay';
import PageContainer from '../components/containers/PageContainer';
import { cn } from '../lib/cnUtils';
import { biography } from '../lib/constants/biography';
import { icons } from '../lib/constants/icons';
import { images } from '../lib/constants/images';
import cytechExperienceData from '../lib/data/cytech-experience-data.json';
import experienceData from '../lib/data/experience-data.json';


/** DEFAULT Scrollbar Config */
const SCROLLBAR_CONFIG = 'overflow-auto themed-scrollbar';
const SOCIAL_BUTTON_CLASS =
  'size-10 rounded-full border border-white/55 bg-black/30 text-white shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:bg-black/45';

type ExperienceSignal = {
  company: string;
  companyUrl?: string;
  skills: string[];
};

const Home = () => {
  const navigate = useNavigate();

  const roles = [
    biography.webDev,
    biography.techWriter,
  ];

  const experienceSignals = useMemo(() => {
    const entries = [...cytechExperienceData, ...experienceData] as ExperienceSignal[];

    const initiatives = entries.length;
    const organizations = new Set(
      entries.map((entry) => (entry.companyUrl?.trim() ? entry.companyUrl : entry.company))
    ).size;
    const appliedSkills = new Set(
      entries.flatMap((entry) => entry.skills.map((skill) => skill.trim().toLowerCase()))
    ).size;

    return [
      { amount: '2+ Years', desc: 'of Experience' },
      { amount: `${initiatives}`, desc: 'Delivery Initiatives' },
      { amount: `${appliedSkills}`, desc: 'Skills Applied' },
      { amount: `${organizations}`, desc: 'Organizations Worked With' },
    ];
  }, []);

  const businessIcons = [
    { name: 'LinkedIn', icon: icons.linkedIn, fn: () => window.open('https://www.linkedin.com/in/kent-christian-cagadas-0985a1350/', '_blank') },
    { name: 'GitHub', icon: icons.github, fn: () => window.open('https://github.com/kentchristian', '_blank') },
    { name: 'Resume / CV', icon: icons.cv, fn: () => window.open('/resume.pdf', '_blank') },
  ];

  return (
    <PageContainer className="h-full overflow-x-hidden">
      <DynamicMotionProvider>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(18rem,1.1fr)_2fr] md:gap-5">
          <section className={
            cn(
              'p-3 sm:p-4 md:p-5',
              SCROLLBAR_CONFIG,
            )
          }>
            <MotionImageMotionProv className="overflow-hidden rounded-xl">
              <ContentDisplay className="relative !h-auto min-h-[22rem] !w-full overflow-hidden border-0 !p-0 sm:min-h-[26rem] md:min-h-[32rem]">
                <img
                  src={images.lightProfPic}
                  alt="profile-pic"
                  className="absolute inset-0 block h-full w-full object-cover object-center dark:hidden"
                />

                <img
                  src={images.darkProfPic}
                  alt="profile-pic"
                  className="absolute inset-0 hidden h-full w-full object-cover object-center dark:block"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/25 to-black/75" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-4 sm:p-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-black/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                    <Sparkles size={13} />
                    Open For Collaboration
                  </span>

                  <div>
                    <Typography variant="h2" className="text-white">Kent Christian</Typography>
                    <Typography variant="body-sm" className="mt-2 max-w-sm text-white/90">
                      Building scalable web applications with clean architecture, smooth UX, and production-grade reliability.
                    </Typography>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {businessIcons.map(({ name, icon, fn }) => (
                      <ToolTip key={name} text={name}>
                        <Button
                          type="button"
                          className={SOCIAL_BUTTON_CLASS}
                          onClick={fn}
                          aria-label={name}
                        >
                          {icon}
                        </Button>
                      </ToolTip>
                    ))}
                  </div>
                </div>
              </ContentDisplay>
            </MotionImageMotionProv>

          </section>
          <section className={
            cn(
              'p-3 sm:p-4 md:p-5',
              SCROLLBAR_CONFIG,
            )
          }>
            <FadeInMotionProv>
              <ContentDisplay className="relative !h-auto min-h-[24rem] !w-full overflow-hidden border-0 !p-5 sm:min-h-[26rem] sm:!p-6 md:!p-8">
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-black/10 blur-3xl dark:bg-white/15" />
                  <div className="absolute -bottom-20 right-[-4rem] h-64 w-64 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />
                  <img
                    src={images.bg}
                    alt="background"
                    className="h-full w-full object-cover object-[65%_25%] opacity-30 saturate-75 brightness-110 dark:opacity-35 dark:saturate-90 dark:brightness-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/70 to-white/80 dark:from-[#020202]/55 dark:via-[#020202]/66 dark:to-[#020202]/75" />
                  <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(255,255,255,0.45),rgba(255,255,255,0))] dark:bg-[radial-gradient(80%_60%_at_20%_10%,rgba(2,2,2,0.4),rgba(2,2,2,0))]" />
                </div>

                <Typography variant="overline" className="ml-auto inline-flex w-fit rounded-full border border-foreground/30 bg-background/60 px-3 py-1 backdrop-blur-sm">
                  Portfolio Snapshot
                </Typography>

                <Typography variant="h1" className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  I build functional, user-customized web products.
                </Typography>

                <Typography variant="body" className="mt-4 max-w-3xl text-foreground/85">
                  I&apos;m a <strong>{biography.webDev}</strong> specializing in React and TypeScript, focused on features that solve real workflows and deliver practical business value.
                </Typography>

                <Typography variant="body" className="mt-3 max-w-3xl text-foreground/80">
                  I deliver user-customized products tailored to your goals, your users, and long-term maintainability. I also work as a <strong>{biography.techWriter}</strong>, producing documentation that keeps teams aligned and shipping confidently.
                </Typography>

                <div className="mt-5 flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-foreground/25 bg-background/65 px-3 py-1 text-xs font-semibold tracking-wide text-foreground/90 backdrop-blur-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      navigate('projects');
                    }}
                    className="min-w-40"
                  >
                    View Projects
                    <ArrowRight size={16} />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      navigate('experience');
                    }}
                    className="min-w-40"
                  >
                    See Experience
                  </Button>
                </div>

              </ContentDisplay>
            </FadeInMotionProv>


            <div className="overflow-x-hidden">
              <SideFromRightMotionProv delay={0.5}>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {experienceSignals.map((exp) => (
                    <article
                      key={`${exp.amount}-${exp.desc}`}
                      className="group relative overflow-hidden rounded-xl border bg-background/60 px-4 py-5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-foreground/35"
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-foreground/35 to-transparent opacity-70 transition duration-200 group-hover:opacity-100" />
                      <Typography variant="h3" className="tracking-tight">{exp.amount}</Typography>
                      <Typography variant="body-sm" className="mt-1 text-muted-foreground">
                        {exp.desc}
                      </Typography>
                    </article>
                  ))}
                </div>
              </SideFromRightMotionProv>
            </div>


          </section>
        </div>
      </DynamicMotionProvider>

    </PageContainer >
  );
};

export default Home;
