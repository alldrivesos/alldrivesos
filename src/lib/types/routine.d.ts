import { UserItemType } from "./auth";

export interface NotifyItem {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReviewItem {
  comment: string;
  createdAt: string;
  id: string;
  rating: string;
  updatedAt: string;
  user: UserItemType;
  userId: string;
  vendor: UserItemType;
  vendorId: string;
}

export interface PaymentItem {
  amount: number | null;
  charge: number;
  city: string;
  clientSecret: string;
  color: string;
  companyCharge: number;
  createdAt: string;
  driverQuoteId: string;
  icon: string;
  id: string;
  isPublished: number;
  latitude: string;
  location: string;
  longitude: string;
  minimumQuote: number | null;
  model: string;
  name: string;
  paymentId: string;
  paymentRef: string;
  paymentStatus: string;
  paymentTotal: number;
  processStatus: string | null;
  providerId: string | null;
  questionNote: string;
  ref: string | null;
  requestNote: string;
  serviceId: string;
  serviceName: string;
  serviceRequestId: string;
  slug: string;
  status: string;
  tax: number;
  updatedAt: string;
  userId: string;
  userType: string;
  vehicleMake: string;
  vehicleYear: string;
  zipcode: string;
  fname?: string;
  lname?: string;
}

export interface NotifyItem {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactUsInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  platform: string;
}
