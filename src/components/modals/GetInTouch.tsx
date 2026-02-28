import { X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '../../../shadcn/components/ui/button';
import { Typography } from '../../common/Typography';

type ContactLink = {
  name: string;
  icon: ReactNode;
  fn: () => void;
};

type GetInTouchProps = {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (isOpen: boolean) => void;
  businessIcons: ContactLink[];
  recipientEmail?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GetInTouch = ({
  isContactModalOpen,
  setIsContactModalOpen,
  businessIcons,
  recipientEmail = 'kentchristiancagadas@gmail.com',
}: GetInTouchProps) => {
  const [fromEmail, setFromEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    if (!isContactModalOpen) {
      return undefined;
    }

    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsContactModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscapeClose);

    return () => {
      window.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isContactModalOpen, setIsContactModalOpen]);

  const handleCloseModal = () => {
    setContactError(null);
    setIsContactModalOpen(false);
  };

  const handleSendMessage = () => {
    const emailValue = fromEmail.trim();
    const messageValue = contactMessage.trim();

    if (!EMAIL_PATTERN.test(emailValue)) {
      setContactError('Please provide a valid email.');
      return;
    }

    if (messageValue.length < 10) {
      setContactError('Please enter a message with at least 10 characters.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${emailValue}`);
    const body = encodeURIComponent(`From: ${emailValue}\n\n${messageValue}`);

    window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`, '_self');

    setFromEmail('');
    setContactMessage('');
    setContactError(null);
    setIsContactModalOpen(false);
  };

  if (!isContactModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact options"
      onClick={handleCloseModal}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-md"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <Typography variant="h3">Get In Touch</Typography>
            <Typography variant="body-sm" className="mt-1 text-muted-foreground">
              Choose your preferred channel and let&apos;s discuss your project.
            </Typography>
          </div>

          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            aria-label="Close contact modal"
            onClick={handleCloseModal}
          >
            <X size={16} />
          </Button>
        </div>

        <div className="mt-4 grid gap-2">
          <label htmlFor="from-email" className="text-sm font-medium">
            From Email
          </label>
          <input
            id="from-email"
            type="email"
            value={fromEmail}
            onChange={(event) => {
              setFromEmail(event.target.value);
              if (contactError) {
                setContactError(null);
              }
            }}
            placeholder="yourname@email.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          <label htmlFor="contact-message" className="mt-1 text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            value={contactMessage}
            onChange={(event) => {
              setContactMessage(event.target.value);
              if (contactError) {
                setContactError(null);
              }
            }}
            rows={5}
            placeholder="Tell me about your project, timeline, and goals."
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          {contactError && (
            <Typography variant="caption" className="text-red-500 dark:text-red-400">
              {contactError}
            </Typography>
          )}

          <Button type="button" className="mt-2" onClick={handleSendMessage}>
            Send Message
          </Button>
        </div>

        <div className="mt-4">
          <Typography variant="caption" className="text-muted-foreground">
            Quick links
          </Typography>
          <div className="mt-2 flex flex-wrap gap-2">
            {businessIcons.map(({ name, icon, fn }) => (
              <Button
                key={`contact-${name}`}
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={fn}
              >
                {icon}
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
export type { ContactLink, GetInTouchProps };
