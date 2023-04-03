import axios from "axios";
import { api_url } from "../config/constants";
import getAuthToken from "./getAuthToken";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: api_url,
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.common["Authorization"] = getAuthToken();

api.interceptors.request.use((req) => {
  const token = getAuthToken();
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    switch (err.response.status) {
      case 400:
        toast.error(err.response.data.error || "Bad request.");
        break;
      case 401:
        toast.error(err.response.data.error || "Unauthorized, please sign in.");
        break;
      case 422:
        toast.error("Invalid submission.");
        break;
      case 500:
        toast.error("An error on the server occurred, try again later.");
        break;
    }

    return Promise.reject(err.response);
  }
);

export default api;
