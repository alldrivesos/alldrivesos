import axios from "axios";
import * as ENDPOINT from "../constant";
import { getToken } from "../helpers";
import { SuspendUserInputType } from "../../types/auth";

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

export const getUsers = async () => {
  return axios.get(`${ENDPOINT.GET_USERS}`).then((response) => response.data);
};

export const getProviders = async () => {
  return axios
    .get(`${ENDPOINT.GET_PROVIDERS}`)
    .then((response) => response.data);
};

export const getProvidersDetails = async (payload: string) => {
  return axios
    .get(`${ENDPOINT.GET_PROVIDER_DETAILS}/${payload}`)
    .then((response) => response.data);
};

export const suspendUser = async (payload: SuspendUserInputType) => {
  return axios
    .post(`${ENDPOINT.SUSPEND_USER}`, payload)
    .then((response) => response.data);
};

export const unsuspendUser = async (payload: SuspendUserInputType) => {
  return axios
    .post(`${ENDPOINT.UNSUSPEND_USER}`, payload)
    .then((response) => response.data);
};

export const getCompanyProviders = async (payload: string) => {
  return axios
    .get(`${ENDPOINT.GET_COMPANY_PROVIDERS}/${payload}`)
    .then((response) => response.data);
};

export const getMe = async (type: string) => {
  return axios
    .get(`${ENDPOINT.GET_MY_ACCOUNT}?userType=${type}`)
    .then((response) => response.data);
};

export const deleteMe = async () => {
  return axios
    .delete(`${ENDPOINT.DELETE_MY_ACCOUNT}`)
    .then((response) => response.data);
};

export const requestRefund = async (payload: { serviceRequestId: string }) => {
  return axios
    .post(`${ENDPOINT.USER_REQUEST_REFUND}`, payload)
    .then((response) => response.data);
};
