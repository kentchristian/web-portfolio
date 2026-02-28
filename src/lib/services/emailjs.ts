type EmailJsSendPayload = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
  fromEmail: string;
  subject: string;
  message: string;
};

type EmailJsErrorPayload = {
  text?: string;
  error?: string;
  message?: string;
};

const EMAILJS_SEND_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

export const sendEmailWithEmailJs = async ({
  serviceId,
  templateId,
  publicKey,
  toEmail,
  fromEmail,
  subject,
  message,
}: EmailJsSendPayload): Promise<void> => {
  const response = await fetch(EMAILJS_SEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: toEmail,
        toEmail: toEmail,
        to: toEmail,
        recipient_email: toEmail,
        recipientEmail: toEmail,
        from_email: fromEmail,
        fromEmail: fromEmail,
        from: fromEmail,
        email: fromEmail,
        reply_to: fromEmail,
        replyTo: fromEmail,
        subject,
        message,
      },
    }),
  });

  const responseText = await response.text().catch(() => '');

  if (response.ok) {
    return;
  }

  let errorMessage: string | null = null;

  if (responseText) {
    try {
      const payload = JSON.parse(responseText) as EmailJsErrorPayload;
      errorMessage = payload?.text ?? payload?.error ?? payload?.message ?? null;
    } catch {
      errorMessage = responseText;
    }
  }

  throw new Error(errorMessage ?? `EmailJS request failed with status ${response.status}.`);
};
