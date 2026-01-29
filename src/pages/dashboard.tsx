
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Badge } from "../../shadcn/components/ui/badge";
import { Tooltip } from "../../shadcn/components/ui/tooltip";
import CardContainer from "../components/common/CardContainer";
import type { overViewType, projectsType } from "../lib/types/dashboard-types";
import { overViewItems } from "../lib/utils/dummy-data/oveview-dummy";
import { projects } from "../lib/utils/dummy-data/projcts-dummy";
import { limitText } from "../lib/utils/limitText";
import { useGetMetrics } from "../lib/hooks/useGetMetrics";


const Dashboard = () => {
  const { data } = useGetMetrics();

  console.log("DATA: ", data);

  return (
    <div className="flex flex-col gap-10">

      {/* Welcome */}
      <CardContainer
        className="w-full h-50 border flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 ">
          <h1>Welcome Back!</h1>
          <p>Sample message for welcoming back a person</p>
        </div>
        <div className="flex flex-col gap-2">
          <button>Action 1</button>
          <button>Action 2 </button>
        </div>
      </CardContainer>

      {/* Overview Cards */}
      <div className="flex flex-row gap-4 p-4 border">
        {overViewItems.map(({
          icon,
          trends,
          amount,
          title
        }: overViewType) => (
          <CardContainer className={`border flex flex-col justify-between`}>
            {/* 1st row */}
            <div className="flex flex-row items-center justify-between">
              <div>{icon}</div>
              <div className="flex justify-end">{trends}</div>
            </div>

            {/* Amount */}
            <div className="text-3xl">
              {amount}
            </div>

            {/* Desription */}
            <div>{title}</div>
          </CardContainer>
        ))}

      </div>

      {/* Chart */}
      <CardContainer className="flex w-full h-50 justify-center items-center border">
        Chart here
      </CardContainer>


      <div className="flex flex-row gap-2 border border-amber-300 p-2">
        {projects.map((data: projectsType) => (
          <CardContainer className="flex flex-col gap-2 border h-auto">
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
              {data?.techStack.map((tech: string) => (

                <Badge>
                  {tech}
                </Badge>
              ))}
            </div>


          </CardContainer>
        ))}
      </div>
    </div>
  )
};

export default Dashboard;
