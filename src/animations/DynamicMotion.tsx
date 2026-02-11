import { createContext, useContext } from "react";
import {
  MotionConfig,
  motion,
  type Transition,
  type Variants,
  type ViewportOptions,
} from "framer-motion";

type DynamicMotionConfig = {
  transition: Transition;
  viewport: ViewportOptions;
};

type DynamicMotionProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
  viewport?: ViewportOptions;
};

type MotionShellProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const defaultTransition: Transition = {
  duration: 0.85,
  ease: [0.25, 0.1, 0.25, 1],
};

const defaultViewport: ViewportOptions = {
  once: true,
  amount: 0.2,
};

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  motionImage: {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  sideFromRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
} as const satisfies Record<string, Variants>;

const DynamicMotionContext = createContext<DynamicMotionConfig>({
  transition: defaultTransition,
  viewport: defaultViewport,
});

export function DynamicMotionProvider({
  children,
  transition = defaultTransition,
  viewport = defaultViewport,
}: DynamicMotionProviderProps) {
  return (
    <MotionConfig transition={transition}>
      <DynamicMotionContext.Provider value={{ transition, viewport }}>
        {children}
      </DynamicMotionContext.Provider>
    </MotionConfig>
  );
}

function MotionShell({
  children,
  className,
  delay = 0,
  motionVariants,
}: MotionShellProps & { motionVariants: Variants }) {
  const { transition, viewport } = useContext(DynamicMotionContext);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={motionVariants}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}

export function FadeMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.fade} {...props} />;
}

export function FadeUpMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.fadeUp} {...props} />;
}

export function SlideLeftMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.slideLeft} {...props} />;
}

export function SlideRightMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.slideRight} {...props} />;
}

export function ZoomInMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.zoomIn} {...props} />;
}

export function FadeInMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.fadeIn} {...props} />;
}

export function MotionImageMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.motionImage} {...props} />;
}

export function SlideFromRightMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.sideFromRight} {...props} />;
}

export function SideFromRightMotionProv(props: MotionShellProps) {
  return <MotionShell motionVariants={variants.sideFromRight} {...props} />;
}
