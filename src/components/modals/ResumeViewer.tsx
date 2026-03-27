import PdfViewerModal from './PdfViewerModal';

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
  return (
    <PdfViewerModal
      isOpen={isResumeModalOpen}
      onClose={() => {
        setIsResumeModalOpen(false);
      }}
      src={resumeSrc}
      title="Resume / CV"
      ariaLabel="Resume PDF preview"
    />
  );
};

export default ResumeViewer;
