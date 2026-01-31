import { Field, FieldLabel } from "../../shadcn/components/ui/field";
import { Progress } from "../../shadcn/components/ui/progress";


interface FrequenceScoreProps {
  label: string;
  average: number;
  id: string;
}
const FrequenceScore = ({
  label,
  average,
  id,
}: FrequenceScoreProps) => {
  
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>{label}</span>
        <span className="ml-auto">{average}%</span>
      </FieldLabel>
      <Progress value={average} id={id} />
    </Field>
  )
}

export default FrequenceScore;
