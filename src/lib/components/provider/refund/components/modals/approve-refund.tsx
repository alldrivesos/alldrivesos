import { FC, useState } from "react";
import Button from "../../../../ui/Button";
import {
  approveRefund,
  initiateRefund,
} from "../../../../../services/api/adminApi";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../../services/api/serviceApi";

interface Props {
  id: string;
  close: () => void;
  refetch: () => void;
  status: string;
}
const ApproveRefund: FC<Props> = ({ id, close, refetch, status }) => {
  const [amt, setAmt] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  console.log(status);
  const approve_mutate = useMutation({
    // queryKey: ["approveRefund", id],
    mutationFn: async () => {
      let resp = await apiClient.post("/services-quote/approve-refund/" + id);
      return resp.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Refund approved successfully");
      close();
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
      setIsBusy(false);
    },
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
  const handleApprove = async () => {
    // return console.log(id);
    // if (status === "approved") {
    //   handleInitate();
    // } else {
    //   await approveRefund(id)
    //     .then(() => {
    //       handleInitate();
    //     })
    //     .catch((err: any) => {
    //       toast.error(err.response.data.message);
    //       setIsBusy(false);
    //     });
    // }
  };
  return (
    <div>
      <div className="mt-2 flex justify-between">
        <Button
          title={"Close"}
          onClick={close}
          altClassName="px-6 bg-red-500 text-white py-3 rounded-lg fw-600"
        />
        <Button
          title={approve_mutate.isPending ? <BeatLoader /> : "Approve"}
          onClick={() => approve_mutate.mutate()}
          altClassName="px-6 bg-primary text-white py-3 rounded-lg fw-600"
        />
      </div>
    </div>
  );
};

export default ApproveRefund;
