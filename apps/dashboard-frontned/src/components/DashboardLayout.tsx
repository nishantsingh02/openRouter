import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import {
  LayoutDashboard,
  Key,
  Coins,
  Zap,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "API Keys", href: "/api-keys", icon: Key },
  { label: "Credits", href: "/credits", icon: Coins },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="dark min-h-screen bg-background">
      <aside className="w-64 fixed left-0 top-0 h-screen border-r border-border/50 flex flex-col bg-card/30">
        <div className="px-5 h-16 flex items-center gap-2.5 border-b border-border/50">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="size-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            OpenRouter
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border/50">
          <Link
            to="/signin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </Link>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}