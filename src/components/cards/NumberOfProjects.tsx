import { Typography } from "../../common/Typography";
import CardContainer from "../containers/CardContainer";

interface NumberOfProjectsProps {
  total: number;
  title: string;
  description?: string;
}

const NumberOfProjects = ({
  total,
  title,
  description,
}: NumberOfProjectsProps) => {

  return (
    <CardContainer
      className="flex flex-col gap-2 justify-center items-center border"
    >
      <Typography>{total}</Typography>
      <Typography>{title}</Typography>

      {description && <Typography>{description}</Typography>}
    </CardContainer>
  )
}

export default NumberOfProjects