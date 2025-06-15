// call API login/signup
import axios from "axios";

const API_URL = "http://localhost:3000/auth"; // sửa theo URL backend

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
  return res.data;
};

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await axios.post(`${API_URL}/signup`, data);
  return res.data;
};
