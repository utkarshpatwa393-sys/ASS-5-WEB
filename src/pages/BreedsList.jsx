import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BreedsList() {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all breeds from Dog CEO API
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load breeds list');
        }
        return res.json();
      })
      .then((data) => {
        // data.message is an object: { bulldog: ["boston", "french"], husky: [], ... }
        const breedNames = Object.keys(data.message);
        const formattedBreeds = breedNames.map((name) => ({
          name: name,
          subBreedsCount: data.message[name].length,
        }));
        setBreeds(formattedBreeds);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error loading breeds');
        setLoading(false);
      });
  }, []);

  // Filter breeds based on user's search input
  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="breeds-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Explore Dog Breeds 🐕</h1>
        <p className="page-desc">
          Browse through all dog breeds, check their sub-breeds, and view their photo gallery.
        </p>
      </div>

      {/* Search Bar & Result Counter */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search breed (e.g. bulldog, retriever, hound)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!loading && !error && (
          <div className="results-count">
            Showing <strong>{filteredBreeds.length}</strong> of {breeds.length} breeds
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Loading dog breeds... 🐾</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {/* No Results Found */}
      {!loading && !error && filteredBreeds.length === 0 && (
        <div className="state-container">
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            No breeds found matching "<strong>{searchTerm}</strong>" 🐶
          </p>
          <button
            className="btn-secondary"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Breeds Cards Grid */}
      {!loading && !error && (
        <div className="breeds-grid">
          {filteredBreeds.map((breed) => (
            <div key={breed.name} className="breed-card">
              <div>
                <div className="breed-card-header">
                  <h2 className="breed-name">{breed.name}</h2>
                  <span className="breed-icon">🐾</span>
                </div>
                <div>
                  {breed.subBreedsCount > 0 ? (
                    <span className="badge badge-subbreed">
                      {breed.subBreedsCount} sub-breed{breed.subBreedsCount > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="badge badge-none">No sub-breeds</span>
                  )}
                </div>
              </div>

              <Link to={`/breeds/${breed.name}`} className="breed-link-btn">
                <span>View Gallery & Info</span>
                <span>➔</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BreedsList;
