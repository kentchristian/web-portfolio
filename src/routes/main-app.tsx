import { useEffect } from 'react'
import RoutesConfig from './route-config';

const MainApp = () => {
  useEffect(() => {
    const selectedTheme = localStorage.getItem("dark");

    if(selectedTheme){
      document.body.classList.add(selectedTheme);
    }else if (window.matchMedia("(prefers-color-scheme: dark)").matches){
      document.body.classList.add("dark");
    }else{
      document.body.classList.add("light");
    }
  }, [])


  return (
    <RoutesConfig />
  )
}

export default MainApp