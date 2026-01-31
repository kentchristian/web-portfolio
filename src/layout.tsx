import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css';

import { Button } from '../shadcn/components/ui/button';
import PageContainer from './components/containers/PageContainer';

import { cn } from './lib/cnUtils';

import { useState } from 'react';
import { property } from './lib/utils/tailwind-combined-properties';
import { toggleTheme } from './lib/utils/theming-helpers/toggleTheme';

import { v4 as uuidv4 } from 'uuid';

export default function MainLayout() {
  const [theme, setTheme] = useState<string>(toggleTheme);

  console.log("THEME : ", theme)

  const handleThemeState = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };


  type navListType = {
    key: string;
    path: string;
    name: string;
  }
  const navList = [
    { key: uuidv4(), path: 'portfolio', name: 'Porfolio' },
    { key: uuidv4(), path: '', name: 'Dashboard' },
    { key: uuidv4(), path: 'contact', name: 'Contact' },
    { key: uuidv4(), path: 'skills', name: 'Skills' },
    { key: uuidv4(), path: 'projects', name: 'Project' },
    { key: uuidv4(), path: 'projects-boiler-plate', name: 'Projects BoilerPlate' },
    { key: uuidv4(), path: 'activity-boiler-plate', name: 'Activity' }

  ];

  type actionButtonType = {
    key: string;
    title: string;
    fn: () => void;
  }
  const actionButton: actionButtonType[] = [
    {
      key: uuidv4(),
      title: 'Mode',
      fn: () => {
        toggleTheme();
        handleThemeState();
        console.log("THEME :", theme)

      }
    },
    {
      key: uuidv4(),
      title: 'Profile', fn: () => {
        alert("show-profile-dropdown")
      }
    }
  ];

  const navigate = useNavigate();
  const handleNav = (path: string) => {
    navigate(`${path}`)
  }



  const buttonTheme = theme === "dark" ? property.buttonDarkTheme : property.buttonLigthTheme;
  return (
    <>
      <nav className="h-5rem w-full flex justify-between items-center p-6">
        <div className="flex-3 flex flex-row gap-3">
          {navList.map(({ path, name, key }: navListType) => (
            <Button
              key={key}
              className={cn(
                property.buttonCursorHover,
                buttonTheme,

              )}
              onClick={() => {
                handleNav(path)
              }
              }>{name}</Button>
          ))}
        </div>

        <div className="flex-1 flex flex-row gap-2 justify-end">
          {actionButton.map((actions: actionButtonType) => (
            <Button
              key={actions.key}
              className={cn(
                property.buttonCursorHover,
                buttonTheme,
              )}
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
