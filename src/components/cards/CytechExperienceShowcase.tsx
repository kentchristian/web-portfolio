import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Badge } from "../../../shadcn/components/ui/badge";
import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";
import RoleExperienceCard, { type RoleExperienceCardProps } from "./RoleExperienceCard";

interface CytechExperienceShowcaseProps {
  company: string;
  dateTag: string;
  experiences: RoleExperienceCardProps[];
}

const revealTransition = {
  duration: 0.85,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const revealViewport = {
  once: true,
  amount: 0.2,
};

const CytechExperienceShowcase = ({
  company,
  dateTag,
  experiences,
}: CytechExperienceShowcaseProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationId = 0;
    let lastTimestamp = 0;
    let ignoreNextScrollEvent = false;
    let userControlUntil = 0;
    const speed = 0.045;
    const userPauseMs = 1800;

    const markUserControl = () => {
      userControlUntil = performance.now() + userPauseMs;
    };

    const onPointerDown = () => {
      markUserControl();
    };

    const onWheel = () => {
      markUserControl();
    };

    const onTouchStart = () => {
      markUserControl();
    };

    const onTouchMove = () => {
      markUserControl();
    };

    const onScroll = () => {
      if (ignoreNextScrollEvent) {
        ignoreNextScrollEvent = false;
        return;
      }
      markUserControl();
    };

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchmove", onTouchMove, { passive: true });
    scroller.addEventListener("scroll", onScroll, { passive: true });

    const animate = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const isHovered = scroller.matches(":hover");
      const isUserControlling = timestamp < userControlUntil;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

      if (!isHovered && !isUserControlling && maxScrollLeft > 0) {
        ignoreNextScrollEvent = true;
        scroller.scrollLeft += delta * speed;

        // Single-set loop: when reaching the end, restart from the first card.
        if (scroller.scrollLeft >= maxScrollLeft - 1) {
          scroller.scrollLeft = 0;
        }
      }

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchmove", onTouchMove);
      scroller.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(animationId);
    };
  }, [experiences.length]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={revealTransition}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-4 shadow-md md:p-6",
        "before:pointer-events-none before:absolute before:-top-14 before:right-12 before:h-44 before:w-44 before:rounded-full before:bg-cyan-200/20 before:blur-3xl",
        "after:pointer-events-none after:absolute after:-bottom-20 after:left-8 after:h-52 after:w-52 after:rounded-full after:bg-blue-200/20 after:blur-3xl"
      )}
    >
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <Typography variant="overline" className="text-slate-600">
            Company Spotlight
          </Typography>
          <Typography variant="h2" className="text-slate-900">
            {company}
          </Typography>
        </div>

        <Badge variant="outline" className="border-slate-300 bg-white/80 text-slate-700">
          {dateTag}
        </Badge>
      </div>

      <div className="relative z-10">
        <motion.div
          ref={scrollerRef}
          className="themed-scrollbar-hover flex gap-4 overflow-x-auto pb-3"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.03 },
            },
          }}
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.role}-${index}`}
              className="w-[23rem] shrink-0 md:w-[24.5rem]"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: revealTransition,
                },
              }}
            >
              <RoleExperienceCard
                role={experience.role}
                company={experience.company}
                date={experience.date}
                description={experience.description}
                skills={experience.skills}
                companyUrl={experience.companyUrl}
                icon={experience.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CytechExperienceShowcase;
