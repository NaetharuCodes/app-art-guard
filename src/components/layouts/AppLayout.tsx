import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  Image,
  FileText,
  Workflow,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "../ThemeSwitcher";

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/app/portfolio", icon: Image },
  { name: "Copyright", href: "/app/copyright", icon: FileText },
  { name: "Commission Flow", href: "/app/commission-flow", icon: Workflow },
  { name: "Settings", href: "/app/settings", icon: Settings },
];

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-card border-r overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            <Shield className="w-8 h-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-foreground">
              Art Guard
            </span>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 flex-shrink-0 h-5 w-5",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            {/* User section */}
            <div className="flex-shrink-0 px-2 pb-4">
              <ThemeSwitcher />
              <button className="group flex items-center w-full px-2 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-secondary hover:text-foreground">
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar for mobile */}
        <div className="md:hidden bg-card border-b px-4 py-3">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-primary" />
            <span className="ml-2 text-lg font-bold text-foreground">
              Art Guard
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
