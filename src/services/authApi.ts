// call API login/signup
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
  return res.data;
};

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await axios.post(`${API_URL}/signup`, data);
  return res.data;
};
