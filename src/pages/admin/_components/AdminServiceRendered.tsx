import {
  QueryObserver,
  QueryObserverResult,
  useQuery,
} from "@tanstack/react-query";
import { apiClient } from "../../../lib/services/api/serviceApi";
import { format_time } from "../../../utils/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../lib/components/ui/Button";

interface AdminServiceData {
  id: string;
  ref: string | null;
  userId: string;
  userType: string;
  providerId: string | null;
  status: string;
  processStatus: string | null;
  serviceId: string;
  amount: number;
  vehicleMake: string;
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: string;
  requestNote: string;
  createdAt: string;
  updatedAt: string;
  latitude: string;
  longitude: string;
  city: string;
  queryNote: string | null;
  userFcmToken: string;
  state: string | null;
  vehicleType: string;
  completionTime: string | null;
  serviceRequestId: string;
  driverQuoteId: string;
  companyCharge: number;
  charge: number;
  tax: number;
  paymentRef: string;
  clientSecret: string;
  driverChargeForAdmin: number;
  remitted: string | null;
  tax_breakdown: string | null;
  fname: string;
  lname: string;
  name: string;
  email: string;
  phone: string;
  password?: string; // Password might not always be present or needed
  isActive: number;
  isSuspended: number;
  token: string | null;
  street: string | null;
  referralId: string | null;
  level: number;
  hasActiveSubscription: number | null;
  isAvailableForService: number | null;
  expiredAt: string | null;
  planId: string | null;
  invitationId: string;
  verified: number;
  companyId: string;
  reviewsAvg: number;
  serviceCharge: number | null;
  fcmToken: string;
  pendingBal: string;
  address: string;
  deletedAt: string | null;
  photo: string | null;
  last_login: string;
  walletBal: string;
  referralSource: string | null;
  service_area: string | null;
  driverOverallPendingBal: string;
  driverOverallWalletBal: string;
  sms_opt_in: number;
  reason_for_suspension: string | null;
  reason_for_unsuspension: string | null;
  slug: string;
  icon: string;
  isPublished: number;
  questionNote: string;
  minimumQuote: string | null;
  serviceRequestStatus: string;
  serviceRequestCreatedAt: string;
}

export type { AdminServiceData };
export default function AdminServiceRenderd({ id }: { id: string }) {
  const status = ["All", "completed", "pending", "cancelled"] as const;
  const limit = 10;
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<(typeof status)[number]>("All");
  const query = useQuery<{
    message: string;
    data: {
      serviceRequests: AdminServiceData[];
      total: number;
    };
  }>({
    queryKey: ["provider-services", id, tab, page], // Add page to queryKey
    queryFn: async () => {
      const response = await apiClient.get(
        `/service-request/fetch-driver-service/${id}`,
        {
          params: {
            status: tab === "All" ? "" : tab,
            limit,
            page: page,
          },
        },
      );
      return response.data;
    },
    retry: false,
  });

  const totalItems = query.data?.data.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (query.error) {
    return (
      <div className="p-6 min-h-72 ring ring-red-200  grid place-items-center  bg-red-50/50 shadow rounded-lg">
        <div className="space-y-4">
          <h2 className="text-center font-bold text-xl">
            {query.error.message}
          </h2>
          <Button onClick={query.refetch} title={"Retry"}>
            Retry
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      {/*<div className="p-2 bg-white mx-2 shadow rounded">
        <div className="py-4 px-2">
          <div className="flex gap-2 items-center border-b border-gray-200 overflow-x-auto">
            {status.map((item) => {
              const selectTab = () => {
                setTab(item);
                setPage(1); // Reset page when tab changes
              };
              const isActive = tab === item;
              return (
                <button
                  type="button"
                  key={"item" + item}
                  onClick={selectTab}
                  className={`px-4  capitalize py-2 text-sm font-medium rounded-t-md focus:outline-none transition-colors whitespace-nowrap
                    ${
                      isActive
                        ? "bg-primary text-white shadow -mb-px border-b-2 border-primary"
                        : "bg-transparent text-gray-600 hover:text-primary"
                    }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>*/}
      <Contents query={query as any} />
      {totalItems > 0 && (
        <div className="flex justify-center items-center gap-4 py-4 bg-white mx-2 shadow rounded mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || query.isFetching}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || query.isFetching}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

const Contents = ({
  query,
}: {
  query: QueryObserverResult<{
    data?: {
      serviceRequests: AdminServiceData[];
    };
  }>;
}) => {
  if (query.isFetching)
    return (
      <div className="flex flex-col items-center justify-center min-h-[220px] bg-white shadow p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    );
  if (query.isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[220px] bg-white shadow p-6">
        <p className="text-lg font-semibold text-red-600">
          Error loading data.
        </p>
        <button
          onClick={() => query.refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Refetch
        </button>
      </div>
    );
  return (
    <>
      {query.data.data?.serviceRequests?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(302px,1fr))] gap-6 p-6 bg-gradient-to-br bg-white bg-opacity-70 m-2 shadow-lg rounded-xl">
          {query.data.data.serviceRequests.map((service) => (
            <Link
              to={`/admin/services/${service.serviceRequestId}`}
              key={service.serviceRequestId}
              className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.name}
                {/*{service.serviceRequestId}*/}
              </h3>
              <p className="text-gray-700 mb-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    //@ts-ignore
                    service.serviceRequestStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : //@ts-ignore
                        service.serviceRequestStatus === "fulfilled" ||
                          //@ts-ignore
                          service.serviceRequestStatus === "completed"
                        ? "bg-green-100 text-green-800"
                        : service.serviceRequestStatus === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {service.serviceRequestStatus}
                </span>
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-gray-900">Fee:</span> $
                {service.amount.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-gray-900">Date:</span>{" "}
                {format_time(service.serviceRequestCreatedAt)}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-gray-900">
                  Service Status:
                </span>{" "}
                {service.status}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">
                  Payment Ref:
                </span>{" "}
                {service.paymentRef}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[220px] bg-white shadow p-6 m-2 rounded-xl">
          <p className="text-lg font-semibold text-gray-700">
            No service requests found for this status.
          </p>
        </div>
      )}
    </>
  );
};
