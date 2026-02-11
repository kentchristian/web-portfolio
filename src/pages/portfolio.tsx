
import CertificationCard from "../components/cards/CertificationCard";
import EducationCard from "../components/cards/EducationCard";
import ExperienceCard from "../components/cards/ExperienceCard";
import SkillsCard from "../components/cards/SkillsCard";
import PageContainer from "../components/containers/PageContainer";
import { icons } from "../lib/constants/icons";



const Portfolio = () => {

  const skillsData = [
    { skill: 'JavaScript', icon: icons.typeScript },
    { skill: 'TypeScript', icon: icons.typeScript },
    { skill: 'React', icon: icons.typeScript },
    { skill: 'Node.js', icon: icons.typeScript },
    { skill: 'Python', icon: icons.typeScript },
    { skill: 'Django', icon: icons.typeScript },
  ]
  return (
    <PageContainer className="h-full">
      <ExperienceCard />
      <SkillsCard data={skillsData} className="border p-2 mt-2 w-120" />
      <EducationCard
        className="p-2 mt-2"
        icon={icons.typeScript}
        institution="University of Scient and Technology (USTP)"
        degree="Bachelor of Science in Infrmation Technology (BSIT)"
        startDate="2018"
        endDate="2022" />
      <CertificationCard
        className="border p-2 mt-2"
        icon={icons.typeScript}
        certificationName="AWS Certified Solutions Architect - Associate"
        issuingOrganization="Amazon Web Services (AWS)"
        issueDate="2023"
      />
    </PageContainer >
  )
};

export default Portfolio;
