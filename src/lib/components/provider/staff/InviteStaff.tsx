import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendInvite } from "../../../services/api/companyApi";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/authUser";
import { ScaleSpinner } from "../../ui/Loading";

interface Props{
    close: () => void
    refetch: () => void
}
const InviteStaff:FC<Props> = ({close, refetch}) => {
  const [isBusy, setIsBusy] = useState(false)
  const {userId} = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const mutation = useMutation({
    mutationFn: sendInvite,
    onSuccess: (data:any) => {
      toast.success(data.message)
      setIsBusy(false);
      refetch()
      close()
    },
    onError: (err:any) => {
      toast.error(err.response.data.message);
      setIsBusy(false);
    },
  });
  const submitAction = (data:any) => {
    setIsBusy(true)
    const payload = {
     ...data,
     company_id: userId
    }
    mutation.mutate(payload)
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitAction)}>
          <div className="grid gap-2">
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="First Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.first_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="last_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Last Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.last_name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Email"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.email?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
          <div className="mt-6">
            <div className="flex justify-between">
              <div className="w-full">
                <Button  title={isBusy ? <ScaleSpinner size={14} color="white" /> : "Send Invite"} disabled={!isValid} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InviteStaff;
