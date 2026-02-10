import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css';

import { Button } from '../shadcn/components/ui/button';
import PageContainer from './components/containers/PageContainer';

import { useCallback, useState } from 'react';
import { toggleTheme } from './lib/utils/theming-helpers/toggleTheme';

export default function MainLayout() {
  const [_theme, setTheme] = useState<string>(toggleTheme);

  const navigate = useNavigate();
  const handleNav = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const handleThemeState = useCallback(() => {
    toggleTheme();
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }, []);

  type navListType = {
    path: string;
    name: string;
  }
  const navList: navListType[] = [
    { path: '', name: 'Home' },
    { path: 'portfolio', name: 'Porfolio' },
    { path: 'contact', name: 'Contact' },
    { path: 'skills', name: 'Skills' },
    { path: 'projects', name: 'Project' },
    { path: 'projects-boiler-plate', name: 'Projects BoilerPlate' },
    { path: 'activity-boiler-plate', name: 'Activity' }
  ];

  type actionButtonType = {
    title: string;
    fn: () => void;
  }
  const actionButton: actionButtonType[] = [
    {
      title: 'Mode',
      fn: handleThemeState
    },
    {
      title: 'Profile',
      fn: () => {
        alert("show-profile-dropdown")
      }
    }
  ];

  return (
    <>
      <nav className="h-5rem w-full flex justify-between items-center p-6">
        <div className="flex-3 flex flex-row gap-3">
          {navList.map(({ path, name }: navListType) => (
            <Button
              key={path || "dashboard"}
              onClick={() => {
                handleNav(path)
              }
              }>{name}</Button>
          ))}
        </div>

        <div className="flex-1 flex flex-row gap-2 justify-end">
          {actionButton.map((actions: actionButtonType) => (
            <Button
              key={actions.title}
              onClick={() => {
                actions.fn() // invoke the function defined
              }}>{actions.title}
            </Button>
          ))}
        </div>
      </nav>
      <main>
        <PageContainer className='border'>
          <Outlet />
        </PageContainer>
      </main>

      <footer />
    </>
  );
}
