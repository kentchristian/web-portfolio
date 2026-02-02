import type React from "react";
import { cn } from "../../lib/cnUtils";
import CardContainer from "../containers/CardContainer";


interface ContentDisplayProps {
  children?: React.ReactNode;
  className?: string;
}
const ContentDisplay = ({
  children,
  className,
}: ContentDisplayProps) => {
  return (
    // pass children react node an render here
    // centralized component conventions
    <CardContainer className={
      cn(
        className,
        'p-2'
      )
    }>
      {children}
    </CardContainer>
  )
}

export default ContentDisplay