import { Link } from "react-router";
import { Badge } from "../../../shadcn/components/ui/badge";
import { Typography } from "../../common/Typography";

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
    <div className="max-h-70 border flex flex-col">
      <header className="flex flex-row p-2 items-center justify-between border-b shadow-sm">
        <Typography variant="h4">{company}</Typography>
        {icon}
      </header>
      <Typography variant="caption" className="justify-end">{date}</Typography>
      <Typography variant="h3" className="p-2">{role}</Typography>

      <section className="inline-block w-full p-2 gap-2">
        {skills.map((skill) => (
          <Badge key={skill} className="m-1 gap-1">
            {skill}
          </Badge>
        ))}
      </section>

      <ul>
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


    </div>
  )
}

export default RoleExperienceCard