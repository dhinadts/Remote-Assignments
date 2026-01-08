// ConditionNode.js - New node type: Conditional Logic

import { useState } from 'react';
import { BaseNode, NodeField, NodeSection } from './BaseNode';
import '../styles/BaseNode.css';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');
  const [operator, setOperator] = useState(data?.operator || 'and');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      type="Logic"
      icon="⚖️"
      inputs={[
        { id: 'data', label: 'Input Data', color: '#3b82f6' },
        { id: 'condition', label: 'Condition', color: '#8b5cf6' }
      ]}
      outputs={[
        { id: 'true', label: 'True Path', color: '#10b981' },
        { id: 'false', label: 'False Path', color: '#ef4444' },
        { id: 'result', label: 'Result', color: '#f59e0b' }
      ]}
      width={240}
    >
      <NodeField label="Condition Type">
        <select 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="equals">Equals</option>
          <option value="greater">Greater Than</option>
          <option value="less">Less Than</option>
          <option value="contains">Contains</option>
          <option value="regex">Regex Match</option>
          <option value="custom">Custom Expression</option>
        </select>
      </NodeField>
      
      <NodeField label="Compare Value">
        <input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value to compare against"
        />
      </NodeField>
      
      <NodeField label="Logical Operator">
        <select 
          value={operator} 
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="and">AND</option>
          <option value="or">OR</option>
          <option value="not">NOT</option>
        </select>
      </NodeField>
      
      <NodeSection title="Expression Preview">
        <code className="condition-preview">
          input {condition.replace('equals', '===')} "{value}"
        </code>
      </NodeSection>
    </BaseNode>
  );
};