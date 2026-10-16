import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BreedDetail() {
  const { breed } = useParams();

  const [subBreeds, setSubBreeds] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  // Initial fetch when breed changes
  useEffect(() => {
    setLoading(true);
    setError('');

    // Fetch both sub-breed list and 6 random photos in parallel
    const fetchSubBreeds = fetch(`https://dog.ceo/api/breed/${breed}/list`).then(
      (res) => {
        if (!res.ok) throw new Error('Breed not found');
        return res.json();
      }
    );

    const fetchPhotos = fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/6`
    ).then((res) => {
      if (!res.ok) throw new Error('Failed to load photos');
      return res.json();
    });

    Promise.all([fetchSubBreeds, fetchPhotos])
      .then(([subBreedData, photosData]) => {
        setSubBreeds(subBreedData.message || []);
        setPhotos(photosData.message || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching breed details');
        setLoading(false);
      });
  }, [breed]);

  // Bonus: Load 6 more photos button
  const handleLoadMore = () => {
    setLoadingMore(true);
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load more photos');
        return res.json();
      })
      .then((data) => {
        // Append new photos to the existing photos array
        setPhotos((prev) => [...prev, ...data.message]);
        setLoadingMore(false);
      })
      .catch((err) => {
        alert('Could not load more images: ' + err.message);
        setLoadingMore(false);
      });
  };

  return (
    <div className="breed-detail-page">
      {/* Detail Header & Back link */}
      <div className="detail-header">
        <Link to="/breeds" className="back-link">
          ← Back to All Breeds
        </Link>

        <div className="detail-title-row">
          <h1 className="detail-title">{breed}</h1>
          <span className="badge badge-subbreed" style={{ fontSize: '0.9rem' }}>
            🐾 Breed Profile
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Loading photos and details for {breed}... 🐕</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/breeds" className="btn-secondary">
              Back to Breeds List
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Sub-breeds Section */}
          <section className="subbreeds-section">
            <h2 className="subbreeds-title">
              <span>🦴</span> Sub-breeds ({subBreeds.length})
            </h2>
            {subBreeds.length > 0 ? (
              <div className="subbreed-tags">
                {subBreeds.map((sub) => (
                  <span key={sub} className="subbreed-tag">
                    {sub}
                  </span>
                ))}
              </div>
            ) : (
              <p className="no-subbreeds">
                This breed has no registered sub-breeds in the database.
              </p>
            )}
          </section>

          {/* Photo Gallery Section */}
          <section className="gallery-section">
            <div className="gallery-header">
              <h2 className="gallery-title">
                📸 Photo Gallery ({photos.length} photos)
              </h2>
            </div>

            <div className="gallery-grid">
              {photos.map((url, index) => (
                <div key={`${url}-${index}`} className="gallery-item">
                  <img
                    src={url}
                    alt={`${breed} dog ${index + 1}`}
                    className="gallery-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Bonus: Load 6 more button */}
            <div className="load-more-container">
              <button
                className="btn-primary"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading More Photos...' : '➕ Load 6 More Photos'}
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default BreedDetail;
