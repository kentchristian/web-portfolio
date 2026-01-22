import { Outlet } from 'react-router-dom';
import './layout.css';

import { Button } from '../shadcn/components/ui/button';

export default function MainLayout() {
  const navList = ['Portfolio', 'Dashboard', 'Projects', 'Skills', 'Contact'];

  const actionButtons = ['Mode', 'Profle'];
  return (
    <>
      <nav className="h-5rem w-full flex justify-between items-center p-6">
        <div className="flex-3 flex flex-row gap-3">
          {navList.map((nav: string) => (
            <Button>{nav}</Button>
          ))}
        </div>

        <div className="flex-1 flex flex-row gap-2 justify-end">
          {actionButtons.map((button: string) => (
            <button>{button}</button>
          ))}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
}
