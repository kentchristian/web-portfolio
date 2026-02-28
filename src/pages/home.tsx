import { Button } from "../../shadcn/components/ui/button";
import {
  DynamicMotionProvider,
  FadeInMotionProv,
  MotionImageMotionProv,
  SideFromRightMotionProv,
} from "../animations/DynamicMotion";
import ToolTip from "../common/ToolTip";

import { Typography } from "../common/Typography";
import ContentDisplay from "../components/cards/ContentDisplay";
import PageContainer from "../components/containers/PageContainer";
import { cn } from "../lib/cnUtils";
import { biography } from "../lib/constants/biography";
import { icons } from "../lib/constants/icons";
import { images } from "../lib/constants/images";


/** DEFAULT Scrollbar Config */
const SCROLLBAR_CONFIG = "overflow-auto themed-scrollbar";
const ICON = "bg-transparent text-black/90 dark:text-white border border-black/60 dark:border-white/70 p-1 rounded cursor-pointer hover:bg-accent/20 hover:text-black";


const Home = () => {

  const roles = [
    biography.webDev,
    biography.techWriter,
  ]

  const experience = [
    { amount: '2+ Years', desc: 'of Exprience' },
    { amount: '10+', desc: 'Projects Completed' },
    { amount: '500k+', desc: 'Lines of Code' }
  ]

  const businessIcons = [
    { name: 'LinkedIn', icon: icons.linkedIn, fn: () => window.open('https://www.linkedin.com/in/kent-christian-cagadas-0985a1350/', '_blank') },
    { name: 'GitHub', icon: icons.github, fn: () => window.open('https://github.com/kentchristian', '_blank') },
    { name: 'Resume / CV', icon: icons.cv, fn: () => window.open('/resume.pdf', '_blank') },
  ]

  return (
    <PageContainer className="h-full overflow-x-hidden">
      <DynamicMotionProvider>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(16rem,1.2fr)_2fr] md:gap-5">
          <section className={
            cn(
              "p-3 sm:p-4 md:p-5",
              SCROLLBAR_CONFIG,
            )
          }>
            <MotionImageMotionProv className="overflow-hidden rounded-md">
              <ContentDisplay className="relative border-0 h-auto min-h-[15rem] w-full overflow-hidden sm:min-h-[20rem] md:min-h-[30rem]">
                <img
                  src={images.lightProfPic}
                  alt="profile-pic"
                  className="block h-[15rem] w-full rounded-md object-cover dark:hidden sm:h-[24rem] md:h-[34rem]"
                />

                <img
                  src={images.darkProfPic}
                  alt="profile-pic"
                  className="hidden h-[15rem] w-full rounded-md object-cover dark:block sm:h-[24rem] md:h-[34rem]"
                />
                {/* Overlay icons */}
                <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1">
                  {businessIcons.map(({ name, icon, fn }) => (
                    <ToolTip key={name} text={name}>
                      <Button className={ICON} onClick={fn}>{icon}</Button>
                    </ToolTip>
                  ))}
                </div>
              </ContentDisplay>
            </MotionImageMotionProv>

          </section>
          <section className={
            cn(
              "p-3 sm:p-4 md:p-5",
              SCROLLBAR_CONFIG,
            )
          }>
            <FadeInMotionProv>
              <ContentDisplay className="relative h-auto min-h-[20rem] w-full sm:min-h-[22rem] md:min-h-[24rem]">
                <div className="absolute inset-0 -z-10">
                  <img
                    src={images.bg}
                    alt="background"
                    className="w-full h-full object-cover object-[65%_25%] opacity-30 saturate-75 brightness-110 dark:opacity-45 dark:saturate-90 dark:brightness-85"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/65 to-white/90 dark:from-[#020202]/30 dark:via-[#020202]/45 dark:to-[#020202]/65" />
                  <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(255,255,255,0.5),rgba(255,255,255,0))] dark:bg-[radial-gradient(80%_60%_at_20%_10%,rgba(2,2,2,0.35),rgba(2,2,2,0))]" />
                </div>

                <Typography variant="body" className="mt-4">
                  I'm a <strong>{biography.webDev}</strong> specializing in React and TypeScript, building scalable, maintainable, and efficient web applications. I focus on clean architecture, high performance, and future-proof solutions that turn complex requirements into reliable, production-ready systems.
                </Typography>
                <Typography variant="body" className="mt-4">
                  I'm also a <strong>{biography.techWriter}</strong> producing clear, structured, and versioned documentation for both users and developers. I document system architecture, technical workflows, and step-by-step guides to make projects easier to understand, maintain, and scale.
                </Typography>

                <div className="mt-4 flex flex-wrap gap-2">
                  {roles.map((role, index) => (
                    // Create Custom Component for Role Item
                    <div
                      onClick={() => { alert(role) }}
                      key={index + role}
                      className="hover:cursor-pointer border rounded-md p-2">
                      {role}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => { alert('Get in Touch') }}
                  className="mt-6 flex w-full max-w-44 p-4 hover:cursor-pointer">
                  <Typography variant="overline" className="">Get In Touch</Typography>
                </Button>

              </ContentDisplay>
            </FadeInMotionProv>


            <div className="overflow-x-hidden">
              <SideFromRightMotionProv delay={1}>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0">
                  {experience.map((exp, index) => (
                    <div
                      key={index + exp.amount}
                      className={cn(
                        "flex h-20 flex-col items-center justify-center rounded-md border px-4",
                        "sm:rounded-none sm:border-y-0 sm:border-l-0 sm:border-r",
                        index === 0 && "sm:border-l"
                      )}
                    >
                      <Typography variant="h4">{exp.amount}</Typography>
                      <Typography variant="caption">{exp.desc}</Typography>
                    </div>
                  ))}
                </div>
              </SideFromRightMotionProv>
            </div>


          </section>
        </div>
      </DynamicMotionProvider>

    </PageContainer >
  )
};

export default Home;
