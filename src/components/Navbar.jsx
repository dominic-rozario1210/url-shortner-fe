
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Link2, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header container">
      <div className="navbar">

        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <Link2 size={19} />
          </span>
          snip<span>.</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/features" onClick={closeMenu}>
            Features
          </NavLink>

          <NavLink to="/pricing" onClick={closeMenu}>
            Pricing
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/login">Log in</Link>

          <Link to="/register" className="btn btn-primary">
            Get started
          </Link>
        </div>

        <div className="mobile-auth">
          <Link to="/login" onClick={closeMenu}>
            Log in
          </Link>

          <Link
            to="/register"
            className="btn btn-primary"
            onClick={closeMenu}
          >
            Get started
          </Link>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

      </div>
    </header>
  );
}
