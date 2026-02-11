import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";

interface SkillsCardProps {
  data: {
    skill: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}


const SkillsCard = ({ data, className }: SkillsCardProps) => {
  return (
    <div className={cn("flex flex-col w-full gap-2 overflow-y-auto max-h-60 themed-scrollbar", className)}>
      {data.map(({ skill, icon }, index) => (
        <div key={skill + index} className="flex flex-row  space-x-2 items-center mb-2">
          {icon}
          <Typography variant="body-lg">{skill}</Typography>
        </div>
      ))}
    </div>
  )
}

export default SkillsCard