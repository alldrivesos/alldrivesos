import { FC } from "react";
import Button from "../../../../ui/Button";

interface RefundDetails {
  id: string;
  refId: string;
  userId: string;
  companyId: string;
  serviceRequestId: string;
  disapprovalReason: string;
  amount: number;
  adminDisapprovalReason: null | string;
  refundType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  serviceRequest: {
    vehicleMake: string;
    vehicleType: string;
    model: string;
    vehicleYear: string;
    color: string;
    location: string;
  };
}

interface Props {
  id: RefundDetails;
  close: () => void;
  refetch: () => void;
  item: any;
  status: string;
}

export default function AdminRefundDetails({ id, close }: Props) {
  return (
    <div className=" max-w-5xl mb-2 ">
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="font-semibold text-red-700 mb-2">Disapproval Reason</h3>
        <p className="text-sm text-red-600 whitespace-pre-wrap bg-white p-3 rounded">
          {id.disapprovalReason}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">User Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Name: {id.user.fname} {id.user.lname}
              </p>
              <p className="text-sm text-gray-600">Email: {id.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone: {id.user.phone}</p>
              <p className="text-sm text-gray-600">User ID: {id.userId}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Service Request Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Vehicle: {id.serviceRequest.vehicleMake}{" "}
                {id.serviceRequest.model}
              </p>
              <p className="text-sm text-gray-600">
                Year: {id.serviceRequest.vehicleYear}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Color: {id.serviceRequest.color}
              </p>
              <p className="text-sm text-gray-600">
                Location: {id.serviceRequest.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
