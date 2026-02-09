import { Badge } from "../../shadcn/components/ui/badge";
import { Typography } from "../common/Typography";
import ContentDisplay from "../components/cards/ContentDisplay";
import PageContainer from "../components/containers/PageContainer";
import { cn } from "../lib/cnUtils";
import { biography } from "../lib/constants/biography";
import { images } from "../lib/constants/images";


/** DEFAULT Scrollbar Config */
const SCROLLBAR_CONFIG = "overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"

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
            <img src={images.profile} alt="profile-pic" className="w-full h-105 object-cover rounded-md" />

            {/* Overlay icons */}
            <div className="absolute top-60 left-20 flex space-x-2 z-20">
              <div className="bg-blue-600 text-white px-2 py-1 rounded cursor-pointer">LI</div>
              <div className="bg-gray-800 text-white px-2 py-1 rounded cursor-pointer">GH</div>
            </div>

            <div className="absolute top-70 left-20 flex">
              <Badge
                className="hover:cursor-pointer p-2"
                onClick={() => {
                  alert('download_cv')
                }}>Download CV</Badge>
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

    </PageContainer>
  )
};

export default Dashboard;
