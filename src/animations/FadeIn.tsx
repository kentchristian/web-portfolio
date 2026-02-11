import { FadeInMotionProv } from "./DynamicMotion";


interface FadeInProps {
  children: React.ReactNode;
}
export function FadeIn({ children }: FadeInProps) {
  return (
    <FadeInMotionProv>
      {children}
    </FadeInMotionProv>
  );
}
