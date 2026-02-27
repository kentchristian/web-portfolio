import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SideFromRightMotionProv,
} from "../animations/DynamicMotion";
import { Typography } from "../common/Typography";
import CytechExperienceShowcase from "../components/cards/CytechExperienceShowcase";
import RoleExperienceCard, { type RoleExperienceCardProps } from "../components/cards/RoleExperienceCard";
import PageContainer from "../components/containers/PageContainer";
import cytechExperienceData from "../lib/data/cytech-experience-data.json";
import experienceData from "../lib/data/experience-data.json";

const CARD_STAGGER_STEP = 0.06;
const CARD_STAGGER_MAX = 0.3;

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
  const cytechExperiences = cytechExperienceData as RoleExperienceCardProps[];
  const otherExperiences = experienceData as RoleExperienceCardProps[];

  return (
    <PageContainer className="w-screen space-y-6 overflow-auto">
      <DynamicMotionProvider>
        <CytechExperienceShowcase
          company="Cytech International"
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
