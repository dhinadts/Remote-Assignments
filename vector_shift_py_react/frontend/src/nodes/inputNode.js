import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [isRequired, setIsRequired] = useState(data?.required || false);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      type="Data Source"
      icon="📥"
      inputs={[]}
      outputs={[
        { id: 'value', label: 'Input Value', color: '#8b5cf6' }
      ]}
      width={220}
    >
      <NodeField label="Input Name" required>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          placeholder="e.g., user_input"
        />
      </NodeField>
      
      <NodeField label="Input Type">
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Number">Number</option>
          <option value="Boolean">Boolean</option>
          <option value="JSON">JSON</option>
        </select>
      </NodeField>
      
      <NodeField label="Validation Rules">
        <div className="validation-options">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
            <span>Required Field</span>
          </label>
        </div>
      </NodeField>
    </BaseNode>
  );
};

