import { useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Navbar } from "@/components/Navbar";
import { Dashboard } from "@/components/Dashboard";
import Nanogrids from "./Nanogrids";
import Trading from "./Trading";
import Settings from "./Settings";

interface IndexProps {
  session: Session;
}

const Index = ({ session }: IndexProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "nanogrids":
        return <Nanogrids />;
      case "trading":
        return <Trading />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        systemMode="simulation"
      />
      {renderContent()}
    </div>
  );
};

export default Index;
