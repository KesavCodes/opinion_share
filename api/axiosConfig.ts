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

export default api;