import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BreedsList() {
  // State for all breeds data, search input, and loading status
  const [breedsData, setBreedsData] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all breeds when component mounts
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await res.json();
        setBreedsData(data.message);
      } catch (err) {
        console.error('Error fetching breeds:', err);
      }
      setLoading(false);
    };

    fetchBreeds();
  }, []);

  // Extract breed names and filter based on search input
  const breedNames = Object.keys(breedsData);
  const filteredBreeds = breedNames.filter((breed) =>
    breed.toLowerCase().includes(search.toLowerCase().trim())
  );

  if (loading) {
    return <div className="loading-box">Loading all breeds... 🐾</div>;
  }

  return (
    <div className="breeds-container">
      <h1>All Dog Breeds 🐕</h1>
      <p>Search and explore different breeds and their sub-breeds.</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search breed by name (e.g. bulldog, hound)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Count Indicator */}
      <p className="count-text">
        Showing <strong>{filteredBreeds.length}</strong> of {breedNames.length} breeds
      </p>

      {/* Grid of Breed Cards */}
      <div className="breeds-grid">
        {filteredBreeds.map((breed) => (
          <div key={breed} className="breed-card">
            <h3>{breed}</h3>
            <p className="sub-count">
              Sub-breeds: <strong>{breedsData[breed].length}</strong>
            </p>
            <Link to={`/breeds/${breed}`} className="btn-primary">
              View Gallery ➔
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreedsList;

