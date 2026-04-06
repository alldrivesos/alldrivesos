import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import { getAdminRefunds } from "../../../../services/api/adminApi";
import RefundTable from "../components/refundTable";
import { apiClient } from "../../../../services/api/serviceApi";
import { DynamicTable } from "../../../ui/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import InitiateActions from "../components/initiateActions";
export interface RefundRequest {
  id: string;
  userId: string;
  amount: number;
  status: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  fname: string | null;
  lname: string | null;
  name: string;
  email: string;
  phone: string;
  password?: string; // Optional as it's sensitive and might not always be needed
  isActive: number;
  isSuspended: number | null;
  token: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  referralId: string;
  level: number | null;
  hasActiveSubscription: number | null;
  isAvailableForService: number | null;
  expiredAt: string | null;
  planId: string | null;
  invitationId: string | null;
  verified: number;
  companyId: string | null;
  reviewsAvg: number;
  serviceCharge: number;
  fcmToken: string | null;
  pendingBal: string;
  address: string | null;
  deletedAt: string | null;
  photo: string | null;
  last_login: string;
  walletBal: string;
  zipcode: string | null;
  referralSource: string;
  service_area: string | null;
  driverOverallPendingBal: string;
  driverOverallWalletBal: string;
  sms_opt_in: number;
  PayoutRequestId: string;
  payoutCreatedAt: string;
}

export interface RefundResponse {
  success: boolean;
  data: {
    refundRequests: RefundRequest;
    total: number;
  };
}

const RefundApprovedRequest = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "approved",
  });

  const { data, isLoading, refetch } = useQuery<RefundResponse>({
    queryKey: ["admin-refund-request", params],
    queryFn: async () => {
      let resp = await apiClient.get("/services-quote/fetch-refund-requests", {
        params: { ...params, status: "APPROVED" },
      });
      return resp.data;
    },
  });

  //@ts-ignore
  const refundRequests = data?.data?.refundRequests || [];
  // @ts-ignore
  const totalRefunds = data?.data?.total || 0;

  const handleNext = () => {
    if (refundRequests.length >= 10 && params.page * 10 < totalRefunds) {
      setParams((prevParams) => ({ ...prevParams, page: prevParams.page + 1 }));
    }
  };

  const handlePrev = () => {
    if (params.page > 1) {
      setParams((prevParams) => ({ ...prevParams, page: prevParams.page - 1 }));
    }
  };
  const columnHelper = createColumnHelper<RefundRequest>();
  const columns = [
    //@ts-ignore
    columnHelper.accessor((row) => row.refId, {
      id: "Ref Id",
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    }),
    // columnHelper.accessor((row) => row.isActive, {
    //   id: "Service Id",
    //   cell: (info) => (
    //     <Link to={`/admin/services/${info.getValue()}`} className="fw-600">
    //       {info.getValue()}
    //     </Link>
    //   ),
    // }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Date Requested",
      header: (info) => info.column.id,
      cell: (info) => (
        <p className="fw-600">
          {dayjs(info.getValue()).format("ddd DD, MMM YYYY")}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      header: (info) => info.column.id,
      cell: (info) => (
        <span className="fw-600">
          {info.getValue()}
          {/*{FormatStatus[info.getValue() as keyof typeof FormatStatus]}*/}
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.amount || "N/A", {
      id: "Amount",
      header: (info) => info.column.id,
      cell: (info) => (
        <span className="fw-600">
          {info.getValue()}
          {/*{FormatStatus[info.getValue() as keyof typeof FormatStatus]}*/}
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      header: (info) => info.column.id,
      cell: (info) => (
        <>
          <InitiateActions
            item={info.row.original}
            id={info.getValue()}
            status={info.row.original.status}
            refetch={refetch}
          />
        </>
      ),
      //   cell: (info) => (
      //     <button
      //       onClick={(e) => console.log(info.row.original)}
      //       className="btn btn-primary"
      //     >
      //       Action
      //     </button>
      //   ),
    }),
  ];

  // return <>{JSON.stringify(data.data.refundRequests)}</>;
  return (
    <div>
      <div className="">
        {!isLoading && refundRequests.length === 0 && (
          <div>
            <EmptyState msg="You currently do not have any refund record on the system." />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Refund Requests...
              </p>
            </div>
          </div>
        )}
        {refundRequests?.length > 0 && (
          <>
            <DynamicTable
              columns={columns}
              data={refundRequests || []}
              count={totalRefunds}
              next={handleNext}
              prev={handlePrev}
              count={totalRefunds}
              refetch={refetch}
              status={params.status}
            />
          </>

          // <RefundTable
          //   isLoading={isLoading}
          //   data={refundRequests as unknown as any}
          //   page={params.page}
          //   next={handleNext}
          //   prev={handlePrev}
          //   count={totalRefunds}
          //   refetch={refetch}
          //   status={params.status}
          // />
        )}
      </div>
    </div>
  );
};

export default RefundApprovedRequest;
