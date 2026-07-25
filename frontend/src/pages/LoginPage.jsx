import { LoginForm } from '../components/AuthForms';
import { Link } from 'react-router-dom';
import './AuthPages.css';

export const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <LoginForm />
        <p className="register-link">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};
