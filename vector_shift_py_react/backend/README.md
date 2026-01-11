# Vector Shcif – Backend (FastAPI)

This repository contains the **FastAPI backend** for **Vector Shcif**, a VectorShift-style visual pipeline editor. The backend is responsible for **pipeline validation, DAG checking, and node health evaluation**.

---

## 🚀 Overview

The backend accepts pipelines created in the React Flow frontend and performs:

- Directed Acyclic Graph (DAG) validation
- Node-level health checks
- Structural validation for input, processing, and output nodes

It is designed to be **stateless, fast, and easily deployable** on platforms like **Render**.

---

## 🛠️ Tech Stack

- **Python 3.10+**
- **FastAPI** – REST API framework
- **Pydantic** – Data validation
- **NetworkX** – Graph & DAG validation
- **Uvicorn** – ASGI server

---

## 📁 Project Structure

```
backend/
├── main.py          # FastAPI application
├── requirements.txt
└── README.md
```

---

## 📦 API Endpoints

### 🔹 Root

```
GET /
```

Response:
```json
{
  "message": "VectorShift Backend API",
  "status": "running"
}
```

---

### 🔹 Health Check

```
GET /health
```

Response:
```json
{
  "status": "healthy"
}
```

---

### 🔹 Parse & Validate Pipeline

```
POST /pipelines/parse
```

#### Request Body

```json
{
  "nodes": [],
  "edges": []
}
```

#### Response

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true,
  "node_health": [
    {
      "node_id": "node_1",
      "healthy": true,
      "reason": "Node is healthy"
    }
  ]
}
```

---

## 🧠 Validation Logic

### DAG Validation

- Uses `networkx.DiGraph`
- Rejects cyclic pipelines

### Node Health Rules

| Node Type | Rules |
|---------|------|
| Input | Must have outgoing edge |
| Output | Must have incoming edge |
| Processing | Must have both input & output |

---

## ⚙️ Environment Variables

| Variable | Description | Default |
|-------|------------|---------|
| PORT | Server port | `8000` |

---

## 🧪 Local Development

### 1️⃣ Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the Server

```bash
uvicorn main:app --reload
```

API will be available at:
```
http://localhost:8000
```

Swagger Docs:
```
http://localhost:8000/docs
```

---

## ☁️ Deployment on Render

### ✅ Step-by-Step Deployment

#### 1️⃣ Push Code to GitHub

Ensure your repository contains:
- `main.py`
- `requirements.txt`

Example `requirements.txt`:
```
fastapi
uvicorn
networkx
pydantic
```

---

#### 2️⃣ Create New Web Service on Render

- Go to **https://render.com**
- Click **New → Web Service**
- Connect your GitHub repository

---

#### 3️⃣ Render Configuration

| Setting | Value |
|------|------|
| Environment | Python |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

---

#### 4️⃣ Environment Variables (Optional)

Add in Render dashboard:

```
PORT=8000
```

(Render automatically injects `$PORT`)

---

#### 5️⃣ Deploy 🎉

- Click **Deploy**
- Wait for build to finish
- Access your live API at:

```
https://remote-assignments-vector-backend.onrender.com
```

---

## 🔒 CORS Configuration

CORS is enabled for:

```python
allow_origins=[
  "http://localhost:3000",
  "http://localhost:5173",
  "*"  # restrict in production
]
```

⚠️ **Important:** Restrict origins in production for security.

---

## 🛣️ Future Enhancements

- Base/start node enforcement
- Node type–specific validation
- Execution order generation (topological sort)
- Pipeline versioning
- Authentication & API keys

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Vector Shcif Backend** – Designed to support a modern, visual pipeline builder inspired by VectorShift.

> _Validate pipelines. Detect issues early. Scale with confidence._

