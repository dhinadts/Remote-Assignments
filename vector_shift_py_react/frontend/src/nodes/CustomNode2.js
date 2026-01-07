// nodes/CustomNode2.js
import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const APICallNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      type="api"
      title="API Call"
      inputs={[{ id: 'params' }, { id: 'headers' }]}
      outputs={[{ id: 'response' }, { id: 'error' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Method:
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};

// nodes/CustomNode2.js - Add at the end:
export default APICallNode;