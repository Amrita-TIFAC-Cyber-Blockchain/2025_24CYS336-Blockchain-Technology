import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integration/supabase/client";
import { Session } from "@supabase/supabase-js";
import { BackendConfigProvider } from "@/contexts/BackendConfigContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Nanogrids from "./pages/Nanogrids";
import Trading from "./pages/Trading";
import Settings from "./pages/Settings";
import DigitalTwin from "./pages/DigitalTwin";
import TransmissionLines from "./pages/TransmissionLines";
import { Auth } from "./components/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BackendConfigProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={session ? <Index session={session} /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/nanogrids"
              element={session ? <Nanogrids /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/trading"
              element={session ? <Trading /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/settings"
              element={session ? <Settings /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/digital-twin"
              element={session ? <DigitalTwin /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/transmission"
              element={session ? <TransmissionLines /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/auth"
              element={!session ? <Auth /> : <Navigate to="/" replace />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </BackendConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
