import { motion } from "framer-motion";
import CytechExperienceShowcase from "../components/cards/CytechExperienceShowcase";
import RoleExperienceCard, { type RoleExperienceCardProps } from "../components/cards/RoleExperienceCard";
import PageContainer from "../components/containers/PageContainer";
import { Typography } from "../common/Typography";
import cytechExperienceData from "../lib/data/cytech-experience-data.json";
import experienceData from "../lib/data/experience-data.json";

const revealTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

const revealViewport = {
  once: true,
  amount: 0.22,
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
  const cytechExperiences = cytechExperienceData as RoleExperienceCardProps[];
  const otherExperiences = experienceData as RoleExperienceCardProps[];

  return (
    <PageContainer className="w-screen space-y-6 overflow-auto">
      <CytechExperienceShowcase
        company="Cytech International"
        dateTag={getGeneralizedDateTag(cytechExperiences.map((experience) => experience.date))}
        experiences={cytechExperiences}
      />

      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <Typography variant="h3">Other Experience</Typography>
        <div className="flex flex-wrap gap-4">
          {otherExperiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.role}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{
                ...revealTransition,
                delay: Math.min(index * 0.05, 0.22),
              }}
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
            </motion.div>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default Experience;
