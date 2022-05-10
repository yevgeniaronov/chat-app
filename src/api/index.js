import axios from "axios";

const axiosParams = {
  baseURL: "http://localhost:3001",
};

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

const api = (axios) => {
  return {
    get: (url, config = {}) => axios.get(url, config),
    post: (url, body, config = {}) => axios.post(url, body, config),
    patch: (url, body, config = {}) => axios.patch(url, body, config),
    delete: (url, config = {}) => axios.delete(url, config),
  };
};

export default api(axiosInstance);
