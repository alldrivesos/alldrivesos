import { FC, useState } from "react";
import Button from "../../../ui/Button";
import useDialog from "../../../../hooks/useDialog";
import {
  adminApprovePayout,
  adminDeclinePayoutRequests,
  adminIniatePayout,
} from "../../../../services/api/adminApi";
import { toast } from "react-toastify";
import ReusableModal from "../../../ui/ReusableModal";

interface Props {
  id: string;
  status: string;
  refetch: () => void;
}
const PayoutActions: FC<Props> = ({ id, status, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog: Approve, setShowModal: ShowApprove } = useDialog();
  const { Dialog: Decline, setShowModal: ShowDecline } = useDialog();

  const handleInitate = async () => {
    await adminIniatePayout(id)
      .then((res) => {
        toast.success(res.message);
        ShowApprove(false);
        refetch();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
      });
  };

  const handleDecline = async () => {
    setIsBusy(true);
    await adminDeclinePayoutRequests(id)
      .then((res) => {
        toast.success(res.message);
        ShowDecline(false);
        refetch();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
      });
  };

  const handleApprove = async () => {
    setIsBusy(true);
    if (status === "approved") {
      handleInitate();
    } else {
      await adminApprovePayout(id)
        .then(() => {
          refetch();
        })
        .catch((err: any) => {
          toast.error(err.response.data.message);
          setIsBusy(false);
        });
    }
  };
  return (
    <>
      <div>
        {status === "pending" && (
          <div className="fw-600 flex gap-x-3">
            <Button
              title={"Approve"}
              onClick={() => ShowApprove(true)}
              altClassName="py-2 px-5 btn-primary"
            />
            <Button
              title={"Decline"}
              onClick={() => ShowDecline(true)}
              altClassName="py-2 px-5 btn-primary bg-red-600"
            />
          </div>
        )}
        {status === "approved" && (
          <div className="fw-600 flex gap-x-3">
            <Button
              title={"Initiate Transfer"}
              onClick={() => ShowApprove(true)}
              altClassName="py-2 px-5 btn-primary"
            />
          </div>
        )}
      </div>
      <Approve title="" size="md">
        <ReusableModal
          title={`${status === 'pending' ? 'Are you sure want to Approve this withdrawal request?' : 'Are you sure want to Initiate this transfer?'}`}
          action={handleApprove}
          actionTitle="Approve"
          cancelTitle="No, Close"
          closeModal={() => ShowApprove(false)}
          isBusy={isBusy}
        />
      </Approve>
      <Decline title="" size="md">
        <ReusableModal
          title={`${status === 'pending' ? 'Are you sure want to decline this withdrawal request?' : 'Are you sure want to decline this transfer request?'}`}
          action={handleDecline}
          actionTitle="Decline"
          cancelTitle="No, Close"
          closeModal={() => ShowDecline(false)}
          isBusy={isBusy}
        />
      </Decline>
    </>
  );
};

export default PayoutActions;
