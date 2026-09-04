import axios from "axios";

const agent = axios.create({
  baseURL: "https://localhost:5001/api",
});

agent.interceptors.response.use(async (response) => {
  try {
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default agent;
