// nodes/CustomNode4.js
import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      id={id}
      type="delay"
      title="Delay"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Delay: {delay}ms
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
};

// nodes/CustomNode5.js - Add at the end:
export default MergeNode;