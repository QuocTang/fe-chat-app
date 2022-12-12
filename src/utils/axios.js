import axios from "axios";
import { URL_API } from "../config/url";
const baseURL = URL_API;
let headers = {};
const token = localStorage.getItem("token");
if (token) {
  headers.Authorization = `Bearer ${token}`;
}
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});
export default axiosInstance;
