// components/BaseNode.js
import React from 'react';
import './BaseNode.css';

const BaseNode = ({ 
  id, 
  type = 'default',
  title = 'Node',
  inputs = [],
  outputs = [],
  children,
  style = {},
  onDragStart,
  selected = false
}) => {
  // Node type colors
  const typeColors = {
    input: { border: '#3B82F6', header: '#2563EB' },
    output: { border: '#10B981', header: '#059669' },
    llm: { border: '#8B5CF6', header: '#7C3AED' },
    text: { border: '#F59E0B', header: '#D97706' },
    conditional: { border: '#EC4899', header: '#DB2777' },
    api: { border: '#06B6D4', header: '#0891B2' },
    transform: { border: '#F97316', header: '#EA580C' },
    delay: { border: '#84CC16', header: '#65A30D' },
    merge: { border: '#8B5CF6', header: '#7C3AED' },
    default: { border: '#6B7280', header: '#4B5563' }
  };

  const colors = typeColors[type] || typeColors.default;

  return (
    <div 
      className={`base-node ${selected ? 'selected' : ''}`}
      style={{
        minWidth: '200px',
        minHeight: '80px',
        backgroundColor: 'white',
        border: `2px solid ${colors.border}`,
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        ...style
      }}
      draggable={!!onDragStart}
      onDragStart={onDragStart}
    >
      {/* Header */}
      <div style={{
        backgroundColor: colors.header,
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px 6px 0 0',
        margin: '-12px -12px 12px -12px',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>{title}</span>
        <span style={{ fontSize: '12px', opacity: 0.8 }}>
          {type.toUpperCase()}
        </span>
      </div>

      {/* Input handles (left side) */}
      <div className="input-handles">
        {inputs.map((input, index) => (
          <div 
            key={`${id}-input-${index}`}
            className="handle"
            style={{
              left: '-10px',
              top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
              background: colors.border
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="node-content">
        {children}
      </div>

      {/* Output handles (right side) */}
      <div className="output-handles">
        {outputs.map((output, index) => (
          <div 
            key={`${id}-output-${index}`}
            className="handle"
            style={{
              right: '-10px',
              top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
              background: colors.border
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseNode;