import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Terminal,
  Users,
  MessageSquareCode,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  User,
} from "lucide-react";
import { useState } from "react";
import { mockUser } from "../../data/user";
import { Breadcrumbs } from "./Breadcrumbs";

export function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Feed",
      path: "/dashboard",
      shortcut: "G F",
    },
    {
      icon: MessageSquareCode,
      label: "Posts",
      path: "/posts",
      shortcut: "G P",
    },
    {
      icon: Users,
      label: "Connections",
      path: "/connections",
      shortcut: "G C",
    },
    { icon: User, label: "Profile", path: "/profile", shortcut: "G U" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", path: "/settings", shortcut: "," },
  ];

  return (
    <div className="flex h-screen bg-surface-950 text-text-primary overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 border-r border-terminal/10 bg-surface-900 flex flex-col z-30`}
      >
        {/* Logo Area */}
        <div className="p-4 flex items-center gap-3 border-b border-terminal/10 h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-terminal" />
            {isSidebarOpen && (
              <span className="font-mono font-bold text-lg tracking-tight">
                dev<span className="text-terminal">-meet</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${
                  isActive
                    ? "bg-terminal/10 text-terminal border border-terminal/20 shadow-[0_0_15px_rgba(0,255,65,0.05)]"
                    : "text-text-muted hover:bg-surface-800 hover:text-text-primary border border-transparent"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-terminal" : "group-hover:text-terminal"} transition-colors`}
                />
                {isSidebarOpen && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-sm">{item.label}</span>
                    <span className="text-[10px] font-mono opacity-40">
                      {item.shortcut}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Nav */}
        <div className="p-3 border-t border-terminal/10 space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg text-text-muted hover:bg-surface-800 hover:text-text-primary transition-all group border border-transparent"
            >
              <item.icon className="w-5 h-5 group-hover:text-terminal transition-colors" />
              {isSidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium text-sm">{item.label}</span>
                  <span className="text-[10px] font-mono opacity-40">
                    {item.shortcut}
                  </span>
                </div>
              )}
            </Link>
          ))}

          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-error hover:bg-error/5 transition-all group border border-transparent">
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {isSidebarOpen && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>

        {/* User preview */}
        {isSidebarOpen && (
          <div className="p-4 bg-surface-950/50 border-t border-terminal/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-800 border border-terminal/20 overflow-hidden">
                {mockUser.avatar ? (
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-terminal text-xs">
                    {mockUser.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">{mockUser.name}</p>
                <p className="text-[10px] text-terminal font-mono truncate">
                  @{mockUser.username}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:flex items-center justify-center p-2 border-t border-terminal/10 text-text-muted hover:text-terminal hover:bg-surface-800 transition-all"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`}
          />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-terminal/10 bg-surface-900/50 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-text-muted hover:text-terminal transition-colors rounded-lg hover:bg-surface-800 md:hidden"
            >
              <ChevronRight
                className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-terminal transition-colors" />
              <input
                type="text"
                placeholder="Search terminal... (⌘ K)"
                className="bg-surface-800 border border-terminal/10 rounded-full pl-10 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:border-terminal/40 focus:ring-1 focus:ring-terminal/20 transition-all font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-text-muted hover:text-terminal transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-terminal rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
            </button>
            <div className="h-6 w-px bg-terminal/10 mx-1" />
            <button className="flex items-center gap-2 group px-2 py-1 rounded-lg hover:bg-surface-800 transition-colors">
              <div className="w-8 h-8 rounded-full border border-terminal/20 group-hover:border-terminal/50 transition-colors bg-surface-700 flex items-center justify-center overflow-hidden">
                <span className="text-[10px] font-mono text-terminal font-bold">
                  PRO
                </span>
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase leading-none mb-1">
                  Status
                </p>
                <div className="flex items-center gap-1.5 leading-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs font-mono font-bold text-terminal">
                    ONLINE
                  </p>
                </div>
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-surface-950 relative scrollbar-thin scrollbar-thumb-surface-700">
          {/* Scanline overlay for consistency */}
          <div className="scanline absolute inset-0 pointer-events-none z-10 opacity-30 h-full" />

          <div className="p-6 md:p-8 lg:p-10 relative z-2">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
