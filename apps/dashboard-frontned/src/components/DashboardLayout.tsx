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
    <div className="dark min-h-screen bg-background pb-16 md:pb-0">
      <aside className="w-full h-16 md:w-64 fixed bottom-0 md:top-0 md:left-0 md:h-screen border-t md:border-t-0 md:border-r border-border/50 flex flex-row md:flex-col bg-background/95 backdrop-blur md:bg-card/30 z-50">
        <div className="hidden md:flex px-5 h-16 items-center gap-2.5 border-b border-border/50">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="size-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            OpenRouter
          </span>
        </div>

        <nav className="flex-1 flex flex-row md:flex-col px-2 md:px-3 py-2 md:py-4 gap-1 md:space-y-1 justify-around md:justify-start">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 p-2 md:px-3 md:py-2 rounded-lg text-[10px] md:text-sm font-medium transition-colors min-w-[64px]",
                  isActive
                    ? "text-primary md:bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground md:hover:bg-accent/50"
                )}
              >
                <item.icon className="size-5 md:size-4" />
                <span className="md:inline">{item.label}</span>
              </Link>
            );
          })}

          <div className="md:hidden flex items-center justify-center">
            <Link
              to="/signin"
              className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors min-w-[64px]"
            >
              <LogOut className="size-5" />
              <span>Sign out</span>
            </Link>
          </div>
        </nav>

        <div className="hidden md:block px-3 py-4 border-t border-border/50">
          <Link
            to="/signin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </Link>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}