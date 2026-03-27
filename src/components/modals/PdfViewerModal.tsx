import { ExternalLink, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Button } from '../../../shadcn/components/ui/button';
import { Typography } from '../../common/Typography';

type PdfViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
};

const PdfViewerModal = ({
  isOpen,
  onClose,
  src,
  title = 'Document Preview',
  subtitle,
  ariaLabel = 'PDF preview',
}: PdfViewerModalProps) => {
  const embeddedSrc = `${src}#view=FitH`;
  const fileName = useMemo(() => {
    try {
      const parsed = new URL(src, window.location.origin);
      return parsed.pathname.split('/').filter(Boolean).pop() ?? 'document.pdf';
    } catch {
      return 'document.pdf';
    }
  }, [src]);
  const resolvedSubtitle = subtitle ?? `Previewing ${fileName}`;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between gap-2 border-b px-4 py-3 sm:px-5">
          <div>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="caption" className="text-muted-foreground">
              {resolvedSubtitle}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" asChild>
              <a href={src} target="_blank" rel="noopener noreferrer" aria-label="Open PDF in new tab">
                Open
                <ExternalLink size={14} />
              </a>
            </Button>

            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              aria-label="Close PDF modal"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        <div className="h-full bg-muted/25">
          <iframe key={embeddedSrc} title={`PDF preview: ${title}`} src={embeddedSrc} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;
