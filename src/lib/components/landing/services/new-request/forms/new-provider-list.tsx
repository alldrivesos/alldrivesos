import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useRequest } from "../../request/ServiceSec";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../../services/api/serviceApi";
import useRequestStore from "../../../../../store/serviceStore";
import ReusableModal from "../../../../ui/ReusableModal";
import ViewOnMap from "./ViewOnMap";
import useDialog from "../../../../../hooks/useDialog";
import { Portal } from "../../../../portal/portal";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import DriverCard from "./components/driver-list";
import AllQuotes from "./components/all-quotes";
import { useDriver } from "../../../../../../pages/user/new-request";
const containerStyle = {
  width: "100%",
  height: "400px",
};
interface ServiceRendered {
  id: string;
  fee: number;
}

interface Location {
  type: string;
  coordinates: number[];
}

interface Profile {
  id: string;
  fname: string;
  lname: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  sms_opt_in: boolean;
  password: string;
  isActive: boolean;
  isSuspended: boolean;
  photo: any;
  hasActiveSubscription: any;
  isAvailableForService: any;
  verified: boolean;
  expiredAt: any;
  planId: any;
  token: any;
  state: string;
  city: string;
  zipcode: string;
  street: any;
  userType: string;
  level: number;
  referralId: any;
  invitationId: string;
  companyId: string;
  reviewsAvg: number;
  serviceCharge: any;
  last_login: string;
  fcmToken: string;
  walletBal: string;
  pendingBal: string;
  referralSource: any;
  driverOverallPendingBal: string;
  driverOverallWalletBal: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Vendor {
  id: string;
  user_id: string;
  brands: string[];
  service_rendered: ServiceRendered[];
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  service_area: string;
  fees: any;
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
  location: Location;
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

interface ServiceInformationResponse {
  success: true;
  message: string;
  data: {
    serviceRequest: {
      id: string;
      status: string;
      queryNote: any;
      serviceId: string;
      vehicleMake: string;
      model: string;
      vehicleYear: string;
      vehicleType: string;
      color: string;
      location: string;
      city: string;
      requestNote: string;
      userType: string;
      updatedAt: string;
      createdAt: string;
    };
    totalTechniciansFound: number;
  };
}

export default function NewProviderList({ next }: { next: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [radius, setRadius] = useState(40); // Default radius in miles

  const [driver, setDriver] = useDriver();
  const [location] = useLocation();
  const { id } = useParams();
  const request = useRequestStore((state) => state.request);
  let request_id = request?.id;
  const center = {
    lat: parseFloat(location?.latitude) || -34.397,
    lng: parseFloat(location?.longitude) || 150.644,
  };
  const close = () => {
    setIsOpen(false);
    setVendor(null);
  };
  const open = (vend: any) => {
    setVendor(vend);
    setIsOpen(true);
  };
  const [reqPayload, setRequestPayload] = useRequest();
  const [serviceInformationResponse, setServiceInformationResponse] =
    useState<ServiceInformationResponse | null>(null);

  const saveRequest = useRequestStore((state) => state.saveRequest);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { data, refetch, isFetching } = useQuery<VendorResponse>({
    queryKey: ["vendors", location, radius],
    queryFn: async () => {
      const temp = await apiClient.post(
        `/service-request/service-information/create/nearby-technicians?latitude=${center?.lat}&longitude=${center?.lng}&radius=${radius * 1.6}&limit=10`,
        {
          serviceId: reqPayload.serviceId,
          vehicleMake: reqPayload.vehicleMake,
          model: reqPayload.model,
          vehicleYear: reqPayload.vehicleYear,
          vehicleType: reqPayload.vehicleType,
          color: reqPayload.color,
          location: reqPayload.location,
          city: reqPayload.city,
          requestNote: reqPayload.requestNote,
        },
      );
      setServiceInformationResponse(temp.data);
      let new_id = serviceInformationResponse.data.serviceRequest.id;
      const response = await apiClient.post(
        `/service-request/service-information/${new_id}/notify?latitude=${center?.lat}&longitude=${center?.lng}&prev_radius=1&radius=${radius * 1.6}`,
      );

      return response.data;
    },
  });

  const [selectProv, setProv] = useState({ id: "", amount: "" });
  const count_default = 10;
  const [countdown, setCountdown] = useState(count_default); // 2 minutes in seconds
  const [req, saveReq] = useRequest();
  useEffect(() => {
    if (isFetching) {
      setCountdown(count_default);
    }
    if (countdown > 0 && !isFetching) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && !isFetching) {
      refetch();
    }
  }, [countdown, isFetching]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleRadiusChange = (change: number) => {
    const newRadius = Math.max(5, radius + change);
    setRadius(newRadius);
  };
  // return <>{JSON.stringify(req)}</>;
  //
  useLayoutEffect(() => {
    console.log("drivers");
    if (driver) next();
  }, [driver]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 w-full ">
          <h2 className="text-lg font-semibold ">
            <span className="opacity-80"> Available Providers</span>:
            {data?.data?.vendors?.length}
          </h2>
          {isFetching ? <p>Loading providers...</p> : null}
          <button
            disabled={isFetching}
            className="bg-primary disabled:bg-gray-300 p-2 text-white cursor-pointer rounded-md text-sm ml-auto"
            onClick={() => {
              refetch();
            }}
          >
            Reload
          </button>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <p>Radius: {radius} miles</p>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => handleRadiusChange(-10)}
            disabled={isFetching || radius <= 5}
          >
            -10
          </button>
          <button
            disabled={isFetching}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => handleRadiusChange(10)}
          >
            +10
          </button>
        </div>
        {countdown > 0 && !isFetching && (
          <p>Refreshing in: {formatTime(countdown)}</p>
        )}
        {data?.data?.vendors?.length === 0 && !isFetching && (
          <p>No providers found within the specified radius.</p>
        )}
        {isFetching && <p>Loading providers...</p>}
        <ul className="space-y-4">
          {data?.data?.vendors?.map((vendor) => (
            <>{/*<DriverCard vendor={vendor} key={vendor.id} />*/}</>
          ))}
          {/*{data?.data?.vendors?.map((vendor) => (

          ))}*/}
        </ul>
        <AllQuotes
          setCountdown={setCountdown}
          open={open}
          next={next}
          p_loading={isFetching}
        />
        {/*{quotes.data.data?.map((quote) => (
          <li key={quote.id}>{quote.price}</li>
        ))}*/}
      </div>

      <Portal>
        {isOpen && (
          <ViewOnMap
            close={close}
            vendor={vendor as unknown as any}
          ></ViewOnMap>
        )}
      </Portal>
    </div>
  );
}
