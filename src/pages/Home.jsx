import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [randomImage, setRandomImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch a single random dog photo from Dog CEO API
  const fetchRandomDog = () => {
    setLoading(true);
    setError('');

    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch dog image');
        }
        return response.json();
      })
      .then((data) => {
        setRandomImage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong fetching the puppy!');
        setLoading(false);
      });
  };

  // Fetch a random dog on initial page mount
  useEffect(() => {
    fetchRandomDog();
  }, []);

  return (
    <div className="hero">
      <div className="hero-tag">🐕 Dog Breed Encyclopedia</div>
      <h1 className="hero-title">
        Discover & Explore <span>Dog Breeds</span>
      </h1>
      <p className="hero-subtitle">
        Welcome to PawPedia! View pictures of dogs from all over the world, discover
        breeds and sub-breeds, and explore our photo galleries.
      </p>

      {/* Hero Dog Photo Card */}
      <div className="hero-card">
        <div className="hero-image-wrapper">
          {loading ? (
            <div className="state-container">
              <div className="spinner"></div>
              <p>Fetching a cute pup...</p>
            </div>
          ) : error ? (
            <div className="error-box">
              <p>{error}</p>
              <button
                className="btn-primary"
                onClick={fetchRandomDog}
                style={{ marginTop: '0.75rem' }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <img
              src={randomImage}
              alt="Random dog"
              className="hero-image"
            />
          )}
        </div>

        {/* Action buttons: New dog bonus button + Browse Breeds */}
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={fetchRandomDog}
            disabled={loading}
          >
            {loading ? 'Fetching...' : '🐶 New Dog Photo'}
          </button>
          <Link to="/breeds" className="btn-secondary">
            Browse All Breeds ➔
          </Link>
        </div>
      </div>

      {/* Feature highlights for students / portfolio presentation */}
      <div className="features-grid">
        <div className="feature-box">
          <div className="feature-icon">📚</div>
          <h3>100+ Breeds</h3>
          <p>Complete directory of known breeds from the official Dog CEO API.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">🔍</div>
          <h3>Instant Search</h3>
          <p>Quickly search and filter through breeds in real-time as you type.</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">📸</div>
          <h3>Photo Galleries</h3>
          <p>High-resolution photo galleries with infinite "Load More" exploration.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
