import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../../shadcn/components/ui/button";
import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";
import { icons } from "../../lib/constants/icons";
import experienceCardData from "../../lib/data/experience-card-data.json";

type ExperienceEntry = {
  id: string;
  year: string;
  company: string;
  role: string;
  description: string;
  highlights: string[];
  companyUrl: string;
};

const experienceData = experienceCardData as ExperienceEntry[];

const ExperienceCard = () => {
  const [selectedId, setSelectedId] = useState<string>(experienceData[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = hoveredId ?? selectedId;
  const activeExperience =
    experienceData.find((item) => item.id === activeId) ?? experienceData[0];

  return (
    <div className="grid grid-cols-[1.5fr_3fr] gap-2">
      <section className="flex flex-col items-center justify-center themed-scrollbar themed-scrollbar-hover h-50vh overflow-auto border border-red-300">
        {experienceData.map((item) => {
          const isActive = item.id === activeExperience.id;
          const isSelected = item.id === selectedId;

          return (
            <Button
              key={item.id}
              type="button"
              variant={isActive ? "secondary" : "outline"}
              className={cn(
                "mb-2 w-full justify-start text-left",
                isSelected && "ring-1 ring-ring/60"
              )}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setSelectedId(item.id)}
            >
              {item.year}. {item.company}
            </Button>
          );
        })}
      </section>

      <div className="themed-scrollbar themed-scrollbar-hover max-h-70 overflow-auto rounded-sm border p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeExperience.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography variant="overline" className="mb-2">
              {hoveredId
                ? `Previewing ${activeExperience.year}`
                : `Selected ${activeExperience.year}`}
            </Typography>

            <div className="mb-2 flex flex-row items-center space-x-2">
              <button
                type="button"
                aria-label={`Open ${activeExperience.company}`}
                className="flex h-8 w-8 items-center justify-center rounded border border-black/60 bg-transparent p-1 text-black/90 hover:bg-accent/20 dark:border-white/70 dark:text-white"
                onClick={() =>
                  window.open(activeExperience.companyUrl, "_blank", "noopener,noreferrer")
                }
              >
                {icons.linkedIn}
              </button>

              <Typography variant="h3">{activeExperience.company}</Typography>
            </div>

            <Typography variant="h4" className="mb-1">
              {activeExperience.role}
            </Typography>
            <Typography variant="caption" className="mb-4">
              {activeExperience.description}
            </Typography>

            <ul className="ml-5 list-disc space-y-2">
              {activeExperience.highlights.map((highlight) => (
                <li key={highlight}>
                  <Typography variant="body-sm">{highlight}</Typography>
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceCard;
