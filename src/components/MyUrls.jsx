import { useCallback, useEffect, useState } from "react";
import { Copy, Trash2, ExternalLink, Link2 } from "lucide-react";
import api from "./Api.jsx";

function shortUrlFor(link) {
  if (link.shortUrl) return link.shortUrl;
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "").replace(/\/$/, "");
  return base && link.shortCode ? `${base}/${link.shortCode}` : link.shortCode || "";
}

export default function MyUrls() {
  const [links, setLinks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadLinks = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/urls/my-links?page=${page}&limit=10`);
      setLinks(data.links || []);
      setPagination(data.pagination || { page, totalPages: 1 });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your links.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadLinks(1); }, [loadLinks]);

  async function copyLink(value) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Short link copied.");
      window.setTimeout(() => setNotice(""), 1800);
    } catch {
      setError("Could not copy the link. Please copy it manually.");
    }
  }

  async function deleteLink(id) {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      await api.delete(`/urls/${id}`);
      setNotice("Link deleted.");
      window.setTimeout(() => setNotice(""), 1800);
      loadLinks(pagination.page);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete this link.");
    }
  }

  return (
    <main className="app-page container">
      <div className="page-heading">
        <div><span className="eyebrow">LINK MANAGEMENT</span><h1>My URLs</h1><p>Manage and track the links you have created.</p></div>
        <a href="/" className="btn btn-primary"><Link2 size={17} /> Create link</a>
      </div>
      {error && <p className="api-error" role="alert">{error}</p>}
      {notice && <p className="api-success" role="status">{notice}</p>}
      <section className="dashboard-panel urls-panel">
        <div className="panel-heading"><div><h2>Your shortened links</h2><p>{links.length} links on this page</p></div></div>
        {loading ? <p className="page-loading">Loading your links...</p> : links.length === 0 ? (
          <div className="chart-empty"><Link2 size={30} /><strong>You haven't created any links yet.</strong><span>Create your first short link to see it here.</span><a href="/" className="btn btn-primary">Shorten a URL</a></div>
        ) : (
          <>
            <div className="urls-table-wrap">
              <table className="urls-table">
                <thead><tr><th>Original URL</th><th>Short URL</th><th>Clicks</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {links.map((link) => {
                    const short = shortUrlFor(link);
                    return <tr key={link._id}>
                      <td className="original-url" title={link.originalUrl}>{link.originalUrl}</td>
                      <td><a href={short} target="_blank" rel="noreferrer" className="short-url">{short || link.shortCode}<ExternalLink size={13} /></a></td>
                      <td>{Number(link.clickCount || 0).toLocaleString()}</td>
                      <td>{link.createdAt ? new Date(link.createdAt).toLocaleDateString() : "—"}</td>
                      <td><div className="table-actions">
                        <button type="button" aria-label="Copy short link" onClick={() => copyLink(short)}><Copy size={16} /></button>
                        <button type="button" aria-label="Delete link" onClick={() => deleteLink(link._id)}><Trash2 size={16} /></button>
                      </div></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button disabled={Number(pagination.page) <= 1} onClick={() => loadLinks(Number(pagination.page) - 1)}>Previous</button>
              <span>Page {pagination.page || 1} of {pagination.totalPages || 1}</span>
              <button disabled={Number(pagination.page) >= Number(pagination.totalPages || 1)} onClick={() => loadLinks(Number(pagination.page) + 1)}>Next</button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
