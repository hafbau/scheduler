import axios from "axios";
import axiosMock from "./__mocks__/axios";
let instance;
if (process.env.NODE_ENV !== "test") {
  instance = axios.create({
    baseURL: "http://localhost:8001/api"
  });
} else {
  instance = axiosMock;
}

export default instance;
