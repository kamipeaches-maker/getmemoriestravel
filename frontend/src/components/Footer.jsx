import './Footer.css';
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Get Memories Travel</h3>
            <p>Capture your travel moments with professional photographers and videographers.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Email"><FiMail /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>For Customers</h4>
            <ul>
              <li><a href="#">Find Contractors</a></li>
              <li><a href="#">Submit Trip</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Contractors</h4>
            <ul>
              <li><a href="#">Sign Up</a></li>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Grow Your Business</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Get Memories Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
