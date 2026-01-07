""" from fastapi import FastAPI, Form

app = FastAPI()

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    return {'status': 'parsed'}
 """
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import networkx as nx

app = FastAPI()

# Configure CORS for Render deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://your-frontend-domain.vercel.app",  # Your frontend domain
        "*"  # For testing only - restrict in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
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
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG)
    """
    try:
        graph = nx.DiGraph()
        
        # Add nodes
        for node in nodes:
            graph.add_node(node.id)
        
        # Add edges
        for edge in edges:
            if edge.source in [n.id for n in nodes] and edge.target in [n.id for n in nodes]:
                graph.add_edge(edge.source, edge.target)
        
        return nx.is_directed_acyclic_graph(graph)
        
    except Exception as e:
        print(f"DAG check error: {e}")
        return False

@app.get('/')
def read_root():
    return {
        'message': 'VectorShift Backend API',
        'status': 'running',
        'endpoints': {
            'health': '/health',
            'parse_pipeline': '/pipelines/parse (POST)',
            'docs': '/docs',
            'redoc': '/redoc'
        }
    }

@app.get('/health')
def health_check():
    return {
        'status': 'healthy',
        'service': 'VectorShift Backend API',
        'version': '1.0.0'
    }

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse pipeline data, count nodes/edges, and check if it's a DAG
    """
    try:
        # Validate input
        if not pipeline.nodes:
            raise HTTPException(status_code=400, detail="No nodes provided")
        
        # Count nodes and edges
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if it's a DAG
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag_result
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# Optional: Test endpoint
@app.post('/test')
def test_endpoint():
    return {
        'test': 'success',
        'message': 'Backend is working correctly'
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)