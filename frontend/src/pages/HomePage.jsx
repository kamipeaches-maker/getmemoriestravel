import { Link } from 'react-router-dom';
import { FiCamera, FiVideo, FiMapPin, FiUsers, FiTrendingUp, FiStar } from 'react-icons/fi';
import './HomePage.css';

export const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Capture Your Travel Memories</h1>
            <p>Connect with professional photographers and videographers to document your adventures</p>
            <div className="hero-buttons">
              <Link to="/register?role=customer" className="btn btn-primary">
                Book a Professional
              </Link>
              <Link to="/register?role=contractor" className="btn btn-secondary">
                Become a Contractor
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">📸</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FiMapPin className="feature-icon" />
              <h3>Choose Your Destination</h3>
              <p>Tell us where and when you're traveling, and what you want to capture</p>
            </div>
            <div className="feature-card">
              <FiCamera className="feature-icon" />
              <h3>Find Your Match</h3>
              <p>Browse professional photographers and videographers in your area</p>
            </div>
            <div className="feature-card">
              <FiVideo className="feature-icon" />
              <h3>Book Professionals</h3>
              <p>Select your perfect package and confirm your booking instantly</p>
            </div>
            <div className="feature-card">
              <FiTrendingUp className="feature-icon" />
              <h3>Receive Your Media</h3>
              <p>Get professional photos and videos delivered within days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages">
        <div className="container">
          <h2>Our Packages</h2>
          <div className="packages-grid">
            <div className="package-card">
              <h3>Basic</h3>
              <p className="price">Starting at $500</p>
              <ul className="package-features">
                <li>✓ 4 hours coverage</li>
                <li>✓ Photographer OR Videographer</li>
                <li>✓ 200+ edited photos</li>
                <li>✓ 1 highlight reel</li>
                <li>✓ Digital delivery</li>
              </ul>
              <button className="btn btn-outline">Learn More</button>
            </div>

            <div className="package-card premium">
              <h3>Premium</h3>
              <p className="price">Starting at $1,200</p>
              <div className="popular-badge">Most Popular</div>
              <ul className="package-features">
                <li>✓ 8 hours coverage</li>
                <li>✓ Photographer + Videographer</li>
                <li>✓ 400+ edited photos</li>
                <li>✓ Full highlight video (3-5 min)</li>
                <li>✓ Online gallery + USB</li>
              </ul>
              <button className="btn btn-primary">Get Started</button>
            </div>

            <div className="package-card">
              <h3>Luxury</h3>
              <p className="price">Starting at $2,500</p>
              <ul className="package-features">
                <li>✓ Full day coverage (12+ hours)</li>
                <li>✓ Photographer + Videographer + Editor</li>
                <li>✓ 800+ edited photos</li>
                <li>✓ Full cinematic film (10-15 min)</li>
                <li>✓ Premium album + USB + printing</li>
              </ul>
              <button className="btn btn-accent">Inquire</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Professional Contractors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Destinations Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of travelers capturing their best moments</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};
