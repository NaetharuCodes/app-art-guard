import { Outlet } from "react-router-dom";
import { Shield } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="max-w-[1400px] mx-auto w-full flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/5 flex-col justify-center px-12">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Art Guard</h1>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Protect Your Creative Work
            </h2>
            <p className="text-muted-foreground text-lg">
              Portfolio hosting, commission management, and AI protection tools
              for artists.
            </p>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">
                  Art Guard
                </h1>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
