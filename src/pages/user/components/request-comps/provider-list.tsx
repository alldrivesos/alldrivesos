import { useQuery } from "@tanstack/react-query";
import { useServiceSec } from "./service-sec";
import { apiClient } from "../../../../lib/services/api/serviceApi";
import { useEffect, useState } from "react";
import { Portal } from "../../../../lib/components/portal/portal";
import ViewOnMap from "../../../../lib/components/landing/services/new-request/forms/ViewOnMap";
import { SectionProps } from "./profile-sec";
import AllQuotes from "./all-quotes";
interface ServiceRendered {
  id: string;
  fee: number;
}

interface Profile {
  id: string;
  fname: string;
  lname: string;
  name: string | null;
  email: string;
  address: string;
  phone: string;
  sms_opt_in: boolean;
  password?: string;
  isActive: boolean;
  isSuspended: boolean;
  photo: string | null;
  hasActiveSubscription: boolean | null;
  isAvailableForService: boolean | null;
  verified: boolean;
  expiredAt: string | null;
  planId: string | null;
  token: string | null;
  state: string | null;
  city: string;
  zipcode: string;
  street: string | null;
  userType: string;
  level: number;
  referralId: string | null;
  invitationId: string | null;
  companyId: string | null;
  reviewsAvg: number;
  serviceCharge: string | null;
  last_login: string;
  fcmToken: string;
  walletBal: string;
  pendingBal: string;
  referralSource: string | null;
  driverOverallPendingBal: string;
  driverOverallWalletBal: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Vendor {
  id: string;
  user_id: string;
  brands: string[];
  service_rendered: ServiceRendered[];
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  service_area: string;
  fees: any | null;
  isVerified: boolean;
  reason: string;
  car_description: string;
  plate_number: string;
  longitude: string;
  latitude: string;
  zipcode: string;
  city: string;
  stripeAccountId: string;
  identityFront: string;
  identityBack: string;
  identityFrontId: string;
  identityBackId: string;
  cityOfResidence: string;
  state: string;
  dob: string;
  ssn_last_4: string;
  device_ip: string;
  phone_number: string;
  location_status: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  location_last_updated: string;
  createdAt: string;
  updatedAt: string;
  distance_in_km: number;
  profile: Profile;
}

interface VendorResponse {
  success: boolean;
  message: string;
  data: {
    vendors: Vendor[];
    total: number;
  };
}
export default function ProviderLists(props: SectionProps) {
  const [service] = useServiceSec();
  const [radius, setRadius] = useState(40);
  const [prevRadius, setPrevRadius] = useState(1);
  const { data, refetch, isFetching } = useQuery<VendorResponse>({
    queryKey: ["vendors", location],
    queryFn: async () => {
      let new_id = service.data.serviceRequest.id;
      const center = {
        lat: service.data.serviceRequest.latitude,
        lng: service.data.serviceRequest.longitude,
      };
      const response = await apiClient.post(
        `/service-request/service-information/${new_id}/notify?latitude=${center?.lat}&longitude=${center?.lng}&prev_radius=1&radius=${40 * 1.6}`,
      );
      return response.data;
    },
  });
  const setNewRadius = (num: any) => {
    setPrevRadius(radius);
    setRadius(num);
    refetch();
  };

  const next = () => {};

  return (
    <div className="flex  min-h-screen">
      <AllQuotes
        open={open}
        next={props.next}
        p_loading={isFetching}
        setRadius={setNewRadius}
        radius={radius}
      />

      {/*<div className="min-h-screen w-12"></div>*/}
    </div>
  );
}
