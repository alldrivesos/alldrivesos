import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/services/api/serviceApi";
import { useState } from "react";
import { DynamicTable } from "../../lib/components/ui/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
interface ServiceRequest {
  id: string;
  ref: null;
  userId: string;
  userType: string;
  providerId: null;
  status: string;
  processStatus: null;
  serviceId: string;
  amount: null;
  vehicleMake: string;
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: string;
  requestNote: string;
  longitude: string;
  latitude: string;
  city: string;
  state: string | null;
  queryNote: null;
  userFcmToken: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  fname: string;
  lname: string;
  name: null;
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
  state: null;
  city: null;
  zipcode: null;
  street: null;
  userType: string;
  level: number;
  referralId: null;
  invitationId: null;
  companyId: null;
  reviewsAvg: number;
  serviceCharge: null;
  last_login: string;
  fcmToken: string;
  walletBal: null;
  pendingBal: null;
  referralSource: null;
  driverOverallPendingBal: null;
  driverOverallWalletBal: null;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

interface RefundRequest {
  id: string;
  userId: string;
  serviceRequestId: string;
  disapprovalReason: string | null;
  adminDisapprovalReason: null;
  refundType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  serviceRequest: ServiceRequest;
}

interface RefundData {
  refundRequests: RefundRequest[];
  total: number;
}

interface RefundApiResponse {
  success: boolean;
  data: RefundData;
}
interface TABLE_PARAMS {
  page: number;
  status: "pending" | "approved" | "dissaproved";
}
export default function UserRefunds() {
  const [tableParams, setParams] = useState<TABLE_PARAMS>({
    page: 1,
    status: "pending",
  });
  const query = useQuery<RefundApiResponse>({
    queryKey: ["refunds-user", tableParams],
    queryFn: async () => {
      let resp = await apiClient.get("/services-quote/fetch-refund-requests", {
        params: {
          ...tableParams,
        },
      });
      return resp.data;
    },
  });

  const count = query.data?.data.total || 10;
  const handleNext = () => {
    if (count <= 10) return;
    setParams((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };
  const handlePrev = () => {
    if (tableParams.page <= 1) {
      return;
    }

    setParams((prev) => {
      return { ...prev, page: prev.page - 1 };
    });
  };
  const columnHelper = createColumnHelper<RefundRequest>();
  const columns = [
    columnHelper.accessor((row) => row.user.fname, {
      id: "Name",
      cell: (info) => `${info.getValue()} ${info.row.original.user.lname}`,
    }),
    columnHelper.accessor((row) => row.amount, {
      id: "Amount",
      cell: (info) => info.getValue() ?? "N/A",
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Date requested",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (info) => {
        const status = info.getValue();
        let badgeColor = "bg-slate-400"; // Default color
        if (status === "approved") {
          badgeColor = "bg-green-600";
        } else if (status === "rejected") {
          badgeColor = "bg-red-600";
        } else if (status === "pending") {
          badgeColor = "bg-yellow-800";
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${badgeColor} text-white`}
          >
            {status}
          </span>
        );
      },
    }),
  ];
  const tabs = ["pending", "approved", "disapproved"];
  return (
    <div>
      <div></div>
      <h2 className="py-2 text-xl font-bold">Refund Requests</h2>
      <div className="bg-white shadow p-4 rounded-md">
        <div className="flex space-x-4 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md font-semibold ${
                tableParams.status === tab
                  ? "bg-review text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() =>
                setParams((prev) => ({ ...prev, page: 1, status: tab }))
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {/*<div className="p-2"></div>*/}
        {/*{query.isFetching && <>fetching</>}*/}
        {/*<div>{JSON.stringify(query.data)}</div>*/}
        {query.isFetching ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          !query.isError && (
            <>
              <DynamicTable
                data={query.data?.data.refundRequests || []}
                next={handleNext}
                page={tableParams.page}
                // maxPage={10}
                columns={columns}
                count={count}
                prev={handlePrev}
              />
            </>
          )
        )}
      </div>
    </div>
  );
}
