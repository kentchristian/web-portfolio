import RoleExperienceCard, { type RoleExperienceCardProps } from "../components/cards/RoleExperienceCard"
import PageContainer from "../components/containers/PageContainer"
import experienceData from "../lib/data/experience-data.json"

const Experience = () => {
  return (
    <PageContainer className="gap-4 flex flex-wrap w-h w-screen overflow-auto">
      {experienceData.map((experience: RoleExperienceCardProps, index: number) => (
        <RoleExperienceCard
          key={index}
          role={experience.role}
          company={experience.company}
          date={experience.date}
          description={experience.description}
          skills={experience.skills}
          companyUrl={experience.companyUrl}
          icon={experience.icon}
        />
      ))}
    </PageContainer>

  )
}

export default Experience