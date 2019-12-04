import axios from "axios";

let instance;
if (process.env.NODE_ENV !== "test") {
  console.log("NOT TEST", process.env.API_URL);
  instance = axios.create({
    baseURL: process.env.API_URL
  });
} else {
  instance = axios;
}

export default instance;
