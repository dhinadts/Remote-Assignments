// OutputNode.js - Refactored using BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [format, setFormat] = useState(data?.format || 'plain');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      type="Data Sink"
      icon="📤"
      inputs={[
        { id: 'value', label: 'Output Value', color: '#10b981' }
      ]}
      outputs={[]}
      width={220}
    >
      <NodeField label="Output Name" required>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          placeholder="e.g., final_result"
        />
      </NodeField>
      
      <NodeField label="Output Type">
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Image">Image</option>
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
        </select>
      </NodeField>
      
      {outputType === 'Text' && (
        <NodeField label="Format">
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="plain">Plain Text</option>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
          </select>
        </NodeField>
      )}
    </BaseNode>
  );
};


/* // outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div style={{width: 200, height: 80, border: '1px solid black'}}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />
      <div>
        <span>Output</span>
      </div>
      <div>
        <label>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
          />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
}
 */