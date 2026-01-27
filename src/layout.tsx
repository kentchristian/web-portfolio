import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css';

import { Button } from '../shadcn/components/ui/button';
import PageContainer from './components/common/PageContainer';
import { useEffect, useState } from 'react';
import { cn } from './lib/utils';
import { getInitialTheme } from './utils/getInitialTheme';
import { property } from './utils/tailwind-combined-properties';


export default function MainLayout() {


  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);


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

  ];


  type actionButtonType = {
    title: string;
    fn: () => void;
    functionCondition?: boolean;
  }
  const actionButton: actionButtonType[] = [
    {
      title: 'Mode', 
      fn: () => setTheme(theme === "dark" ? "light" : "dark"),
      functionCondition: theme === "dark",
    },
    {
      title: 'Profile', fn: () => {
        console.log("ACTION: ")
      }
    }
  ];

  const navigate = useNavigate();
  const handleNav = (path: string) => {
    navigate(`${path}`)
  }




  return (
    <>
      <nav className="h-5rem w-full flex justify-between items-center p-6">
        <div className="flex-3 flex flex-row gap-3">
          {navList.map(({ path, name }: navListType) => (
            <Button className='hover:cursor-pointer'
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
                actions.functionCondition && actions.title === "Mode" ?
                // TODO: #Transfer this color preset at global.css 
                property.buttonDarkTheme : property.buttonLigthTheme,
                property.buttonCursorHover,
                
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
