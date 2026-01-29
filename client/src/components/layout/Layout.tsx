import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CommandBar } from "../navigation/CommandBar";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CommandBar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
