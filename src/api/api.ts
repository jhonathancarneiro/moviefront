// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Erro de autenticação:", error.response.data.error);
    }
    return Promise.reject(error);
  }
);

export { api };
