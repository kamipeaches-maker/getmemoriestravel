import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../config/axios';
import { API_ENDPOINTS } from '../../config/api';
import './SubmitTrip.css';
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers } from 'react-icons/fi';

export const SubmitTrip = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelersCount: '',
    packageTier: 'premium',
    includePhotography: true,
    includeVideography: true,
    preferences: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_SUBMISSION, formData);
      setSuccess('Trip submitted successfully!');
      setTimeout(() => {
        navigate('/customer/bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-trip-page">
      <div className="container">
        <div className="submit-trip-header">
          <h1>Plan Your Travel Adventure</h1>
          <p>Tell us about your trip and we'll connect you with the perfect photographer or videographer</p>
        </div>

        <div className="submit-trip-form-container">
          <form onSubmit={handleSubmit} className="submit-trip-form">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Destination */}
            <div className="form-section">
              <h2>Trip Details</h2>
              
              <div className="form-group">
                <label><FiMapPin /> Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Paris, Bali, Machu Picchu"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiCalendar /> Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FiCalendar /> End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiDollarSign /> Budget</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Total budget in USD"
                    min="500"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FiUsers /> Number of Travelers</label>
                  <input
                    type="number"
                    name="travelersCount"
                    value={formData.travelersCount}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="form-section">
              <h2>Services Needed</h2>
              
              <div className="package-selector">
                <label className="package-option">
                  <input
                    type="radio"
                    name="packageTier"
                    value="basic"
                    checked={formData.packageTier === 'basic'}
                    onChange={handleChange}
                  />
                  <span className="package-label">
                    <strong>Basic</strong>
                    <small>Starting at $500</small>
                  </span>
                </label>
                <label className="package-option">
                  <input
                    type="radio"
                    name="packageTier"
                    value="premium"
                    checked={formData.packageTier === 'premium'}
                    onChange={handleChange}
                  />
                  <span className="package-label">
                    <strong>Premium</strong>
                    <small>Starting at $1,200</small>
                  </span>
                </label>
                <label className="package-option">
                  <input
                    type="radio"
                    name="packageTier"
                    value="luxury"
                    checked={formData.packageTier === 'luxury'}
                    onChange={handleChange}
                  />
                  <span className="package-label">
                    <strong>Luxury</strong>
                    <small>Starting at $2,500</small>
                  </span>
                </label>
              </div>

              <div className="services-checkboxes">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="includePhotography"
                    checked={formData.includePhotography}
                    onChange={handleChange}
                  />
                  <span>Include Photography</span>
                </label>
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="includeVideography"
                    checked={formData.includeVideography}
                    onChange={handleChange}
                  />
                  <span>Include Videography</span>
                </label>
              </div>
            </div>

            {/* Preferences */}
            <div className="form-section">
              <h2>Special Requests</h2>
              <div className="form-group">
                <label>Additional Preferences</label>
                <textarea
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  placeholder="Tell us about your vision, style preferences, must-capture moments, etc."
                  rows="5"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Trip Plan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
