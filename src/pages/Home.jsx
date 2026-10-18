import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // State for dog image URL and loading status
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch a random dog photo from the API
  const fetchRandomDog = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setDogImage(data.message);
    } catch (err) {
      console.error('Error fetching dog image:', err);
    }
    setLoading(false);
  };

  // Load initial dog photo on page load
  useEffect(() => {
    fetchRandomDog();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to PawPedia 🐶</h1>
      <p>Discover dog breeds and explore their cute photo galleries.</p>

      {/* Dog Photo Card */}
      <div className="dog-card">
        {loading ? (
          <div className="loading-box">Loading cute pup... 🐾</div>
        ) : (
          <img src={dogImage} alt="Random Dog" className="dog-image" />
        )}

        {/* Action Buttons */}
        <div className="button-group">
          <button onClick={fetchRandomDog} className="btn-primary">
            🐶 New Dog Photo
          </button>
          <Link to="/breeds" className="btn-secondary">
            View All Breeds ➔
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

