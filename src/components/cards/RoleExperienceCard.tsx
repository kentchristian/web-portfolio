import { Link } from "react-router";
import { Badge } from "../../../shadcn/components/ui/badge";
import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";

interface RoleExperienceCardProps {
  role: string;
  company: string;
  date: string;
  description: string[];
  skills: string[];
  companyUrl: string;
  icon?: React.ReactNode;

}

const RoleExperienceCard = ({
  role,
  company,
  date,
  description,
  skills,
  companyUrl,
  icon
}: RoleExperienceCardProps
) => {
  return (
    <div
      className={cn(
        "cursor-pointer",
        "max-h-150 max-w-100",
        "border border-gray-200 bg-white",
        "flex flex-col gap-2 overflow-auto scroll-thin rounded-lg",
        "shadow-sm",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",
        "will-change-transform"
      )}
    >
      <header className="flex flex-row p-2 items-center justify-between border-b shadow-sm">
        <Typography variant="h4">{company}</Typography>
        {icon}
      </header>
      <Typography variant="caption" className="flex justify-end mx-2">{date}</Typography>
      <Typography variant="h2" className="px-4">{role}</Typography>

      <section className="inline-block w-full p-2 gap-2">
        {skills.map((skill) => (
          <Badge key={skill} className="m-1 gap-1">
            {skill}
          </Badge>
        ))}
      </section>

      <ul className="list-disc pl-6 ml-6 max-h-50 overflow-auto themed-scrollbar">
        {description.map((desc, index) => (
          <li key={index} className="p-2">
            <Typography variant="body">{desc}</Typography>
          </li>
        ))}
      </ul>

      <footer className="p-2 border-t flex justify-end items-center">
        <Link to={companyUrl} target="_blank" rel="noopener noreferrer">
          <Typography variant="body-sm" className="text-blue-500 hover:underline">
            {company}
          </Typography>
        </Link>
      </footer>


    </div >
  )
}

export default RoleExperienceCard