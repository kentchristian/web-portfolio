import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";

interface EducationCardProps {
  className?: string;
  icon: React.ReactNode;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}
const EducationCard = ({ className, icon, institution, degree, startDate, endDate }: EducationCardProps) => {
  return (
    <div className={cn(className, "max-w-120 max-h-70 p-2 rounded-sm shadow-sm border")}>
      <div className="flex items-center space-x-2">
        {icon}
        <div>
          <Typography variant="h4">{institution}</Typography>
          <Typography variant="caption">{degree}</Typography>
        </div>
      </div>
      <Typography variant="body-sm" className="mt-1 text-end">{startDate} - {endDate}</Typography>
    </div>
  )
}

export default EducationCard