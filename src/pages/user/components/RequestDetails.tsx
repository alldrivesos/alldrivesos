import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/services/api/serviceApi";
import { format_time } from "../../../utils/utils";
import {
  Calendar,
  Car,
  Palette,
  Tag,
  Clock,
  MapPin,
  FileText,
  Wrench,
  Quote,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  ref: null;
  userId: string;
  userType: "private_client";
  providerId: null;
  status: "pending";
  processStatus: null;
  serviceId: string;
  amount: null;
  vehicleMake: string;
  vehicleType: "car";
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: string;
  requestNote: string;
  longitude: string;
  latitude: string;
  city: string;
  state: null;
  queryNote: null;
  userFcmToken: string;
  completionTime: null;
  createdAt: string;
  updatedAt: string;
  service: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    isPublished: boolean;
    questionNote: string;
    createdAt: string;
    updatedAt: string;
  };
  payment: null;
}

interface PendingDetailsData {
  serviceRequest: ServiceRequest;
  driver: {};
  driverCompany: {};
  driverMoreInfo: {};
  driverQuote: null;
}
export default function PendingDetails({ id }: { id: string }) {
  const {
    data: payload,
    isLoading,
    isError,
    error,
  } = useQuery<any, Error, { data: PendingDetailsData }>({
    queryKey: ["pending-requests", id],
    queryFn: async () => {
      let resp = await apiClient.get(
        "/service-request/user-fetch-details/" + id,
      );
      return resp.data;
    },
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading details...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error?.message || "Failed to load details"}
      </div>
    );
  }
  const data = payload?.data;
  if (!data || !data.serviceRequest) {
    return (
      <div className="text-center p-4">No data available for this request.</div>
    );
  }

  const { serviceRequest } = data;

  const DetailItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | null | undefined;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 px-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center mb-2 sm:mb-0 sm:w-1/3">
        <Icon className="h-5 w-5 text-gray-500 mr-3" />
        <span className="font-semibold text-gray-700">{label}:</span>
      </div>
      <span className="md:ml-auto md:text-right text-gray-700 font-medium">
        {value || "N/A"}
      </span>
    </div>
  );

  return (
    <div className="mb-6 bg-gray-50 rounded-lg ">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
        Request Details
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <DetailItem
          icon={Wrench}
          label="Service"
          value={serviceRequest.service?.name}
        />
        <DetailItem
          icon={Clock}
          label="Requested At"
          value={format_time(serviceRequest.createdAt)}
        />
        <DetailItem
          icon={Car}
          label="Vehicle Make"
          value={serviceRequest.vehicleMake}
        />
        <DetailItem icon={Tag} label="Model" value={serviceRequest.model} />
        <DetailItem
          icon={Calendar}
          label="Vehicle Year"
          value={serviceRequest.vehicleYear}
        />
        <DetailItem icon={Palette} label="Color" value={serviceRequest.color} />
        <DetailItem
          icon={MapPin}
          label="Location"
          value={`${serviceRequest.location}, ${serviceRequest.city}, ${serviceRequest.zipcode}`}
        />
        <DetailItem
          icon={FileText}
          label="Request Note"
          value={serviceRequest.requestNote}
        />
        {/* Add more details as needed */}
        {serviceRequest.status && (
          <DetailItem
            icon={Quote}
            label="Status"
            value={serviceRequest.status.replace(/_/g, " ").toUpperCase()}
          />
        )}
      </div>
    </div>
  );
}
