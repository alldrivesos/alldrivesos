import { FC, useState } from "react";
import TextInput, { InputType } from "../../../ui/TextInput";
import { ScaleSpinner } from "../../../ui/Loading";
import Button from "../../../ui/Button";
import { approveCompanyKyc } from "../../../../services/api/kycApi";
import { toast } from "react-toastify";

interface Props {
  id: string;
  userId: string;
  close: () => void;
  refetch: () => void;
}
const DisapproveKyc: FC<Props> = ({ id, userId, close, refetch }) => {
  const [reason, setReason] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const Suspend = async () => {
    setIsBusy(true);
    const datas = {
      id: id,
      userId: userId,
    };
    const payload = {
      approved: false,
      reason: reason,
    };
    await approveCompanyKyc(datas, payload)
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

export default DisapproveKyc;
