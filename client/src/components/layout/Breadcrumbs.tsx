import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map path segments to readable labels
  const breadcrumbNameMap: { [key: string]: string } = {
    dashboard: "Dashboard",
    profile: "Profile",
    posts: "Posts",
    new: "Create Post",
    settings: "Settings",
    connections: "Connections",
  };

  return (
    <nav className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-wider uppercase text-text-muted">
      <Link
        to="/"
        className="flex items-center gap-1.5 hover:text-terminal transition-colors"
      >
        <Home className="w-3 h-3" />
        <span>root</span>
      </Link>

      {pathnames.length > 0 && <ChevronRight className="w-3 h-3 opacity-30" />}

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const name = breadcrumbNameMap[value] || value;

        return (
          <div key={to} className="flex items-center gap-2">
            {last ? (
              <span className="text-terminal font-bold">{name}</span>
            ) : (
              <Link to={to} className="hover:text-terminal transition-colors">
                {name}
              </Link>
            )}
            {!last && <ChevronRight className="w-3 h-3 opacity-30" />}
          </div>
        );
      })}
    </nav>
  );
}
