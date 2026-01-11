import React from 'react';
import '../styles/Nodepanel.css';

const NodePanel = ({ nodeTypes = [], onAddNode, activeCategory }) => {
  const handleDragStart = (e, nodeType) => {
    // Store node type in both formats for compatibility
    e.dataTransfer.setData('node-type', nodeType);
    e.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: 'customNode',
      nodeType: nodeType
    }));
    e.dataTransfer.effectAllowed = 'move';
    
    // Visual feedback
    e.target.style.opacity = '0.5';
    e.target.style.cursor = 'grabbing';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    e.target.style.cursor = 'grab';
  };

  const handleClick = (nodeType) => {
    if (onAddNode) {
      // Calculate position in the center of canvas
      const x = 300 + Math.random() * 100; // Random offset
      const y = 200 + Math.random() * 100;
      onAddNode(nodeType, { x, y });
    }
  };

  return (
    <div className="node-panel">
      <div className="node-panel-header">
        <h3>{activeCategory} Nodes</h3>
        <span className="node-count">{nodeTypes.length} nodes</span>
      </div>
      
      <div className="node-palette">
        {nodeTypes.length === 0 ? (
          <div className="no-nodes">
            <p>No nodes available for this category</p>
          </div>
        ) : (
          nodeTypes.map((node) => (
            <div
              key={node.type}
              className="node-item"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, node.type)}
              onDragEnd={handleDragEnd}
              onClick={() => handleClick(node.type)}
              title={`Drag or click to add ${node.name}`}
            >
              <div 
                className="node-icon" 
                style={{ 
                  backgroundColor: `${node.color}20`,
                  borderColor: node.color
                }}
              >
                <span style={{ color: node.color, fontSize: '20px' }}>
                  {node.icon}
                </span>
              </div>
              <div className="node-info">
                <h4 className="node-name">{node.name}</h4>
                <p className="node-description">{node.description}</p>
              </div>
              <div className="drag-handle">⋮⋮</div>
            </div>
          ))
        )}
      </div>
      
      <div className="node-panel-footer">
        <p className="drag-hint">💡 Drag nodes onto the canvas or click to add</p>
      </div>
    </div>
  );
};

export default NodePanel;