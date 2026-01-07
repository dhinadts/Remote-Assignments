// nodes/CustomNode3.js
import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const DataTransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  return (
    <BaseNode
      id={id}
      type="transform"
      title="Data Transform"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Operation:
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="trim">Trim Whitespace</option>
              <option value="reverse">Reverse</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};

// nodes/CustomNode3.js - Add at the end:
export default DataTransformNode;