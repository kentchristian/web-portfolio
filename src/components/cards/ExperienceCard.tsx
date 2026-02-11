import { Button } from "../../../shadcn/components/ui/button";
import { Typography } from "../../common/Typography";
import { icons } from "../../lib/constants/icons";




const ExperienceCard = () => {

  return (
    <>
      {/* Experience Card */}
      <div className="grid grid-cols-[1.5fr_3fr] shadow-sm">
        {/* button */}
        <section className="flex flex-col border-r-0 border rounded-sm items-center justify-center overflow-auto themed-scrollbar themed-scrollbar-hover">
          {[1997, 2025, 2026].map((year: number) => (
            <Button key={year} className="mb-2">
              {year}. Company Name -
            </Button>
          ))}
        </section>

        {/* Content */}
        <article className="p-5 border rounded-sm overflow-auto themed-scrollbar themed-scrollbar-hover max-h-70">
          <div className="flex flex-row space-x-2 items-center mb-2">
            <div
              className="w-8 h-8 bg-transparent text-black/90 dark:text-white border border-black/60 dark:border-white/70 p-1 rounded cursor-pointer hover:bg-accent/20 hover:text-black flex items-center justify-center"
              onClick={() => window.open('https://www.linkedin.com/in/keysii/', '_blank')}
            >
              {icons.linkedIn}
            </div>
            <Typography variant="h2">
              Company Name
            </Typography>
          </div>

          <Typography variant="caption" className="mb-4">Company Description</Typography>
          {[1, 2, 3, 4, 5, 6].map((desc: number) => (
            <li key={desc} className="ml-5 ">
              <Typography variant="h4" className="mb-1">
                Role Title
              </Typography>
              <Typography variant="body-sm" className="mb-2">
                {desc}. Description of work experience, projects, and achievements at the company.
              </Typography>
            </li>
          ))}
        </article>
      </div >

    </>

  )
};

export default ExperienceCard;
