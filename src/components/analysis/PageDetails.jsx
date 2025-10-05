import React, { useState } from 'react';
import { ExternalLink, Wrench, Eye, AlertTriangle, CheckCircle, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Component to handle text truncation with expand/collapse functionality
const TruncatedText = ({ text, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text || text.length <= maxLength) {
    return <span className="explanation-text">{text}</span>;
  }
  
  const truncatedText = text.substring(0, maxLength).trim();
  
  return (
    <span className="explanation-text">
      {isExpanded ? text : `${truncatedText}...`}
      <span 
        className="explanation-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? ' Show less' : ' Show more'}
      </span>
    </span>
  );
};

const styles = `
.details-container {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%; /* Make container fill the grid area */
  min-height: 0;
}

.page-specific-details {
  padding: 2rem;
  overflow-y: auto; /* Allow this part to scroll if needed */
  flex-grow: 1;
}

.placeholder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #64748b;
  background-color: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
}

.placeholder-container h3 {
  font-size: 1.25rem;
  color: #334155;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.details-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.details-url {
  font-size: 1rem;
  color: #3b82f6;
  text-decoration: none;
  word-break: break-all;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}

.details-url:hover {
  text-decoration: underline;
}

.details-title-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
}

.scores-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.score-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  min-width: 6rem;
  text-align: center;
}

.score-badge.health.good { background-color: #dcfce7; }
.score-badge.health.bad { background-color: #fee2e2; }
.score-badge.health.warning { background-color: #fefce8; }
.score-badge.importance { background-color: #eef2ff; }

.score-number {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.score-label {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.25rem;
  opacity: 0.9;
}

.health.good .score-number { color: #16a34a; }
.health.bad .score-number { color: #dc2626; }
.health.warning .score-number { color: #ca8a04; }
.importance .score-number { color: #4338ca; }

.site-summary-section {
  background: linear-gradient(to top, #f9fafb, #ffffff);
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1e293b;
}

.charts-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 600px) {
  .charts-wrapper {
    grid-template-columns: 1fr;
  }
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.chart-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.issues-section {
  margin-bottom: 1.5rem;
}

.issues-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.issues-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.issues-count {
  background-color: #dc2626;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.issues-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.issue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border-left-width: 4px;
}

.issue-item.critical { background-color: #fff1f2; border-color: #ef4444; }
.issue-item.warning { background-color: #fffbeb; border-color: #f59e0b; }
.issue-item.info { background-color: #f0f9ff; border-color: #3b82f6; }

.issue-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.issue-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.issue-type {
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
}

.severity-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.severity-badge.severity-high {
  background-color: #fee2e2;
  color: #dc2626;
}

.severity-badge.severity-medium {
  background-color: #fef3c7;
  color: #d97706;
}

.severity-badge.severity-low {
  background-color: #dbeafe;
  color: #2563eb;
}

.issue-explanation {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.5;
  margin-top: 0.375rem;
}

.explanation-text {
  display: block;
}

.explanation-toggle {
  color: #4f46e5;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  margin-left: 0.25rem;
}

.explanation-toggle:hover {
  color: #4338ca;
}


.fix-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 1rem;
}

.fix-button:hover {
  background-color: #4338ca;
}

.actions-row {
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
  margin-top: 2rem;
}

.action-button {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  color: #374151;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.action-button:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.action-button.primary {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.action-button.primary:hover {
  background-color: #4338ca;
}

.no-issues-container {
  text-align: center;
  padding: 2rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  color: #166534;
}

.no-issues-container h4 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}
`;

const getHealthClass = (score) => {
  if (score >= 80) return 'good';
  if (score < 50) return 'bad';
  return 'warning';
};

// Helper to categorize issues from their type or text
const getIssueCategory = (issue) => {
  // Handle different issue structures
  const issueText = issue.type || issue.text || issue.explanation || '';
  const lowerText = issueText.toLowerCase();
  
  if (['meta', 'title', 'canonical', 'graph', 'social', 'tags', 'description'].some(kw => lowerText.includes(kw))) return 'Meta & Tags';
  if (['speed', 'optimized', 'size', 'ratio', 'compress'].some(kw => lowerText.includes(kw))) return 'Performance';
  if (['alt text', 'h1', 'content', 'keyword', 'breadcrumb', 'heading', 'image', 'readability'].some(kw => lowerText.includes(kw))) return 'Content & SEO';
  if (['link', 'broken link', 'external link', 'internal link'].some(kw => lowerText.includes(kw))) return 'Linking';
  if (['robot', 'sitemap', 'redirect', 'https', 'favicon', 'language', 'schema', 'indexing'].some(kw => lowerText.includes(kw))) return 'Technical';
  return 'Other';
};


export default function PageDetails({ selectedPage, allPages }) {
  if (!allPages || allPages.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="placeholder-container">
          <Eye size={48} opacity={0.3} />
          <h3>No pages to analyze.</h3>
        </div>
      </>
    )
  }

  const allSiteIssues = allPages.flatMap(p => p.issues);

  // Data for Severity Pie Chart - Updated to use real severity values from sample.json
  // Filter out issues with null/undefined severity
  const issuesWithSeverity = allSiteIssues.filter(i => i.severity && i.severity.trim() !== '');
  const severityData = [
    { name: 'High', value: issuesWithSeverity.filter(i => i.severity.toUpperCase() === 'HIGH').length },
    { name: 'Medium', value: issuesWithSeverity.filter(i => i.severity.toUpperCase() === 'MEDIUM').length },
    { name: 'Low', value: issuesWithSeverity.filter(i => i.severity.toUpperCase() === 'LOW').length },
  ].filter(d => d.value > 0);

  const SEVERITY_COLORS = {
      'High': '#ef4444',
      'Medium': '#f59e0b',
      'Low': '#3b82f6'
  };

  // Data for Category Pie Chart
  const categoryCounts = allSiteIssues.reduce((acc, issue) => {
      const category = getIssueCategory(issue);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  const CATEGORY_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  return (
    <>
      <style>{styles}</style>
      <div className="details-container">
        <div className="page-specific-details">
        {!selectedPage ? (
          <div className="placeholder-container">
            <Eye size={48} opacity={0.3} />
            <h3>Select a page to view details</h3>
            <p>Choose a page from the list on the right to see its analysis.</p>
          </div>
        ) : (
          <>
            <div className="details-header">
              <a href={`https://ynet.co.il${selectedPage.url}`} target="_blank" rel="noopener noreferrer" className="details-url">
                {selectedPage.url}
                <ExternalLink size={16} />
              </a>
              <h3 className="details-title-text">{selectedPage.title}</h3>
            </div>

            <div className="scores-container">
              <div className={`score-badge health ${getHealthClass(selectedPage.healthScore)}`}>
                <div className="score-number">{selectedPage.healthScore}</div>
                <div className="score-label">Health</div>
              </div>
              <div className="score-badge importance">
                <div className="score-number">{selectedPage.importanceScore}</div>
                <div className="score-label">Importance</div>
              </div>
            </div>

            {(() => {
              const issuesWithSeverity = selectedPage.issues.filter(issue => issue.severity && issue.severity.trim() !== '');
              return issuesWithSeverity.length > 0 ? (
                <div className="issues-section">
                  <div className="issues-header">
                    <AlertTriangle size={20} className="text-amber-600" />
                    <span className="issues-title">Issues Found</span>
                    <span className="issues-count">{issuesWithSeverity.length}</span>
                  </div>
                  <div className="issues-list">
                    {issuesWithSeverity.map((issue, index) => (
                      <div key={index} className={`issue-item ${(issue.type || issue.severity || 'general').toLowerCase().replace(/\s+/g, '-')}`}>
                        <div className="issue-content">
                          <div className="issue-header">
                            <span className="issue-type">{issue.type || 'General Issue'}</span>
                            {issue.severity && (
                              <span className={`severity-badge severity-${issue.severity.toLowerCase()}`}>
                                {issue.severity}
                              </span>
                            )}
                          </div>
                          {issue.explanation && (
                            <div className="issue-explanation">
                              <TruncatedText text={issue.explanation} maxLength={120} />
                            </div>
                          )}
                        </div>
                        <button className="fix-button">Quick Fix</button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-issues-container">
                  <CheckCircle size={24} className="mx-auto mb-2" />
                  <h4>No Issues Found!</h4>
                  <p>This page looks great from an SEO perspective.</p>
                </div>
              );
            })()}
            
            <div className="actions-row">
              <button className="action-button">
                <Eye size={16} />
                View Full Report
              </button>
              {(() => {
                const issuesWithSeverity = selectedPage.issues.filter(issue => issue.severity && issue.severity.trim() !== '');
                return issuesWithSeverity.length > 0 && (
                  <button className="action-button primary">
                    <Wrench size={16} />
                    Fix All ({issuesWithSeverity.length})
                  </button>
                );
              })()}
            </div>
          </>
        )}
        </div>
        
        {allSiteIssues.length > 0 && (
          <div className="site-summary-section">
            <div className="summary-header">
                <PieChartIcon size={24} className="text-slate-600" />
                <h3 className="summary-title">Site-Wide Issue Summary</h3>
            </div>
            <div className="charts-wrapper">
                <div className="chart-container">
                    <h4 className="chart-title">Issues by Severity</h4>
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                                {severityData.map((entry, index) => (
                                    <Cell key={`cell-severity-${index}`} fill={SEVERITY_COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-container">
                    <h4 className="chart-title">Issues by Category</h4>
                     <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} label>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-category-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} issues`, name]} />
                            <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={8} wrapperStyle={{fontSize: '12px'}} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}