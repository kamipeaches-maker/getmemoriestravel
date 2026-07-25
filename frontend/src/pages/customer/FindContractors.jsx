import { useState, useEffect } from 'react';
import apiClient from '../../config/axios';
import { API_ENDPOINTS } from '../../config/api';
import './FindContractors.css';
import { FiStar, FiMapPin, FiCamera, FiVideo, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const FindContractors = () => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    minRating: 0
  });

  useEffect(() => {
    fetchContractors();
  }, [filters]);

  const fetchContractors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.specialty) params.append('specialty', filters.specialty);
      if (filters.minRating) params.append('minRating', filters.minRating);

      const response = await apiClient.get(
        `${API_ENDPOINTS.GET_CONTRACTORS}?${params}`
      );
      setContractors(response.data.contractors || []);
    } catch (err) {
      setError('Failed to load contractors');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="find-contractors-page">
      <div className="container">
        <div className="contractors-header">
          <h1>Find Your Perfect Professional</h1>
          <p>Browse our network of talented photographers and videographers</p>
        </div>

        {/* Filters */}
        <div className="contractors-filters">
          <div className="filter-group">
            <label>Specialty</label>
            <select name="specialty" value={filters.specialty} onChange={handleFilterChange}>
              <option value="">All Specialties</option>
              <option value="photography">Photography</option>
              <option value="videography">Videography</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Rating</label>
            <select name="minRating" value={filters.minRating} onChange={handleFilterChange}>
              <option value="0">All Ratings</option>
              <option value="4">4★ and up</option>
              <option value="4.5">4.5★ and up</option>
              <option value="5">5★ only</option>
            </select>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading contractors...</div>
        ) : contractors.length === 0 ? (
          <div className="no-results">No contractors found. Try adjusting your filters.</div>
        ) : (
          <div className="contractors-grid">
            {contractors.map(contractor => (
              <div key={contractor._id} className="contractor-card">
                <div className="contractor-header">
                  <div className="contractor-avatar">
                    {contractor.profilePicture ? (
                      <img src={contractor.profilePicture} alt={contractor.firstName} />
                    ) : (
                      <FiUser />
                    )}
                  </div>
                  <div className="contractor-info">
                    <h3>{contractor.firstName} {contractor.lastName}</h3>
                    <div className="rating">
                      <FiStar className="star" />
                      <span>{contractor.averageRating || 'New'}</span>
                    </div>
                  </div>
                </div>

                <div className="contractor-details">
                  <div className="detail-item">
                    {contractor.specialty === 'both' ? (
                      <>
                        <FiCamera /> <FiVideo />
                      </>
                    ) : contractor.specialty === 'photography' ? (
                      <FiCamera />
                    ) : (
                      <FiVideo />
                    )}
                    <span>{contractor.specialty}</span>
                  </div>
                  <div className="detail-item">
                    <span className="rate">${contractor.hourlyRate}/hr</span>
                  </div>
                </div>

                {contractor.bio && (
                  <p className="contractor-bio">{contractor.bio}</p>
                )}

                <div className="contractor-experience">
                  {contractor.experience && (
                    <span>{contractor.experience} years experience</span>
                  )}
                </div>

                <Link to={`/customer/contractors/${contractor._id}`} className="btn btn-primary btn-small">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
