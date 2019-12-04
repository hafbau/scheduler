import axios from "axios";

let instance;
if (process.env.NODE_ENV !== "test") {
  console.log("NOT TEST", process.env.API);
  instance = axios.create({
    baseURL: process.env.API
  });
} else {
  instance = axios;
}

export default instance;
