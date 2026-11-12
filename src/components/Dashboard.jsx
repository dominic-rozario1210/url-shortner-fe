
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Link2,
  MousePointerClick,
  CalendarDays,
  ArrowUpRight
} from "lucide-react";
import api from "./Api.jsx";

const number = (value) =>
  Number(value || 0).toLocaleString();

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api.get("/urls/stats")
      .then(({ data }) => {
        if (active) setStats(data);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
            "Unable to load dashboard statistics."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const values = stats?.stats || stats || {};

  const cards = [
    {
      label: "Total URLs",
      value: values.totalLinks ?? values.totalUrls,
      icon: Link2
    },
    {
      label: "URLs today",
      value: values.urlsToday ?? values.todayCount,
      icon: CalendarDays
    },
    {
      label: "URLs this month",
      value: values.urlsThisMonth ?? values.monthCount,
      icon: BarChart3
    },
    {
      label: "Total clicks",
      value: values.totalClicks,
      icon: MousePointerClick
    }
  ];

  const chartData = stats?.chartData || values.chartData || [];
  const topLinks = stats?.topLinks || values.topLinks || [];

  const maxUrls = Math.max(
    1,
    ...chartData.map((item) => Number(item.urls ?? 0))
  );

  return (
    <main className="app-page container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Your dashboard</h1>
          <p>See how your Snip links are performing.</p>
        </div>

        <Link to="/" className="btn btn-primary">
          <Link2 size={17} />
          Shorten a link
        </Link>
      </div>

      {error && (
        <p className="api-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="page-loading">
          Loading your statistics...
        </p>
      ) : (
        <>
          {/* Dashboard statistics */}
          <section className="dashboard-stat-grid">
            {cards.map(({ label, value, icon: Icon }) => (
              <article
                className="dashboard-stat-card"
                key={label}
              >
                <span className="dashboard-stat-icon">
                  <Icon size={20} />
                </span>

                <span className="dashboard-stat-label">
                  {label}
                </span>

                <strong>
                  {value == null ? "—" : number(value)}
                </strong>
              </article>
            ))}
          </section>

          {/* Activity chart */}
          <section className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Link activity</h2>
                <p>
                  URL creation activity returned by your account API.
                </p>
              </div>
            </div>

            {chartData.length > 0 ? (
              <div
                className="activity-chart"
                role="img"
                aria-label="URL creation activity chart"
              >
                <div className="chart-bars">
                  {chartData.map((item, index) => {
                    const amount = Number(item.urls ?? 0);

                    return (
                      <div
                        className="chart-column"
                        key={item.date || item.label || index}
                      >
                        <span className="chart-value">
                          {amount}
                        </span>

                        <div className="chart-bar-track">
                          <i
                            style={{
                              height: `${Math.max(
                                4,
                                (amount / maxUrls) * 100
                              )}%`
                            }}
                          />
                        </div>

                        <small>
                          {item.label || item.date || ""}
                        </small>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="chart-empty">
                <BarChart3 size={30} />
                <strong>No activity data available</strong>
                <span>
                  Create some short URLs to see your activity here.
                </span>
              </div>
            )}
          </section>

          {/* Top performing links */}
          <section className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Top performing links</h2>
                <p>
                  Your links with the highest click counts.
                </p>
              </div>

              <Link to="/my-urls" className="text-link">
                View all <ArrowUpRight size={15} />
              </Link>
            </div>

            {topLinks.length > 0 ? (
              <div className="top-links-list">
                {topLinks.slice(0, 5).map((item) => (
                  <div
                    className="top-link-row"
                    key={item._id || item.shortCode}
                  >
                    <div>
                      <strong>
                        {item.shortUrl || item.shortCode}
                      </strong>

                      <span>{item.originalUrl}</span>
                    </div>

                    <b>
                      {number(item.clickCount)} clicks
                    </b>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted-empty">
                No link performance data is available yet.
              </p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
