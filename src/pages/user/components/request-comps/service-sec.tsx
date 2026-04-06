import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import GetCurrentLocation from "../../../../lib/components/landing/services/request/Extra/GetCurrentLocation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../lib/services/api/serviceApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useCurrentId } from "../../new-request";
interface ServResponse {
  message: string;
  data: FormProps;
}
const serv_atom = atomWithStorage<ServResponse | null>("serv_response", null);
const useServResp = () => {
  const [serv, setServ] = useAtom(serv_atom);
  return [serv, setServ] as const;
};
interface FormProps {
  vehicleType: string;
  vehicleMake: string;
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: string;
  city: string;
  state: string;
  longitude: number;
  latitude: number;
  requestNote: string;
  serviceId: string;
}
const getYears = Array.from(
  { length: 20 },
  (_, i) => new Date().getFullYear() - i,
);
interface ServiceInfoResponse {
  success: boolean;
  message: string;
  data: {
    serviceRequest: {
      id: string;
      status: string;
      queryNote: string | null;
      vehicleType: string;
      vehicleMake: string;
      model: string;
      vehicleYear: string;
      color: string;
      location: string;
      zipcode: string;
      city: string;
      state: string;
      longitude: number;
      latitude: number;
      requestNote: string;
      serviceId: string;
      userType: string;
      updatedAt: string;
      createdAt: string;
    };
    totalTechniciansFound: number;
  };
}
const service_sec_atom = atomWithStorage<ServiceInfoResponse | null>(
  "service_sec",
  null,
);
export const useServiceSec = () => {
  const [service, setService] = useAtom(service_sec_atom);
  return [service, setService] as const;
};

interface VehicleMake {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetMotorsResponse {
  success: boolean;
  data: VehicleMake[];
}
export default function ServiceSection() {
  const { id } = useParams();
  const [service, setService] = useServiceSec();
  const [currentId, setCurrentId] = useCurrentId();
  const [servResp, setServResp] = useServResp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm<FormProps>({
    defaultValues: {
      serviceId: id,
      vehicleType: "",
      vehicleMake: "",
      model: "",
      vehicleYear: "",
      color: "",
      location: "",
      zipcode: "",
      city: "",
      state: "",
      longitude: 0,
      latitude: 0,
      requestNote: "",
    },
  });
  const service_mutation = useMutation({
    mutationFn: async (data: FormProps) => {
      let resp = await apiClient.post(
        `/service-request/service-information/create/nearby-technicians?latitude=${data.latitude}&longitude=${data.longitude}&radius=64&limit=10`,
        data,
      );
      setService(resp.data);
      return resp.data;
    },
    onSuccess: (data) => {
      toast.success("Service request created successfully");
      setCurrentId(id);
    },
    onError: (error) => {
      toast.error("Failed to create service request");
    },
  });
  const onSubmit = (data: any) => {
    toast.promise(service_mutation.mutateAsync(data), {
      pending: "Creating service request...",
    });
  };
  useEffect(() => {
    Object.entries(errors).forEach(([key, value]) => {
      toast.error(key + ": " + value.message);
    });
  }, [errors]);
  const location = watch("location");
  const vehicleType = watch("vehicleType");
  const get_motors = useQuery<GetMotorsResponse>({
    queryKey: ["vehicle-type", vehicleType],
    queryFn: async () => {
      let resp = await apiClient.get(
        vehicleType == "car" ? "/vehicle/carmakes" : `/vehicle/motorcyclemakes`,
        {
          params: {
            page: 1,
            limit: 1000,
          },
        },
      );
      return resp.data;
    },
  });

  const car_data = get_motors.data?.data;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="col-span-full">
        <label
          htmlFor="vehicleType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          {...register("vehicleType", { required: "Vehicle Type is required" })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
        >
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
        </select>
        {errors.vehicleType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.vehicleType.message}
          </p>
        )}
      </div>

      <div className="col-span-full">
        <label
          htmlFor="vehicleMake"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Vehicle Make{" "}
          {get_motors.isFetching && (
            <span className="ml-2 text-gray-500">Loading...</span>
          )}
        </label>
        <Controller
          name="vehicleMake"
          control={control}
          rules={{ required: "Vehicle Make is required" }}
          render={({ field }) => (
            <select
              id="vehicleMake"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
              {...field}
            >
              <option value="">Select an option</option>
              {car_data?.map((item) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.vehicleMake && (
          <p className="mt-1 text-sm text-red-600">
            {errors.vehicleMake.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Model
        </label>
        <input
          id="model"
          type="text"
          {...register("model", { required: "Model is required" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
        {errors.model && (
          <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="vehicleYear"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Vehicle Year
        </label>
        <Controller
          name="vehicleYear"
          control={control}
          rules={{ required: "Vehicle Year is required" }}
          render={({ field }) => (
            <select
              id="vehicleYear"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
              {...field}
            >
              <option value="">Select an option</option>
              {getYears.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        />
        {errors.vehicleYear && (
          <p className="mt-1 text-sm text-red-600">
            {errors.vehicleYear.message}
          </p>
        )}
      </div>

      <div className="col-span-full">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Color
        </label>
        <input
          id="color"
          type="text"
          {...register("color", { required: "Color is required" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
        {errors.color && (
          <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
        )}
      </div>

      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <div className="mt-1 p-2 min-h-[44px] rounded-md bg-gray-50 border border-gray-300 text-gray-700 shadow-sm flex items-center">
          {location || "Fetching location..."}
        </div>
        <GetCurrentLocation
          setValue={(e) => {
            //@ts-ignore
            setValue("zipcode", e?.postal);
            Object.entries(e).forEach(([key, value]) => {
              setValue(key as any, value as any);
            });
          }}
        />
      </div>

      <div className="col-span-full">
        <label
          htmlFor="requestNote"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Request Note (required)
        </label>
        <textarea
          id="requestNote"
          {...register("requestNote", { required: "Request Note is required" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          rows={4}
        />
        {errors.requestNote && (
          <p className="mt-1 text-sm text-red-600">
            {errors.requestNote.message}
          </p>
        )}
      </div>

      <div className="col-span-full text-right mt-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          disabled={service_mutation.isPending}
        >
          {service_mutation.isPending ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
