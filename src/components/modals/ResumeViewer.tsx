import { ExternalLink, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Button } from '../../../shadcn/components/ui/button';
import { Typography } from '../../common/Typography';

type ResumeViewerProps = {
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (isOpen: boolean) => void;
  resumeSrc: string;
};

const ResumeViewer = ({
  isResumeModalOpen,
  setIsResumeModalOpen,
  resumeSrc,
}: ResumeViewerProps) => {
  const embeddedResumeSrc = `${resumeSrc}#view=FitH`;
  const resumeFileName = useMemo(() => {
    try {
      const parsed = new URL(resumeSrc, window.location.origin);
      return parsed.pathname.split('/').filter(Boolean).pop() ?? 'resume.pdf';
    } catch {
      return 'resume.pdf';
    }
  }, [resumeSrc]);

  useEffect(() => {
    if (!isResumeModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResumeModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isResumeModalOpen, setIsResumeModalOpen]);

  if (!isResumeModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF preview"
      onClick={() => {
        setIsResumeModalOpen(false);
      }}
    >
      <div
        className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between gap-2 border-b px-4 py-3 sm:px-5">
          <div>
            <Typography variant="h3">Resume / CV</Typography>
            <Typography variant="caption" className="text-muted-foreground">
              Previewing {resumeFileName}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" asChild>
              <a href={resumeSrc} target="_blank" rel="noopener noreferrer" aria-label="Open resume in new tab">
                Open
                <ExternalLink size={14} />
              </a>
            </Button>

            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              aria-label="Close resume modal"
              onClick={() => {
                setIsResumeModalOpen(false);
              }}
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        <div className="h-full bg-muted/25">
          <iframe key={embeddedResumeSrc} title="Resume PDF" src={embeddedResumeSrc} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
