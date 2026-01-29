import React, { createContext, useContext, useMemo, useState } from "react";
import Sidebar from "../ui/Sidebar";

const SidebarLayoutContext = createContext(null);

export function useSidebarLayout() {
  const ctx = useContext(SidebarLayoutContext);
  if (!ctx) {
    throw new Error("useSidebarLayout must be used inside <MainLayout />");
  }
  return ctx;
}

export default function MainLayout({ children }) {
  // ✅ This is the SINGLE source of truth for collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      setSidebarCollapsed,
      sidebarPinnedOpen: !sidebarCollapsed, // alias to match what you used before
    }),
    [sidebarCollapsed]
  );

  return (
    <SidebarLayoutContext.Provider value={value}>
      <div className="flex h-screen bg-page-bg overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 bg-page-bg overflow-y-auto">{children}</main>
      </div>
    </SidebarLayoutContext.Provider>
  );
}
