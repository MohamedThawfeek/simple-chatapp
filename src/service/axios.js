import axios from "axios";

const instance = axios.create({
  baseURL: "https://simple-chatapp-server.vercel.app",
});

export default instance;
