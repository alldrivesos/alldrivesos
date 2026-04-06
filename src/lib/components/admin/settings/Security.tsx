import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../ui/Button";
import { adminUpdatePassword } from "../../../services/api/authApi";
import { useMutation } from "@tanstack/react-query";

const SecuritySetting = () => {
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      new_password: "",
      old_password: "",
      new_password_confirmation: "",
    },
  });
  const mutation = useMutation({
    mutationFn: adminUpdatePassword,
    onSuccess: (data) => {
      toast.success(data.message)
      setIsBusy(false);
      reset()
    },
    onError: (error:any) => {
      toast.error(error.response.data.message);
      setIsBusy(false);
    },
  });
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
        oldPassword:  data.old_password,
        newPassword: data.new_password,
        confirmPassword: data.new_password_confirmation
    }
    mutation.mutate(payload)
  };
  return (
    <>
      <div className="bg-gray-100 p-4 rounded">
        <p className="border-b  fw-600 text-lg border-gray-700 lg:p-6 lg:py-4">Passwords</p>
        <div className="mt-4  px-8 py-4 lg:py-6 w-full flex justify-between rounded-[15px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full lg:w-10/12">
              <div className="flex items-center justify-between">
                <label className="block">Current password</label>
                <Controller
                  name="old_password"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      className="p-2 rounded-[12px] bg-transparent border border-gray-400 w-full lg:w-8/12"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-10 flex items-center justify-between">
                <label className="block">New password</label>
                <Controller
                  name="new_password"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 7,
                      message: "Password is too short",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      className="p-2 rounded-[12px] bg-transparent border border-gray-400 w-full lg:w-8/12"
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.new_password && (
                <p className="error text-red-500 fw-500">
                  {errors.new_password.message}
                </p>
              )}
              <div className="mt-10 flex items-center justify-between">
                <label className="block">Confirm new password</label>
                <div className="w-full lg:w-8/12">
                  <Controller
                    name="new_password_confirmation"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter your password",
                      },
                      validate: (val) => {
                        if (watch("new_password") != val) {
                          return "Your passwords do no match";
                        }
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="password"
                        className="p-2 rounded-[12px] bg-transparent border border-gray-400 w-full"
                        {...field}
                      />
                    )}
                  />
                  {errors.new_password_confirmation && (
                    <p className="error text-red-500 fw-500">
                      {errors.new_password_confirmation.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center border-t py-6 mt-10 lg:mt-16">
              <Button
                title={isBusy ? "Updating..." : "Update Password"}
                altClassName="px-5 py-2 rounded-[8px] btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SecuritySetting;