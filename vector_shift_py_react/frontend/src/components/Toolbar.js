// components/Toolbar.js
import React from "react";
import "../styles/Toolbar.css";
import { toast } from "react-toastify";

const Toolbar = ({
  pipelineName,
  onNameChange,
  onSave,
  onExecute,
  isEditing,
  onToggleEdit,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="brand">
          <div className="brand-icon">⚡</div>
          <h1 className="brand-title">Unified Pipeline</h1>
        </div>

        <div className="pipeline-info">
          <input
            type="text"
            value={pipelineName}
            onChange={(e) => onNameChange(e.target.value)}
            className="pipeline-name"
            placeholder="Pipeline name"
          />
          <div className="pipeline-status">
            <span className="status-dot"></span>
            <span className="status-text">Ready</span>
          </div>
        </div>
      </div>
      <div className="toolbar-center">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${isEditing ? "active" : ""}`}
            onClick={onToggleEdit}
          >
            {isEditing ? "Edit Mode" : "View Mode"}
          </button>
        </div>
      </div>
      // Add to Toolbar.js, inside the toolbar-right section:
      <div className="toolbar-right">
        <button
          className="btn btn-icon"
          onClick={() => {
            // You could add a default node or show a modal
            toast.info("Click on node types below to add");
          }}
          title="Add Node"
        >
          <span className="btn-icon">➕</span>
        </button>

        <button className="btn btn-secondary" onClick={onSave}>
          <span className="btn-icon">💾</span>
          Save
        </button>

        <button className="btn btn-primary" onClick={onExecute}>
          <span className="btn-icon">🚀</span>
          Execute
        </button>

        <button className="btn btn-icon">
          <span className="btn-icon">⚙️</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
