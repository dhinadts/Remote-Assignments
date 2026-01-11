import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css"; 
import { parsePipeline } from "../services/api";
import { toast } from "react-toastify";

const initialNodes = [];
const initialEdges = [];

export default function NodeEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Updated change handlers for reactflow v10+
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSubmit = async () => {
    try {
      const pipeline = await parsePipeline(nodes, edges);
      toast.success("Pipeline parsed successfully!");
      console.log(pipeline);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error parsing pipeline");
    }
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Parse Pipeline
      </button>
    </div>
  );
}