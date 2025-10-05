import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { createPageUrl } from './components/utils.jsx';
import PageList from './components/analysis/PageList';
import PageDetails from './components/analysis/PageDetails';

// Helper function to generate random issues
const generateRandomIssues = () => {
  const allIssues = [
    {text: 'Missing meta description', type: 'critical'},
    {text: 'Title too long (over 60 characters)', type: 'critical'},
    {text: 'No canonical URL set', type: 'critical'},
    {text: 'Missing alt text for images', type: 'warning'},
    {text: 'Page load speed slow', type: 'warning'},
    {text: 'H1 tag missing', type: 'warning'},
    {text: 'Multiple H1 tags found', type: 'critical'},
    {text: 'Meta description too short', type: 'warning'},
    {text: 'Images not optimized', type: 'warning'},
    {text: 'Missing structured data', type: 'info'},
    {text: 'Internal linking could be improved', type: 'info'},
    {text: 'Missing Open Graph tags', type: 'info'},
    {text: 'Broken internal links found', type: 'warning'},
    {text: 'No robots.txt found', type: 'info'},
    {text: 'Missing XML sitemap', type: 'warning'},
    {text: 'Duplicate content detected', type: 'critical'},
    {text: 'Poor keyword density', type: 'warning'},
    {text: 'Missing breadcrumb navigation', type: 'info'},
    {text: 'Low text-to-HTML ratio', type: 'warning'},
    {text: 'Missing social media tags', type: 'info'},
    {text: 'Redirect chain too long', type: 'warning'},
    {text: 'Missing favicon', type: 'info'},
    {text: 'Non-HTTPS resources loaded', type: 'warning'},
    {text: 'Large image file sizes', type: 'warning'},
    {text: 'Missing language declaration', type: 'info'}
  ];

  const issueCount = Math.floor(Math.random() * 15) + 1; // 1 to 15 issues
  const shuffled = [...allIssues].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, issueCount);
};

// Generate pages data using real URLs and issues from sample.json
const generatePagesData = async () => {
  try {
    // Fetch the sample.json data
    const response = await fetch('/sample.json');
    const sampleData = await response.json();
    
    // Extract URLs and create pages data
    const pages = sampleData.map((item, index) => {
      const healthScore = Math.floor(Math.random() * 100);
      const importanceScore = Math.floor(Math.random() * 100);
      
      // Generate a title from the URL
      const url = item.url;
      const urlPath = url.replace(/^https?:\/\/[^/]+/, ''); // Remove domain
      
      let title;
      if (urlPath === '/' || urlPath === '' || urlPath === '/#') {
        title = 'Homepage';
      } else {
        // Clean up the URL path to create a readable title
        title = urlPath
          .split('/')
          .filter(segment => segment && segment !== '#' && segment !== 'back')
          .map(segment => {
            // Replace hyphens and handle special cases
            return segment
              .replace(/-/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase())
              .replace(/\?.*$/, ''); // Remove query parameters
          })
          .join(' › ');
        
        // If title is empty or too generic, use a fallback
        if (!title || title.length < 3) {
          title = 'Page';
        }
      }
      
      // Use real issues from the sample data
      const realIssues = item.issues || [];
      
      return {
        id: index + 1,
        url: urlPath || '/',
        fullUrl: url,
        title: title,
        healthScore,
        importanceScore,
        issues: realIssues
      };
    });

    console.log(`Generated ${pages.length} pages from sample.json`);
    return pages;
  } catch (error) {
    console.error('Error loading sample.json:', error);
    
    // Fallback to a few default pages if sample.json fails to load
    return [
      {
        id: 1,
        url: '/',
        fullUrl: 'https://example.com/',
        title: 'Homepage',
        healthScore: Math.floor(Math.random() * 100),
        importanceScore: Math.floor(Math.random() * 100),
        issues: []
      }
    ];
  }
};

const styles = `
.analyze-container {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
}

.analyze-content {
  max-width: 90rem;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 1.5rem;
  flex-grow: 1;
  min-height: 0; /* Important for flex child */
}

@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.filters-section {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.filter-controls {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.filter-select {
  flex: 1;
  padding: 0.625rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  border-color: #3b82f6;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  color: #64748b;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number {
  font-size: 0.875rem;
  color: #d1dcecff;
  padding: 0.5rem 0.75rem;
}
`;

