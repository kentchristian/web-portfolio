import { Routes, Route } from 'react-router';
import MainLayout from '../layout';
import Dashboard from '../pages/dashboard';
import Contact from '../pages/contact';
import Portfolio from '../pages/portfolio';
import Projects from '../pages/projects';
import Skills from '../pages/skills';
// import Home from './pages/Home';
// import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="dashboard" key="dashboard" element={<Dashboard />} />
        <Route
          path="portfolio"
          element={< Portfolio />}
          key="portfolio"
        />
        <Route
          path="contact"
          element={< Contact />}
          key="contact"
        />
        <Route
          path="projects"
          element={< Projects />}
          key="projects"
        />
        <Route
          path="skills"
          element={< Skills />}
          key="skills"
        />
        {/* <Route path="about" element={<About />} /> */}
      </Route>
    </Routes>
  );
}
