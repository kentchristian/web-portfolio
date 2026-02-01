import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Badge } from "../../../shadcn/components/ui/badge"
import type { projectsType } from "../../lib/types/dashboard-types"
import { projects } from "../../lib/utils/dummy-data/projcts-dummy"
import { limitText } from "../../lib/utils/limitText"
import CardContainer from "../containers/CardContainer"

const ProjectsCard = () => {
  return (
    <div className="flex flex-row gap-2 border border-amber-300 p-2">
      {projects.map((data: projectsType) => (
        <CardContainer key={data.key} className="flex flex-col gap-2 border h-auto">
          <img src={data?.image} />
          <div className="flex flex-col">
            <h5 className="inline"> <strong>{data?.title}</strong></h5>
            {/* 
                TODO: Modify Styling for tooltip 
                     -- add tail and defult theme style 
               */}
            <Tooltip >
              <TooltipTrigger asChild>
                <p className="inline" >{limitText(data?.description, 40)}</p>
              </TooltipTrigger>

              <TooltipContent
                className="inline-block w-64 bg-amber-300 p-2">
                <p className="wrap-break-words">{data?.description}</p>
              </TooltipContent>
            </Tooltip>

          </div>

          <div className="flex flex-row flex-wrap items-center gap-2">
            {data?.techStack.map((tech: string, index: number) => (

              <Badge key={index}>
                {tech}
              </Badge>
            ))}
          </div>
        </CardContainer>
      ))}
    </div>
  )
}

export default ProjectsCard