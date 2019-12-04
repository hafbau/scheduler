import axios from "axios";

let instance;
if (process.env.NODE_ENV !== "test") {
  instance = axios.create({
    baseURL: process.env.API
  });
} else {
  instance = axios;
}

export default instance;
