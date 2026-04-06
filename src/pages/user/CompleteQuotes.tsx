import { useEffect, useState } from "react";
import useRequestStore from "../../lib/store/serviceStore";
import { useServiceSec } from "./components/request-comps/service-sec";
import { apiClient } from "../../lib/services/api/serviceApi";
import { useQuery } from "@tanstack/react-query";
import QuoteCard from "./components/request-comps/QuoteCard";
import { Portal } from "../../lib/components/portal/portal";
import ViewOnMap from "../../lib/components/landing/services/new-request/forms/ViewOnMap";
import { useTimer } from "react-timer-hook";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import PendingDetails from "./components/RequestDetails";
import { toast } from "react-toastify";
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
export default function CompleteQuotes() {
  // const request = useRequestStore((state) => state.request);
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState<any>(null);
  const [radius, setRadius] = useState(40);
  // const [radius, setRadius] = useState(10); // Add radius state
  const param = useParams();
  const close = () => {
    setVendor(null);
    setIsOpen(false);
  };
  const open = (vendor: any) => {
    setVendor(vendor);
    setIsOpen(true);
  };
  const nav = useNavigate();
  // let request_id = request?.id;
  // const [service, setService] = useServiceSec();
  const quotes = useQuery<QuotesResponse>({
    queryKey: ["quotes", param.id, radius], // Add radius to query key
    queryFn: async () => {
      const response = await apiClient.get(
        `/service-quote/fetch-quotes/${param.id}?radius=${radius * 1.6}`, // Add radius parameter
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

  // useTimer setup to replace manual countdown logic
  const initialExpiry = new Date();
  initialExpiry.setSeconds(initialExpiry.getSeconds() + count_default);

  const { seconds, minutes, restart, pause } = useTimer({
    expiryTimestamp: initialExpiry,
    onExpire: () => {
      // when timer expires, if there are no quotes and we're not currently fetching, trigger a refetch
      if (!quotes.isFetching && (quotes.data?.data?.length ?? 0) === 0) {
        quotes.refetch();
      }
    },
  });

  // Reset the timer whenever a fetch starts
  useEffect(() => {
    if (quotes.isFetching) {
      restart(new Date(Date.now() + count_default * 1000));
    }
  }, [quotes.isFetching, restart]);

  // If there are quotes available, pause the timer and reset it so it doesn't continue counting down
  useEffect(() => {
    if (!quotes.isFetching && (quotes.data?.data?.length ?? 0) > 0) {
      pause();
      restart(new Date(Date.now() + count_default * 1000), false);
    }
  }, [quotes.data?.data?.length, quotes.isFetching, pause, restart]);

  const formatTimer = () => {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const next = (item: Quote) => {
    nav("/user/new-request/complete/" + item.serviceRequestId);
  };
  const cancel_request = async () => {
    try {
      let resp = await apiClient.post(
        "/service-request/client-cancel/" + param.id,
        {
          disapprovalReason: "any",
        },
      );
      nav("/user/new-request");
      return resp.data;
    } catch (err) {
      toast.error(err.response.data.message);
      // console.log(err.response.data.message);
      throw new Error(err);
    }
  };
  return (
    <div>
      <div className="flex items-center mb-4 ">
        <h2 className="text-xl font-bold text-primary ">{param.name}</h2>
        <Button
          type="reset"
          onClick={async () => {
            toast.promise(cancel_request, {
              pending: "Canceling...",
              success: "Canceled!",
              // error: "Failed to cancel",
            });
          }}
          className="ml-auto bg-red-500"
        >
          Cancel
        </Button>
      </div>
      <PendingDetails id={param.id} />
      <div className="flex flex-col gap-2 p-4 bg-white w-full shadow-xl border rounded-lg">
        <div className="flex items-center mb-2 gap-4">
          <div>Reloads in: {formatTimer()}</div>
          <div>Radius: {radius} miles</div>
          <span className="ml-auto flex gap-2">
            <button
              disabled={quotes.isFetching}
              className="p-2 bg-blue-500 text-white rounded-md"
              onClick={() => setRadius(radius + 10)}
            >
              Radius (+10)
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
          <QuoteCard quote={quote} key={quote.id} next={next} open={open} />
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
    </div>
  );
}
