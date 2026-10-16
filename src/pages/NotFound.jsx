import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-icon">🐕❓</div>
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-text">
        Ruff! The page or puppy you are looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary">
        🏠 Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
