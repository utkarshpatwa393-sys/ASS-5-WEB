import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BreedsList() {
  const [breeds, setBreeds] = useState([]); // list of breed names: ["hound", "husky", ...]
  const [allBreedsData, setAllBreedsData] = useState({}); // full object from API
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all breeds on component mount
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        setAllBreedsData(data.message);
        setBreeds(Object.keys(data.message)); // breed names list
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter breeds matching the search text
  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(search.toLowerCase().trim())
  );

  if (loading) {
    return <div className="loading-box">Loading all breeds... 🐾</div>;
  }

  return (
    <div className="breeds-container">
      <h1>All Dog Breeds 🐕</h1>
      <p>Search and explore different breeds and their sub-breeds.</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search breed by name (e.g. bulldog, hound)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <p className="count-text">
        Showing <strong>{filteredBreeds.length}</strong> of {breeds.length} breeds
      </p>

      {/* Grid of Breed Cards */}
      <div className="breeds-grid">
        {filteredBreeds.map((breed) => (
          <div key={breed} className="breed-card">
            <h3>{breed}</h3>
            <p className="sub-count">
              Sub-breeds: <strong>{allBreedsData[breed].length}</strong>
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
