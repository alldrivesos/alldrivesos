import { ChangeEvent, FC, useState } from "react";
import { submitQuery } from "../../../services/api/serviceApi";
import { toast } from "react-toastify";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import { Switch } from "@chakra-ui/react";
import { requestRefund } from "../../../services/api/usersApi";

interface Props {
  id: string;
  refetch: () => void;
  close: () => void;
}
const QueryModal: FC<Props> = ({ id, close, refetch }) => {
  const [review, setReview] = useState("");
  const [refund, setRefund] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const handleSubmit = async () => {
    setIsBusy(true);
    const payload = {
      queryNote: review,
    };
    const request = {
      serviceRequestId: id,
    };
    if (refund) {
      requestRefund(request)
        .then((res) => {
          toast.success(res.message);
          submitAction(payload);
        })
        .catch((err: any) => {
          toast.error(err.response.data.message);
          setIsBusy(false);
        });
    } else {
      submitAction(payload);
    }
  };
  const submitAction = (payload: { queryNote: string }) => {
    submitQuery(id, payload)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
      });
  };
  return (
    <div>
      <p className="fw-500 text-black mt-3">
        Something not right? Let us know — we’re here to help!
      </p>
      <div>
        <TextInput
          label="Query"
          labelClassName="fw-500"
          type={InputType.textarea}
          onChange={(
            e: ChangeEvent<
              HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
            >,
          ) => setReview(e.target.value)}
        />
      </div>
      {/*<div className="mt-3 flex gap-x-3">
        <p className="fw-500">Request Refund</p>
          <Switch colorScheme='orange' size={'lg'} isChecked={refund} onChange={() => setRefund(!refund)}/>
      </div>*/}
      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          title={isBusy ? <ScaleSpinner size={14} color="white" /> : "SUBMIT"}
        />
      </div>
    </div>
  );
};

export default QueryModal;
