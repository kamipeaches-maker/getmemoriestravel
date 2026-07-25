import { useState, useEffect } from 'react';
import apiClient from '../../config/axios';
import './AdminDashboard.css';
import { FiUsers, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState('contractor');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, [userType]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsResponse = await apiClient.get('/api/admin/stats');
      setStats(statsResponse.data);

      // Fetch users
      const usersResponse = await apiClient.get(`/api/admin/users?userType=${userType}`);
      setUsers(usersResponse.data.users || []);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyContractor = async (contractorId) => {
    try {
      await apiClient.patch(`/api/admin/contractors/${contractorId}/verify`);
      fetchDashboard();
    } catch (err) {
      setError('Failed to verify contractor');
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      await apiClient.patch(`/api/admin/users/${userId}/suspend`);
      fetchDashboard();
    } catch (err) {
      setError('Failed to suspend user');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        {/* Stats */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <FiUsers className="stat-icon" />
              <div>
                <h3>Total Customers</h3>
                <p className="stat-value">{stats.totalCustomers}</p>
              </div>
            </div>
            <div className="stat-card">
              <FiUsers className="stat-icon" />
              <div>
                <h3>Total Contractors</h3>
                <p className="stat-value">{stats.totalContractors}</p>
              </div>
            </div>
            <div className="stat-card">
              <FiCheckCircle className="stat-icon" />
              <div>
                <h3>Verified Contractors</h3>
                <p className="stat-value">{stats.verifiedContractors}</p>
              </div>
            </div>
          </div>
        )}

        {/* Users Management */}
        <div className="users-section">
          <h2>Manage Users</h2>
          <div className="user-type-filter">
            <button
              className={`filter-btn ${userType === 'customer' ? 'active' : ''}`}
              onClick={() => setUserType('customer')}
            >
              Customers
            </button>
            <button
              className={`filter-btn ${userType === 'contractor' ? 'active' : ''}`}
              onClick={() => setUserType('contractor')}
            >
              Contractors
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    {userType === 'contractor' && <th>Specialty</th>}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      {userType === 'contractor' && <td>{user.specialty}</td>}
                      <td>
                        {userType === 'contractor' && (
                          <>
                            {!user.isVerified && (
                              <button
                                onClick={() => handleVerifyContractor(user._id)}
                                className="btn btn-small btn-accent"
                              >
                                Verify
                              </button>
                            )}
                          </>
                        )}
                        <button
                          onClick={() => handleSuspendUser(user._id)}
                          className="btn btn-small btn-outline"
                        >
                          Suspend
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
