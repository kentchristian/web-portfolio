import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../shadcn/components/ui/tooltip';
import { cn } from "../lib/cnUtils";


interface ToolTipProps {
  text: string,
  children: React.ReactNode;
  className?: string;
}
const ToolTip = ({
  text,
  children,
  className,
}: ToolTipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={cn("w-auto min-w-52 max-w-72 text-left [text-wrap:wrap]", className)}>
        <span className="block w-full whitespace-normal break-words leading-snug">
          {text}
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export default ToolTip
