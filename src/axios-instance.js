import axios from "axios";

let instance;
if (process.env.NODE_ENV !== "test") {
  instance = axios.create({
    baseURL: "http://localhost:8001/api"
  });
  console.log(process.env.NODE_ENV, "HERE")
} else {
  instance = axios;
}

export default instance;
