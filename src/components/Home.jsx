
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "./Api.jsx";

import {
  Link2,
  Zap,
  Share2,
  BarChart3,
  Globe2,
  QrCode,
  Tags,
  FolderOpen,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight
} from "lucide-react";

const steps = [
  ["Paste your URL", "Start with any long URL you want to share.", Link2],
  ["Create your short link", "Generate a clean, memorable link in seconds.", Zap],
  ["Share and track", "Share your link and understand every click.", Share2]
];

const features = [
  ["Link Analytics", "Understand every click with useful insights.", BarChart3],
  ["Branded Domains", "Make every link reflect your brand.", Globe2],
  ["QR Codes", "Generate QR codes for easy sharing.", QrCode],
  ["Custom Slugs", "Create memorable short URLs.", Tags],
  ["Link Management", "Organize and manage all your links.", FolderOpen],
  ["Secure Links", "Protect links with password options.", ShieldCheck]
];

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Connect URL shortening with backend
  async function shorten(e) {
    e.preventDefault();

    setError("");
    setShort("");
    setCopied(false);

    const enteredUrl = url.trim();

    // Validate URL
    try {
      const parsedUrl = new URL(enteredUrl);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        setError("Please enter a valid HTTP or HTTPS URL.");
        return;
      }
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/urls/shorten", {
        originalUrl: enteredUrl
      });

      setShort(response.data.shortUrl);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to shorten URL. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Copy generated short URL
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(short);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch {
      setError("Unable to copy the link. Please copy it manually.");
    }
  }

  return (
    <main>

      {/* HERO SECTION */}
      <section className="hero container">

        <span className="eyebrow">
          SMART URL SHORTENER
        </span>

        <h1>
          Shorten links.<br />
          <span className="gradient-text">
            Make every click count.
          </span>
        </h1>

        <p className="hero-sub">
          Create short, memorable links in seconds.
          Share smarter, track every click and grow
          your audience with Snip.
        </p>

        <form className="shortener-card" onSubmit={shorten}>

          <label htmlFor="long-url">
            PASTE YOUR LONG URL
          </label>

          <div className="shortener-row">

            <Link2 />

            <input
              id="long-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-very-long-url"
            />

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Shortening..." : "Shorten URL"}

              {!loading && <ArrowRight size={16} />}
            </button>

          </div>

          <div className="form-hint">
            <span>Free to start. No complicated setup.</span>
            <span>8-character short link</span>
          </div>

          {/* API ERROR */}
          {error && (
            <p className="api-error" role="alert">
              {error}
            </p>
          )}

          {/* GENERATED SHORT URL */}
          {short && (
            <div className="short-result">

              <div>
                <small>YOUR SHORT LINK</small>

                <strong>
                  <a
                    href={short}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {short}
                  </a>
                </strong>
              </div>

              <button
                type="button"
                className="btn btn-light"
                onClick={copyLink}
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}

                {copied ? "Copied" : "Copy"}
              </button>

            </div>
          )}

        </form>
      </section>

      {/* STATISTICS */}
      <section className="stats-band">
        <div className="container stats-grid">

          {[
            ["120K+", "Teams worldwide"],
            ["150+", "Countries covered"],
            ["4B+", "Clicks tracked"]
          ].map((item) => (
            <div className="stat-card" key={item[0]}>
              <strong>{item[0]}</strong>
              <span>{item[1]}</span>
            </div>
          ))}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section container">

        <SectionHeading
          eyebrow="PROCESS"
          title="Short links in three simple steps."
        />

        <div className="three-grid">

          {steps.map(([title, desc, Icon], index) => (
            <article className="step-card" key={title}>

              <div className="step-top">
                <span className="icon-bubble">
                  <Icon />
                </span>

                <span>0{index + 1}</span>
              </div>

              <h3>{title}</h3>
              <p>{desc}</p>

            </article>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="section section-muted">

        <div className="container">

          <SectionHeading
            eyebrow="CAPABILITIES"
            title="Everything you need in one place."
          />

          <div className="feature-grid">

            {features.map(([title, desc, Icon]) => (
              <article className="feature-card" key={title}>

                <span className="icon-bubble">
                  <Icon />
                </span>

                <h3>{title}</h3>
                <p>{desc}</p>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="section container analytics-preview">

        <div>
          <span className="eyebrow">ANALYTICS</span>

          <h2>Know what happens after every click.</h2>

          <p>
            Get useful insights into your link performance
            and understand your audience.
          </p>

          <ul className="check-list">
            <li>Track total clicks.</li>
            <li>View traffic by country.</li>
            <li>Understand referral sources.</li>
          </ul>
        </div>

        <div className="analytics-card">

          <div className="analytics-head">

            <div>
              <small>TOTAL CLICKS</small>
              <h3>142,850</h3>
            </div>

            <span className="pill">+12.8% this week</span>

          </div>

          <div className="chart">

            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              <path
                d="M0 125 C60 110 70 80 130 90 S210 40 270 65 S350 22 410 43 S465 25 500 10"
                fill="none"
                stroke="#13877f"
                strokeWidth="4"
              />
            </svg>

          </div>

          {["United States", "India", "Germany"].map((country, i) => (
            <div className="country-row" key={country}>

              <span>{country}</span>

              <div>
                <i style={{ width: [82, 64, 41][i] + "%" }} />
              </div>

              <b>{[82, 64, 41][i]}%</b>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="cta container">

        <h2>Make every link count.</h2>

        <p>
          Join teams turning long, messy URLs into
          short, trackable, on-brand links.
        </p>

        <div className="cta-actions">

          <Link className="btn btn-white" to="/register">
            Get started free <ArrowRight size={17} />
          </Link>

          <Link className="btn btn-outline-light" to="/contact">
            Talk to sales
          </Link>

        </div>
      </section>

    </main>
  );
}
