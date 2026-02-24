"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

const navLinks = [
  { href: "/", label: "~/" },
  { href: "/posts", label: "./posts" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function resolveSession() {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        if (isActive) setIsAuthenticated(response.ok);
      } catch {
        if (isActive) setIsAuthenticated(false);
      }
    }

    void resolveSession();

    return () => {
      isActive = false;
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-terminal/20 bg-surface-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-terminal" />
            <span className="font-mono text-lg text-text-primary">
              dev<span className="text-terminal">-meet</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 font-mono text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded transition-colors ${
                  pathname === link.href
                    ? "text-terminal"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 font-mono text-sm">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-text-secondary hover:text-terminal transition-colors"
                >
                  ./dashboard
                </Link>
                <Link
                  href="/connections"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  ./connections
                </Link>
                <Link
                  href="/profile"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  ./profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  login
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-medium"
                  >
                    $ init
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-text-muted hover:text-terminal transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-terminal/10 mt-2 pt-4">
            <nav className="flex flex-col gap-1 font-mono text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded transition-colors ${
                    pathname === link.href
                      ? "text-terminal bg-terminal/5"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-terminal/10 font-mono">
              {!isAuthenticated ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-2.5 text-text-muted hover:text-text-primary transition-colors">
                      login
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="md"
                      className="w-full bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-medium"
                    >
                      $ init --register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-text-muted hover:text-text-primary transition-colors"
                  >
                    ./dashboard
                  </Link>
                  <Link
                    href="/connections"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-text-muted hover:text-text-primary transition-colors"
                  >
                    ./connections
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-text-muted hover:text-text-primary transition-colors"
                  >
                    ./profile
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
