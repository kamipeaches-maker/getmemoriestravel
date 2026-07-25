import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/Dashboard';
import { SubmitTrip } from './pages/customer/SubmitTrip';
import { CustomerBookings } from './pages/customer/Bookings';
import { FindContractors } from './pages/customer/FindContractors';
import { ContractorProfile } from './pages/customer/ContractorProfile';

// Contractor Pages
import { ContractorDashboard } from './pages/contractor/Dashboard';
import { MyProfile } from './pages/contractor/MyProfile';
import { ContractorBookings } from './pages/contractor/Bookings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Customer Routes */}
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/submit"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <SubmitTrip />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/bookings"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/contractors"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <FindContractors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/contractors/:id"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <ContractorProfile />
                  </ProtectedRoute>
                }
              />

              {/* Contractor Routes */}
              <Route
                path="/contractor/dashboard"
                element={
                  <ProtectedRoute requiredRole="contractor">
                    <ContractorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contractor/profile"
                element={
                  <ProtectedRoute requiredRole="contractor">
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contractor/bookings"
                element={
                  <ProtectedRoute requiredRole="contractor">
                    <ContractorBookings />
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
