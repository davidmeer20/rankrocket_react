
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { createPageUrl, getDrilldownAll, getDrilldownHigh, getPagesScanned} from './components/utils.jsx';


const styles = `
.dashboard-container {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.dashboard-content {
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
}

.dashboard-title {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
}

.company-info-card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 2rem;
  margin-bottom: 2rem;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.company-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.company-url {
  font-size: 0.875rem;
  color: #6366f1;
  text-decoration: none;
  margin: 0;
}

.company-url:hover {
  text-decoration: underline;
}

.company-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.company-detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.stat-card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-top-width: 4px;
  border-top-style: solid;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.stat-card.critical { border-top-color: #ef4444; }
.stat-card.warning { border-top-color: #f97316; }
.stat-card.info { border-top-color: #3b82f6; }
.stat-card.success { border-top-color: #22c55e; }

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon.critical { background-color: #fee2e2; color: #ef4444; }
.stat-icon.warning { background-color: #ffedd5; color: #f97316; }
.stat-icon.info { background-color: #dbeafe; color: #3b82f6; }
.stat-icon.success { background-color: #dcfce7; color: #22c55e; }

.stat-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #dcfce7;
  color: #166534;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
}

.stat-detail {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.progress-bar {
  margin-top: 0.5rem;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
}

.progress-fill {
  background-color: #f59e0b;
  height: 0.5rem;
  border-radius: 9999px;
}

.keywords-card {
  margin-top: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
}

.keywords-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.keywords-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.keywords-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

.keywords-header-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.keywords-header-stats span:first-child {
  width: 2.5rem;
  text-align: center;
}

.keywords-header-stats span:last-child {
  width: 4rem;
  text-align: center;
}

.keyword-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.keyword-name {
  font-weight: 500;
}

.keyword-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.keyword-rank {
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  width: 2.5rem;
  text-align: center;
  display: inline-block;
}

.keyword-volume {
  font-size: 0.875rem;
  color: #6b7280;
  width: 4rem;
  text-align: center;
}

.action-section {
  margin-top: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
}

.action-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.action-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

.button-outline {
    border-color: #d1d5db;
    background-color: #ffffff;
    color: #374151;
}

.button-outline:hover {
    background-color: #f9fafb;
}

.action-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.action-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.action-button.primary {
  background-color: white;
  color: #667eea;
  border-color: transparent;
}

.action-button.primary:hover {
  background-color: #f8f9ff;
  color: #5a67d8;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

.integration-section {
  margin-top: 2rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  text-align: center;
  color: white;
}

.integration-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.integration-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.integration-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.integration-button {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border-color: rgba(255, 255, 255, 0.25);
  font-size: 0.875rem;
}

.integration-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.integration-logo {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
  background-color: white;
  border-radius: 0.25rem;
  padding: 0.125rem;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .integration-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .integration-button {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}
`;

