
import { applyTheme } from '../lib/utils/theming-helpers/applyTheme';
import { getInitialTheme } from '../lib/utils/theming-helpers/getInitialTheme';
import RoutesConfig from './route-config';


const MainApp = () => {
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);


  return (
    <RoutesConfig />
  )
}

export default MainApp