import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const styles = `
.page-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.pagination-controls {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  flex-shrink: 0; /* Prevent controls from shrinking */
}

.pagination-info {
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
  color: #64748b;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pages-scroll-container {
  overflow-y: auto;
  flex-grow: 1;
  padding: 0.5rem;
}

.page-list-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.page-list-item:hover {
  background-color: #f8fafc;
}

.page-list-item.selected {
  background-color: #eff6ff;
  border-color: #3b82f6;
}

.page-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.page-item-url {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e3a8a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-item-scores {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.mini-score {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  line-height: 1.2;
}

.mini-score.health.good { background-color: #d1fae5; color: #065f46; }
.mini-score.health.bad { background-color: #fee2e2; color: #991b1b; }
.mini-score.health.warning { background-color: #fef3c7; color: #92400e; }
.mini-score.importance { background-color: #e0e7ff; color: #3730a3; }

.page-item-issues {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: #64748b;
}

.no-pages-found {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.no-pages-found h4 {
  margin: 0 0 0.5rem;
  color: #334155;
}

.no-pages-found p {
  margin: 0;
  font-size: 0.875rem;
}
`;

const getHealthClass = (score) => {
  if (score >= 80) return 'good';
  if (score < 50) return 'bad';
  return 'warning';
};

export default function PageList({ pages, selectedPageId, onSelectPage, totalResults }) {
  if (pages.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="page-list-container">
          <div className="no-pages-found">
            <h4>No Pages Found</h4>
            <p>Try adjusting your search or filters.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="page-list-container">
        <div className="pages-scroll-container">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`page-list-item ${page.id === selectedPageId ? 'selected' : ''}`}
              onClick={() => onSelectPage(page.id)}
            >
              <div className="page-item-header">
                <div className="page-item-url" title={page.url}>{page.url}</div>
                <div className="page-item-scores">
                  <span className={`mini-score health ${getHealthClass(page.healthScore)}`}>
                    {page.healthScore}
                  </span>
                  <span className="mini-score importance">{page.importanceScore}</span>
                </div>
              </div>
              <div className="page-item-issues">
                {page.issues.length > 0 ? (
                  <>
                    <AlertTriangle size={14} className="text-amber-600" />
                    <span>{page.issues.length} issue{page.issues.length > 1 ? 's' : ''} found</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} className="text-green-600" />
                    <span>No issues</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}