
import {
  BarChart3, Globe2, Code2, QrCode,
  Lock, Timer, Smartphone, MapPin,
  Tags, Users, Layers, Zap
} from "lucide-react";

const features = [
  ["Dynamic QR codes", "Change the destination after printing.", QrCode],
  ["Password links", "Protect links with a passcode.", Lock],
  ["Expiring links", "Set expiration dates or click limits.", Timer],
  ["Deep linking", "Open the right app on mobile.", Smartphone],
  ["Geo targeting", "Route visitors by country.", MapPin],
  ["Tags and folders", "Organize all your links.", Tags],
  ["Team workspaces", "Manage team permissions.", Users],
  ["Bulk shortening", "Upload CSV files to shorten links.", Layers],
  ["Fast redirects", "Quick redirects around the world.", Zap]
];

export default function Features() {
  return (
    <main className="inner-page">

      <section className="page-hero container">
        <span className="eyebrow">FEATURES</span>

        <h1>
          Every tool your<br />
          <span className="gradient-text">
            links deserve.
          </span>
        </h1>

        <p>
          From one-click shortening to advanced analytics,
          Snip packs everything into one workspace.
        </p>
      </section>

      <section className="section container split-section">

        <div>
          <span className="eyebrow">ANALYTICS</span>
          <h2>Know every click, as it happens.</h2>

          <p>
            Live dashboards break down traffic by country,
            city, device, browser and referrer.
          </p>

          <ul className="check-list">
            <li>Real-time click stream</li>
            <li>UTM builder and campaign reports</li>
            <li>Scheduled CSV reports</li>
          </ul>
        </div>

        <div className="analytics-card">
          <h3>Link Performance</h3>
          <div className="chart">
            <svg viewBox="0 0 500 150">
              <path
                d="M0 125 C60 110 70 80 130 90 S210 40 270 65 S350 22 410 43 S465 25 500 10"
                fill="none"
                stroke="#13877f"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

      </section>

      <section className="section section-muted">
        <div className="container split-section">

          <div className="mock-domain">
            <p>go.northwind.com/spring</p>
            <p>lumen.link/demo</p>
            <p>vrtx.co/careers</p>
          </div>

          <div>
            <span className="eyebrow">BRANDED DOMAINS</span>
            <h2>Links that look like you.</h2>
            <p>
              Connect your own domain in minutes.
              Branded links build trust with every share.
            </p>
            <ul className="check-list">
              <li>Free SSL on every domain</li>
              <li>Unlimited custom slugs</li>
              <li>Root domain redirects</li>
            </ul>
          </div>

        </div>
      </section>

      <section className="section container split-section">

        <div>
          <span className="eyebrow">DEVELOPER API</span>
          <h2>Built for scale. Loved by developers.</h2>
          <p>
            A clean REST API, SDKs and webhooks
            for your application.
          </p>
          <ul className="check-list">
            <li>REST API</li>
            <li>JavaScript and Python SDKs</li>
            <li>Webhooks</li>
          </ul>
        </div>

        <pre className="code-mock">
{`const link = await snip.links.create({
  url: "https://example.com",
  slug: "launch"
});

// https://snip.ly/launch`}
        </pre>

      </section>

      <section className="section section-muted">
        <div className="container">

          <div className="section-heading">
            <h2>And so much more.</h2>
          </div>

          <div className="feature-grid">
            {features.map(([title, desc, Icon]) => (
              <article className="feature-card" key={title}>
                <span className="icon-bubble"><Icon /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
