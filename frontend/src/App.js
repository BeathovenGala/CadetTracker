import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CadetDashboard from './pages/CadetDashboard';

/**
 * ProtectedRoute component checks for token and role in localStorage.
 * If no token or wrong role, it redirects to login.
 * Otherwise it renders the child component.
 */
function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }
  if (role && userRole !== role) {
    // Role mismatch
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // Check authentication state to redirect default path
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Routes>
      {/* Default route: redirect based on auth status */}
      <Route
        path="/"
        element={
          token ? (
            role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/cadet" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          token ? (
            // If already logged in, redirect to appropriate dashboard
            role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/cadet" replace />
            )
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/register"
        element={
          token ? (
            // Redirect logged-in user away from register
            <Navigate to={role === 'admin' ? '/admin' : '/cadet'} replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cadet"
        element={
          <ProtectedRoute role="cadet">
            <CadetDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
