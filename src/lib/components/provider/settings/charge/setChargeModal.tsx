import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TextInput, { InputType } from "../../../ui/TextInput";
import Button from "../../../ui/Button";
import { ScaleSpinner } from "../../../ui/Loading";
import { updateProfile } from "../../../../services/api/authApi";
import useAuth from "../../../../hooks/authUser";
interface Props {
  close: () => void;
}
const SetChargeModal: FC<Props> = ({ close }) => {
    const {user, saveUser} = useAuth()
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      serviceCharge: user.charge || "",
    },
  });
  const mutate = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["admin-add-rates"],
  });
  const onSubmit = (data: any) => {
    const charge = data?.serviceCharge
    if (charge > 100) {
      toast.info("Invalid Percentage");
      return;
    }
    setIsBusy(true);
    mutate.mutate(data, {
      onSuccess: (data) => {
        setIsBusy(false);
        toast.success(data.message);
        saveUser({
            ...user,
            charge: charge
        })
        close();
      },
      onError: () => {
        toast.error("Something went wrong");
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="serviceCharge"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your service rate",
              },
              maxLength: 3,
              value: "number",
            }}
            render={({ field }) => (
              <TextInput
                label="Service Rate (%)"
                labelClassName="text-gray-500 fw-500"
                error={errors.serviceCharge?.message}
                type={InputType.number}
                min={0}
                max={100}
                maxLength={3}
                {...field}
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
  );
};

export default SetChargeModal;
