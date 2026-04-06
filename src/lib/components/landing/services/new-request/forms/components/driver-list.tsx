import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../../../services/api/serviceApi";
import { toast } from "react-toastify";
import { useRequest } from "../../../request/ServiceSec";

export default function DriverCard(props) {
  const [request] = useRequest();
  const vendor = props.vendor;
  // const setVendor = props.setVendor;
  // const setIsOpen = props.setIsOpen;
  // const setProv = props.setProv;
  // const select_mutation = props.select_mutation;
  const select_mutation = useMutation({
    mutationFn: async (vendorId: string) => {
      const response = await apiClient.post(
        `/service-quote/select-driver-quote/${vendorId}`,
        // { provider_id: vendorId },
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("selected");
      console.log(data);

      // next();
      // close();
    },
  });

  return (
    <div>
      <li key={vendor.id} className="border p-4 rounded-md shadow-sm bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{vendor.profile.name}</h3>
          <div className="flex flex-col gap-1">
            <button
              className="bg-primary text-sm text-white py-2 px-4 rounded-md cursor-pointer"
              onClick={() => {
                console.log(vendor);
                // setVendor(vendor);
                // setIsOpen(true);
              }}
            >
              View on Map
            </button>
            <button
              // disabled={select_mutation.isPending}
              className="bg-primary text-sm text-white py-2 px-4 rounded-md cursor-pointer"
              onClick={async () => {
                // return console.log(request);
                try {
                  let resp = await apiClient.get(
                    "/service-quote/fetch-quotes/" + request.serviceId,
                  );
                  console.log(resp);
                } catch (error) {
                  console.error(error);
                }

                // return console.log(vendor);
                // setProv((prev) => ({ ...prev, id: vendor.id }));
                // select_mutation.mutate(vendor.id);
              }}
            >
              Select
            </button>
          </div>
        </div>
        <p className="text-gray-600">
          Distance: {vendor.distance_in_km?.toFixed(2)} km
        </p>
        <p className="text-gray-600">
          Rating: {vendor.profile.reviewsAvg?.toFixed(1) || "N/A"}
        </p>
        <p className="text-gray-600">City: {vendor.city || "N/A"}</p>
        {/* Add more vendor details here */}
      </li>
    </div>
  );
}
