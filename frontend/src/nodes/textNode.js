import React, { useState, useEffect, useRef } from 'react';
import BaseNode from '../components/BaseNode';

const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || 'Hello {{name}}!');
  const textareaRef = useRef(null);
  
  // Extract variables from text like {{variable}}
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)]; // Remove duplicates
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const variables = extractVariables(text);

  return (
    <BaseNode
      id={id}
      type="text"
      title="Text Node"
      inputs={variables.map(variable => ({ id: variable }))}
      outputs={[{ id: 'output' }]}
      style={{ minWidth: '250px' }}
    >
      <div>
        <label style={{ fontSize: '12px', fontWeight: '500', color: '#4B5563', marginBottom: '4px' }}>
          Text Content:
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            minHeight: '40px',
            padding: '8px',
            border: '1px solid #D1D5DB',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'none',
            overflow: 'hidden'
          }}
          placeholder="Enter text with {{variables}}..."
        />
        
        {variables.length > 0 && (
          <div style={{ 
            marginTop: '8px', 
            padding: '4px 8px', 
            backgroundColor: '#FEF3C7', 
            borderRadius: '4px',
            fontSize: '11px',
            color: '#92400E'
          }}>
            <strong>Variables detected:</strong> {variables.join(', ')}
            <div style={{ fontSize: '10px', marginTop: '2px' }}>
              Each variable creates an input handle on the left
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
};

// nodes/textNode.js - Add at the end:
export default TextNode;