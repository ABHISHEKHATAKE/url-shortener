import { useState, useEffect } from 'react';
import './index.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${API_BASE}/urls`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setLinks(data.reverse()); // Show newest first
      }
    } catch (err) {
      console.error('Failed to fetch links:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setUrl('');
      fetchLinks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container">
      <header>
        <h1>Nexus Links</h1>
        <p className="subtitle">Transform long, ugly URLs into elegant, shareable links in seconds with our modern shortening service.</p>
      </header>

      <main>
        <div className="glass-panel">
          <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="url"
                className="url-input"
                placeholder="Paste your long URL here... (e.g. https://example.com/something/long)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Shorten'}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>

        {links.length > 0 && (
          <div className="result-section">
            <h2 className="recent-title">Recent Links</h2>
            <div className="links-list">
              {links.map((link) => (
                <div key={link.short} className="link-card">
                  <div className="link-info">
                    <span className="original-url" title={link.original}>
                      {link.original}
                    </span>
                    <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
                      {link.shortUrl}
                    </a>
                  </div>
                  <div className="actions">
                    <button 
                      className={`icon-btn ${copiedId === link.short ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(link.shortUrl, link.short)}
                      title="Copy to clipboard"
                    >
                      {copiedId === link.short ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      )}
                    </button>
                    <a 
                      href={link.shortUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="icon-btn"
                      title="Open link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
