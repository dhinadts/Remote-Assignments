// components/PipelineUI.js - UPDATED
import React, { useState, useCallback } from 'react';
// Remove CSS import or create the file
// import './PipelineUI.css'; // Comment out or create the file

// Import our nodes with correct paths
import TextNode from '../nodes/textNode';
import ConditionalNode from '../nodes/CustomNode1';
import APICallNode from '../nodes/CustomNode2';
import DataTransformNode from '../nodes/CustomNode3';
import DelayNode from '../nodes/CustomNode4';
import MergeNode from '../nodes/CustomNode5';

const PipelineUI = ({ nodes = [], onNodesChange }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/node-type');
    
    if (nodeType && onNodesChange) {
      const newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        x: event.clientX - 300,
        y: event.clientY - 100,
        data: {}
      };
      
      onNodesChange([...nodes, newNode]);
    }
  }, [nodes, onNodesChange]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const renderNode = (node) => {
    const nodeProps = {
      key: node.id,
      id: node.id,
      data: node.data || {},
      selected: selectedNode === node.id,
      onClick: () => setSelectedNode(node.id)
    };

    switch (node.type) {
      case 'text':
        return <TextNode {...nodeProps} />;
      case 'conditional':
        return <ConditionalNode {...nodeProps} />;
      case 'api':
        return <APICallNode {...nodeProps} />;
      case 'transform':
        return <DataTransformNode {...nodeProps} />;
      case 'delay':
        return <DelayNode {...nodeProps} />;
      case 'merge':
        return <MergeNode {...nodeProps} />;
      default:
        return (
          <div 
            key={node.id}
            className="simple-node" 
            onClick={() => setSelectedNode(node.id)}
            style={{
              padding: '20px',
              background: '#f3f4f6',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {node.type.toUpperCase()} Node
          </div>
        );
    }
  };

  return (
    <div 
      className="pipeline-canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        flex: 1,
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        minHeight: '500px',
        position: 'relative'
      }}
    >
      <div className="canvas-header">
        <h2 style={{ color: '#1f2937', marginBottom: '5px' }}>Pipeline Canvas</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>Drag nodes from the toolbar and drop here</p>
      </div>
      
      <div className="nodes-container" style={{ position: 'relative', minHeight: '400px' }}>
        {nodes.map((node) => (
          <div
            key={node.id}
            className="node-wrapper"
            style={{ 
              position: 'absolute', 
              left: `${node.x}px`, 
              top: `${node.y}px`,
              cursor: 'move'
            }}
          >
            {renderNode(node)}
          </div>
        ))}
      </div>
      
      {nodes.length === 0 && (
        <div className="empty-state" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📁</div>
          <h3 style={{ color: '#4b5563', marginBottom: '5px' }}>No nodes yet</h3>
          <p>Drag nodes from the toolbar to start building your pipeline</p>
        </div>
      )}
    </div>
  );
};

// ADD THIS LINE:
export default PipelineUI;  // <-- Default export