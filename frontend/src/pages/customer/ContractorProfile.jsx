import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../config/axios';
import { API_ENDPOINTS } from '../../config/api';
import './ContractorProfile.css';
import { FiStar, FiCamera, FiVideo, FiMapPin, FiAward, FiMessageSquare } from 'react-icons/fi';

export const ContractorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractor, setContractor] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchContractorData();
  }, [id]);

  const fetchContractorData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.GET_CONTRACTOR(id));
      setContractor(response.data.contractor);

      // Fetch portfolio
      const portfolioResponse = await apiClient.get(`/api/portfolio/${id}`);
      setPortfolio(portfolioResponse.data.portfolio || []);
    } catch (err) {
      setError('Failed to load contractor profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '60px 20px' }}>Loading...</div>;
  if (error) return <div className="container alert alert-error" style={{ padding: '60px 20px' }}>{error}</div>;
  if (!contractor) return <div className="container" style={{ padding: '60px 20px' }}>Contractor not found</div>;

  return (
    <div className="contractor-profile-page">
      {/* Header */}
      <div className="contractor-profile-header">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {contractor.profilePicture ? (
                <img src={contractor.profilePicture} alt={contractor.firstName} />
              ) : (
                <div className="avatar-placeholder">📸</div>
              )}
            </div>
            <div className="profile-text">
              <h1>{contractor.firstName} {contractor.lastName}</h1>
              <div className="profile-meta">
                <div className="meta-item">
                  <FiStar className="star" />
                  <span>{contractor.averageRating || 'New'} Rating</span>
                </div>
                <div className="meta-item">
                  <FiAward />
                  <span>{contractor.completedJobs || 0} Jobs Completed</span>
                </div>
                <div className="meta-item">
                  <span>${contractor.hourlyRate}/hr</span>
                </div>
              </div>
              {contractor.bio && <p className="profile-bio">{contractor.bio}</p>}
              <button className="btn btn-primary">
                <FiMessageSquare /> Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="tab-content">
            <div className="profile-grid">
              <div className="profile-section">
                <h2>Experience & Skills</h2>
                <div className="section-content">
                  <div className="info-item">
                    <strong>Specialty:</strong>
                    <div className="specialty-badge">
                      {contractor.specialty === 'photography' && <><FiCamera /> Photography</>
                      }
                      {contractor.specialty === 'videography' && <><FiVideo /> Videography</>
                      }
                      {contractor.specialty === 'both' && <><FiCamera /> <FiVideo /> Both</>
                      }
                    </div>
                  </div>
                  <div className="info-item">
                    <strong>Experience:</strong>
                    <p>{contractor.experience} years in professional media</p>
                  </div>
                  {contractor.certifications && contractor.certifications.length > 0 && (
                    <div className="info-item">
                      <strong>Certifications:</strong>
                      <ul>
                        {contractor.certifications.map((cert, idx) => (
                          <li key={idx}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h2>Service Coverage</h2>
                <div className="section-content">
                  {contractor.serviceCoverage && (
                    <>
                      {contractor.serviceCoverage.cities && contractor.serviceCoverage.cities.length > 0 && (
                        <div className="info-item">
                          <strong>Cities:</strong>
                          <p>{contractor.serviceCoverage.cities.join(', ')}</p>
                        </div>
                      )}
                      {contractor.serviceCoverage.countries && contractor.serviceCoverage.countries.length > 0 && (
                        <div className="info-item">
                          <strong>International:</strong>
                          <p>{contractor.serviceCoverage.countries.join(', ')}</p>
                        </div>
                      )}
                      <div className="info-item">
                        <strong>Willing to Travel:</strong>
                        <p>{contractor.serviceCoverage.willingToTravel ? 'Yes' : 'Local only'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="tab-content">
            {portfolio.length === 0 ? (
              <p className="no-content">No portfolio items yet</p>
            ) : (
              <div className="portfolio-grid">
                {portfolio.map(item => (
                  <div key={item._id} className="portfolio-item">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} />
                    )}
                    {item.title && <h4>{item.title}</h4>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-content">
            <p className="no-content">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
