import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetrackersystem-production.up.railway.app/api"
});

export default api;
