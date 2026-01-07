// nodes/CustomNode5.js
import React from 'react';
import BaseNode from '../components/BaseNode';

const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="merge"
      title="Merge"
      inputs={[{ id: 'input1' }, { id: 'input2' }, { id: 'input3' }]}
      outputs={[{ id: 'merged' }]}
    >
      <div style={{ fontSize: '12px', color: '#6B7280', padding: '4px' }}>
        Merges multiple inputs into single output
      </div>
    </BaseNode>
  );
};

export default MergeNode;