import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { AppLayout } from "./components/layouts/AppLayout";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// App pages
import DashboardPage from "./pages/app/DashboardPage";
import PortfolioPage from "./pages/app/PortfolioPage";
import CopyrightPage from "./pages/app/CopyrightPage";
import CommissionFlowPage from "./pages/app/CommissionFlowPage";
import SettingsPage from "./pages/app/SettingsPage";

// Protected route wrapper
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>

            {/* Protected app routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="copyright" element={<CopyrightPage />} />
              <Route path="commission-flow" element={<CommissionFlowPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Redirects */}
            <Route
              path="/"
              element={<Navigate to="/app/dashboard" replace />}
            />
            <Route
              path="/app"
              element={<Navigate to="/app/dashboard" replace />}
            />
            <Route
              path="/auth"
              element={<Navigate to="/auth/login" replace />}
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
