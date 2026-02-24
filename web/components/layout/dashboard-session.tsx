"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AuthUser } from "@/lib/api";

type DashboardSessionContextValue = {
  user: AuthUser;
};

const DashboardSessionContext = createContext<DashboardSessionContextValue | null>(
  null,
);

type DashboardSessionProviderProps = {
  user: AuthUser;
  children: ReactNode;
};

export function DashboardSessionProvider({
  user,
  children,
}: DashboardSessionProviderProps) {
  return (
    <DashboardSessionContext.Provider value={{ user }}>
      {children}
    </DashboardSessionContext.Provider>
  );
}

export function useDashboardSession(): DashboardSessionContextValue {
  const context = useContext(DashboardSessionContext);
  if (!context) {
    throw new Error(
      "useDashboardSession must be used within DashboardSessionProvider",
    );
  }
  return context;
}
