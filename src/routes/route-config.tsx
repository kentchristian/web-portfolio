import { Route, Routes } from 'react-router';
import MainLayout from '../layout';
import Experience from '../pages/experience';
import Home from '../pages/home';
import Profile from '../pages/Profile';
import Projects from '../pages/projects';
import Skills from '../pages/skills';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="" key="home" element={<Home />} />
        <Route path="experience" element={<Experience />} key="home" />
        <Route path="profile" element={<Profile />} key="profile" />
        <Route path="projects" element={<Projects />} key="projects" />

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
        <Route path="skills" element={<Skills />} key="skills" />
        {/* <Route path="about" element={<About />} /> */}
      </Route>
    </Routes>
  );
}
