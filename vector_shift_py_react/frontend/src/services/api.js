import axios from "axios";

const API_BASE_URL = "https://remote-assignments-vector-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export const parsePipeline = async (nodes, edges) => {
  const response = await api.post("/pipelines/parse", { nodes, edges });
  return response.data;
};
