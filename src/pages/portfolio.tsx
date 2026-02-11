
import {
  DynamicMotionProvider,
  FadeUpMotionProv,
  SlideLeftMotionProv,
  SlideRightMotionProv,
  ZoomInMotionProv,
} from "../animations/DynamicMotion";
import CertificationCard from "../components/cards/CertificationCard";
import EducationCard from "../components/cards/EducationCard";
import ExperienceCard from "../components/cards/ExperienceCard";
import SkillsCard from "../components/cards/SkillsCard";
import CardContainer from "../components/containers/CardContainer";
import PageContainer from "../components/containers/PageContainer";
import { icons } from "../lib/constants/icons";



const Portfolio = () => {

  const technicalSkills = [
    { skill: "JavaScript", icon: icons.typeScript },
    { skill: "TypeScript", icon: icons.typeScript },
    { skill: "React", icon: icons.typeScript },
    { skill: "Node.js", icon: icons.typeScript },
    { skill: "Python", icon: icons.typeScript },
    { skill: "Django", icon: icons.typeScript },
  ];

  const softSkills = [
    { skill: "Communication", icon: icons.typeScript },
    { skill: "Problem Solving", icon: icons.typeScript },
    { skill: "Collaboration", icon: icons.typeScript },
    { skill: "Adaptability", icon: icons.typeScript },
    { skill: "Time Management", icon: icons.typeScript },
    { skill: "Ownership", icon: icons.typeScript },
  ];

  return (
    <PageContainer className="h-full">
      <DynamicMotionProvider>
        <section className="mx-auto w-full max-w-[92rem] space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
            <FadeUpMotionProv className="xl:col-span-6">
              <CardContainer
                className="h-auto w-full"
                title="Experience"
                description="A compact timeline of work highlights, roles, and delivery impact."
                infoText="Experience timeline with role summaries and key outcomes."
              >
                <ExperienceCard />
              </CardContainer>
            </FadeUpMotionProv>

            <SlideRightMotionProv className="xl:col-span-3" delay={0.08}>
              <CardContainer
                className="h-auto w-full"
                title="Technical Skills"
                description="Core stack and engineering tools used in projects."
                infoText="Languages, frameworks, and tools currently used in development."
              >
                <SkillsCard data={technicalSkills} className="mt-2 border p-2" />
              </CardContainer>
            </SlideRightMotionProv>

            <SlideRightMotionProv className="xl:col-span-3" delay={0.12}>
              <CardContainer
                className="h-auto w-full"
                title="Soft Skills"
                description="Communication and execution strengths used across teams."
                infoText="Behavioral strengths used for planning, delivery, and collaboration."
              >
                <SkillsCard data={softSkills} className="mt-2 border p-2" />
              </CardContainer>
            </SlideRightMotionProv>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
            <SlideLeftMotionProv className="xl:col-span-6" delay={0.12}>
              <CardContainer
                className="h-auto w-full"
                title="Education"
                description="Academic foundation and formal learning background."
                infoText="Education history with institution, degree, and time period."
              >
                <EducationCard
                  className="mt-2 w-full max-w-none p-2"
                  icon={icons.typeScript}
                  institution="University of Scient and Technology (USTP)"
                  degree="Bachelor of Science in Infrmation Technology (BSIT)"
                  startDate="2018"
                  endDate="2022"
                />
              </CardContainer>
            </SlideLeftMotionProv>

            <ZoomInMotionProv className="xl:col-span-6" delay={0.16}>
              <CardContainer
                className="h-auto w-full"
                title="Certifications"
                description="Validated credentials for cloud and engineering practice."
                infoText="Professional certifications and their validity window."
              >
                <CertificationCard
                  className="mt-2 h-auto w-full max-w-none"
                  icon={icons.typeScript}
                  certificationName="AWS Certified Solutions Architect - Associate"
                  issuingOrganization="Amazon Web Services (AWS)"
                  issueDate="2023"
                />
              </CardContainer>
            </ZoomInMotionProv>
          </div>
        </section>
      </DynamicMotionProvider>
    </PageContainer >
  );
};

export default Portfolio;
