import { SideFromRightMotionProv } from "./DynamicMotion";

interface SlideFromRightProps {
  children: React.ReactNode;
  delay?: number; // Optional delay for the animation
}
export function SlideFromRight({ children, delay = 0 }: SlideFromRightProps) {
  return (
    <SideFromRightMotionProv delay={delay}>
      {children}
    </SideFromRightMotionProv>
  );
}
