import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-app-c41f4/us-central1/api", // the api (cloud function ) URL
});
export default instance;
