import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text Node"
      type="Text"
      icon="T"
      inputs={[]}
      outputs={[
        { id: 'output', label: 'Text Output', color: '#3b82f6' }
      ]}
      width={220}
    >
      <NodeField label="Text Content">
        <input 
          type="text" 
          value={currText} 
          onChange={handleTextChange}
          placeholder="Enter text or use {{variables}}"
          className="text-input"
        />
      </NodeField>
      <div className="text-preview">
        <small>Preview: {currText.length > 30 ? currText.substring(0, 30) + '...' : currText}</small>
      </div>
    </BaseNode>
  );
};


/* // textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
 */