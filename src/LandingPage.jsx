
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Search, ImageIcon, ShieldOff, Filter, Clock, Link as LinkIcon, AlertCircle, PartyPopper } from 'lucide-react';
import { createPageUrl } from './components/utils.jsx';

const styles = `
.landing-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f0fdff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

@media (min-width: 640px) {
  .landing-container {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .landing-container {
    padding: 2rem;
  }
}

.landing-content {
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
}

.card {
    border-radius: 0.75rem;
    background-color: white;
    border: 1px solid #e5e7eb;
}

.main-card {
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.loading-card {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.card-header {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 2rem 2rem 0 2rem;
}

.card-header-center {
  text-align: center;
}

.icon-container {
  width: 3rem;
  height: 3rem;
  background-color: #e0e7ff;
  color: #4338ca;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.success-icon {
  width: 4rem;
  height: 4rem;
  background-color: #dcfce7;
  color: #22c55e;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  width: 4rem;
  height: 4rem;
  background-color: #e0e7ff;
  color: #4338ca;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.card-title {
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #111827;
  margin: 0;
}

.loading-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-top: 1rem;
  margin-bottom: 0;
}

.card-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0;
}

.loading-description {
  color: #6b7280;
  margin-top: 0.5rem;
}

.loading-description .highlight {
  font-weight: 600;
  color: #4338ca;
}

.card-content {
  padding: 2rem;
}

.loading-content {
  padding: 0 2.5rem 2.5rem 2.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field-input {
  display: flex;
  height: 2.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: box-shadow 0.2s;
}

.field-input:focus {
    box-shadow: 0 0 0 2px #4338ca;
}

.field-textarea {
  display: flex;
  min-height: 80px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: box-shadow 0.2s;
}

.field-textarea:focus {
    box-shadow: 0 0 0 2px #4338ca;
}

.grid-two {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-two {
    grid-template-columns: 1fr 1fr;
  }
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.checkbox-input {
    height: 1rem;
    width: 1rem;
    accent-color: #4338ca;
}

.checkbox-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #dc2626;
  background-color: #fef2f2;
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
}

.submit-button {
  width: 100%;
  font-size: 1.125rem;
  font-weight: 700;
  height: 3rem;
  color: white;
  background-color: #4338ca;
  border: none;
}

.submit-button:hover {
  background-color: #3730a3;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 0.75rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-indicator {
    height: 100%;
    width: 100%;
    background-color: #4338ca;
    transition: transform 0.4s ease;
}

.progress-text {
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: #374151;
  margin-top: 1rem;
}

.last-crawl-link {
  display: block;
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.last-crawl-link:hover {
  color: #4338ca;
}

.last-crawl-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.last-crawl-button:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.last-crawl-text {
  font-weight: 600;
}

.arrow-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.last-crawl-link:hover .arrow-icon {
  opacity: 1;
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

function LandingPageContent() {
    const navigate = useNavigate();
    const [domain, setDomain] = useState('');
    const [pageLimit, setPageLimit] = useState(1000);
    const [competitorDomain, setCompetitorDomain] = useState('');
    const [includePages, setIncludePages] = useState('');
    const [excludePages, setExcludePages] = useState('/login\n/cart');
    const [crawlImages, setCrawlImages] = useState(false);
    const [error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const lastCrawl = {
        domain: 'ynet.co.il',
        date: '2023-10-27T10:00:00Z',
        pages: 10
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!domain) {
            setError('A domain is required to start the crawl.');
            return;
        }
        setError('');
        setIsLoading(true);
        setProgress(0);
    };

    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress >= 100) {
                        clearInterval(timer);
                        // The createPageUrl function is globally available in the base44 environment
                        navigate(createPageUrl('StatsOverview'));
                        return 100;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(prevProgress + diff, 100);
                });
            }, 300);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isLoading, navigate]);
    
    return (
        <>
            <div className="card main-card fade-in-down">
                <div className="card-header card-header-center">
                    <div className="icon-container">
                        <Globe size={24} />
                    </div>
                    <h1 className="card-title">Start Your SEO Analysis</h1>
                    <p className="card-description">Enter a domain to begin crawling and uncover powerful SEO insights.</p>
                </div>
                <div className="card-content">
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="field-group">
                            <label htmlFor="domain" className="field-label"><Globe size={16} /> Domain*</label>
                            <input id="domain" placeholder="e.g., yourwebsite.com" value={domain} onChange={(e) => setDomain(e.target.value)} required className="field-input" />
                        </div>

                        <div className="grid-two">
                            <div className="field-group">
                                <label htmlFor="pageLimit" className="field-label"><Filter size={16} /> Pages to Crawl</label>
                                <input id="pageLimit" type="number" max="1000" min="1" value={pageLimit} onChange={(e) => setPageLimit(e.target.value)} className="field-input" />
                            </div>
                            <div className="field-group">
                                <label htmlFor="competitorDomain" className="field-label"><LinkIcon size={16} /> Competitor Domain (Optional)</label>
                                <input id="competitorDomain" placeholder="e.g., competitor.com" value={competitorDomain} onChange={(e) => setCompetitorDomain(e.target.value)} className="field-input" />
                            </div>
                        </div>

                        <div className="grid-two">
                            <div className="field-group">
                                <label htmlFor="includePages" className="field-label"><Filter size={16} /> Include Pages</label>
                                <textarea id="includePages" placeholder="Regex or topics, e.g., /products/.* or 'blog posts'" value={includePages} onChange={(e) => setIncludePages(e.target.value)} className="field-textarea" />
                            </div>
                            <div className="field-group">
                                <label htmlFor="excludePages" className="field-label"><ShieldOff size={16} /> Exclude Pages</label>
                                <textarea id="excludePages" placeholder="e.g., /login or /cart" value={excludePages} onChange={(e) => setExcludePages(e.target.value)} className="field-textarea" />
                            </div>
                        </div>
                        
                        <div className="checkbox-container">
                            <input type="checkbox" id="crawlImages" checked={crawlImages} onChange={(e) => setCrawlImages(e.target.checked)} className="checkbox-input" />
                            <label htmlFor="crawlImages" className="checkbox-label"><ImageIcon size={16} /> Also crawl and analyze images?</label>
                        </div>

                        {error && (
                            <div className="error-message">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}
                        
                        <button type="submit" className="button submit-button">
                            <Search size={20} style={{ marginRight: '0.5rem' }} />
                            Start Analysis
                        </button>
                    </form>
                </div>
            </div>
            {lastCrawl && (
                <a href={createPageUrl('StatsOverview')} className="last-crawl-link">
                    <div className="last-crawl-button">
                        <Clock size={16} />
                        <span className="last-crawl-text">View last crawl for {lastCrawl.domain}</span>
                        <span className="arrow-icon">→</span>
                    </div>
                </a>
            )}
        </>
    )
}

export default function LandingPage() {
    return (
        <>
            <style>{styles}</style>
            <div className="landing-container">
                <div className="landing-content">
                    <LandingPageContent />
                </div>
            </div>
        </>
    );
}
