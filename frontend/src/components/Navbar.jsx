import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMenu, FiX, FiLogOut, FiHome } from 'react-icons/fi';
import { useState } from 'react';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🌍</span>
            Get Memories Travel
          </Link>

          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            {isAuthenticated ? (
              <>
                {user?.userType === 'customer' && (
                  <>
                    <Link to="/customer/dashboard">Dashboard</Link>
                    <Link to="/customer/submit">Submit Trip</Link>
                    <Link to="/customer/bookings">Bookings</Link>
                    <Link to="/customer/contractors">Find Contractors</Link>
                  </>
                )}
                {user?.userType === 'contractor' && (
                  <>
                    <Link to="/contractor/dashboard">Dashboard</Link>
                    <Link to="/contractor/profile">My Profile</Link>
                    <Link to="/contractor/bookings">My Jobs</Link>
                  </>
                )}
                <div className="nav-user">
                  <span className="nav-username">{user?.firstName}</span>
                  <button onClick={handleLogout} className="btn btn-small btn-outline">
                    <FiLogOut /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn btn-primary btn-small">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};
