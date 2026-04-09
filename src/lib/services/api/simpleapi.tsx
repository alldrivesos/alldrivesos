import axios from "axios";
import * as ENDPOINT from "../constant";

export const simpleClient = axios.create({
  baseURL: ENDPOINT.BASE_URL,
});

export const getServiceByName = (name: string) =>
  simpleClient.get(`${ENDPOINT.GET_SERVICE_BY_NAME}/${name}`).then((r) => r.data);
