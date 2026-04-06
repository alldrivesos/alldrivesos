import axios from "axios";
import * as ENDPOINT from "../constant";
import { kycProps } from "../../store/kycStore";
import { getToken } from "../helpers";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
axios.defaults.headers.common["Authorization"] = getToken();
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      return (window.location.href = "/auth/login");
    }
    return Promise.reject(error);
  },
);

export const getCompanyKyc = async (payload: string) => {
  return axios
    .get(`${ENDPOINT.GET_COMPANY_KYC}/${payload}`)
    .then((response) => response.data);
};

export const getDriverKyc = async (payload: string) => {
  return axios
    .get(`${ENDPOINT.GET_DRIVER_KYC}/${payload}`)
    .then((response) => response.data);
};

export const submitKyc = async (payload: kycProps) => {
  return axios
    .post(`${ENDPOINT.SUBMIT_KYC}`, payload)
    .then((response) => response.data);
};

export const getKyc = async () => {
  return axios.get(`${ENDPOINT.GET_KYC}`).then((response) => response.data);
};

export const approveCompanyKyc = async (data: any, payload: any) => {
  return axios
    .patch(`${ENDPOINT.APPROVE_COMPANY_KYC}/${data.id}/${data.userId}`, payload)
    .then((response) => response.data);
};

export const approveDriverKyc = async (id: string, payload: any) => {
  return axios
    .patch(`${ENDPOINT.APPROVE_DRIVER_KYC}/${id}`, payload)
    .then((response) => response.data);
};
