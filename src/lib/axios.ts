import { useGlobalLoader } from "@/store/useGlobalLoader";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('UPTASK_AUTH_TOKEN')
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (config.method !== 'get') {
    useGlobalLoader.getState().setLoading(true);
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    useGlobalLoader.getState().setLoading(false);
    return response;
  },
  (error) => {
    useGlobalLoader.getState().setLoading(false);
    return Promise.reject(error);
  }
);

export default api