import axios from "axios";

const Authapi = axios.create({
  baseURL: "http://localhost:5114/api",
  headers: {
    "Content-Type": "application/json",
  },
});
Authapi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
Authapi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      const res = await axios.get("http://localhost:5114/api/auth/refresh", {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      return Authapi(orginalRequest);
    }
    return Promise.reject(error);
  }
);
export default Authapi;