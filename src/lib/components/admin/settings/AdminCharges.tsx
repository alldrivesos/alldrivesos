import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../services/api/serviceApi";
import { useState } from "react";
import { toast } from "react-toastify";

interface ChargesData {
  id: string;
  tax_percent: number;
  service_percent: number;
  company_percent: number;
  driver_cancellation_fee_percent: number;
  client_refund_charge_percent: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Charges {
  success: boolean;
  data: ChargesData;
}
export default function AdminCharges() {
  const {
    data: chargesData,
    isLoading,
    isError,
  } = useQuery<Charges>({
    queryKey: ["charges"],
    queryFn: async () => {
      const response = await apiClient.get("/charge/fetch-charges");
      return response.data;
    },
  });

  const initialCharges: ChargesData = chargesData?.data || {
    id: "",
    tax_percent: 0,
    service_percent: 0,
    company_percent: 0,
    driver_cancellation_fee_percent: 0,
    client_refund_charge_percent: 0,
    active: false,
    createdAt: "",
    updatedAt: "",
  };

  const [charges, setCharges] = useState<ChargesData>(initialCharges);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCharges({
      ...charges,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(charges);
    toast.promise(update_mutation.mutateAsync(charges), {
      pending: "updating",
    });
  };
  const update_mutation = useMutation({
    mutationFn: async (charges: ChargesData) => {
      const response = await apiClient.post("/charge/save-charges", charges);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Charges updated successfully!");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update charges!");
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return <div className="text-center">Error fetching charges.</div>;

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold  text-gray-800 mb-5">
        Update Charges
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/*<div>
          <label
            htmlFor="tax_percent"
            className="font-medium mb-2 block text-gray-700"
          >
            Tax Percent:
          </label>
          <input
            type="number"
            id="tax_percent"
            name="tax_percent"
            value={charges.tax_percent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>*/}
        <div>
          <label
            htmlFor="service_percent"
            className="font-medium mb-2 block text-gray-700"
          >
            Service Percent:
          </label>
          <input
            type="number"
            id="service_percent"
            name="service_percent"
            value={charges.service_percent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="company_percent"
            className="font-medium mb-2 block text-gray-700"
          >
            Company Percent:
          </label>
          <input
            type="number"
            id="company_percent"
            name="company_percent"
            value={charges.company_percent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="driver_cancellation_fee_percent"
            className="font-medium mb-2 block text-gray-700"
          >
            Driver Cancellation Fee Percent:
          </label>
          <input
            type="number"
            id="driver_cancellation_fee_percent"
            name="driver_cancellation_fee_percent"
            value={charges.driver_cancellation_fee_percent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="client_refund_charge_percent"
            className="font-medium mb-2 block text-gray-700"
          >
            Client Refund Charge Percent:
          </label>
          <input
            type="number"
            id="client_refund_charge_percent"
            name="client_refund_charge_percent"
            value={charges.client_refund_charge_percent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-base shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          disabled={update_mutation.isPending}
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-md text-base font-medium hover:bg-primary/50 transition duration-200 ease-in-out"
        >
          {update_mutation.isPending ? "Updating..." : "Update Charges"}
        </button>
      </form>
    </div>
  );
}
