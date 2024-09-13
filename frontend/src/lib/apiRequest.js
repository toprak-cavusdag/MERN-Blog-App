import axios from "axios";
import { BASE_API_URL, BASE_URL } from "../constant/db";

const apiBaseUrl = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

const baseURL = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const apiClients = { apiBaseUrl, baseURL };

export default apiClients;
