// LLMNode.js - Refactored using BaseNode abstraction

import { BaseNode, NodeSection, NodeField } from './BaseNode';
import { useState } from 'react';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      type="AI Model"
      icon="🤖"
      inputs={[
        { id: 'system', label: 'System Prompt', color: '#8b5cf6' },
        { id: 'prompt', label: 'User Prompt', color: '#3b82f6' },
        { id: 'context', label: 'Context', color: '#06b6d4' }
      ]}
      outputs={[
        { id: 'response', label: 'LLM Response', color: '#10b981' }
      ]}
      width={240}
    >
      <NodeSection title="Model Configuration">
        <NodeField label="Model">
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="model-select"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-2">Claude 2</option>
            <option value="llama-2">Llama 2</option>
          </select>
        </NodeField>
        
        <NodeField label={`Temperature: ${temperature}`}>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="temperature-slider"
          />
        </NodeField>
      </NodeSection>
      
      <NodeSection title="Parameters">
        <div className="param-grid">
          <div className="param-item">
            <span className="param-label">Max Tokens:</span>
            <span className="param-value">2048</span>
          </div>
          <div className="param-item">
            <span className="param-label">Presence Penalty:</span>
            <span className="param-value">0.0</span>
          </div>
        </div>
      </NodeSection>
    </BaseNode>
  );
};


/* // llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{top: `${100/3}%`}}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{top: `${200/3}%`}}
      />
      <div>
        <span>LLM</span>
      </div>
      <div>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
}
 */