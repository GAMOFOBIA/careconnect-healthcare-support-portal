import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">+</span>
          CareConnect
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/patient-support" onClick={closeMenu}>Patient Support</NavLink>
          </li>
          <li>
            <NavLink to="/volunteer" onClick={closeMenu}>Volunteer</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" onClick={closeMenu} className="nav-dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
