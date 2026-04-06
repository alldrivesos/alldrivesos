import { FC, useState } from "react";
import Button from "../../../../ui/Button";
import {
  approveRefund,
  initiateRefund,
} from "../../../../../services/api/adminApi";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../../services/api/serviceApi";

interface Props {
  id: string;
  close: () => void;
  refetch: () => void;
  status: string;
  item: RefundDetails;
}

interface RefundDetails {
  id: string;
  userId: string;
  serviceRequestId: string;
  disapprovalReason: string | null;
  amount: number;
  adminDisapprovalReason: string | null;
  refundType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  serviceRequest: ServiceRequest;
}

interface User {
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
  city: string | null;
  zipcode: string | null;
  street: string | null;
  userType: string;
  level: number;
  referralId: string | null;
  invitationId: string | null;
  companyId: string | null;
  reviewsAvg: number;
  serviceCharge: number | null;
  last_login: string;
  fcmToken: string;
  walletBal: number | null;
  pendingBal: number | null;
  referralSource: string | null;
  driverOverallPendingBal: number | null;
  driverOverallWalletBal: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ServiceRequest {
  id: string;
  ref: string | null;
  userId: string;
  userType: string;
  providerId: string | null;
  status: string;
  processStatus: string | null;
  serviceId: string;
  amount: number | null;
  vehicleMake: string;
  vehicleType: string;
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
  queryNote: string | null;
  userFcmToken: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdmunRefundDetails({
  id,
  close,
  item,
  refetch,
  status,
}: Props) {
  const [amt, setAmt] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  console.log(status);
  const query = useQuery({
    queryKey: ["refund", id],
    queryFn: () => apiClient.get(`/service-quote/fetch-quotes/${id}`),
    enabled: !!id,
  });
  const handleInitate = async () => {
    const payload = {
      refundReqId: id,
      amountToClient: Number(amt),
    };
    await initiateRefund(payload)
      .then((res) => {
        toast.success(res.message);
        refetch();
        close();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
      });
  };
  const handleApprove = async () => {};
  return (
    <div className=" p-2 bg-white rounded-lg ">
      <div className="mb-6">
        {item.disapprovalReason && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-lg font-bold text-red-600">Disapproval Reason</p>
            <p className="text-gray-700 mt-2">{item.disapprovalReason}</p>
          </div>
        )}
        {item.adminDisapprovalReason && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
            <p className="text-lg font-bold text-red-600">
              Admin Disapproval Reason
            </p>
            <p className="text-gray-700 mt-2">{item.adminDisapprovalReason}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold">User Name</p>
          <p className="text-gray-700">
            {item.user.fname + " " + item.user.lname || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">User Email</p>
          <p className="text-gray-700">{item.user.email}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Service Request ID</p>
          <p className="text-gray-700">{item.serviceRequestId}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Refund Type</p>
          <p className="text-gray-700">{item.refundType}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Requested Amount</p>
          <p className="text-gray-700">${item.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Status</p>
          <p className="text-gray-700 capitalize">{item.status}</p>
        </div>
      </div>
      <div className="mt-7 flex justify-end gap-4">
        <Button
          title={"Close"}
          onClick={() => close()}
          altClassName="px-6 bg-red-500 text-white py-3 rounded-lg fw-600"
        />
      </div>
    </div>
  );
}
