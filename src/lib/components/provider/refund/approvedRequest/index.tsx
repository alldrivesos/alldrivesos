import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import { getAdminRefunds } from "../../../../services/api/adminApi";
import RefundTable from "../components/refundTable";
import { apiClient } from "../../../../services/api/serviceApi";
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
        {refundRequests.length > 0 && (
          <RefundTable
            isLoading={isLoading}
            data={refundRequests as unknown as any}
            page={params.page}
            next={handleNext}
            prev={handlePrev}
            count={totalRefunds}
            refetch={refetch}
            status={params.status}
          />
        )}
      </div>
    </div>
  );
};

export default RefundApprovedRequest;
