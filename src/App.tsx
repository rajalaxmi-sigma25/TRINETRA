import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CriminalsPage } from './pages/CriminalsPage';
import { FirsPage } from './pages/FirsPage';
import { CasesPage } from './pages/CasesPage';
import { PrisonersPage } from './pages/PrisonersPage';
import { CourtPage } from './pages/CourtPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { LegalPage } from './pages/LegalPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Authenticated Routes wrapped in AppLayout */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="criminals" element={<CriminalsPage />} />
                <Route path="firs" element={<FirsPage />} />
                <Route path="cases" element={<CasesPage />} />
                <Route path="prisoners" element={<PrisonersPage />} />
                <Route path="court" element={<CourtPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="audit" element={<AuditLogsPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="legal" element={<LegalPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
