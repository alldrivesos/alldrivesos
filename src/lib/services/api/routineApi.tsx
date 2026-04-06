import axios from "axios";
import * as ENDPOINT from "../constant";
import { ContactUsInput } from "../../types/routine";

// const Base = ENDPOINT.BASE_URL
const Upload = ENDPOINT.BASE_UPLOAD;

export const uploadFile = async (payload: FormData) => {
  return axios
    .post(`${Upload}${ENDPOINT.UPLOAD_FILE}`, payload)
    .then((response) => response.data);
};

export const subscribeNews = async (payload: { email: string }) => {
  return axios
    .post(`${ENDPOINT.SUBSCRIBE_NEWSLETTER}`, payload)
    .then((response) => response.data);
};

export const contactUs = async (payload: ContactUsInput) => {
  return axios
    .post(`${ENDPOINT.CONTACT_US}`, payload)
    .then((response) => response.data);
};
