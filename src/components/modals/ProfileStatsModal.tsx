import { AnimatePresence, motion } from 'framer-motion';
import { Expand, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { FaCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../shadcn/components/ui/button';
import { Typography } from '../../common/Typography';
import ProfileRadarChart from '../../components/profile/ProfileRadarChart';
import { images } from '../../lib/constants/images';
import { buildProfileDashboardData } from '../../lib/profile/profile-stats';

type ProfileStatsModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ProfileStatsModal = ({ isOpen, setIsOpen }: ProfileStatsModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const dashboardData = useMemo(buildProfileDashboardData, []);
  const previewStats = dashboardData.coreStats.slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/65 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Profile summary modal"
          onClick={() => {
            setIsOpen(false);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
            paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
            paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
            paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
          }}
        >
          <motion.div
            className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl"
            onClick={(event) => {
              event.stopPropagation();
            }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
              maxHeight:
                'calc(100dvh - 1.5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
            }}
          >
            <div className="shrink-0 flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-6">
              <div>
                <Typography variant="h3" className="text-xl sm:text-2xl">
                  Profile Summary
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground">
                  Snapshot of profile strengths, capability signals, and key insights derived from project and experience history.
                </Typography>
              </div>

              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                aria-label="Close profile summary modal"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <X size={16} />
              </Button>
            </div>

            <div className="themed-scrollbar min-h-0 flex-1 overflow-y-auto">
              <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-[minmax(17rem,1fr)_1.2fr]">
                <motion.section
                  className="space-y-4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06, duration: 0.28 }}
                >
                  <article className="overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-emerald-500/10 via-background to-amber-500/10">
                    <div className="relative h-56">
                      <img
                        src={images.profPic}
                        alt="Professional profile image"
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />
                      <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/45 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                        <FaCode size={13} />
                        Kent Christian E. Cagadas
                      </span>
                    </div>

                    <div className="p-4">
                      <Typography variant="h4">
                        Full-Stack Web Developer
                      </Typography>
                      <Typography
                        variant="body-sm"
                        className="mt-1 text-muted-foreground"
                      >
                        Focused on scalable web product delivery, clean
                        architecture, and practical UX.
                      </Typography>
                    </div>
                  </article>

                  <article className="rounded-2xl border border-border/80 bg-background/70 p-4">
                    <Typography variant="h4" className="text-lg">
                      Snapshot Stats
                    </Typography>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {previewStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl border border-border/80 bg-muted/35 px-3 py-3"
                        >
                          <Typography variant="h3" className="text-xl">
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-muted-foreground"
                          >
                            {stat.label}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </article>
                </motion.section>

                <motion.section
                  className="rounded-2xl border border-border/80 bg-background/70 p-4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.28 }}
                >
                  <Typography variant="h4" className="text-lg">
                    Skill Radar (Web Chart)
                  </Typography>
                  <Typography
                    variant="body-sm"
                    className="mt-1 text-muted-foreground"
                  >
                    Capability signal inferred from projects and
                    responsibilities.
                  </Typography>
                  <div className="mt-4 flex justify-center">
                    <ProfileRadarChart metrics={dashboardData.radarMetrics} />
                  </div>
                </motion.section>
              </div>
            </div>

            <motion.div
              className="shrink-0 flex flex-wrap items-center justify-end gap-2 border-t border-border/80 px-4 py-3 sm:px-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.24 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
              >
                Expand to Full Profile
                <Expand size={15} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ProfileStatsModal;
