// CacheNode.js - New node type: Data Caching

import { useState } from 'react';
import { BaseNode, NodeField, NodeSection } from './BaseNode';
import '../styles/BaseNode.css';

export const CacheNode = ({ id, data }) => {
  const [cacheStrategy, setCacheStrategy] = useState(data?.cacheStrategy || 'memory');
  const [ttl, setTtl] = useState(data?.ttl || 300); // 5 minutes in seconds
  const [maxSize, setMaxSize] = useState(data?.maxSize || 1000);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Cache"
      type="Performance"
      icon="💾"
      inputs={[
        { id: 'data', label: 'Data to Cache', color: '#3b82f6' },
        { id: 'key', label: 'Cache Key', color: '#8b5cf6' }
      ]}
      outputs={[
        { id: 'cached', label: 'Cached Data', color: '#10b981' },
        { id: 'miss', label: 'Cache Miss', color: '#f59e0b' }
      ]}
      width={240}
    >
      <NodeField label="Cache Strategy">
        <select 
          value={cacheStrategy} 
          onChange={(e) => setCacheStrategy(e.target.value)}
        >
          <option value="memory">In-Memory</option>
          <option value="redis">Redis</option>
          <option value="localStorage">Local Storage</option>
          <option value="session">Session Storage</option>
        </select>
      </NodeField>
      
      <NodeSection title="Cache Configuration">
        <NodeField label={`TTL: ${ttl} seconds`}>
          <input 
            type="range" 
            min="60" 
            max="3600" 
            step="60"
            value={ttl}
            onChange={(e) => setTtl(parseInt(e.target.value))}
          />
        </NodeField>
        
        <NodeField label={`Max Size: ${maxSize} items`}>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100"
            value={maxSize}
            onChange={(e) => setMaxSize(parseInt(e.target.value))}
          />
        </NodeField>
      </NodeSection>
      
      <NodeSection title="Cache Stats">
        <div className="cache-stats">
          <div className="cache-stat">
            <span className="stat-label">Hit Rate:</span>
            <span className="stat-value">87%</span>
          </div>
          <div className="cache-stat">
            <span className="stat-label">Current Size:</span>
            <span className="stat-value">742 items</span>
          </div>
        </div>
      </NodeSection>
    </BaseNode>
  );
};