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
  icon,
}: RoleExperienceCardProps) => {
  const truncatedCompany = truncateCompanyName(company);
  const isCompanyTruncated = truncatedCompany !== company;

  return (
    <div
      className={cn(
        "cursor-pointer",
        "h-auto min-h-[28rem] w-full min-w-0 max-w-full sm:h-[30rem] sm:max-w-[25rem]",
        "border border-border bg-card text-card-foreground",
        "flex flex-col gap-2 overflow-hidden rounded-lg",
        "shadow-sm",
        "hover:opacity-95",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",
        "will-change-transform"
      )}
    >
      <header className="flex flex-row items-center justify-between gap-3 border-b border-border p-2 shadow-sm">
        <div className="min-w-0 flex-1">
          {isCompanyTruncated ? (
            <ToolTip text={company} className="min-w-40 max-w-80">
              <Typography variant="body-lg" weight={600} className="truncate leading-tight">
                {truncatedCompany}
              </Typography>
            </ToolTip>
          ) : (
            <Typography variant="body-lg" weight={600} className="truncate leading-tight">
              {company}
            </Typography>
          )}
        </div>
        <span className="shrink-0">{icon}</span>
      </header>
      <Typography variant="caption" className="mx-2 flex justify-end text-muted-foreground">
        {date}
      </Typography>
      <Typography variant="h4" className="px-4 leading-tight break-words">
        {role}
      </Typography>

      <section className="flex w-full flex-wrap gap-1.5 px-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="m-1 gap-1 text-[11px]">
            {skill}
          </Badge>
        ))}
      </section>

      <ul className="themed-scrollbar ml-4 min-h-0 flex-1 list-disc overflow-auto pl-4 sm:ml-6 sm:pl-6">
        {description.map((desc, index) => (
          <li key={index} className="p-2">
            <Typography variant="body-sm" className="leading-relaxed text-muted-foreground">
              {desc}
            </Typography>
          </li>
        ))}
      </ul>

      {companyUrl ? (
        <footer className="mt-auto flex h-10 shrink-0 items-center justify-end border-t border-border px-3">
          {isCompanyTruncated ? (
            <ToolTip text={company} className="min-w-40 max-w-80">
              <Link
                to={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-full"
              >
                <Typography variant="caption" className="max-w-[14rem] truncate text-primary hover:underline">
                  {truncatedCompany}
                </Typography>
              </Link>
            </ToolTip>
          ) : (
            <Link to={companyUrl} target="_blank" rel="noopener noreferrer">
              <Typography variant="caption" className="text-primary hover:underline">
                {company}
              </Typography>
            </Link>
          )}
        </footer>
      ) : null}
    </div>
  );
};

export default RoleExperienceCard;
