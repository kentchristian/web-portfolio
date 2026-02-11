import { MotionImageMotionProv } from "./DynamicMotion";

interface MotionImageProps {
  children: React.ReactNode;
}

export function MotionImage({ children }: MotionImageProps) {
  return (
    <MotionImageMotionProv className="overflow-hidden rounded-md">
      {children}
    </MotionImageMotionProv>
  );
}
