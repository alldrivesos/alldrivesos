import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../ui/TextInput";
import Button from "../ui/Button";
import { ScaleSpinner } from "../ui/Loading";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/api/authApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { VscLock } from "react-icons/vsc";

const ResetPasswordForm = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const hash = code?.split("&");
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      token: "",
    },
  });
  const reset = useMutation({
    mutationFn: resetPassword,
    mutationKey: ["reset"],
  });
  const onSubmit = (data: any) => {
    setIsBusy(true);
    const payload = {
      token: !!hash?.length ? hash[1]?.replace("token=", "") : "",
      email: !!hash?.length ? hash[0]?.replace("email=", "") : "",
      password: data.password,
    };
    reset.mutateAsync(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate("/auth/login");
        setIsBusy(false);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid  gap-4">
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password is too short",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Password"
                labelClassName="text-[#000000B2] fw-500"
                icon={<VscLock className="text-2xl mx-2 lg:mx-4" />}
                placeholder="*********"
                error={errors.password?.message}
                type={InputType.password}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your password",
              },
              validate: (val) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Confirm Password"
                labelClassName="text-[#000000B2] fw-500"
                icon={<VscLock className="text-2xl mx-2 lg:mx-4" />}
                placeholder="*********"
                error={errors.confirm_password?.message}
                type={InputType.password}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="mt-12">
          <Button
            title={
              isBusy ? <ScaleSpinner size={14} color="white" /> : "Continue"
            }
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
