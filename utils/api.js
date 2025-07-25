import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://admin.xpertbid.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
