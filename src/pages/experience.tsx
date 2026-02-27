import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SideFromRightMotionProv,
} from "../animations/DynamicMotion";
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
    <PageContainer className="w-screen space-y-6 overflow-auto">
      <DynamicMotionProvider>
        <CytechExperienceShowcase
          company="Cytech International"
          websiteUrl={CYTECH_URL}
          dateTag={getGeneralizedDateTag(cytechExperiences.map((experience) => experience.date))}
          experiences={cytechExperiences}
        />

        <FadeUpMotionProv className="space-y-3">
          <Typography variant="h3">Other Experience</Typography>
          <div className="flex flex-wrap gap-4">
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
        </FadeUpMotionProv>
      </DynamicMotionProvider>
    </PageContainer>
  );
};

export default Experience;
