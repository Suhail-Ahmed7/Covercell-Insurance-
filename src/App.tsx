import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import QuotePage from './pages/QuotePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CustomerPortal from './pages/CustomerPortal';
import BlogPage from './pages/BlogPage';

import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blog" element={<BlogPage />} />
           

            {/* Protected Routes */}
            <Route 
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin', 'shop_owner', 'employee']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/portal"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerPortal />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
