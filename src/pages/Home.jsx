import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch random dog image from API
  const fetchRandomDog = () => {
    setLoading(true);
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setDogImage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Run on page load
  useEffect(() => {
    fetchRandomDog();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to PawPedia 🐶</h1>
      <p>Discover dog breeds and explore their cute photo galleries.</p>

      {/* Dog Photo Box */}
      <div className="dog-card">
        {loading ? (
          <div className="loading-box">Loading cute pup... 🐾</div>
        ) : (
          <img src={dogImage} alt="Random Dog" className="dog-image" />
        )}

        {/* Buttons */}
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
