import { FC, useState } from "react";
import { toast } from "react-toastify";
import { approveDriverKyc } from "../../../services/api/kycApi";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";

interface Props {
  id: string;
  close: () => void;
  refetch: () => void;
}
const DisapproveDriverKyc: FC<Props> = ({ id, close, refetch }) => {
  const [reason, setReason] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const Suspend = async () => {
    setIsBusy(true);
    const payload = {
      approved: false,
      reason: reason,
    };
    await approveDriverKyc(id, payload)
      .then((res) => {
        toast.success(res.message);
        close();
        refetch();
      })
      .catch((err: any) => {
        setIsBusy(false)
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div>
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
          />
        </div>
      </div>
    </>
  );
};

export default DisapproveDriverKyc;
