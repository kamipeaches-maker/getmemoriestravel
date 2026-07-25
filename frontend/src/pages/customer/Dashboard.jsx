import './CustomerDashboard.css';
import { FiTrendingUp, FiBookmark, FiUsers, FiMessageSquare } from 'react-icons/fi';

export const CustomerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome Back!</h1>
        <p className="dashboard-subtitle">Manage your travel bookings and find contractors</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <FiTrendingUp className="card-icon" />
            <h3>Active Bookings</h3>
            <p className="card-value">2</p>
            <button className="btn btn-secondary btn-small">View Bookings</button>
          </div>

          <div className="dashboard-card">
            <FiBookmark className="card-icon" />
            <h3>Submissions</h3>
            <p className="card-value">3</p>
            <button className="btn btn-secondary btn-small">View Submissions</button>
          </div>

          <div className="dashboard-card">
            <FiUsers className="card-icon" />
            <h3>Favorite Contractors</h3>
            <p className="card-value">5</p>
            <button className="btn btn-secondary btn-small">View List</button>
          </div>

          <div className="dashboard-card">
            <FiMessageSquare className="card-icon" />
            <h3>Messages</h3>
            <p className="card-value">3</p>
            <button className="btn btn-secondary btn-small">Check Messages</button>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="btn btn-primary">Submit a New Trip</button>
            <button className="btn btn-accent">Browse Contractors</button>
          </div>
        </div>
      </div>
    </div>
  );
};
