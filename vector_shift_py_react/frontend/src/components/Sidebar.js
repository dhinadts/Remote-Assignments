// components/Sidebar.js - Corrected Version
import React from 'react';
import '../styles/Sidebar.css';  // Make sure this CSS file exists

const Sidebar = ({ activeCategory, onCategoryChange, categories }) => {
  const handleDocumentationClick = (e) => {
    e.preventDefault();
    // Open documentation in new tab or show modal
    window.open('https://docs.example.com', '_blank');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Options</h2>
        <div className="sidebar-subtitle">Unified Pipeline 2</div>
      </div>
      
      <nav className="category-nav">
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category} className="category-item">
              <button
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
                type="button"
                aria-label={`Select ${category} category`}
              >
                <span className="category-icon">
                  {getCategoryIcon(category)}
                </span>
                <span className="category-name">{category}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="version-info">v2.0.1</div>
        <div className="help-link">
          <button 
            onClick={handleDocumentationClick}
            className="doc-link-button"
            type="button"
          >
            📖 Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    'General': '📦',
    'LLMs': '🤖',
    'Knowledge Base': '📚',
    'Integration': '🔗',
    'Data Leaders': '📊',
    'Multi-Modal': '🎨',
    'Logic': '⚡',
    'Data Transformation': '🔄',
    'Chat': '💬'
  };
  return icons[category] || '📝';
};

export default Sidebar;