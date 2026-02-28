import { X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '../../../shadcn/components/ui/button';
import { Typography } from '../../common/Typography';
import { sendEmailWithEmailJs } from '../../lib/services/emailjs';

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
  emailJsServiceId?: string;
  emailJsTemplateId?: string;
  emailJsPublicKey?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GetInTouch = ({
  isContactModalOpen,
  setIsContactModalOpen,
  businessIcons,
  recipientEmail = 'kentchristiancagadas@gmail.com',
  emailJsServiceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID ?? '',
  emailJsTemplateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  emailJsPublicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
}: GetInTouchProps) => {
  const [fromEmail, setFromEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

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
    if (isSendingMessage) {
      return;
    }

    setContactError(null);
    setIsContactModalOpen(false);
  };

  const handleSendMessage = async () => {
    if (isSendingMessage) {
      return;
    }

    const emailValue = fromEmail.trim();
    const recipientEmailValue = recipientEmail.trim();
    const subjectValue = contactSubject.trim();
    const messageValue = contactMessage.trim();
    const serviceIdValue = emailJsServiceId.trim();
    const templateIdValue = emailJsTemplateId.trim();
    const publicKeyValue = emailJsPublicKey.trim();

    if (!EMAIL_PATTERN.test(emailValue)) {
      setContactError('Please provide a valid email.');
      return;
    }

    if (subjectValue.length < 3) {
      setContactError('Please enter a subject with at least 3 characters.');
      return;
    }

    if (messageValue.length < 10) {
      setContactError('Please enter a message with at least 10 characters.');
      return;
    }

    if (!EMAIL_PATTERN.test(recipientEmailValue)) {
      setContactError(
        'Recipient email is missing/invalid. Set recipientEmail or update the default in GetInTouch.'
      );
      return;
    }

    if (!serviceIdValue || !templateIdValue || !publicKeyValue) {
      setContactError(
        'Missing EmailJS config. Set PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID, and PUBLIC_EMAILJS_PUBLIC_KEY.'
      );
      return;
    }

    setContactError(null);
    setIsSendingMessage(true);

    try {
      await sendEmailWithEmailJs({
        serviceId: serviceIdValue,
        templateId: templateIdValue,
        publicKey: publicKeyValue,
        toEmail: recipientEmailValue,
        fromEmail: emailValue,
        subject: subjectValue,
        message: messageValue,
      });

      setFromEmail('');
      setContactSubject('');
      setContactMessage('');
      setIsContactModalOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to send message.';
      setContactError(errorMessage);
    } finally {
      setIsSendingMessage(false);
    }
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
            disabled={isSendingMessage}
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
            disabled={isSendingMessage}
            onChange={(event) => {
              setFromEmail(event.target.value);
              if (contactError) {
                setContactError(null);
              }
            }}
            placeholder="yourname@email.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          <label htmlFor="contact-subject" className="mt-1 text-sm font-medium">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={contactSubject}
            disabled={isSendingMessage}
            onChange={(event) => {
              setContactSubject(event.target.value);
              if (contactError) {
                setContactError(null);
              }
            }}
            placeholder="Project inquiry"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          <label htmlFor="contact-message" className="mt-1 text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            value={contactMessage}
            disabled={isSendingMessage}
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

          <Button type="button" className="mt-2" onClick={handleSendMessage} disabled={isSendingMessage}>
            {isSendingMessage ? 'Sending...' : 'Send Message'}
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
