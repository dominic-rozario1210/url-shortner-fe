import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Link2, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  function handleLogout() {
  logout();
  closeMenu();
  window.location.replace("/");
}

  const displayName = user?.firstName || user?.name || "Account";

  return (
    <header className="site-header container">
      <div className="navbar">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><Link2 size={19} /></span>
          snip<span>.</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/features" onClick={closeMenu}>Features</NavLink>
          <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          {isAuthenticated && <>
            <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
            <NavLink to="/my-urls" onClick={closeMenu}>My URLs</NavLink>
          </>}
          <div className="mobile-nav-actions">
            {isAuthenticated ? (
              <button className="nav-logout" onClick={handleLogout}><LogOut size={16} /> Log out</button>
            ) : <>
              <Link to="/login" onClick={closeMenu}>Log in</Link>
              <Link to="/register" className="btn btn-primary" onClick={closeMenu}>Get started</Link>
            </>}
          </div>
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="nav-user">{displayName}</span>
              <button className="nav-logout" onClick={handleLogout}><LogOut size={16} /> Log out</button>
            </>
          ) : <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="btn btn-primary">Get started</Link>
          </>}
        </div>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
