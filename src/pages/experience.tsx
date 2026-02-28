import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SideFromRightMotionProv,
} from "../animations/DynamicMotion";
import { Badge } from "../../shadcn/components/ui/badge";
import { Typography } from "../common/Typography";
import CytechExperienceShowcase from "../components/cards/CytechExperienceShowcase";
import RoleExperienceCard, { type RoleExperienceCardProps } from "../components/cards/RoleExperienceCard";
import PageContainer from "../components/containers/PageContainer";
import { logos } from "../lib/constants/logos";
import cytechExperienceData from "../lib/data/cytech-experience-data.json";
import experienceData from "../lib/data/experience-data.json";

const CARD_STAGGER_STEP = 0.06;
const CARD_STAGGER_MAX = 0.3;
const CYTECH_URL = "https://www.cytechint.com/";
const PROJECTS_GRADIENT_SURFACE =
  "relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-cyan-100/80 via-white to-emerald-100/70 p-6 shadow-lg dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800";
const SKILLS_RADIAL_OVERLAY =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_48%)]";

const companyLogoByKey = {
  cytech: logos.cytech,
  logicbase: logos.logicbase,
  ustp: logos.ustp,
  manolo: logos.manolo,
  "lgu-manolo-fortich": logos.manolo,
} as const;

const resolveCompanyIcon = (
  icon: RoleExperienceCardProps["icon"],
  company: RoleExperienceCardProps["company"]
) => {
  if (typeof icon !== "string") {
    return icon ?? null;
  }

  const key = icon.trim().toLowerCase() as keyof typeof companyLogoByKey;
  const logoSrc = companyLogoByKey[key];

  if (!logoSrc) {
    return null;
  }

  const isCytech = key === "cytech";

  return (
    <span
      className={[
        "inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border p-1 shadow-sm",
        isCytech ? "border-border bg-card p-1.5 dark:bg-[#020202]" : "border-border bg-card",
      ].join(" ")}
    >
      <img
        src={logoSrc}
        alt={`${company} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
};

const getGeneralizedDateTag = (dates: string[]): string => {
  let hasPresent = false;
  const years = dates.flatMap((date) => {
    if (/present/i.test(date)) {
      hasPresent = true;
    }

    const matches = date.match(/\b(19|20)\d{2}\b/g);
    return matches ? matches.map(Number) : [];
  });

  if (years.length === 0) {
    return "Timeline unavailable";
  }

  const startYear = Math.min(...years);
  const endYear = hasPresent ? "Present" : String(Math.max(...years));
  return `${startYear} - ${endYear}`;
};

const Experience = () => {
  const cytechExperiences = (cytechExperienceData as RoleExperienceCardProps[]).map((experience) => ({
    ...experience,
    icon: resolveCompanyIcon(experience.icon, experience.company),
  }));

  const otherExperiences = (experienceData as RoleExperienceCardProps[]).map((experience) => ({
    ...experience,
    icon: resolveCompanyIcon(experience.icon, experience.company),
  }));

  return (
    <PageContainer className="w-full max-w-full space-y-4 overflow-x-hidden overflow-y-auto sm:space-y-6">
      <DynamicMotionProvider>
        <FadeUpMotionProv>
          <section className={PROJECTS_GRADIENT_SURFACE}>
            <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-500/15" />
            <div className="pointer-events-none absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/15" />
            <div className={SKILLS_RADIAL_OVERLAY} />

            <div className="relative z-10 max-w-3xl space-y-3">
              <Badge variant="outline" className="bg-background/80">
                Experience Timeline
              </Badge>
              <Typography variant="h2" className="leading-tight">
                Where I delivered impact across teams and roles.
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                Highlights from Cytech and other roles, with responsibilities, outcomes, and stack-level capabilities grouped in one view.
              </Typography>
            </div>
          </section>
        </FadeUpMotionProv>

        <CytechExperienceShowcase
          company="Cytech International"
          websiteUrl={CYTECH_URL}
          dateTag={getGeneralizedDateTag(cytechExperiences.map((experience) => experience.date))}
          experiences={cytechExperiences}
        />

        <FadeUpMotionProv className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/85 p-4 shadow-md sm:p-5">
          <div className={SKILLS_RADIAL_OVERLAY} />
          <div className="relative z-10 space-y-3">
            <Typography variant="h3">Other Experience</Typography>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {otherExperiences.map((experience, index) => (
                <SideFromRightMotionProv
                  key={`${experience.company}-${experience.role}-${index}`}
                  delay={Math.min((index + 1) * CARD_STAGGER_STEP, CARD_STAGGER_MAX)}
                >
                  <RoleExperienceCard
                    role={experience.role}
                    company={experience.company}
                    date={experience.date}
                    description={experience.description}
                    skills={experience.skills}
                    companyUrl={experience.companyUrl}
                    icon={experience.icon}
                  />
                </SideFromRightMotionProv>
              ))}
            </div>
          </div>
        </FadeUpMotionProv>
      </DynamicMotionProvider>
    </PageContainer>
  );
};

export default Experience;
