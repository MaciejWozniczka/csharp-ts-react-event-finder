import axios from "axios";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.response.use(async (response) => {
  try {
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default agent;
