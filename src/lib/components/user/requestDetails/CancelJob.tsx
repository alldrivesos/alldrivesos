import { useMutation } from "@tanstack/react-query";
import TextInput from "../../ui/TextInput";
import { apiClient } from "../../../services/api/serviceApi";
import { useState } from "react";

interface Props {
  id: string;
  close: () => void;
  refetch: () => void;
}

export default function CancelModal(props: Props) {
  const [reason, setReason] = useState("");
  const mutation = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.post(
        `/service-request/client-cancel/${props.id}`,
        {
          disapprovalReason: reason,
        },
      );
      return resp.data;
    },
    onSuccess: () => {
      props.refetch();
      props.close();
    },
  });

  return (
    <div className="bg-white rounded-lg p-4 mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Cancel Order</h2>
      <p className="text-gray-700 mb-4">
        Cancel this request? A 15% processing fee will be charged for
        cancellations.
      </p>
      <div className="mb-4">
        <label
          htmlFor="cancel-reason"
          className="block text-gray-600 font-medium mb-1"
        >
          Reason for cancellation
        </label>
        <TextInput
          id="cancel-reason"
          placeholder="Describe what happened..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          as="textarea"
          rows={4}
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
          onClick={props.close}
          disabled={mutation.isPending}
        >
          Close
        </button>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ${
            (!reason || mutation.isPending) && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => mutation.mutate()}
          disabled={!reason || mutation.isPending}
        >
          {mutation.isPaused ? "Cancelling..." : "Cancel Order"}
        </button>
      </div>
      {mutation.isError && (
        <p className="text-red-600 mt-3 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
