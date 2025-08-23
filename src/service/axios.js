import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "http://localhost:5001",

});

export default instance;
