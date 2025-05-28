import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const userData = await AsyncStorage.getItem("osUser");
    const token = userData ? JSON.parse(userData).userToken : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const errorMessage = error?.response?.data?.message || error.message || "";
    if (errorMessage.toLowerCase().includes("token")) {
      await AsyncStorage.removeItem("osUser");
    }
    return Promise.reject(error);
  }
);

export default api;
