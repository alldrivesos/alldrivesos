export interface LoginTyping {
  email: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfile {
  phone?: string;
  name?: string;
  address?: string;
  state?: string;
  city?: string;
  street?: string;
  fcm_token?: string
}

export interface CreateUser {
  name: string;
  email: string;
  userType: string;
  password: string;
  phone: string;
  reference?: string;
  aboutUs?: string;
  platform?: string;
  serviceTypeId?: string[];
}

export interface ResendTokenType {
  email: string;
  platform: string;
}

export interface ResetPasswordType {
  token: string;
  email: string;
  password: string;
}

export interface UserItemType {
  city: string | null;
  companyId: string | null;
  createdAt: string;
  email: string;
  expiredAt: string | null;
  fname: string | null;
  hasActiveSubscription: string | null;
  id: string;
  invitationId: string | null;
  isActive: boolean;
  isAvailableForService: string | null;
  isSuspended: boolean | null;
  level: string | number | null;
  lname: string | null;
  name: string;
  password: string;
  phone: string;
  photo: string | null;
  planId: string | null;
  referralId: string;
  state: string | null;
  street: string | null;
  token: string | null;
  updatedAt: string;
  userType: string;
  reviewsAvg: number;
  serviceRequests?: any[]
}

export interface SuspendUserInputType {
  userId: string;
  reason?: string
}
