import React, { useState, useEffect } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import PipelineCanvas from './components/PipelineCanvas';
import NodePanel from './components/Nodepanel'; 
import NodeInspector from './components/NodeInspector';
import Toolbar from './components/Toolbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkHealth } from './services/api';

const NODE_TYPES = {
  input: {
    name: 'Input',
    icon: '📥',
    color: '#8b5cf6',
    description: 'Text and all different types into your workflow',
    category: 'General'
  },
  knowledgeBaseReader: {
    name: 'Knowledge Base Reader',
    icon: '📚',
    color: '#10b981',
    description: 'Search through knowledge bases and retrieve information',
    category: 'Knowledge Base'
  },
  // ... keep the rest of your NODE_TYPES definitions
};

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCategory, setActiveCategory] = useState('General');
  const [pipelineName, setPipelineName] = useState('Unified Pipeline 2');
  const [isEditing, setIsEditing] = useState(true); // Set to true for edit mode

  // Sample initial nodes
  const initialNodes = [
    {
      id: 'input_0',
      type: 'input',
      name: 'Input_0',
      position: { x: 50, y: 150 },
      config: {
        inputType: 'Text',
        outputFields: ['Text: The inputs text'],
        outputs: ['Type C: Downstream nodes to remove input fields']
      },
      ...NODE_TYPES.input
    },
    {
      id: 'kb_reader_1',
      type: 'knowledgeBaseReader',
      name: 'Knowledge Base Reader',
      position: { x: 350, y: 150 },
      config: {
        knowledgeBase: '',
        searchQuery: '[ERROR_EXPERT]',
        language: 'English',
        outputFields: ['Classical: Successfully select outputs between them from knowledge base'],
        outputs: ['Type C: Downstream nodes to leverage input fields']
      },
      ...NODE_TYPES.knowledgeBaseReader
    }
  ];

  // Initialize with sample nodes
  useEffect(() => {
    setNodes(initialNodes);
    
    // Health check
    const fetchHealth = async () => {
      try {
        const data = await checkHealth();
        setBackendStatus(data.status);
        toast.success("Backend is healthy!");
      } catch (err) {
        setBackendStatus("Error connecting to backend");
        toast.error("Backend health check failed!");
      }
    };
    fetchHealth();
  }, []);

  // Node Handlers
  const handleAddNode = (type, position = { x: 300, y: 300 }) => {
    const nodeType = NODE_TYPES[type];
    if (!nodeType) return;
    
    const newNode = {
      id: `${type}_${Date.now()}`,
      type,
      name: nodeType.name,
      position,
      config: getDefaultConfig(type),
      ...nodeType
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };

  const handleUpdateNode = (nodeId, updates) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
    // Update selected node if it's the one being updated
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => ({ ...prev, ...updates }));
    }
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const getDefaultConfig = (type) => {
    const defaults = {
      input: {
        inputType: 'Text',
        outputFields: ['Text: The inputs text'],
        outputs: ['Type C: Downstream nodes to remove input fields']
      },
      knowledgeBaseReader: {
        knowledgeBase: '',
        searchQuery: '',
        language: 'English',
        outputFields: ['Classical: Successfully select outputs between them from knowledge base'],
        outputs: ['Type C: Downstream nodes to leverage input fields']
      },
      llm: {
        model: 'gpt-4',
        temperature: 0.7,
        systemPrompt: '',
        userPrompt: ''
      },
      dataTransform: {
        operation: 'transform',
        parameters: {}
      }
    };
    return defaults[type] || {};
  };

  // Filter nodes by category for the NodePanel
  const filteredNodeTypes = Object.entries(NODE_TYPES)
    .filter(([_, config]) => config.category === activeCategory)
    .map(([type, config]) => ({ type, ...config }));

  return (
    <div className="app">
      <Toolbar 
        pipelineName={pipelineName}
        onNameChange={setPipelineName}
        onSave={() => toast.info("Pipeline saved!")}
        onExecute={() => toast.info("Pipeline executed!")}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />

      <div className="app-main">
        {/* Left Sidebar - Categories */}
        <Sidebar 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={[
            'General',
            'LLMs',
            'Knowledge Base',
            'Integration',
            'Data Leaders',
            'Multi-Modal',
            'Logic',
            'Data Transformation',
            'Chat'
          ]}
        />

        {/* Center - Pipeline Canvas */}
        <div className="canvas-container">
          <PipelineCanvas 
            nodes={nodes}
            connections={connections}
            onNodeSelect={handleNodeSelect}
            onNodeUpdate={handleUpdateNode}
            onNodeDelete={handleDeleteNode}
            onAddNode={handleAddNode}
            selectedNode={selectedNode}
            isEditing={isEditing}
          />
        </div>

        {/* Right Panel - Node Details/Inspector */}
        <div className="inspector-panel">
          {selectedNode ? (
            <NodeInspector 
              node={selectedNode}
              onUpdate={handleUpdateNode}
              onDelete={handleDeleteNode}
              isEditing={isEditing}
            />
          ) : (
            <div className="no-node-selected">
              <div className="placeholder-icon">👈</div>
              <h3>Select a Node</h3>
              <p>Click on any node to view and edit its properties</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom - Node Palette */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: '250px', 
        right: '350px',
        height: '200px',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 1000
      }}>
        <NodePanel 
          nodeTypes={filteredNodeTypes}
          onAddNode={handleAddNode}
          activeCategory={activeCategory}
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;


/* // https://remote-assignments-vector-backend.onrender.com

// App.js - Corrected Version
import React, { useState, useEffect } from 'react';
import './App.css';

// Component Imports - Make sure these file names exist exactly as written
import Sidebar from './components/Sidebar';
import PipelineCanvas from './components/PipelineCanvas';
import NodePanel from './components/Nodepanel';  // Fixed to NodePanel (not Nodepanel)
import NodeInspector from './components/NodeInspector';
import Toolbar from './components/Toolbar';

// Node Type Definitions
const NODE_TYPES = {
  input: {
    name: 'Input',
    icon: '📥',
    color: '#8b5cf6',
    description: 'Text and all different types into your workflow',
    category: 'General'
  },
  knowledgeBaseReader: {
    name: 'Knowledge Base Reader',
    icon: '📚',
    color: '#10b981',
    description: 'Search through knowledge bases and retrieve information',
    category: 'Knowledge Base'
  },
  llm: {
    name: 'LLM',
    icon: '🤖',
    color: '#f59e0b',
    description: 'Large Language Model processing',
    category: 'LLMs'
  },
  dataTransform: {
    name: 'Data Transformation',
    icon: '🔄',
    color: '#ec4899',
    description: 'Transform and process data',
    category: 'Data Transformation'
  },
  logic: {
    name: 'Logic',
    icon: '⚡',
    color: '#3b82f6',
    description: 'Conditional logic and branching',
    category: 'Logic'
  },
  integration: {
    name: 'Integration',
    icon: '🔗',
    color: '#06b6d4',
    description: 'External API integrations',
    category: 'Integration'
  },
  multiModal: {
    name: 'Multi-Modal',
    icon: '🎨',
    color: '#f97316',
    description: 'Process multiple media types',
    category: 'Multi-Modal'
  },
  chat: {
    name: 'Chat',
    icon: '💬',
    color: '#6366f1',
    description: 'Chat interface and processing',
    category: 'Chat'
  },
  dataLeaders: {
    name: 'Data Leaders',
    icon: '📊',
    color: '#84cc16',
    description: 'Data analytics and insights',
    category: 'Data Leaders'
  }
};

function App() {
  // State Management
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCategory, setActiveCategory] = useState('General');
  const [pipelineName, setPipelineName] = useState('Unified Pipeline 2');
  const [isEditing, setIsEditing] = useState(false);

  // Sample initial nodes
  const initialNodes = [
    {
      id: 'input_0',
      type: 'input',
      name: 'Input_0',
      position: { x: 50, y: 150 },
      config: {
        inputType: 'Text',
        outputFields: ['Text: The inputs text'],
        outputs: ['Type C: Downstream nodes to remove input fields']
      },
      ...NODE_TYPES.input
    },
    {
      id: 'kb_reader_1',
      type: 'knowledgeBaseReader',
      name: 'Knowledge Base Reader',
      position: { x: 350, y: 150 },
      config: {
        knowledgeBase: '',
        searchQuery: '[ERROR_EXPERT]',
        language: 'English',
        outputFields: ['Classical: Successfully select outputs between them from knowledge base'],
        outputs: ['Type C: Downstream nodes to leverage input fields']
      },
      ...NODE_TYPES.knowledgeBaseReader
    }
  ];

  // Initialize with sample nodes
  useEffect(() => {
    setNodes(initialNodes);
  }, []);  // Fixed: useState to useEffect

  // Node Handlers
  const handleAddNode = (type, position = { x: 300, y: 300 }) => {
    const nodeType = NODE_TYPES[type];
    if (!nodeType) return;
    
    const newNode = {
      id: `${type}_${Date.now()}`,
      type,
      name: nodeType.name,
      position,
      config: getDefaultConfig(type),
      ...nodeType
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };

  const handleUpdateNode = (nodeId, updates) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
    // Update selected node if it's the one being updated
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => ({ ...prev, ...updates }));
    }
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const getDefaultConfig = (type) => {
    const defaults = {
      input: {
        inputType: 'Text',
        outputFields: ['Text: The inputs text'],
        outputs: ['Type C: Downstream nodes to remove input fields']
      },
      knowledgeBaseReader: {
        knowledgeBase: '',
        searchQuery: '',
        language: 'English',
        outputFields: ['Classical: Successfully select outputs between them from knowledge base'],
        outputs: ['Type C: Downstream nodes to leverage input fields']
      },
      llm: {
        model: 'gpt-4',
        temperature: 0.7,
        systemPrompt: '',
        userPrompt: ''
      },
      dataTransform: {
        operation: 'transform',
        parameters: {}
      }
    };
    return defaults[type] || {};
  };

  // Filter nodes by category for the NodePanel
  const filteredNodeTypes = Object.entries(NODE_TYPES)
    .filter(([_, config]) => config.category === activeCategory)
    .map(([type, config]) => ({ type, ...config }));

  return (
    <div className="app">
      
      <Toolbar 
        pipelineName={pipelineName}
        onNameChange={setPipelineName}
        onSave={() => console.log('Save pipeline')}
        onExecute={() => console.log('Execute pipeline')}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />

      <div className="app-main">
        // {/* Left Sidebar - Categories 
        <Sidebar 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={[
            'General',
            'LLMs',
            'Knowledge Base',
            'Integration',
            'Data Leaders',
            'Multi-Modal',
            'Logic',
            'Data Transformation',
            'Chat'
          ]}
        />

        {/* Center - Pipeline Canvas 
        <div className="canvas-container">
          <PipelineCanvas 
            nodes={nodes}
            connections={connections}
            onNodeSelect={handleNodeSelect}
            onNodeUpdate={handleUpdateNode}
            onNodeDelete={handleDeleteNode}
            onAddNode={handleAddNode}
            selectedNode={selectedNode}
            isEditing={isEditing}
          />
        </div>

        {/* Right Panel - Node Details/Inspector 
        <div className="inspector-panel">
          {selectedNode ? (
            <NodeInspector 
              node={selectedNode}
              onUpdate={handleUpdateNode}
              onDelete={handleDeleteNode}
              isEditing={isEditing}
            />
          ) : (
            <div className="no-node-selected">
              <div className="placeholder-icon">👈</div>
              <h3>Select a Node</h3>
              <p>Click on any node to view and edit its properties</p>
            </div>
          )}
        </div>

        {/* Bottom - Node Palette 
        <NodePanel 
          nodeTypes={filteredNodeTypes}  // Changed from 'nodes' to 'nodeTypes'
          onAddNode={handleAddNode}
          activeCategory={activeCategory}
        />
      </div>
    </div>
  );
}

export default App; */