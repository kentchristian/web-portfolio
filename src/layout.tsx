import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBars,
  FaBriefcase,
  FaCode,
  FaFolderOpen,
  FaHome,
  FaMoon,
  FaTimes,
  FaUser
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../shadcn/components/ui/button';
import PageContainer from './components/containers/PageContainer';
import ProfileStatsModal from './components/modals/ProfileStatsModal';
import './layout.css';
import { cn } from './lib/cnUtils';
import { images } from './lib/constants/images';
import { toggleTheme } from './lib/utils/theming-helpers/toggleTheme';

type NavItem = {
  path: string;
  name: string;
  icon: IconType;
};

type ActionButton = {
  title: string;
  icon: IconType;
  fn: () => void;
};

const navList: NavItem[] = [
  { path: '', name: 'Home', icon: FaHome },
  { path: 'experience', name: 'Experience', icon: FaBriefcase },
  { path: 'projects', name: 'Projects', icon: FaFolderOpen },
  { path: 'skills', name: 'Skills', icon: FaCode },
  // { path: 'portfolio', name: 'Porfolio' },
  // { path: 'contact', name: 'Contact' },


  // { path: 'projects-boiler-plate', name: 'Projects BoilerPlate' },
  // { path: 'activity-boiler-plate', name: 'Activity' }
];

export default function MainLayout() {
  const [_theme, setTheme] = useState<string>(toggleTheme);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileStatsModalOpen, setIsProfileStatsModalOpen] = useState(false);
  const menuIconSize = 24;
  const activeMenuButtonClass = 'text-foreground';
  const desktopMenuButtonClass =
    'relative h-auto w-15 flex-col gap-1.5 rounded-none border-b-2 border-b-transparent py-2 transition-colors duration-200 hover:bg-transparent hover:text-muted-foreground';
  const mobileMenuButtonClass =
    'relative h-auto w-full justify-start gap-2 rounded-none border-b-2 border-b-transparent py-3 transition-colors duration-200 hover:bg-transparent hover:text-muted-foreground';

  const navigate = useNavigate();
  const location = useLocation();
  const handleNav = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const handleThemeState = useCallback(() => {
    toggleTheme();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isDrawerOpen) {
      document.body.style.overflow = '';
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDrawerOpen]);

  const handleNavAndClose = (path: string) => {
    handleNav(path);
    setIsDrawerOpen(false);
  };

  const normalizePath = useCallback((pathname: string) => {
    if (pathname === '/') {
      return pathname;
    }

    return pathname.replace(/\/+$/, '');
  }, []);

  const isNavPathActive = useCallback(
    (path: string) => {
      const currentPath = normalizePath(location.pathname);
      const targetPath = path ? `/${path}` : '/';

      if (targetPath === '/') {
        return currentPath === targetPath;
      }

      return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
    },
    [location.pathname, normalizePath]
  );

  const actionButtons: ActionButton[] = [
    {
      title: 'Mode',
      icon: FaMoon,
      fn: handleThemeState
    },
    {
      title: 'Profile',
      icon: FaUser,
      fn: () => {
        setIsProfileStatsModalOpen(true);
      }
    }
  ];

  return (
    <>
      <nav className="w-full border-b border-border bg-background/95 px-3 py-3 sm:px-4 md:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={() => {
                handleNav('');
              }}
              className="group flex shrink-0 cursor-pointer items-center gap-2"
              aria-label="Go to home"
            >
              <img
                src={images.keysiiLogo}
                alt="Keysii logo"
                className="h-10 w-10 rounded-full border object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </button>

            <Button
              size="icon"
              variant="outline"
              type="button"
              onClick={() => {
                setIsDrawerOpen((prev) => !prev);
              }}
              aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="mobile-navigation-drawer"
              aria-expanded={isDrawerOpen}
            >
              {isDrawerOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </Button>
          </div>

          <div className="hidden md:flex md:items-center md:justify-between md:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  handleNav('');
                }}
                className="group mr-1 flex shrink-0 cursor-pointer items-center gap-2"
                aria-label="Go to home"
              >
                <img
                  src={images.keysiiLogo}
                  alt="Keysii logo"
                  className="h-10 w-10 rounded-full border object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </button>

              <div className="flex flex-1 flex-wrap gap-2">
                {navList.map(({ path, name, icon: Icon }: NavItem) => {
                  const isActive = isNavPathActive(path);

                  return (
                    <Button
                      key={path || 'dashboard'}
                      size="sm"
                      variant="ghost"
                      className={cn(desktopMenuButtonClass, isActive && activeMenuButtonClass)}
                      aria-label={`Navigate to ${name}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => {
                        handleNav(path);
                      }}
                    >
                      <Icon size={menuIconSize} />
                      <span className="text-[11px] leading-none">{name}</span>
                      {isActive ? (
                        <motion.span
                          layoutId="desktop-nav-active-line"
                          transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                          className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-muted-foreground"
                        />
                      ) : null}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-2 md:w-auto md:justify-end">
              {actionButtons.map((action: ActionButton) => (
                <Button
                  key={action.title}
                  size="sm"
                  variant="ghost"
                  className={desktopMenuButtonClass}
                  aria-label={action.title}
                  onClick={() => {
                    action.fn();
                  }}
                >
                  <action.icon size={menuIconSize} />
                  <span className="text-[11px] leading-none">{action.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!isDrawerOpen}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        />

        <aside
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation drawer"
          className={cn(
            'absolute right-0 top-0 h-full w-[82%] max-w-xs border-l border-border bg-background p-4 shadow-xl transition-transform duration-300 ease-out',
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                handleNavAndClose('');
              }}
              className="group flex cursor-pointer items-center gap-2"
              aria-label="Go to home"
            >
              <img
                src={images.keysiiLogo}
                alt="Keysii logo"
                className="h-9 w-9 rounded-full border object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-sm font-semibold">Navigation</span>
            </button>

            <Button
              size="icon-sm"
              variant="outline"
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <FaTimes size={16} />
            </Button>
          </div>

          <div className="space-y-2">
            {navList.map(({ path, name, icon: Icon }: NavItem) => {
              const isActive = isNavPathActive(path);

              return (
                <Button
                  key={`mobile-${path || 'dashboard'}`}
                  size="sm"
                  variant="ghost"
                  className={cn(mobileMenuButtonClass, isActive && activeMenuButtonClass)}
                  aria-label={`Navigate to ${name}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => {
                    handleNavAndClose(path);
                  }}
                >
                  <Icon size={menuIconSize} />
                  <span className="text-sm leading-none">{name}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="mobile-nav-active-line"
                      transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                      className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-muted-foreground"
                    />
                  ) : null}
                </Button>
              );
            })}
          </div>

          <div className="mt-4 border-t border-border pt-4 space-y-2">
            {actionButtons.map((action: ActionButton) => (
              <Button
                key={`mobile-action-${action.title}`}
                size="sm"
                variant="ghost"
                className={mobileMenuButtonClass}
                aria-label={action.title}
                onClick={() => {
                  action.fn();
                  setIsDrawerOpen(false);
                }}
              >
                <action.icon size={menuIconSize} />
                <span className="text-sm leading-none">{action.title}</span>
              </Button>
            ))}
          </div>
        </aside>
      </div>

      <main className="w-full">
        <PageContainer className="border border-border p-3 sm:p-4 md:p-6">
          <Outlet />
        </PageContainer>
      </main>

      <footer />
      <ProfileStatsModal
        isOpen={isProfileStatsModalOpen}
        setIsOpen={setIsProfileStatsModalOpen}
      />
    </>
  );
}
