// components/NodeComponent.js - Simplified drag
import React, { useState } from 'react';
import '../styles/NodeComponent.css';

const NodeComponent = ({ 
  node, 
  isSelected, 
  isEditing, 
  onSelect, 
  onUpdate, 
  onDelete 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (!isEditing || e.button !== 0) return;
    
    // Only start drag on the node header, not on inputs/buttons
    if (!e.target.closest('.node-delete-btn') && !e.target.closest('input')) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      e.stopPropagation();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && isEditing) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      onUpdate(node.id, { 
        position: { x: newX, y: newY } 
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    // Don't trigger select if we were dragging
    if (!isDragging) {
      onSelect(node);
    }
    e.stopPropagation();
  };

  return (
    <div
      className={`node ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'absolute',
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        borderColor: node.color,
        backgroundColor: `${node.color}10`
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Node Header - Draggable area */}
      <div 
        className="node-header"
        style={{ 
          backgroundColor: node.color,
          cursor: isEditing ? 'grab' : 'default'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="node-header-left">
          <span className="node-icon">{node.icon}</span>
          <span className="node-title">{node.name}</span>
        </div>
        {isEditing && (
          <button 
            className="node-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Node Content */}
      <div className="node-content">
        {node.description && (
          <div className="node-description">
            {node.description}
          </div>
        )}
        
        {/* Simple config preview */}
        {node.type === 'input' && node.config?.inputType && (
          <div className="config-preview">
            <div>Type: {node.config.inputType}</div>
          </div>
        )}
        
        {node.type === 'knowledgeBaseReader' && node.config?.searchQuery && (
          <div className="config-preview">
            <div>Query: {node.config.searchQuery}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeComponent;