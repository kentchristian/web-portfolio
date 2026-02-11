import { Typography } from "../../common/Typography";
import { cn } from "../../lib/cnUtils";

interface CertificationCardProps {
  className?: string;
  icon: React.ReactNode;
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
}

const CertificationCard = ({
  className,
  icon,
  certificationName,
  issuingOrganization,
  issueDate,
  expirationDate,
}: CertificationCardProps) => {
  const validUntil = expirationDate || "Present";

  return (
    <article
      className={cn(
        "w-full max-w-120 rounded-xl border p-4 shadow-sm",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border  p-2">
            {icon}
          </div>
          <div>
            <Typography variant="h4" className="leading-tight">
              {certificationName}
            </Typography>
            <Typography variant="caption" className="mt-1 text-gray-600">
              {issuingOrganization}
            </Typography>
          </div>
        </div>

        <Typography
          variant="overline"
          className="rounded-full  px-2 py-1 text-gray-700"
        >
          Certified
        </Typography>
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        <Typography variant="body-sm" className="text-gray-600">
          Issued: <span className="font-medium text-gray-900">{issueDate}</span>
        </Typography>
        <Typography variant="body-sm" className="text-gray-600">
          Valid until:{" "}
          <span className="font-medium text-gray-900">{validUntil}</span>
        </Typography>
      </div>
    </article>
  );
};

export default CertificationCard;
