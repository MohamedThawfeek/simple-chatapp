import axios from "axios";

const instance = axios.create({
  baseURL: process.env.db_url,
});

export default instance;