export default function AnalyzeByPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHealth, setFilterHealth] = useState('all');
  const [filterIssues, setFilterIssues] = useState('all');
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPagesData, setAllPagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pagesPerPage = 10;
  
  // Load pages data on component mount
  useEffect(() => {
    const loadPages = async () => {
      setIsLoading(true);
      try {
        const pagesData = await generatePagesData();
        setAllPagesData(pagesData);
      } catch (error) {
        console.error('Error loading pages:', error);
        setAllPagesData([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPages();
  }, []);

  const filteredPages = useMemo(() => {
    const pages = allPagesData.filter(page => {
      const matchesSearch = page.url.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           page.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesHealth = filterHealth === 'all' || 
                           (filterHealth === 'good' && page.healthScore >= 80) ||
                           (filterHealth === 'warning' && page.healthScore >= 50 && page.healthScore < 80) ||
                           (filterHealth === 'critical' && page.healthScore < 50);
      
      const matchesIssues = filterIssues === 'all' ||
                           (filterIssues === 'with-issues' && page.issues.length > 0) ||
                           (filterIssues === 'no-issues' && page.issues.length === 0);
      
      return matchesSearch && matchesHealth && matchesIssues;
    });
    return pages;
  }, [allPagesData, searchTerm, filterHealth, filterIssues]);

  // Effect to reset currentPage to 1 when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterHealth, filterIssues]);

  // Effect to set the initial selected page or update it if it's filtered out
  useEffect(() => {
    if (filteredPages.length > 0) {
      if (!selectedPageId || !filteredPages.some(page => page.id === selectedPageId)) {
        setSelectedPageId(filteredPages[0].id);
      }
    } else {
      setSelectedPageId(null);
    }
  }, [filteredPages, selectedPageId]);
  
  const totalPages = Math.ceil(filteredPages.length / pagesPerPage);
  
  const indexOfLastPage = currentPage * pagesPerPage;
  const indexOfFirstPage = indexOfLastPage - pagesPerPage;
  const currentPages = useMemo(() => filteredPages.slice(indexOfFirstPage, indexOfLastPage), [filteredPages, indexOfFirstPage, indexOfLastPage]);

  const selectedPage = useMemo(() => allPagesData.find(p => p.id === selectedPageId), [allPagesData, selectedPageId]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <>
        <style>{styles}</style>
        <div className="analyze-container">
          <div className="analyze-content">
            <div className="header">
              <div className="header-left">
                <Link to={createPageUrl('StatsOverview')} className="back-button">
                  <ArrowLeft size={16} />
                  Dashboard
                </Link>
                <h1 className="page-title">Page Analysis</h1>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
              color: '#64748b',
              fontSize: '1.125rem'
            }}>
              Loading pages from sample data...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="analyze-container">
        <div className="analyze-content">
          <div className="header">
            <div className="header-left">
              <Link to={createPageUrl('StatsOverview')} className="back-button">
                <ArrowLeft size={16} />
                Dashboard
              </Link>
              <h1 className="page-title">Page Analysis</h1>
            </div>
          </div>
          <div className="main-layout">
            <PageDetails selectedPage={selectedPage} allPages={allPagesData} />
            <div className="sidebar">
              <div className="filters-section">
                <div className="search-container">
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Search pages..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-controls">
                  <select 
                    className="filter-select"
                    value={filterHealth}
                    onChange={(e) => setFilterHealth(e.target.value)}
                  >
                    <option value="all">All Health</option>
                    <option value="good">Good (80+)</option>
                    <option value="warning">Warning (50-79)</option>
                    <option value="critical">&lt;50</option>
                  </select>
                  <select 
                    className="filter-select"
                    value={filterIssues}
                    onChange={(e) => setFilterIssues(e.target.value)}
                  >
                    <option value="all">All Issues</option>
                    <option value="with-issues">With Issues</option>
                    <option value="no-issues">No Issues</option>
                  </select>
                </div>
              </div>
              <PageList 
                pages={currentPages}
                selectedPageId={selectedPageId}
                onSelectPage={setSelectedPageId}
                totalResults={filteredPages.length}
              />
              {totalPages > 1 && (
                <div className="pagination-controls">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    Previous
                  </button>
                  <span className="page-number">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}