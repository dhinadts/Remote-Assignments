// ProcessNode.js - New node type: Data Processing

import { useState } from 'react';
import { BaseNode, NodeField, NodeSection } from './BaseNode';
import '../styles/BaseNode.css';

export const ProcessNode = ({ id, data }) => {
  const [processType, setProcessType] = useState(data?.processType || 'filter');
  const [criteria, setCriteria] = useState(data?.criteria || '');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Process"
      type="Transformer"
      icon="⚙️"
      inputs={[
        { id: 'input', label: 'Input Data', color: '#3b82f6' },
        { id: 'config', label: 'Configuration', color: '#8b5cf6' }
      ]}
      outputs={[
        { id: 'output', label: 'Processed Data', color: '#10b981' },
        { id: 'errors', label: 'Errors', color: '#ef4444' }
      ]}
      width={240}
    >
      <NodeField label="Process Type">
        <select 
          value={processType} 
          onChange={(e) => setProcessType(e.target.value)}
        >
          <option value="filter">Filter</option>
          <option value="map">Map/Transform</option>
          <option value="reduce">Reduce/Aggregate</option>
          <option value="sort">Sort</option>
          <option value="group">Group By</option>
        </select>
      </NodeField>
      
      <NodeField label="Processing Criteria">
        <input 
          type="text" 
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          placeholder="e.g., item.price > 100"
        />
      </NodeField>
      
      <NodeSection title="Statistics">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Processing Time:</span>
            <span className="stat-value">~50ms</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Success Rate:</span>
            <span className="stat-value">98.5%</span>
          </div>
        </div>
      </NodeSection>
    </BaseNode>
  );
};