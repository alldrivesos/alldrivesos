import { FC, useState } from "react";
import { formatAsNgnMoney } from "../../../utils";
import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import { BsCurrencyDollar } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { requestPayout } from "../../../services/api/companyApi";
import { toast } from "react-toastify";

interface Props {
  close: () => void;
  avail_bal: string;
}
const WithdrawModal: FC<Props> = ({ close, avail_bal }) => {
  const [isBusy, setIsBusy] = useState(false);
  const mutate = useMutation({
    mutationFn: requestPayout
  })
  const {
    control,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
  });
  const handleRequest = (data: any) => {
    setIsBusy(true);
    const payload = {
      amount: Number(data.amount)
    }
    mutate.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message)
        setIsBusy(false);
        close()
      },
      onError: (err:any) => {
        setIsBusy(false);
        toast.error(err.response.data.message)
      }
    })
  };
  return (
    <div>
      <div className="p-4 bg-light">
        <p>Available Balance</p>
        <p className="fw-600">{formatAsNgnMoney(avail_bal)}</p>
      </div>
      <div className="mt-3">
        <form action="" onSubmit={handleSubmit(handleRequest)}>
          <div>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter withdrawal amount",
                },
              }}
              render={({ field }) => (
                <div>
                  <p className="fw-500 fs-500">Withdrawal Amount</p>
                  <div className="flex mt-1 gap-x-2 px-2 items-center border rounded-lg overflow-hidden">
                    <BsCurrencyDollar className="text-lg shrink-0" />
                    <input
                      type="number"
                      className="border-none outline-none p-2 w-full"
                      {...field}
                    />
                  </div>
                </div>
              )}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <div className="lg:w-5/12">
              <Button
                title={
                  isBusy ? <ScaleSpinner size={10} color="white" /> : "Submit Request"
                }
                altClassName="btn-primary py-2 w-full text-lg fw-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;
