import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css';

import { Button } from '../shadcn/components/ui/button';
import PageContainer from './components/common/PageContainer';

import { cn } from './lib/utils';

import { useState } from 'react';
import { property } from './utils/tailwind-combined-properties';
import { toggleTheme } from './utils/theming-helpers/toggleTheme';

export default function MainLayout() { 
  const [theme, setTheme] = useState<string>(toggleTheme);

  console.log("THEME : ", theme)

  const handleThemeState = () => {
  setTheme(prev => (prev === "dark" ? "light" : "dark"));
};


  type navListType = {
    path: string;
    name: string;
  }
  const navList = [
    { path: 'portfolio', name: 'Porfolio' },
    { path: 'dashboard', name: 'Dashboard' },
    { path: 'contact', name: 'Contact' },
    { path: 'skills', name: 'Skills' },
    { path: 'projects', name: 'Project' },
    { path: 'projects-boiler-plate', name: 'Projects BoilerPlate'},
    { path: 'activity-boiler-plate', name: 'Activity'}

  ];

  type actionButtonType = {
    title: string;
    fn: () => void;
  }
  const actionButton: actionButtonType[] = [
    {
      title: 'Mode', 
      fn: () => {
        toggleTheme();
        handleThemeState();
        console.log("THEME :", theme)
        
      }       
    },
    {
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
          {navList.map(({ path, name }: navListType) => (
            <Button
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
