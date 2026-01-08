// components/UI.js
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import './UI.css';

// Import all node types
import { InputNode, OutputNode, LLMNode } from './NodeFactory';
import TextNode from '../nodes/textNode';
import ConditionalNode from '../nodes/CustomNode1';
import APICallNode from '../nodes/CustomNode2';
import DataTransformNode from '../nodes/CustomNode3';
import DelayNode from '../nodes/CustomNode4';
import MergeNode from '../nodes/CustomNode5';

// Define node types
const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  conditional: ConditionalNode,
  apiCall: APICallNode,
  dataTransform: DataTransformNode,
  delay: DelayNode,
  merge: MergeNode
};

const PipelineUI = () => {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'input',
      position: { x: 100, y: 100 },
      data: { label: 'Start', inputName: 'user_input', inputType: 'Text' }
    },
    {
      id: '2',
      type: 'text',
      position: { x: 400, y: 100 },
      data: { text: 'Hello {{name}}, welcome to VectorShift!' }
    },
    {
      id: '3',
      type: 'llm',
      position: { x: 700, y: 100 },
      data: { model: 'gpt-4', temperature: 0.7 }
    },
    {
      id: '4',
      type: 'output',
      position: { x: 1000, y: 100 },
      data: { label: 'Result', outputName: 'ai_response', outputType: 'Text' }
    }
  ]);
  
  const [edges, setEdges] = useState([
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'value', targetHandle: 'name' },
    { id: 'e2-3', source: '2', target: '3', sourceHandle: 'output', targetHandle: 'prompt' },
    { id: 'e3-4', source: '3', target: '4', sourceHandle: 'response', targetHandle: 'value' }
  ]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;
      
      const position = {
        x: event.clientX - 50,
        y: event.clientY - 100
      };
      
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} Node` }
      };
      
      setNodes((nds) => nds.concat(newNode));
    },
    []
  );

  return (
    <div className="pipeline-container">
      <div className="pipeline-header">
        <h2>VectorShift Pipeline Builder</h2>
        <p className="subtitle">Drag and drop nodes to create your AI workflow</p>
      </div>
      
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow-instance"
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === 'input') return '#3B82F6';
              if (n.type === 'output') return '#10B981';
              if (n.type === 'llm') return '#8B5CF6';
              if (n.type === 'text') return '#F59E0B';
              return '#6B7280';
            }}
            nodeColor="#fff"
          />
        </ReactFlow>
      </div>
      
      <div className="pipeline-stats">
        <div className="stat-item">
          <span className="stat-label">Nodes</span>
          <span className="stat-value">{nodes.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Edges</span>
          <span className="stat-value">{edges.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Connections</span>
          <span className="stat-value">{edges.length}</span>
        </div>
      </div>
    </div>
  );
};

// Export wrapped component
export default function PipelineUIWrapper() {
  return (
    <ReactFlowProvider>
      <PipelineUI />
    </ReactFlowProvider>
  );
}