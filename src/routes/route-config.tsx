import { Route, Routes } from 'react-router';
import MainLayout from '../layout';
import Contact from '../pages/contact';
import Home from '../pages/home';
import Portfolio from '../pages/portfolio';
import Projects from '../pages/projects';
import Skills from '../pages/skills';


export default function RoutesConfig() {


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="" key='home' element={<Home />} />
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
        {/* <Route
          path="projects-boiler-plate"
          element={< ProjectsBoilerPlage />}
          key="projects-boiler-plate"
        />
        <Route
          path="activity-boiler-plate"
          element={< ActivityBoilerPlate />}
          key="activity-boiler-plate"
        /> */}
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
