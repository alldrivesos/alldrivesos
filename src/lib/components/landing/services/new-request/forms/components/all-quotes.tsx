import { useQuery } from "@tanstack/react-query";
import useRequestStore from "../../../../../../store/serviceStore";
import { apiClient } from "../../../../../../services/api/serviceApi";
import Button from "../../../../../ui/Button";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { useServiceSec } from "../../../../../../../pages/user/components/request-comps/service-sec";
import { Portal } from "../../../../../portal/portal";
import ViewOnMap from "../ViewOnMap";
import { useDriver } from "../../../../../../../pages/user/new-request";
import { Rating } from "@material-tailwind/react";

export interface Quote {
  id: string;
  serviceRequestId: string;
  quote: number;
  userId: string;
  selected: null;
  paid: null;
  longitude: string;
  latitude: string;
  distance: string;
  timeTaken: {
    "City driving car speed": string;
    "Highway driving car speed": string;
  };
  createdAt: string;
  updatedAt: string;
  driver: {
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
    photo: null;
    hasActiveSubscription: null;
    isAvailableForService: null;
    verified: boolean;
    expiredAt: null;
    planId: null;
    token: null;
    state: string;
    city: string;
    zipcode: string;
    street: null;
    userType: string;
    level: number;
    referralId: null;
    invitationId: string;
    companyId: string;
    reviewsAvg: number;
    serviceCharge: null;
    last_login: string;
    fcmToken: string;
    walletBal: string;
    pendingBal: string;
    referralSource: null;
    driverOverallPendingBal: string;
    driverOverallWalletBal: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  };
}

interface QuotesResponse {
  success: boolean;
  data: Quote[];
}
interface Props {
  open: (vend: any) => void;
  next: () => void;
  p_loading: boolean;
  setRadius: (num: any) => void;
  radius: number;
}

export default function AllQuotes(props: Props) {
  const request = useRequestStore((state) => state.request);
  const [driver, setDriver] = useDriver();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState<any>(null);
  // const [radius, setRadius] = useState(10); // Add radius state
  const close = () => {
    setVendor(null);
    setIsOpen(false);
  };
  const open = (vendor: any) => {
    setVendor(vendor);
    setIsOpen(true);
  };
  let request_id = request?.id;
  const [service, setService] = useServiceSec();
  const quotes = useQuery<QuotesResponse>({
    queryKey: ["quotes", request_id, props.radius], // Add radius to query key
    queryFn: async () => {
      const response = await apiClient.get(
        `/service-quote/fetch-quotes/${service.data.serviceRequest.id}?radius=${props.radius}`, // Add radius parameter
      );
      return response.data;
    },
    select: (data) => {
      return {
        ...data,
        data: data.data.map((quote) => ({
          ...quote,
          timeTaken:
            typeof quote.timeTaken === "string"
              ? JSON.parse(quote.timeTaken)
              : quote.timeTaken,
        })),
      };
    },
  });

  const data = quotes.data?.data;

  const count_default = 10;

  const [countdown, setCountdown] = useState(count_default);
  useEffect(() => {
    if (quotes.isFetching) {
      setCountdown(count_default);
    }
    if (
      countdown > 0 &&
      !quotes.isFetching &&
      quotes.data?.data?.length === 0
    ) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && !quotes.isFetching) {
      // refetch();
    }
  }, [countdown, quotes.isFetching]);
  useEffect(() => {
    if (quotes.isFetching) {
      setCountdown(count_default);
    }
    if (countdown === 0 && !quotes.isFetching) {
      quotes.refetch();
    }
    if (props.p_loading && !quotes.isFetching) {
      quotes.refetch();
    }
  }, [countdown, quotes.isFetching]);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <div className="flex flex-col gap-2 p-4 bg-white w-full shadow-xl">
      <div className="flex items-center mb-2 gap-4">
        <div>Refreshing in : {formatTime(countdown)}</div>
        <div>Radius: {props.radius} miles</div>
        <span className="ml-auto flex gap-2">
          <button
            disabled={quotes.isFetching}
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => props.setRadius(props.radius + 10)}
          >
            Increase Radius (10)
          </button>
          <button
            className="p-2 bg-review text-white rounded-md"
            onClick={() => quotes.refetch()}
          >
            Refresh
          </button>
        </span>
      </div>
      {quotes.isFetching && <>Loading Quotes...</>}
      {!quotes.isFetching && data?.length < 1 && <>No Quotes Found</>}
      {data?.map((quote) => (
        <div
          key={quote.id}
          className="bg-white flex rounded-lg shadow-md p-4 border border-gray-200"
        >
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              Quote: <span className="font-medium">${quote.quote}</span>
            </p>
            <p className="text-base text-gray-700 mt-2">
              Driver: <span className="font-medium">{quote.driver.name}</span>
            </p>
            <p className="text-base text-gray-700 mt-2">
              Distance: <span className="font-medium">{quote.distance}</span>
            </p>
            <p className="text-base text-gray-700 mt-2">
              Time:{" "}
              <span className="font-medium">
                {quote.timeTaken["City driving car speed"]}
              </span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-base text-gray-700 ">Rating:</span>
              <Rating value={quote?.driver?.reviewsAvg || 3} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={async () => {
                try {
                  let resp = await apiClient.post(
                    `/service-quote/select-driver-quote/${quote.id}`,
                  );
                  setDriver(quote);
                  console.log(resp.data);
                  props.next();
                } catch (error) {
                  let message = error.response.data.message;
                  if (
                    message ==
                    "One other technician's quote has been selected initially."
                  ) {
                    setDriver(quote);
                    props.next();
                    return;
                  }
                }
              }}
              title={"Select"}
              className="bg-primary disabled:bg-gray-300 p-2 text-white cursor-pointer rounded-md text-sm ml-auto"
            >
              Select
            </button>
            <button
              onClick={async () => {
                return open(quote);
              }}
              title={"Select"}
              className="bg-primary disabled:bg-gray-300 p-2 text-white cursor-pointer rounded-md text-sm ml-auto"
            >
              View On Map
            </button>
          </div>
        </div>
      ))}
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
