import { useState } from "react";

export function useFooterMenu(defaultTab = "inicio") {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return {
    activeTab,
    setActiveTab,
  };
}
