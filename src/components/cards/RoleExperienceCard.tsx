import { Link } from "react-router";
import { Badge } from "../../../shadcn/components/ui/badge";
import ToolTip from "../../common/ToolTip";
import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";

export interface RoleExperienceCardProps {
  role: string;
  company: string;
  date: string;
  description: string[];
  skills: string[];
  companyUrl: string;
  icon?: React.ReactNode | string | null;

}

const COMPANY_NAME_CHAR_LIMIT = 26;

const truncateCompanyName = (company: string) => {
  if (company.length <= COMPANY_NAME_CHAR_LIMIT) {
    return company;
  }

  return `${company.slice(0, COMPANY_NAME_CHAR_LIMIT).trimEnd()}...`;
};

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
  const truncatedCompany = truncateCompanyName(company);
  const isCompanyTruncated = truncatedCompany !== company;

  return (
    <div
      className={cn(
        "cursor-pointer",
        "h-[37.5rem] w-full max-w-[25rem]",
        "border border-border bg-card text-card-foreground",
        "flex flex-col gap-2 overflow-hidden rounded-lg",
        "shadow-sm",
        "hover:opacity-50",
        "hover:opacity-100!",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",
        "will-change-transform"
      )}
    >
      <header className="flex flex-row items-center justify-between gap-3 border-b border-border p-2 shadow-sm">
        <div className="min-w-0 flex-1">
          {isCompanyTruncated ? (
            <ToolTip text={company} className="min-w-40 max-w-80">
              <Typography variant="h4" className="truncate">
                {truncatedCompany}
              </Typography>
            </ToolTip>
          ) : (
            <Typography variant="h4" className="truncate">
              {company}
            </Typography>
          )}
        </div>
        <span className="shrink-0">{icon}</span>
      </header>
      <Typography variant="caption" className="mx-2 flex justify-end text-muted-foreground">
        {date}
      </Typography>
      <Typography variant="h2" className="px-4">
        {role}
      </Typography>

      <section className="inline-block w-full p-2 gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="m-1 gap-1">
            {skill}
          </Badge>
        ))}
      </section>

      <ul className="themed-scrollbar ml-6 min-h-0 flex-1 list-disc overflow-auto pl-6">
        {description.map((desc, index) => (
          <li key={index} className="p-2">
            <Typography variant="body" className="text-muted-foreground">
              {desc}
            </Typography>
          </li>
        ))}
      </ul>

      {companyUrl ? (
        <footer className="mt-auto flex h-10 shrink-0 items-center justify-end border-t border-border px-3">
          <Link to={companyUrl} target="_blank" rel="noopener noreferrer">
            <Typography variant="body-sm" className="text-primary hover:underline">
              {company}
            </Typography>
          </Link>
        </footer>
      ) : null}


    </div >
  )
}

export default RoleExperienceCard
