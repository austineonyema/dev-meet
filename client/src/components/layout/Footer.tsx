import { Github, Twitter, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

// Custom Medium icon (not in lucide)
function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

// Custom Google icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const footerLinks = {
  navigate: [
    { label: "./home", href: "/" },
    { label: "./posts", href: "/posts" },
    { label: "./login", href: "/login" },
  ],
  resources: [
    { label: "docs", href: "#" },
    { label: "api", href: "#" },
    { label: "changelog", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MediumIcon, href: "#", label: "Medium" },
  { icon: GoogleIcon, href: "#", label: "Google" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-terminal/20 bg-surface-950">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 ">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-terminal" />
              <span className="font-mono text-lg text-text-primary">
                dev<span className="text-terminal">-meet</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-muted font-mono max-w-xs">
              // where developers connect
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-mono text-sm text-terminal mb-4"># navigate</h4>
            <ul className="space-y-2 font-mono text-sm">
              {footerLinks.navigate.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-sm text-terminal mb-4">
              # resources
            </h4>
            <ul className="space-y-2 font-mono text-sm">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-sm text-terminal mb-4"># connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-2 text-text-muted hover:text-terminal transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-terminal/20">
          <p className="font-mono text-xs text-text-muted text-center">
            <span className="text-terminal">$</span> echo "©{" "}
            {new Date().getFullYear()} dev-meet. MIT License."
          </p>
        </div>
      </div>
    </footer>
  );
}
