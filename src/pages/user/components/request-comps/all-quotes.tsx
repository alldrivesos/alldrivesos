import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import { useDriver } from "../../new-request";
import ViewOnMap from "../../../../lib/components/landing/services/new-request/forms/ViewOnMap";
import { Portal } from "../../../../lib/components/portal/portal";
import { apiClient } from "../../../../lib/services/api/serviceApi";
import { useServiceSec } from "./service-sec";
import useRequestStore from "../../../../lib/store/serviceStore";
import QuoteCard from "./QuoteCard";

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
        `/service-quote/fetch-quotes/${service.data.serviceRequest.id}?radius=${props.radius * 1.6}`, // Add radius parameter
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
        <QuoteCard quote={quote} key={quote.id} next={props.next} open={open} />
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
