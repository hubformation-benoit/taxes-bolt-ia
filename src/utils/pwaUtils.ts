// PWA utility functions

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              if (confirm('New version available! Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};

export const isInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

export const getDisplayMode = (): string => {
  if (isInstalled()) {
    return 'standalone';
  }
  return 'browser';
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Check if device supports PWA installation
export const canInstall = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};