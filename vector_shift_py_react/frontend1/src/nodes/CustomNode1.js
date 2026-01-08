// nodes/CustomNode1.js
import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '==');

  return (
    <BaseNode
      id={id}
      type="conditional"
      title="Conditional"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Condition:
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <option value="==">Equals (==)</option>
              <option value="!=">Not Equals (!=)</option>
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};

export default ConditionalNode;