import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BreedDetail() {
  // Get the selected breed name from the URL path (:breed)
  const { breed } = useParams();

  // State for sub-breeds, photo gallery, and loading statuses
  const [subBreeds, setSubBreeds] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load sub-breeds and initial 6 photos when the breed changes
  useEffect(() => {
    const fetchBreedDetails = async () => {
      setLoading(true);
      try {
        // 1. Fetch sub-breeds list
        const subRes = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
        const subData = await subRes.json();
        setSubBreeds(subData.message);

        // 2. Fetch initial 6 photos
        const photoRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`);
        const photoData = await photoRes.json();
        setPhotos(photoData.message);
      } catch (err) {
        console.error('Error fetching breed details:', err);
      }
      setLoading(false);
    };

    fetchBreedDetails();
  }, [breed]);

  // Load 6 additional photos to append to the gallery
  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`);
      const data = await res.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data.message]);
    } catch (err) {
      console.error('Error loading more photos:', err);
    }
    setLoadingMore(false);
  };

  if (loading) {
    return <div className="loading-box">Loading details for {breed}... 🐾</div>;
  }

  return (
    <div className="detail-container">
      {/* Back to Breeds List */}
      <Link to="/breeds" className="back-link">
        ← Back to All Breeds
      </Link>

      <h1 className="breed-title">{breed}</h1>

      {/* Sub-breeds Section */}
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

      {/* Photo Gallery Grid */}
      <h2>Photo Gallery ({photos.length} photos)</h2>
      <div className="gallery-grid">
        {photos.map((photoUrl, index) => (
          <div key={index} className="gallery-card">
            <img src={photoUrl} alt={breed} className="gallery-image" />
          </div>
        ))}
      </div>

      {/* Load More Button */}
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

