
import { useState } from "react";
import { Info, X } from "lucide-react";
import ToolTip from "../../common/ToolTip";
import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";
import type { ContainerType } from "../../lib/types/container-types";

const CardContainer = ({
  children,
  loading,
  empty,
  className,
  title,
  description,
  infoText,
}: ContainerType & {
  title?: string;
  description?: string;
  infoText?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canOpenModal = Boolean(title);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!canOpenModal) return;

    const target = event.target as HTMLElement;
    const interactiveElement = target.closest(
      "button, a, input, textarea, select, [role='button'], [data-no-card-modal='true']"
    );

    if (interactiveElement) return;
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        className={cn(
          "w-70 h-50 rounded-xl border p-4 shadow-sm",
          canOpenModal && "transition-colors hover:bg-accent/10 hover:cursor-pointer",
          className
        )}
        onClick={handleCardClick}
      >
        {title && (
          <header className="mb-3 flex items-start justify-between gap-3">
            <div>
              <Typography variant="h3">{title}</Typography>
              {description && (
                <Typography variant="caption" className="mt-1">
                  {description}
                </Typography>
              )}
            </div>
            <ToolTip
              text={infoText || "View quick card details"}
              className="max-w-72"
            >
              <span
                aria-label={`${title} info`}
                data-no-card-modal="true"
                className="inline-flex rounded-md border p-1.5 transition hover:bg-accent/20"
              >
                <Info size={16} />
              </span>
            </ToolTip>
          </header>
        )}

        {loading?.isLoading ? (
          <div className="flex justify-center">
            <p>Loading...</p>
          </div>
        ) : empty?.isEmpty ? (
          <div>Empty...</div>
        ) : (
          children
        )}
      </section>

      {isModalOpen && title && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border bg-background p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <Typography variant="h4">{title}</Typography>
              <button
                type="button"
                aria-label="Close modal"
                className="rounded-md border p-1 transition hover:bg-accent/20"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="h-40 rounded-md border border-dashed" />
          </div>
        </div>
      )}
    </>
  );
};

export default CardContainer;
