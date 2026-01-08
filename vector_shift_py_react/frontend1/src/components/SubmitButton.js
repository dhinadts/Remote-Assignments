// components/SubmitButton.js
import React, { useState } from 'react';
// import './SubmitButton.css'; // Comment out or create

const BACKEND_URL = 'https://assignment-tasks-vector-backend.onrender.com';

const SubmitButton = ({ nodes = [] }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: { x: node.x, y: node.y },
            data: node.data || {}
          })),
          edges: []
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      
      alert(`Pipeline Analysis:\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? '✅ Yes' : '❌ No'}`);
      
    } catch (error) {
      console.error('Error:', error);
      alert(`Error submitting pipeline: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button 
        onClick={handleSubmit}
        disabled={loading || nodes.length === 0}
        style={{
          padding: '12px 24px',
          background: loading ? '#9ca3af' : '#3B82F6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
        }}
      >
        {loading ? 'Processing...' : 'Submit Pipeline'}
      </button>
      
      {result && (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          minWidth: '200px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#374151' }}>Last Result:</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280' }}>Nodes:</span>
            <strong style={{ color: '#1f2937' }}>{result.num_nodes}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280' }}>Edges:</span>
            <strong style={{ color: '#1f2937' }}>{result.num_edges}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Is DAG:</span>
            <strong style={{ color: result.is_dag ? '#10B981' : '#EF4444' }}>
              {result.is_dag ? '✅ Yes' : '❌ No'}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

// ADD THIS LINE:
export default SubmitButton;  // <-- Default export