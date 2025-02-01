import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./context/AuthContext";

import './index.css';
import App from './App';



// Import the PWA service worker registration function
import { registerSW } from 'virtual:pwa-register';

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content is available. Please refresh the page.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>

    <App />
    </AuthProvider>

  </StrictMode>
);
