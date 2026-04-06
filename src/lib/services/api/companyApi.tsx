import axios from "axios";
import * as ENDPOINT from "../constant";
import { SendInviteInput } from "../../types/company";
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

export const sendInvite = async (payload: SendInviteInput) => {
  return axios
    .post(`${ENDPOINT.EXTEND_INVITE}`, payload)
    .then((response) => response.data);
};

export const getInvite = async () => {
  return axios
    .get(`${ENDPOINT.GET_COMP_INVITE}`)
    .then((response) => response.data);
};

export const getMe = async () => {
  return axios.get(`${ENDPOINT.GET_ME}`).then((response) => response.data);
};

export const getDrivers = async () => {
  return axios.get(`${ENDPOINT.GET_DRIVERS}`).then((response) => response.data);
};

export const getProviderStat = async () => {
  return axios
    .get(`${ENDPOINT.PROVIDER_STATS}`)
    .then((response) => response.data);
};

export const getDriversDetail = async (payload: string) => {
  return axios
    .get(`${ENDPOINT.GET_DRIVER_DETAILS}/${payload}`)
    .then((response) => response.data);
};

export const getStaffDetail = async (payload: any) => {
  return axios
    .get(`${ENDPOINT.GET_COMPANY_PROVIDERS}/${payload.proId}/${payload.stfId}`)
    .then((response) => response.data);
};

export const getDriversKyc = async (payload: string) => {
  return axios
    .get(`${ENDPOINT.GET_DRIVER_KYC}/${payload}`)
    .then((response) => response.data);
};

export const suspendDriver = async (id: string) => {
  const payload = {
    reason: "",
  };
  return axios
    .post(`${ENDPOINT.SUSPEND_DRIVER}/${id}`, payload)
    .then((response) => response.data);
};

export const unsuspendDriver = async (payload: string) => {
  return axios
    .post(`${ENDPOINT.UNSUSPEND_DRIVER}/${payload}`)
    .then((response) => response.data);
};

export const getDriverReviews = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_DRIVER_REVIEWS}/${id}`)
    .then((response) => response.data);
};

export const requestPayout = async (payload: any) => {
  return axios
    .post(`${ENDPOINT.REQUEST_PAYOUT}`, payload)
    .then((response) => response.data);
};

export const getStaffRequest = async (params: any) => {
  return axios
    .get(
      `${ENDPOINT.GET_STAFF_REQUEST}?page=${params.page}&status=${params.status}`,
    )
    .then((response) => response.data);
};

export const declineStaffRequest = async (payload: string) => {
  return axios
    .post(`${ENDPOINT.DECLINE_STAFF_REQUEST}/${payload}`)
    .then((response) => response.data);
};

export const companyInitiatePayout = async (id: string) => {
  return axios
    .post(`${ENDPOINT.COMPANY_INITIATE_PAYOUT}/${id}`)
    .then((response) => response.data);
};
