import React, { useRef, useState } from 'react';
import NodeComponent from './NodeComponent';
import '../styles/PipelineCanvas.css';

const PipelineCanvas = ({ 
  nodes = [],
  connections = [], 
  onNodeSelect, 
  onNodeUpdate, 
  onNodeDelete, 
  onAddNode,
  selectedNode,
  isEditing
}) => {
  const canvasRef = useRef(null);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
  const [isDraggingNode, setIsDraggingNode] = useState(false);

  // Handle dropping a node from the panel
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (!canvasRef.current || !onAddNode) return;
    
    // Get the position relative to canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - viewportOffset.x;
    const y = e.clientY - rect.top - viewportOffset.y;
    
    // Try to get node type from different data formats
    let nodeType = e.dataTransfer.getData('node-type');
    
    if (!nodeType) {
      try {
        const reactflowData = JSON.parse(e.dataTransfer.getData('application/reactflow'));
        nodeType = reactflowData.nodeType || reactflowData.type;
      } catch (err) {
        console.log('Could not parse drag data:', err);
      }
    }
    
    if (nodeType) {
      onAddNode(nodeType, { x, y });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    
    // Visual feedback during drag-over
    if (canvasRef.current) {
      canvasRef.current.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (canvasRef.current) {
      canvasRef.current.classList.remove('drag-over');
    }
  };

  const handleCanvasClick = (e) => {
    // Only deselect if clicking on empty canvas (not a node)
    if (e.target === canvasRef.current || e.target.classList.contains('grid-overlay')) {
      onNodeSelect(null);
    }
  };

  // Canvas panning (middle mouse or shift+drag)
  const handleMouseDown = (e) => {
    if ((e.button === 1 || (e.button === 0 && e.shiftKey)) && isEditing) {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing';
      }
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingCanvas && canvasRef.current) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setViewportOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'default';
      canvasRef.current.classList.remove('drag-over');
    }
  };

  return (
    <div 
      ref={canvasRef}
      className={`pipeline-canvas ${isDraggingCanvas ? 'dragging' : ''} ${isEditing ? 'editing' : ''}`}
      onClick={handleCanvasClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'relative',
        transform: `translate(${viewportOffset.x}px, ${viewportOffset.y}px)`,
        transition: isDraggingCanvas ? 'none' : 'transform 0.1s ease'
      }}
    >
      {/* Grid Overlay */}
      <div className="grid-overlay"></div>

      {/* Drop Zone Hint */}
      <div className="drop-zone">
        <div className="drop-zone-content">
          <div className="drop-icon">📂</div>
          <p>Drop nodes here</p>
        </div>
      </div>

      {/* Connection Lines */}
      {connections.map((conn, index) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (!fromNode || !toNode) return null;
        
        const fromX = fromNode.position.x + 100;
        const fromY = fromNode.position.y + 30;
        const toX = toNode.position.x + 100;
        const toY = toNode.position.y + 30;
        
        return (
          <svg
            key={`conn_${index}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <line
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="#4f46e5"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
              </marker>
            </defs>
          </svg>
        );
      })}

      {/* Render Nodes */}
      {nodes.map(node => (
        <NodeComponent
          key={node.id}
          node={node}
          isSelected={selectedNode?.id === node.id}
          isEditing={isEditing}
          onSelect={onNodeSelect}
          onUpdate={onNodeUpdate}
          onDelete={onNodeDelete}
        />
      ))}
    </div>
  );
};

export default PipelineCanvas;