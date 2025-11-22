import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BackendConfig {
  apiUrl: string;
  timeout: number;
  retryAttempts: number;
  // useFallbackData?: boolean; // Removed fallback logic
}

interface BackendConfigContextType {
  config: BackendConfig;
  updateConfig: (newConfig: Partial<BackendConfig>) => void;
  resetToDefaults: () => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

const DEFAULT_CONFIG: BackendConfig = {
  apiUrl: (import.meta.env.VITE_BACKEND_URL as string) ?? 'http://localhost:8000',
  timeout: 5000,
  retryAttempts: 3,
};

const BackendConfigContext = createContext<BackendConfigContextType | undefined>(undefined);

export const BackendConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<BackendConfig>(() => {
    const savedRaw = localStorage.getItem('backend-config');
    const saved = savedRaw ? JSON.parse(savedRaw) : {};
    const initial = { ...DEFAULT_CONFIG, ...saved } as BackendConfig;
    // If VITE_BACKEND_URL provided at runtime, prefer it over saved config
    const envUrl = import.meta.env.VITE_BACKEND_URL as string | undefined;
    if (envUrl) initial.apiUrl = envUrl;
    return initial;
  });
  
  const [isConnected, setIsConnected] = useState(false);
  // Ping backend to determine if it's available and update `isConnected`.
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const resp = await fetch(`${config.apiUrl.replace(/\/$/, '')}/api/system/status`, { method: 'GET' });
        if (!mounted) return;
        setIsConnected(resp.ok);
      } catch (e) {
        if (!mounted) return;
        setIsConnected(false);
      }
    };

    // Run an initial check and then every 5 seconds while the app is mounted.
    check();
    const id = setInterval(check, 5000);
    return () => { mounted = false; clearInterval(id); };
  }, [config.apiUrl]);

  useEffect(() => {
    localStorage.setItem('backend-config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<BackendConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem('backend-config');
  };

  return (
    <BackendConfigContext.Provider value={{ config, updateConfig, resetToDefaults, isConnected, setIsConnected }}>
      {children}
    </BackendConfigContext.Provider>
  );
};

export const useBackendConfig = () => {
  const context = useContext(BackendConfigContext);
  if (!context) {
    throw new Error('useBackendConfig must be used within BackendConfigProvider');
  }
  return context;
};
