export interface SendInviteInput {
  first_name: string;
  last_name: string;
  email: string;
  company_id: string;
}

export interface GetInvitedItem {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcceptInviteInput {
    phone_number: string;
    address: string;
    password: string;
  }

export interface StaffItem {
  id: string;
  fname: string;
  lname: string;
  name: string | null,
  email: string;
  phone: string;
  password: string;
  isActive: boolean,
  isSuspended: boolean,
  photo: string | null,
  hasActiveSubscription: string | null,
  isAvailableForService: string | null,
  expiredAt: string | null,
  planId: string | null,
  token: string | null,
  state: string | null,
  city: string | null,
  street: string | null,
  userType: string;
  level: string;
  referralId: string | null,
  invitationId: string;
  companyId: string;
  createdAt: string;
  updatedAt:string;
}
