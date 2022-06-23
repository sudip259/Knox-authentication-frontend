import axios from "axios";
const Base_Url = "http://127.0.0.1:8000/api";

const login = async (loginData: any) => {
  return await axios.post(`${Base_Url}/login/`, loginData);
};
const register = async (registerData: any) => {
  return await axios.post(`${Base_Url}/register/`, registerData);
};

const service = {
  login,
  register,
};

export default service;
