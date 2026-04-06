import axios from "axios";
import * as ENDPOINT from "../constant";

export const simpleClient = axios.create({
  baseURL: ENDPOINT.BASE_URL,
});
