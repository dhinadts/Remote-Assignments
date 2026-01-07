// components/NodeFactory.js
import React from 'react';
import BaseNode from './BaseNode';

// Input Node using BaseNode abstraction
export const InputNode = ({ id, data }) => {
  const [name, setName] = React.useState(data?.inputName || 'input');
  const [type, setType] = React.useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      type="input"
      title="Input Node"
      outputs={[{ id: 'value' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            />
          </label>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Type:
            <select
              value={type}
              onChange={handleTypeChange}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
              <option value="Number">Number</option>
              <option value="Boolean">Boolean</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};

// Output Node using BaseNode abstraction
export const OutputNode = ({ id, data }) => {
  const [name, setName] = React.useState(data?.outputName || 'output');
  const [type, setType] = React.useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      type="output"
      title="Output Node"
      inputs={[{ id: 'value' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            />
          </label>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <option value="Text">Text</option>
              <option value="Image">Image</option>
              <option value="File">File</option>
              <option value="JSON">JSON</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};

// LLM Node using BaseNode abstraction
export const LLMNode = ({ id, data }) => {
  const [model, setModel] = React.useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = React.useState(data?.temperature || 0.7);

  return (
    <BaseNode
      id={id}
      data={data}
      type="llm"
      title="LLM Node"
      inputs={[
        { id: 'system' },
        { id: 'prompt' },
        { id: 'context' }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Model:
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                width: '100%'
              }}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-2">Claude 2</option>
              <option value="llama-2">Llama 2</option>
            </select>
          </label>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }}>
            Temperature: {temperature}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
};