export default function StatsOverview() {

 const [jsonData, setJsonData] = useState(null);
 const [drilldownAll, setDrilldownAll] = useState(null);
 const [drilldownHigh, setDrilldownHigh] = useState(null);
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sample.json');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        if (data.startsWith('<!DOCTYPE')) {
          throw new Error('Response is not valid JSON');
        }
        const jsonData = JSON.parse(data);
  setJsonData(jsonData);
  setDrilldownAll(getDrilldownAll(jsonData));
  setDrilldownHigh(getDrilldownHigh(jsonData));
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };

    fetchData();

  }, []);
  // Example: Use a value from the loaded JSON data for criticalIssues
  const stats = {
    criticalIssues: drilldownHigh?.totalHighIssues ?? 0,
    overallIssues: drilldownAll?.totalIssues ?? 0,
    pagesScanned: getPagesScanned(jsonData),
    healthScore: (drilldownHigh?.totalHighIssues ?? 0) / (getPagesScanned(jsonData) || 1) * 100
  };

  const companyInfo = {
    name: "HUMAN Security",
    url: "www.humansecurity.com",
    industry: "Cybersecurity",
    geo: "North America",
    verticalRank: 26
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className="dashboard-title" style={{ marginBottom: 0 }}>SEO Dashboard</h1>
            <Link to={createPageUrl('LandingPage')}>
              <button className="button button-outline">
                <Search style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                New Crawl
              </button>
            </Link>
          </div>
          
          <div className="company-info-card">
            <div className="company-header">
              <img 
                src={`https://www.google.com/s2/favicons?domain=${companyInfo.url}&sz=64`}
                alt={`${companyInfo.name} favicon`}
                className="company-logo"
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.75rem',
                  objectFit: 'contain',
                  backgroundColor: 'white',
                  padding: '0.25rem'
                }}
              />
              <div>
                <h2 className="company-title">{companyInfo.name}</h2>
                <a href={`https://${companyInfo.url}`} className="company-url" target="_blank" rel="noopener noreferrer">
                  {companyInfo.url}
                </a>
              </div>
            </div>
            
            <div className="company-details">
              <div className="company-detail-item">
                <p className="detail-label">Industry</p>
                <p className="detail-value">{companyInfo.industry}</p>
              </div>
              
              <div className="company-detail-item">
                <p className="detail-label">Location</p>
                <p className="detail-value">{companyInfo.geo}</p>
              </div>
              
              <div className="company-detail-item">
                <p className="detail-label">Vertical Ranking</p>
                <span className="rank-badge">
                  🏆 #{companyInfo.verticalRank} in {companyInfo.industry}
                </span>
              </div>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card critical">
              <div className="stat-header">
                <div className="stat-icon critical">⚠️</div>
                <span className="stat-badge">-3</span>
              </div>
              <h3 className="stat-label">Critical Issues</h3>
              <p className="stat-number">{stats.criticalIssues}</p>
              <p className="stat-detail">Meta Data: {drilldownHigh?.['Meta Description'] ?? 0}, Canonicals: {drilldownHigh?.Canonical ?? 0}, Heading: {drilldownHigh?.Heading ?? 0}</p>
            </div>

            <div className="stat-card warning">
              <div className="stat-header">
                <div className="stat-icon warning">📊</div>
                <span className="stat-badge">-8</span>
              </div>
              <h3 className="stat-label">Overall Issues</h3>
              <p className="stat-number">{stats.overallIssues}</p>
              <p className="stat-detail">Meta Data: {drilldownAll?.['Meta Description'] ?? 0}, Canonicals: {drilldownAll?.Canonical ?? 0}, Heading: {drilldownAll?.Heading ?? 0}</p>
            </div>

            <div className="stat-card info">
              <div className="stat-header">
                <div className="stat-icon info">🔍</div>
                <span className="stat-badge">+2</span>
              </div>
              <h3 className="stat-label">Pages Scanned</h3>
              <p className="stat-number">{stats.pagesScanned}</p>
              <p className="stat-detail">Total Pages: 250, Coverage: 40%</p>
            </div>

            <div className="stat-card success">
              <div className="stat-header">
                <div className="stat-icon success">💚</div>
                <span className="stat-badge">+5</span>
              </div>
              <h3 className="stat-label">SEO Health Score</h3>
              <p className="stat-number">{stats.healthScore}</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.healthScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="keywords-card">
            <h2 className="keywords-title">Main Keywords</h2>
            <div className="keywords-list">
              <div className="keywords-header">
                <span>Keyword</span>
                <div className="keywords-header-stats">
                  <span>Rank</span>
                  <span>Daily Traffic</span>
                </div>
              </div>
              
              {[
                { keyword: "bot detection", rank: 7, volume: "15,100" },
                { keyword: "bot mitigation", rank: 9, volume: "802" },
                { keyword: "click fraud", rank: 28, volume: "398" }
              ].map((item, index) => (
                <div key={index} className="keyword-item">
                  <span className="keyword-name">{item.keyword}</span>
                  <div className="keyword-stats">
                    <span className="keyword-rank">#{item.rank}</span>
                    <span className="keyword-volume">{item.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-section">
            <h2 className="action-title">Ready to Dive Deeper?</h2>
            <p className="action-subtitle">
              Get detailed insights and start fixing your SEO issues. Explore by individual pages or prioritize by severity level to maximize your impact.
            </p>
            <div className="action-buttons">
              <Link to={createPageUrl('AnalyzeByPages')} style={{ textDecoration: 'none' }}>
                <button className="button action-button primary">
                  📄 Analyze by Pages
                </button>
              </Link>
              <button className="button action-button">
                🔥 Fix by Severity
              </button>
              <button className="button action-button">
                📊 View Full Report
              </button>
            </div>
          </div>

          <div className="integration-section">
            <h2 className="integration-title">Connect Your Website Builder</h2>
            <p className="integration-subtitle">
              Automatically sync and apply SEO fixes directly to your website through your preferred platform.
            </p>
            <div className="integration-buttons">
              <button className="button integration-button">
                <img 
                  src="https://static.wixstatic.com/media/9ab0d1_8bc2abb8d8c14b3395c62b22683693b8~mv2.png"
                  alt="Wix"
                  className="integration-logo"
                />
                Connect Wix
              </button>
              <button className="button integration-button">
                📝 Connect WordPress
              </button>
              <button className="button integration-button">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0070/7032/files/shopify_icon.png"
                  alt="Shopify"
                  className="integration-logo"
                />
                Connect Shopify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
