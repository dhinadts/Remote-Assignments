# Vector Shcif

Vector **Shcif** is a visual, node-based pipeline editor inspired by tools like VectorShift. It is built using **React** and **React Flow**, allowing users to drag, drop, connect, and validate nodes to design execution pipelines visually.

---

## ✨ Features

- 🧩 Drag & drop nodes from a node panel into the canvas
- 🖱️ Precise cursor-based node placement
- 🔗 Connect nodes with animated edges
- 🗺️ MiniMap, zoom, pan, and controls
- 🧠 Pipeline parsing & validation support
- 🎨 Custom node categories and styling
- ⚙️ Extensible architecture for custom nodes and rules

---

## 🛠️ Tech Stack

- **React**
- **React Flow** (node editor & canvas)
- **JavaScript / JSX**
- **CSS** (custom styling)
- **React Toastify** (notifications)

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run the App

```bash
npm start
```

The app will be available at:
```
http://localhost:3000
```

---

## 🧲 Drag & Drop Implementation

Vector Shcif uses React Flow's **external drag-and-drop** mechanism.

### Key Concepts

- Nodes are dragged from `NodePanel`
- Node type is stored in `dataTransfer`
- On drop, cursor position is converted using:

```js
reactFlowInstance.screenToFlowPosition({ x, y })
```

This ensures **accurate node placement** regardless of zoom or pan.

---

## 🔄 Pipeline Parsing

Once nodes and edges are created, the pipeline can be parsed and validated:

```js
parsePipeline(nodes, edges)
```

This allows backend systems to:
- Validate DAG structure
- Detect cycles
- Enforce base/start nodes
- Generate execution plans

---

## 🎯 Best Practices Followed

- No CSS `transform` on React Flow parent containers
- React Flow wrapped with `ReactFlowProvider`
- Stable coordinate conversion using modern APIs
- UI controls kept outside the canvas

---

## 🧪 Common Issues & Fixes

### ❌ Node jumps to corner while dragging
**Fix:** Use `screenToFlowPosition()` instead of deprecated `project()` API.

### ❌ Drop position offset
**Fix:** Do not subtract container bounds when using `screenToFlowPosition()`.

---

## 🛣️ Roadmap

- ✅ Base node enforcement
- 🔜 DAG cycle prevention
- 🔜 Node health & validation status
- 🔜 Custom node renderers
- 🔜 Backend execution engine integration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---
# Deployed in Vercel


## 👨‍💻 Author

**Vector Shcif** is developed as an experimental visual pipeline editor using React Flow, inspired by modern AI workflow builders.

---

> 💡 _Design pipelines visually. Validate intelligently. Execute confidently._

