import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../shadcn/components/ui/tooltip';


interface ToolTipProps {
  text: string,
  children: React.ReactNode;
}
const ToolTip = ({
  text,
  children
}: ToolTipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  )
}

export default ToolTip