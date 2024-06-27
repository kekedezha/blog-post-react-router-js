import axios from "axios";

// set baseURL for axios that the instance will use throughout the project
export default axios.create({
  // URL created by json server
  baseURL: "http://localhost:3500",
});
