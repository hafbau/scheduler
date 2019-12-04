import axios from "axios";

let instance;
if (process.env.NODE_ENV !== "test") {
  instance = axios.create({
    baseURL: {
      production: "https://alex-scheduler.herokuapp.com/api",
      development: "http://localhost:8001/api"
    }[process.env.NODE_ENV || 'development']
  });
} else {
  instance = axios;
}

export default instance;
