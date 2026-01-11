import { Handle, Position } from "reactflow";
import { useState } from "react";
import "../styles/BaseNode.css";

export const BaseNode = ({
  id,
  data,
  title,
  type,
  icon = null,
  inputs = [],
  outputs = [],
  children,
  width = 200,
  height = "auto",
  minHeight = 80,
  className = "",
  onDataChange = null,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputPosition = (index, total) => {
    if (total <= 1) return "50%";
    return `${((index + 1) * 100) / (total + 1)}%`;
  };

  const getOutputPosition = (index, total) => {
    if (total <= 1) return "50%";
    return `${((index + 1) * 100) / (total + 1)}%`;
  };

  const handleStyle = {
    width: 10,
    height: 10,
    background: "#3b82f6",
    border: "2px solid white",
    borderRadius: "50%",
  };

  return (
    <div
      className={`node-base ${type}-node ${className} ${
        isFocused ? "node-focused" : ""
      }`}
      style={{
        width: width,
        height: height,
        minHeight: minHeight,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`${id}-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: getInputPosition(index, inputs.length),
            ...handleStyle,
            background: input.color || "#3b82f6",
          }}
          title={input.label || input.id}
        />
      ))}

      {/* Node Header */}
      <div className="node-header">
        <div className="node-icon-title">
          {icon && <span className="node-icon">{icon}</span>}
          <h3 className="node-title">{title}</h3>
          <span className="node-type-badge">{type}</span>
        </div>
        <div className="node-id">#{id.split("-")[1] || id}</div>
      </div>

      {/* Node Content */}
      <div className="node-content">{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`${id}-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: getOutputPosition(index, outputs.length),
            ...handleStyle,
            background: output.color || "#10b981",
          }}
          title={output.label || output.id}
        />
      ))}
    </div>
  );
};

export const NodeSection = ({ title, children, className = "" }) => (
  <div className={`node-section ${className}`}>
    {title && <div className="node-section-title">{title}</div>}
    <div className="node-section-content">{children}</div>
  </div>
);

export const NodeField = ({ label, children, required = false }) => (
  <div className="node-field">
    <label className="node-field-label">
      {label}
      {required && <span className="required-asterisk">*</span>}
    </label>
    <div className="node-field-input">{children}</div>
  </div>
);
