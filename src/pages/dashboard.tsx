import { Typography } from "../common/Typography";
import ContentDisplay from "../components/cards/ContentDisplay";
import NumberOfProjects from "../components/cards/NumberOfProjects";
import PageContainer from "../components/containers/PageContainer";
import { cn } from "../lib/cnUtils";


/** DEFAULT Scrollbar Config */
const SCROLLBAR_CONFIG = "overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
const Dashboard = () => {


  return (
    <PageContainer className="border h-full">
      <div className="grid grid-cols-[1fr_1px_1fr] border h-120">
        <section className={
          cn(
            "p-5",
            SCROLLBAR_CONFIG,
          )
        }>
          <NumberOfProjects
            total={50}
            title="Number Of Projects"
          />
        </section>
        <div className="border-r"></div>
        <section className={
          cn(
            "p-5",
            SCROLLBAR_CONFIG,
          )
        }>
          <ContentDisplay className="flex flex-col justify-center items-center border">
            <Typography> Something Content </Typography>
          </ContentDisplay>
        </section>
      </div>

    </PageContainer>
  )
};

export default Dashboard;
