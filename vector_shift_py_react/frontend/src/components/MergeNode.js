// MergeNode.js - New node type: Data Merge

import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';
import '../styles/BaseNode.css';

export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concat');
  const [mergeKey, setMergeKey] = useState(data?.mergeKey || '');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data Merge"
      type="Combiner"
      icon="🔄"
      inputs={[
        { id: 'input1', label: 'Input A', color: '#3b82f6' },
        { id: 'input2', label: 'Input B', color: '#8b5cf6' },
        { id: 'input3', label: 'Input C', color: '#06b6d4' }
      ]}
      outputs={[
        { id: 'merged', label: 'Merged Output', color: '#10b981' }
      ]}
      width={220}
    >
      <NodeField label="Merge Strategy">
        <select 
          value={mergeStrategy} 
          onChange={(e) => setMergeStrategy(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="join">Inner Join</option>
          <option value="union">Union</option>
          <option value="zip">Zip Together</option>
          <option value="intersection">Intersection</option>
        </select>
      </NodeField>
      
      {['join', 'union'].includes(mergeStrategy) && (
        <NodeField label="Join Key">
          <input 
            type="text" 
            value={mergeKey}
            onChange={(e) => setMergeKey(e.target.value)}
            placeholder="e.g., id, timestamp"
          />
        </NodeField>
      )}
      
      <div className="merge-info">
        <small>Merges multiple data streams into one</small>
      </div>
    </BaseNode>
  );
};