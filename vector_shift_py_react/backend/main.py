from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import networkx as nx
import os

# -------------------------
# App Initialization
# -------------------------
app = FastAPI(
    title="VectorShift Backend API",
    description="Backend for VectorShift-style pipeline validation",
    version="1.0.0",
)

# -------------------------
# CORS Configuration
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "*",  # restrict later in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Data Models
# -------------------------
class Position(BaseModel):
    x: float
    y: float

class NodeData(BaseModel):
    label: str
    type: str
    text: Optional[str] = ""

class Node(BaseModel):
    id: str
    type: str
    position: Position
    data: NodeData

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Node] = Field(default_factory=list)
    edges: List[Edge] = Field(default_factory=list)

class NodeHealth(BaseModel):
    node_id: str
    healthy: bool
    reason: str

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    node_health: List[NodeHealth]

# -------------------------
# Helper Functions
# -------------------------
def check_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = nx.DiGraph()
    node_ids = {node.id for node in nodes}

    for node_id in node_ids:
        graph.add_node(node_id)

    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            graph.add_edge(edge.source, edge.target)

    return nx.is_directed_acyclic_graph(graph)

def evaluate_node_health(
    node: Node,
    edges: List[Edge],
    is_dag: bool,
) -> NodeHealth:
    incoming = [e for e in edges if e.target == node.id]
    outgoing = [e for e in edges if e.source == node.id]

    if not is_dag:
        return NodeHealth(
            node_id=node.id,
            healthy=False,
            reason="Pipeline contains a cycle"
        )

    # Input nodes should only have outgoing edges
    if node.type == "input" and not outgoing:
        return NodeHealth(
            node_id=node.id,
            healthy=False,
            reason="Input node must connect to another node"
        )

    # Output nodes should only have incoming edges
    if node.type == "output" and not incoming:
        return NodeHealth(
            node_id=node.id,
            healthy=False,
            reason="Output node must receive input"
        )

    # Processing nodes (LLM, text, etc.)
    if node.type not in ["input", "output"]:
        if not incoming:
            return NodeHealth(
                node_id=node.id,
                healthy=False,
                reason="Node has no input"
            )
        if not outgoing:
            return NodeHealth(
                node_id=node.id,
                healthy=False,
                reason="Node has no output"
            )

    return NodeHealth(
        node_id=node.id,
        healthy=True,
        reason="Node is healthy"
    )

# -------------------------
# API Routes
# -------------------------
@app.get("/")
def root():
    return {
        "message": "VectorShift Backend API",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    if not pipeline.nodes:
        raise HTTPException(status_code=400, detail="No nodes provided")

    is_dag_result = check_dag(pipeline.nodes, pipeline.edges)

    node_health = [
        evaluate_node_health(node, pipeline.edges, is_dag_result)
        for node in pipeline.nodes
    ]

    return PipelineResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_dag_result,
        node_health=node_health
    )

# -------------------------
# Render / Local Entry
# -------------------------
if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
