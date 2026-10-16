import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BreedDetail() {
  // Get breed name from URL parameter (:breed)
  const { breed } = useParams();

  const [subBreeds, setSubBreeds] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch breed sub-breeds and initial 6 photos
  useEffect(() => {
    setLoading(true);

    // 1. Fetch sub-breeds list
    fetch(`https://dog.ceo/api/breed/${breed}/list`)
      .then((res) => res.json())
      .then((data) => {
        setSubBreeds(data.message);
      });

    // 2. Fetch 6 random photos
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [breed]);

  // Bonus: Load 6 more photos and add to gallery
  const handleLoadMore = () => {
    setLoadingMore(true);
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`)
      .then((res) => res.json())
      .then((data) => {
        // Append new images to existing photos array
        setPhotos([...photos, ...data.message]);
        setLoadingMore(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingMore(false);
      });
  };

  if (loading) {
    return <div className="loading-box">Loading details for {breed}... 🐾</div>;
  }

  return (
    <div className="detail-container">
      <Link to="/breeds" className="back-link">
        ← Back to All Breeds
      </Link>

      <h1 className="breed-title">{breed}</h1>

      {/* Sub-breeds List */}
      <div className="subbreeds-box">
        <h3>Sub-breeds ({subBreeds.length}):</h3>
        {subBreeds.length > 0 ? (
          <div className="subbreed-tags">
            {subBreeds.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="no-sub">No sub-breeds for this breed.</p>
        )}
      </div>

      {/* Photo Gallery */}
      <h2>Photo Gallery ({photos.length} photos)</h2>
      <div className="gallery-grid">
        {photos.map((photoUrl, index) => (
          <div key={index} className="gallery-card">
            <img src={photoUrl} alt={breed} className="gallery-image" />
          </div>
        ))}
      </div>

      {/* Bonus button */}
      <div className="center-btn">
        <button
          onClick={handleLoadMore}
          className="btn-primary"
          disabled={loadingMore}
        >
          {loadingMore ? 'Loading...' : '➕ Load 6 More Photos'}
        </button>
      </div>
    </div>
  );
}

export default BreedDetail;
