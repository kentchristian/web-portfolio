import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Providers from './lib/providers/Providers';
import MainApp from './routes/main-app';

const root = document.getElementById('root');

if (!root) throw new Error('Root element missing');

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <MainApp />
      </Providers>
    </BrowserRouter>
  </StrictMode>,
);
