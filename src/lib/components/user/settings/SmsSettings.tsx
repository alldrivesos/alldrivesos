import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../services/api/serviceApi";
import React from "react";
import { toast } from "react-toastify";
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

interface ApiResponse {
  success: boolean;
  user: User;
}
export default function SmsSettings() {
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient("/user/me");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (sms_opt_in: boolean) => {
      const response = await apiClient.patch("/user/opt-in-sms", {
        optIn: sms_opt_in,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  if (query.isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (query.isError) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading user data.
      </div>
    );
  }

  const smsOptIn = query.data?.user.sms_opt_in ?? false;

  return (
    <div className=" p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">SMS Notifications</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(mutation.mutateAsync(!smsOptIn), {
            pending: "Updating...",
            success: "Updated!",
            error: "Error updating!",
          });
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-700">Receive SMS notifications</span>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              smsOptIn ? "bg-green-500" : "bg-gray-300"
            }`}
            aria-pressed={smsOptIn}
            aria-label="Toggle SMS notifications"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                smsOptIn ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {smsOptIn
            ? "You are currently opted in to receive SMS notifications."
            : "You are currently opted out of SMS notifications."}
        </div>
        {mutation.isError && (
          <div className="text-red-500 mt-2">
            Failed to update SMS settings.
          </div>
        )}
      </form>
    </div>
  );
}
