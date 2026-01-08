// components/NodeInspector.js - Complete Version
import React, { useState, useEffect } from 'react';
import '../styles/NodeInspector.css';

const NodeInspector = ({ node, onUpdate, onDelete, isEditing }) => {
  const [config, setConfig] = useState(node?.config || {});
  const [localNode, setLocalNode] = useState(node);
  const [isExpanded, setIsExpanded] = useState({
    inputConfig: true,
    outputFields: true,
    outputs: true,
    advanced: false,
    connections: false,
    metadata: false
  });

  // Update local state when node prop changes
  useEffect(() => {
    if (node) {
      setLocalNode(node);
      setConfig(node.config || {});
    }
  }, [node]);

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    if (localNode) {
      onUpdate(localNode.id, { config: newConfig });
    }
  };

  const handleNodePropertyChange = (property, value) => {
    if (localNode) {
      const updatedNode = { ...localNode, [property]: value };
      setLocalNode(updatedNode);
      onUpdate(localNode.id, { [property]: value });
    }
  };

  const handleArrayItemAdd = (key, defaultValue = '') => {
    const current = config[key] || [];
    handleConfigChange(key, [...current, defaultValue]);
  };

  const handleArrayItemUpdate = (key, index, value) => {
    const current = config[key] || [];
    const updated = [...current];
    updated[index] = value;
    handleConfigChange(key, updated);
  };

  const handleArrayItemRemove = (key, index) => {
    const current = config[key] || [];
    const updated = current.filter((_, i) => i !== index);
    handleConfigChange(key, updated);
  };

  const toggleSection = (section) => {
    setIsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDeleteNode = () => {
    if (localNode && window.confirm(`Are you sure you want to delete "${localNode.name}"?`)) {
      onDelete(localNode.id);
    }
  };

  if (!localNode) {
    return (
      <div className="no-node-selected">
        <div className="placeholder-icon">👈</div>
        <h3>No Node Selected</h3>
        <p>Select a node to view and edit its properties</p>
      </div>
    );
  }

  return (
    <div className="node-inspector">
      {/* Inspector Header */}
      <div className="inspector-header">
        <div className="node-type" style={{ color: localNode.color }}>
          <span className="node-type-icon">{localNode.icon}</span>
          <span className="node-type-name">{localNode.category}</span>
        </div>
        
        <div className="node-title-section">
          <div className="node-title-input">
            {isEditing ? (
              <input
                type="text"
                value={localNode.name}
                onChange={(e) => handleNodePropertyChange('name', e.target.value)}
                className="node-name-input"
                placeholder="Node name"
              />
            ) : (
              <h2 className="node-name-display">{localNode.name}</h2>
            )}
          </div>
          <div className="node-id">ID: {localNode.id}</div>
        </div>

        <div className="inspector-actions">
          {isEditing && (
            <button
              className="btn-delete-node"
              onClick={handleDeleteNode}
              title="Delete node"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      <div className="inspector-content">
        {/* Basic Information */}
        <div className="config-section">
          <div className="section-header">
            <h3>Basic Information</h3>
          </div>
          <div className="section-content">
            <div className="form-row">
              <div className="form-group">
                <label>Node Type</label>
                <div className="read-only-field">{localNode.type}</div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <div className="read-only-field">{localNode.category}</div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              {isEditing ? (
                <textarea
                  value={localNode.description || ''}
                  onChange={(e) => handleNodePropertyChange('description', e.target.value)}
                  className="form-textarea"
                  rows={3}
                  placeholder="Add description..."
                />
              ) : (
                <div className="description-text">{localNode.description || 'No description'}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Position X</label>
                <input
                  type="number"
                  value={localNode.position?.x || 0}
                  onChange={(e) => handleNodePropertyChange('position', { 
                    ...localNode.position, 
                    x: parseInt(e.target.value) 
                  })}
                  className="form-input number-input"
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Position Y</label>
                <input
                  type="number"
                  value={localNode.position?.y || 0}
                  onChange={(e) => handleNodePropertyChange('position', { 
                    ...localNode.position, 
                    y: parseInt(e.target.value) 
                  })}
                  className="form-input number-input"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input Node Specific Configuration */}
        {localNode.type === 'input' && (
          <div className="config-section">
            <div 
              className="section-header clickable"
              onClick={() => toggleSection('inputConfig')}
            >
              <h3>Input Configuration</h3>
              <span className="toggle-icon">
                {isExpanded.inputConfig ? '▼' : '▶'}
              </span>
            </div>
            
            {isExpanded.inputConfig && (
              <div className="section-content">
                <div className="form-group">
                  <label>Input Type</label>
                  <select
                    value={config.inputType || 'Text'}
                    onChange={(e) => handleConfigChange('inputType', e.target.value)}
                    className="form-select"
                    disabled={!isEditing}
                  >
                    <option value="Text">Text</option>
                    <option value="File">File</option>
                    <option value="Image">Image</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                    <option value="CSV">CSV</option>
                    <option value="JSON">JSON</option>
                    <option value="XML">XML</option>
                  </select>
                </div>

                {config.inputType === 'Text' && (
                  <div className="form-group">
                    <label>Default Text</label>
                    <textarea
                      value={config.defaultText || ''}
                      onChange={(e) => handleConfigChange('defaultText', e.target.value)}
                      className="form-textarea"
                      rows={3}
                      disabled={!isEditing}
                      placeholder="Enter default text..."
                    />
                  </div>
                )}

                {config.inputType === 'File' && (
                  <div className="form-group">
                    <label>Accepted File Types</label>
                    <input
                      type="text"
                      value={config.acceptedFileTypes || '.txt,.pdf,.doc,.docx'}
                      onChange={(e) => handleConfigChange('acceptedFileTypes', e.target.value)}
                      className="form-input"
                      disabled={!isEditing}
                      placeholder=".txt,.pdf,.doc,.docx"
                    />
                  </div>
                )}

                <div className="form-group">
                  <div className="array-header">
                    <label>Output Fields</label>
                    {isEditing && (
                      <button 
                        className="btn-array-add"
                        onClick={() => handleArrayItemAdd('outputFields', 'New Field: Description')}
                      >
                        + Add Field
                      </button>
                    )}
                  </div>
                  <div className="array-items">
                    {config.outputFields?.map((field, index) => (
                      <div key={index} className="array-item">
                        <input
                          type="text"
                          value={field}
                          onChange={(e) => handleArrayItemUpdate('outputFields', index, e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                          placeholder="Field name: Description"
                        />
                        {isEditing && (
                          <button 
                            className="btn-array-remove"
                            onClick={() => handleArrayItemRemove('outputFields', index)}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="field-help">
                    Format: "FieldName: Description"
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Knowledge Base Reader Specific Configuration */}
        {localNode.type === 'knowledgeBaseReader' && (
          <div className="config-section">
            <div className="section-header">
              <h3>Knowledge Base Configuration</h3>
            </div>
            
            <div className="section-content">
              <div className="form-group">
                <label>Knowledge Base</label>
                <div className="knowledge-base-selector">
                  <select
                    value={config.knowledgeBase || ''}
                    onChange={(e) => handleConfigChange('knowledgeBase', e.target.value)}
                    className="form-select"
                    disabled={!isEditing}
                  >
                    <option value="">Select Knowledge Base</option>
                    <option value="feb2016">February 2016/booklog8 Base</option>
                    <option value="googleData">Google Data Base</option>
                    <option value="custom">Custom Knowledge Base</option>
                  </select>
                  {isEditing && (
                    <div className="knowledge-base-actions">
                      <button 
                        className="btn-secondary btn-small"
                        onClick={() => console.log('Edit knowledge base')}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-primary btn-small"
                        onClick={() => console.log('Create new knowledge base')}
                      >
                        + Create New
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Search Query</label>
                <div className="search-query-container">
                  <textarea
                    value={config.searchQuery || '[ERROR_EXPERT]'}
                    onChange={(e) => handleConfigChange('searchQuery', e.target.value)}
                    className="form-textarea"
                    rows={3}
                    disabled={!isEditing}
                    placeholder="Enter search query..."
                  />
                  <div className="query-examples">
                    <span className="example-tag" onClick={() => handleConfigChange('searchQuery', '[ERROR_EXPERT]')}>
                      [ERROR_EXPERT]
                    </span>
                    <span className="example-tag" onClick={() => handleConfigChange('searchQuery', '[SOLUTION]')}>
                      [SOLUTION]
                    </span>
                    <span className="example-tag" onClick={() => handleConfigChange('searchQuery', '[BEST_PRACTICE]')}>
                      [BEST_PRACTICE]
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Language</label>
                <select
                  value={config.language || 'English'}
                  onChange={(e) => handleConfigChange('language', e.target.value)}
                  className="form-select"
                  disabled={!isEditing}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Search Parameters</label>
                <div className="form-row">
                  <div className="form-group">
                    <label className="small-label">Max Results</label>
                    <input
                      type="number"
                      value={config.maxResults || 10}
                      onChange={(e) => handleConfigChange('maxResults', parseInt(e.target.value))}
                      className="form-input number-input"
                      disabled={!isEditing}
                      min={1}
                      max={100}
                    />
                  </div>
                  <div className="form-group">
                    <label className="small-label">Relevance Threshold</label>
                    <input
                      type="range"
                      value={config.relevanceThreshold || 0.5}
                      onChange={(e) => handleConfigChange('relevanceThreshold', parseFloat(e.target.value))}
                      className="form-range"
                      disabled={!isEditing}
                      min="0"
                      max="1"
                      step="0.1"
                    />
                    <div className="range-value">{config.relevanceThreshold || 0.5}</div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="section-header clickable"
              onClick={() => toggleSection('outputFields')}
            >
              <h3>Output Fields</h3>
              <span className="toggle-icon">
                {isExpanded.outputFields ? '▼' : '▶'}
              </span>
            </div>
            
            {isExpanded.outputFields && (
              <div className="section-content">
                <p className="field-description">
                  Classical: Successfully select outputs between them from knowledge base.
                </p>
                <div className="array-items">
                  {config.outputFields?.map((field, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={field}
                        onChange={(e) => handleArrayItemUpdate('outputFields', index, e.target.value)}
                        className="form-input"
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <button 
                          className="btn-array-remove"
                          onClick={() => handleArrayItemRemove('outputFields', index)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="btn-array-add-full"
                      onClick={() => handleArrayItemAdd('outputFields', 'New Output Field')}
                    >
                      + Add Output Field
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Outputs Section (Common for all nodes) */}
        <div className="config-section">
          <div 
            className="section-header clickable"
            onClick={() => toggleSection('outputs')}
          >
            <h3>Outputs</h3>
            <span className="toggle-icon">
              {isExpanded.outputs ? '▼' : '▶'}
            </span>
          </div>
          
          {isExpanded.outputs && (
            <div className="section-content">
              <div className="output-description">
                {localNode.type === 'input' ? (
                  <p>Type 'C' is downstream nodes to remove input fields.</p>
                ) : localNode.type === 'knowledgeBaseReader' ? (
                  <p>Type 'C' is downstream nodes to leverage input fields.</p>
                ) : (
                  <p>Configure how this node outputs data to connected nodes.</p>
                )}
              </div>
              
              <div className="output-list">
                {config.outputs?.map((output, index) => (
                  <div key={index} className="output-item">
                    <div className="output-header">
                      <div className="output-type">Type C</div>
                      {isEditing && (
                        <button 
                          className="btn-output-remove"
                          onClick={() => handleArrayItemRemove('outputs', index)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div className="output-description">
                      {output.replace('Type C: ', '')}
                    </div>
                    {isEditing && (
                      <input
                        type="text"
                        value={output}
                        onChange={(e) => handleArrayItemUpdate('outputs', index, e.target.value)}
                        className="output-input"
                        placeholder="Type C: Description"
                      />
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button 
                    className="btn-add-output"
                    onClick={() => handleArrayItemAdd('outputs', 'Type C: New output description')}
                  >
                    + Add Output
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Advanced Settings */}
        <div className="config-section">
          <div 
            className="section-header clickable"
            onClick={() => toggleSection('advanced')}
          >
            <h3>Advanced Settings</h3>
            <span className="toggle-icon">
              {isExpanded.advanced ? '▼' : '▶'}
            </span>
          </div>
          
          {isExpanded.advanced && (
            <div className="section-content">
              <div className="form-group">
                <label>Execution Priority</label>
                <select
                  value={config.executionPriority || 'normal'}
                  onChange={(e) => handleConfigChange('executionPriority', e.target.value)}
                  className="form-select"
                  disabled={!isEditing}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Timeout (seconds)</label>
                <input
                  type="number"
                  value={config.timeout || 30}
                  onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
                  className="form-input number-input"
                  disabled={!isEditing}
                  min={1}
                  max={300}
                />
              </div>

              <div className="form-group">
                <label>Error Handling</label>
                <select
                  value={config.errorHandling || 'continue'}
                  onChange={(e) => handleConfigChange('errorHandling', e.target.value)}
                  className="form-select"
                  disabled={!isEditing}
                >
                  <option value="continue">Continue on Error</option>
                  <option value="stop">Stop Pipeline</option>
                  <option value="retry">Retry 3 Times</option>
                </select>
              </div>

              <div className="form-group">
                <label>Caching Enabled</label>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    checked={config.cachingEnabled || false}
                    onChange={(e) => handleConfigChange('cachingEnabled', e.target.checked)}
                    className="form-checkbox"
                    disabled={!isEditing}
                    id="cachingEnabled"
                  />
                  <label htmlFor="cachingEnabled" className="checkbox-label">
                    Enable result caching
                  </label>
                </div>
              </div>

              {config.cachingEnabled && (
                <div className="form-group">
                  <label>Cache TTL (minutes)</label>
                  <input
                    type="number"
                    value={config.cacheTTL || 60}
                    onChange={(e) => handleConfigChange('cacheTTL', parseInt(e.target.value))}
                    className="form-input number-input"
                    disabled={!isEditing}
                    min={1}
                    max={1440}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className="config-section">
          <div 
            className="section-header clickable"
            onClick={() => toggleSection('metadata')}
          >
            <h3>Metadata</h3>
            <span className="toggle-icon">
              {isExpanded.metadata ? '▼' : '▶'}
            </span>
          </div>
          
          {isExpanded.metadata && (
            <div className="section-content">
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-label">Created:</span>
                  <span className="metadata-value">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Modified:</span>
                  <span className="metadata-value">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Version:</span>
                  <span className="metadata-value">1.0.0</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Author:</span>
                  <span className="metadata-value">System</span>
                </div>
              </div>
              
              {isEditing && (
                <div className="form-group">
                  <label>Custom Metadata (JSON)</label>
                  <textarea
                    value={config.customMetadata ? JSON.stringify(config.customMetadata, null, 2) : '{}'}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        handleConfigChange('customMetadata', parsed);
                      } catch (error) {
                        // Keep invalid JSON for editing
                      }
                    }}
                    className="form-textarea code-textarea"
                    rows={4}
                    placeholder='{"key": "value"}'
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preview Section */}
        {!isEditing && (
          <div className="config-section">
            <div className="section-header">
              <h3>Preview</h3>
            </div>
            <div className="section-content">
              <div className="node-preview">
                <div 
                  className="preview-header"
                  style={{ backgroundColor: localNode.color }}
                >
                  <span className="preview-icon">{localNode.icon}</span>
                  <span className="preview-title">{localNode.name}</span>
                </div>
                <div className="preview-content">
                  <div className="preview-config">
                    {Object.entries(config).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="preview-item">
                        <span className="preview-key">{key}:</span>
                        <span className="preview-value">
                          {typeof value === 'string' ? value.substring(0, 30) : JSON.stringify(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inspector Footer */}
      <div className="inspector-footer">
        <div className="node-status">
          <div className="status-indicator active"></div>
          <span className="status-text">Active</span>
        </div>
        <div className="footer-actions">
          {isEditing && (
            <>
              <button 
                className="btn-secondary btn-small"
                onClick={() => console.log('Reset node')}
              >
                Reset
              </button>
              <button 
                className="btn-primary btn-small"
                onClick={() => console.log('Save changes')}
              >
                Apply Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeInspector;