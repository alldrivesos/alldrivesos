import { UserItemType } from "./auth";

export interface CreateCatType {
  name: string;
  slug: string;
  icon?: string;
  id?: string;
}
interface ServiceCatItem {
  name: string;
  id: string;
  cretatedAt: string;
  slug: string;
  updatedAt: string;
  icon: string | undefined;
  isPublished: boolean;
  questionNote: string;
}

interface PublishCatType {
  published: boolean;
  id?: string;
}

interface ServiceRequestType {
  vehicleMake: string;
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: string;
  requestNote: string;
  serviceId: string;
}

interface ServiceRequestItem {
  id: string;
  ref: string | null;
  userId: string | null;
  userType: string;
  providerId: string | null;
  status: string | null;
  processStatus: string | null;
  serviceId: string;
  amount: string | null;
  vehicleMake: string;
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: string;
  requestNote: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  service: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    isPublished: boolean;
    questionNote: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ServiceQouteItem {
  createdAt: string;
  paid: string;
  longitude: string;
  latitude: string;
  distance: string;
  driver: UserItemType | null;
  id: string;
  quote: number;
  selected: string | null;
  serviceRequestId: string;
  updatedAt: string;
  userId: string | null;
  timeTaken: string;
}

export interface ServiceItemUser {
  amount: number | null;
  color: string;
  createdAt: string;
  id: string;
  location: string;
  model: string;
  processStatus: string | null;
  providerId: string | null;
  ref: string | null;
  requestNote: string;
  service: ServiceCatItem;
  serviceId: string;
  status: string;
  updatedAt: string;
  userId: string;
  userType: string;
  vehicleMake: string;
  vehicleYear: string;
  zipcode: string;
  payment: {
    amount: number;
    charge: number;
    clientSecret: string;
    companyCharge: number;
    createdAt: string;
    driverQuoteId: string;
    id: string;
    paymentRef: string;
    serviceRequestId: string;
    status: string;
    tax: number;
    updatedAt: string;
    userId: string;
  };
}

export interface ServiceRequestItem2 {
  amount: number;
  charge: number;
  city: string;
  clientSecret: string;
  color: string;
  companyCharge: number;
  companyId: string;
  createdAt: string;
  driverQuoteId: string;
  email: string;
  expiredAt: string | null;
  fcmToken: string;
  fname: string;
  hasActiveSubscription: boolean | null;
  id: string;
  invitationId: string;
  isActive: number;
  isAvailableForService: boolean | null;
  isSuspended: number;
  last_login: string;
  latitude: string;
  level: number;
  lname: string;
  location: string;
  longitude: string;
  model: string;
  name: string | null;
  password: string;
  paymentRef: string;
  pendingBal: number | null;
  phone: string;
  photo: string | null;
  planId: string | null;
  processStatus: string | null;
  providerId: string | null;
  ref: string | null;
  referralId: string | null;
  requestNote: string;
  reviewsAvg: string;
  serviceCharge: number | null;
  serviceId: string;
  serviceRequestId: string;
  serviceRequestCreatedAt: string;
  serviceRequestStatus: string;
  state: string | null;
  status: string;
  street: string | null;
  tax: number;
  token: string | null;
  updatedAt: string;
  userId: string;
  userType: string;
  vehicleMake: string;
  vehicleYear: string;
  verified: number;
  walletBal: string | null;
  zipcode: string;
  quote: number;
  queryNote: string;
  customer: UserItemType
}
