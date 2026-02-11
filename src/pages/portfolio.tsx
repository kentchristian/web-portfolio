
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
import PageContainer from "../components/containers/PageContainer";
import { Typography } from "../common/Typography";
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
              <section className="h-auto w-full rounded-xl p-4 shadow-sm">
                <header className="mb-3">
                  <Typography variant="h3">Experience</Typography>
                  <Typography variant="caption" className="mt-1">
                    A compact timeline of work highlights, roles, and delivery impact.
                  </Typography>
                </header>
                <ExperienceCard />
              </section>
            </FadeUpMotionProv>

            <SlideRightMotionProv className="xl:col-span-3" delay={0.08}>
              <section className="h-auto w-full rounded-xl p-4 shadow-sm">
                <header className="mb-3">
                  <Typography variant="h3">Technical Skills</Typography>
                  <Typography variant="caption" className="mt-1">
                    Core stack and engineering tools used in projects.
                  </Typography>
                </header>
                <SkillsCard data={technicalSkills} className="mt-2 border p-2" />
              </section>
            </SlideRightMotionProv>

            <SlideRightMotionProv className="xl:col-span-3" delay={0.12}>
              <section className="h-auto w-full rounded-xl p-4 shadow-sm">
                <header className="mb-3">
                  <Typography variant="h3">Soft Skills</Typography>
                  <Typography variant="caption" className="mt-1">
                    Communication and execution strengths used across teams.
                  </Typography>
                </header>
                <SkillsCard data={softSkills} className="mt-2 border p-2" />
              </section>
            </SlideRightMotionProv>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
            <SlideLeftMotionProv className="xl:col-span-6" delay={0.12}>
              <section className="h-auto w-full rounded-xl p-4 shadow-sm">
                <header className="mb-3">
                  <Typography variant="h3">Education</Typography>
                  <Typography variant="caption" className="mt-1">
                    Academic foundation and formal learning background.
                  </Typography>
                </header>
                <EducationCard
                  className="mt-2 w-full max-w-none p-2"
                  icon={icons.typeScript}
                  institution="University of Scient and Technology (USTP)"
                  degree="Bachelor of Science in Infrmation Technology (BSIT)"
                  startDate="2018"
                  endDate="2022"
                />
              </section>
            </SlideLeftMotionProv>

            <ZoomInMotionProv className="xl:col-span-6" delay={0.16}>
              <section className="h-auto w-full rounded-xl p-4 shadow-sm">
                <header className="mb-3">
                  <Typography variant="h3">Certifications</Typography>
                  <Typography variant="caption" className="mt-1">
                    Validated credentials for cloud and engineering practice.
                  </Typography>
                </header>
                <CertificationCard
                  className="mt-2 h-auto w-full max-w-none"
                  icon={icons.typeScript}
                  certificationName="AWS Certified Solutions Architect - Associate"
                  issuingOrganization="Amazon Web Services (AWS)"
                  issueDate="2023"
                />
              </section>
            </ZoomInMotionProv>
          </div>
        </section>
      </DynamicMotionProvider>
    </PageContainer >
  );
};

export default Portfolio;
