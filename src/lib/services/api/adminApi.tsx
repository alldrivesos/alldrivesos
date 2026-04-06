// set index
import axios from "axios";
import * as ENDPOINT from "../constant";
import { getToken } from "../helpers";

// const Base = ENDPOINT.BASE_URL
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

export const adminAddRates = async (payload: any) => {
  return axios
    .post(`${ENDPOINT.ADMIN_ADD_RATES}`, payload)
    .then((response) => response.data);
};

export const adminGetRates = async () => {
  return axios
    .get(`${ENDPOINT.ADMIN_GET_RATES}`)
    .then((response) => response.data);
};

export const getAdminStat = async () => {
  return axios.get(`${ENDPOINT.ADMIN_STATS}`).then((response) => response.data);
};

export const adminGetPayoutCap = async () => {
  return axios
    .get(`${ENDPOINT.ADMIN_GET_PAYOUT_CAP}`)
    .then((response) => response.data);
};

export const adminSetPayoutCap = async (payload: { amount: number }) => {
  return axios
    .post(`${ENDPOINT.ADMIN_SET_PAYOUT_CAP}`, payload)
    .then((response) => response.data);
};

export const admingetPayoutRequest = async (params: any) => {
  return axios
    .get(
      `${ENDPOINT.ADMIN_GET_PAYOUT_REQUESTS}?page=${params.page}&status=${params.status}`,
    )
    .then((response) => response.data);
};

export const adminDeclinePayoutRequests = async (id: string) => {
  return axios
    .post(`${ENDPOINT.ADMIN_DECLINE_PAYOUT_REQUESTS}/${id}`)
    .then((response) => response.data);
};

export const getAdminPayments = async (params: any) => {
  return axios
    .get(
      `${ENDPOINT.ADMIN_GET_PAYMENTS}?page=${params.page}&status=${params.status}`,
    )
    .then((response) => response.data);
};

export const adminGetUserDetails = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_PROVIDER_DETAILS}/${id}`)
    .then((response) => response.data);
};

export const adminApprovePayout = async (id: string) => {
  return axios
    .post(`${ENDPOINT.ADMIN_APPROVE_PAYOUT}/${id}`)
    .then((response) => response.data);
};

export const adminIniatePayout = async (id: string) => {
  return axios
    .post(`${ENDPOINT.ADMIN_INITIATE_PAYOUT}/${id}`)
    .then((response) => response.data);
};

export const getAdminTransactions = async (params: any) => {
  return axios
    .get(`${ENDPOINT.FETCH_PAYOUT_TRANSACTIONS}?page=${params.page}`)
    .then((response) => response.data);
};

export const getAdminRefunds = async (params: any) => {
  return axios
    .get(`${ENDPOINT.GET_REFUND_REQUESTS}?page=${params.page}`)
    .then((response) => response.data);
};

export const approveRefund = async (id: string) => {
  return axios
    .post(`${ENDPOINT.APPROVE_REFUND}/${id}`)
    .then((response) => response.data);
};

export const disapproveRefund = async (
  id: string,
  payload: { reason: string },
) => {
  return axios
    .post(`${ENDPOINT.DISAPPROVE_REFUND}/${id}`, payload)
    .then((response) => response.data);
};

export const initiateRefund = async (payload: {
  refundReqId: string;
  amountToClient: number;
}) => {
  return axios
    .post(`${ENDPOINT.INITIATE_REFUND}`, payload)
    .then((response) => response.data);
};
