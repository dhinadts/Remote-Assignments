import { useState } from 'react';
import { BaseNode, NodeField, NodeSection } from './BaseNode';
import  '../styles/BaseNode.css';

export const APIRequestNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || `const API_BASE_URL = "https://remote-assignments-vector-backend.onrender.com"`);
  const [headers, setHeaders] = useState(data?.headers || '{}');
  const [timeout, setTimeout] = useState(data?.timeout || 30);

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      type="Integration"
      icon="🌐"
      inputs={[
        { id: 'params', label: 'Parameters', color: '#3b82f6' },
        { id: 'body', label: 'Request Body', color: '#8b5cf6' },
        { id: 'auth', label: 'Auth Token', color: '#f59e0b' }
      ]}
      outputs={[
        { id: 'response', label: 'API Response', color: '#10b981' },
        { id: 'error', label: 'Error', color: '#ef4444' },
        { id: 'status', label: 'Status Code', color: '#6366f1' }
      ]}
      width={260}
    >
      <NodeField label="HTTP Method">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </NodeField>
      
      <NodeField label="Endpoint URL">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          
        />
      </NodeField>
      
      <NodeSection title="Request Configuration">
        <NodeField label="Headers (JSON)">
          <textarea 
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Content-Type": "application/json"}'
            rows="2"
          />
        </NodeField>
        
        <NodeField label={`Timeout: ${timeout}s`}>
          <input 
            type="range" 
            min="5" 
            max="120" 
            step="5"
            value={timeout}
            onChange={(e) => setTimeout(parseInt(e.target.value))}
          />
        </NodeField>
      </NodeSection>
      
      <div className="api-status">
        <span className="status-indicator status-idle"></span>
        <small>Ready to make requests</small>
      </div>
    </BaseNode>
  );
};