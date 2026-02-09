import { Badge } from "../../shadcn/components/ui/badge";
import { Button } from "../../shadcn/components/ui/button";
import ToolTip from "../common/ToolTip";

import { Typography } from "../common/Typography";
import ContentDisplay from "../components/cards/ContentDisplay";
import PageContainer from "../components/containers/PageContainer";
import { cn } from "../lib/cnUtils";
import { biography } from "../lib/constants/biography";
import { icons } from "../lib/constants/icons";
import { images } from "../lib/constants/images";


/** DEFAULT Scrollbar Config */
const SCROLLBAR_CONFIG = "overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
const ICON = "bg-transparent text-black/90 dark:text-white border border-black/60 dark:border-white/70 p-1 rounded cursor-pointer hover:bg-accent/20 hover:text-black";
const Dashboard = () => {

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
    { name: 'LinkedIn', icon: icons.linkedIn, fn: () => window.open('https://www.linkedin.com/in/keysii/', '_blank') },
    { name: 'GitHub', icon: icons.github, fn: () => window.open('https://github.com/keysii', '_blank') },
    { name: 'Resume / CV', icon: icons.cv, fn: () => window.open('/resume.pdf', '_blank') },
  ]

  return (
    <PageContainer className="h-full">
      <div className="grid grid-cols-[1.5fr_3fr] h-120 ">
        <section className={
          cn(
            "p-5",
            SCROLLBAR_CONFIG,
          )
        }>
          <ContentDisplay className="relative w-full h-full">
            <img
              src={images.lightProfPic}
              alt="profile-pic"
              className="w-full h-105 object-cover rounded-md block dark:hidden"
            />

            <img
              src={images.darkProfPic}
              alt="profile-pic"
              className="w-full h-105 object-cover rounded-md hidden dark:block"
            />
            {/* Overlay icons */}
            <div className="absolute top-65 left-5 flex flex-col space-y-1 z-20">
              {businessIcons.map(({ name, icon, fn }) => (
                <ToolTip key={name} text={name}>
                  <Button className={ICON} onClick={fn}>{icon}</Button>
                </ToolTip>
              ))}
            </div>

          </ContentDisplay>
        </section>
        <section className={
          cn(
            "p-5",
            SCROLLBAR_CONFIG,
          )
        }>
          <ContentDisplay className="relative w-full h-full overflow-hidden">
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

            {roles.map((role, index) => (
              // Create Custom Component for Role Item
              <div
                onClick={() => { alert(role) }}
                key={index + role}
                className="mt-4 mr-2 hover:cursor-pointer border rounded-md p-2 inline-block">
                {role}
              </div>
            ))}

            <Badge
              onClick={() => { alert('Get in Touch') }}
              className="mt-16 p-4 w-40 flex hover:cursor-pointer">
              <Typography variant="overline" className="">Get In Touch</Typography>
            </Badge>

          </ContentDisplay>
          <div className="mt-2 flex flex-row h-20">
            {experience.map((exp, index) => (
              <div
                key={index + exp.amount}
                className="px-8 border-r flex flex-col items-center justify-center">
                <Typography variant="h4">{exp.amount}</Typography>
                <Typography variant="caption">{exp.desc}</Typography>
              </div>
            ))}
          </div>
        </section>
      </div>

    </PageContainer >
  )
};

export default Dashboard;
