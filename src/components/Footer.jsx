
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            <span className="brand-mark">
              <Link2 size={19} />
            </span>
            snip<span>.</span>
          </Link>

          <p className="footer-copy">
            Short links, smart analytics and branded
            domains — built for teams who care where
            every click goes.
          </p>

          <div className="socials">
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="GitHub">GH</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div>
          <h4>Product</h4>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-watermark">snip.</div>

      <div className="container copyright">
        <span>© 2026 snip. All rights reserved.</span>
        <span>
          <a href="#">Privacy</a> · <a href="#">Terms</a>
        </span>
      </div>
    </footer>
  );
}
