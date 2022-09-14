import axios from "axios";

// console.log(process.env.REACT_APP_PUBLIC_URL);

// axios.defaults.baseURL = `https://powapi-node-6bpq7f4ctq-de.a.run.app`;
// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `http://44.201.123.236:8080`;

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});

export default axios;
