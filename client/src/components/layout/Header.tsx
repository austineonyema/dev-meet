import { Link, useLocation } from "react-router-dom";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

const navLinks = [
  { href: "/", label: "~/" },
  { href: "/posts", label: "./posts" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // TODO: Replace with actual auth state
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-40 border-b border-terminal/20 bg-surface-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-terminal" />
            <span className="font-mono text-lg text-text-primary">
              dev<span className="text-terminal">-meet</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 rounded transition-colors ${
                  location.pathname === link.href
                    ? "text-terminal"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 font-mono text-sm">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-text-secondary hover:text-terminal transition-colors"
              >
                ./dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  login
                </Link>
                <Link to="/register">
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

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-terminal/10 mt-2 pt-4">
            <nav className="flex flex-col gap-1 font-mono text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded transition-colors ${
                    location.pathname === link.href
                      ? "text-terminal bg-terminal/5"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-terminal/10 font-mono">
              {!isAuthenticated && (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-2.5 text-text-muted hover:text-text-primary transition-colors">
                      login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="md"
                      className="w-full bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-medium"
                    >
                      $ init --register
                    </Button>
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
