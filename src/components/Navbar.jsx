import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
   
        <Link to="/" className="nav-brand">
          <span>🐾 PawPedia</span>
          <span className="brand-badge">Dog Gallery</span>
        </Link>


        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/breeds"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            All Breeds
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
