import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import TextInput, { InputType } from "../../ui/TextInput";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  adminGetPayoutCap,
  adminSetPayoutCap,
} from "../../../services/api/adminApi";

const PayoutSettings = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["getAdminPayoutCap"],
    queryFn: adminGetPayoutCap,
  });
  useEffect(() => {
    if (data) {
      reset({
        amount: data?.data?.amount,
      });
    }
  }, [data]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
  });
  const mutate = useMutation({
    mutationFn: adminSetPayoutCap,
    mutationKey: ["admin-add-rates"],
  });
  const onSubmit = (data: any) => {
    const payload = {
      amount: Number(data.amount),
    };
    setIsBusy(true);
    mutate.mutate(payload, {
      onSuccess: (data) => {
        setIsBusy(false);
        toast.success(data.message);
        refetch();
      },
      onError: () => {
        toast.error("Something went wrong");
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div className="bg-gray-100 rounded p-4 lg:p-5">
        <p className="text-lg fw-600">Payout Settings</p>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your service rate",
                  },
                  value: "number",
                }}
                disabled={isLoading}
                render={({ field }) => (
                  <TextInput
                    label="Minimum Payout Amount"
                    labelClassName="text-gray-500 fw-500"
                    error={errors.amount?.message}
                    type={InputType.number}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <div className="lg:w-5/12">
                <Button
                  title={
                    isBusy ? <ScaleSpinner size={10} color="white" /> : "Update"
                  }
                  altClassName="btn-primary py-2 w-full text-lg fw-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PayoutSettings;
