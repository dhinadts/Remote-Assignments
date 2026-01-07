// components/Toolbar.js
import React from 'react';
import './Toolbar.css';

const NODE_TYPES = [
  { type: 'input', label: 'Input', color: '#3B82F6' },
  { type: 'output', label: 'Output', color: '#10B981' },
  { type: 'llm', label: 'LLM', color: '#8B5CF6' },
  { type: 'text', label: 'Text', color: '#F59E0B' },
  { type: 'conditional', label: 'Conditional', color: '#EC4899' },
  { type: 'api', label: 'API Call', color: '#06B6D4' },
  { type: 'transform', label: 'Transform', color: '#F97316' },
  { type: 'delay', label: 'Delay', color: '#84CC16' },
  { type: 'merge', label: 'Merge', color: '#8B5CF6' }
];

const Toolbar = ({ onAddNode }) => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/node-type', nodeType);
  };

  return (
    <div className="toolbar">
      <h3>📦 Node Palette</h3>
      <p>Drag nodes to canvas</p>
      
      <div className="node-list">
        {NODE_TYPES.map((node) => (
          <div
            key={node.type}
            className="node-item"
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
            style={{ borderLeftColor: node.color }}
          >
            <div className="node-color" style={{ backgroundColor: node.color }} />
            <span>{node.label}</span>
            <small>{node.type}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

// ADD THIS LINE:
export default Toolbar;  // <-- Default export