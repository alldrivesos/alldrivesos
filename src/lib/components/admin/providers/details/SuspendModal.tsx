import { FC, useState } from "react";
import TextInput, { InputType } from "../../../ui/TextInput";
import Button from "../../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { suspendUser } from "../../../../services/api/usersApi";
import { toast } from "react-toastify";
import { ScaleSpinner } from "../../../ui/Loading";

interface Props {
  id: string;
  close: () => void;
  refetch: () => void;
}
const SuspendModal: FC<Props> = ({ id, refetch, close }) => {
  const [reason, setReason] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const suspendNow = useMutation({
    mutationFn: suspendUser,
    mutationKey: ["suspend"],
  });
  const Suspend = () => {
    setIsBusy(true);
    const payload = {
      reason: reason,
      userId: id,
    };
    suspendNow.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch();
        close();
      },
      onError: (error) => {
        toast.error(error.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div className="text-black">
        <p>Reason For Suspension</p>
        <TextInput
          value={reason}
          type={InputType.textarea}
          onChange={(e: any) => setReason(e.target.value)}
        />
        <div className="mt-9">
          <Button
            title={
              isBusy ? <ScaleSpinner size={14} color="white" /> : "Suspend"
            }
            onClick={Suspend}
            disabled={!reason?.length}
          />
        </div>
      </div>
    </>
  );
};

export default SuspendModal;
