import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Map,
  Users,
  Shield,
  Trophy,
  MessageSquare,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Report", path: "/report", icon: FileText },
  { label: "Map View", path: "/map", icon: Map },
  { label: "Volunteer", path: "/volunteer", icon: Users },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Rewards", path: "/rewards", icon: Trophy },
  { label: "Admin Panel", path: "/admin", icon: Shield },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card/50 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg warm-gradient flex items-center justify-center">
              <Shield size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-lg tracking-tight">CrisisAI</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto text-primary/60" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 m-3 rounded-lg glass-card">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            🛡️ You're helping keep your community safe. Every report matters.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 lg:px-6 bg-background/80 backdrop-blur-xl border-b border-border/30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crisis-red rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full warm-gradient flex items-center justify-center text-xs font-semibold text-primary-foreground">
              U
            </div>
          </div>
        </header>

        {/* Page content with transition */}
        <main className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
