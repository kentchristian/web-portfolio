import { Routes, Route } from 'react-router';
import MainLayout from '../../layout';
import Dashboard from '../pages/dashboard';
// import Home from './pages/Home';
// import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="about" element={<About />} /> */}
      </Route>
    </Routes>
  );
}
