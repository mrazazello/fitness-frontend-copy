import { envConfig } from "@shared/config/env";
import axios from "axios";

export const uninterceptedAxios = axios.create({
  baseURL: envConfig.BACKEND_API_URL,
  headers: { "Content-type": "application/json" }
});
