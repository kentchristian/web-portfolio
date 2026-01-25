import { Outlet, useNavigate } from 'react-router-dom';
import './layout.css';

import { Button } from '../shadcn/components/ui/button';
import PageContainer from './components/common/PageContainer';

export default function MainLayout() {

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

  const actionButtons = ['Mode', 'Profle'];

  const navigate = useNavigate();
  const handleNav = (path: string) => {
    navigate(`/${path}`)
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
          {actionButtons.map((button: string) => (
            <button>{button}</button>
          ))}
        </div>
      </nav>
      <main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
      <footer />
    </>
  );
}
