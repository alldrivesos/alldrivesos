import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../ui/TextInput";
import { FC, useState } from "react";
import Button from "../../../ui/Button";
import useKycStore from "../../../../store/kycStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { submitKyc } from "../../../../services/api/kycApi";
import { ScaleSpinner } from "../../../ui/Loading";

interface Props {
  prev: () => void;
}
const BankInfo: FC<Props> = ({ prev }) => {
  const [isBusy, setIsBusy] = useState(false);
  const kyc = useKycStore((state) => state.kyc);
  const saveKyc = useKycStore((state) => state.saveKyc);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      bank_name: kyc?.bank_name || "",
      routing_num: kyc?.routing_number || "",
      account_name: kyc?.bank_account_name || "",
      account_number: kyc?.bank_account_number || "",
      account_type: kyc?.account_type || "",
    },
  });
  const mutation = useMutation({
    mutationFn: submitKyc,
    onSuccess: (data: any) => {
      toast.success(data.message);
      saveKyc(data.data);
      setIsBusy(false);
    },
    onError: (err: any) => {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
        setIsBusy(false);
      } else {
        Object.entries<any>(err?.response.data?.errors).forEach(
          ([_, value]) => {
            toast.error(value.message);
          }
        );
        setIsBusy(false);
      }
    },
  });
  const onSubmit = (data: any) => {
    setIsBusy(true);
    const payload = {
      ...kyc,
      bank_name: data.bank_name,
      bank_account_number: data.account_number,
      bank_account_name: data.account_name,
      account_type: data.account_type,
      routing_number: data.routing_num,
      insurance_doc: kyc?.insurance_doc,
      business_phone: kyc.business_phone_number,
    };
    saveKyc(payload);
    mutation.mutate(payload);
  };
  return (
    <>
      <div className="bg-gray-100 p-4 pb-8 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-x-4">
            <Controller
              name="bank_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter an input",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Bank Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bank_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="routing_num"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter an input",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Routing Number"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bank_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="account_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter an input",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Account Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bank_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="account_number"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter an input",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Account Number"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bank_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="account_type"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter an input",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Account Type"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bank_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
          <div className="mt-12">
            <div className="flex justify-between">
              <div className="w-3/12">
                <Button title={"Prev"} onClick={prev} />
              </div>
              <div className="w-3/12">
                <Button
                  title={
                    isBusy ? <ScaleSpinner size={14} color="white" /> : "Submit"
                  }
                  disabled={!isValid}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BankInfo;
