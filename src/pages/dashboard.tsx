import CardContainer from "../components/common/CardContainer";
import type { overViewType } from "../types/dashboard-types";
import { overViewItems } from "../utils/dummy-data/oveview-dummy";


const Dashboard = () => {


  return (
    <div className="flex flex-col">

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
      <div className="flex flex-row gap-4 p-4">
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

    </div>
  )
};

export default Dashboard;
