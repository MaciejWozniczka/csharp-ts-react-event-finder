import axios from "axios";
import { toast } from "react-toastify";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { status } = error.response;
    switch (status) {
      case 400:
        toast.error("Niepoprawne zapytanie");
        break;
      case 401:
        toast.error("Brak autoryzacji");
        break;
      case 404:
        toast.error("Nie znaleziono elementu");
        break;
      case 500:
        toast.error("Błąd serwera");
        break;
    }

    return Promise.reject(error);
  },
);

export default agent;
