import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/authUser";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import { updateProfile } from "../../../services/api/authApi";
import { useMutation } from "@tanstack/react-query";

interface Props {
  close: () => void;
}
const UpdateProfile: FC<Props> = ({ close }) => {
  const { user, firstName, lastName, saveUser } = useAuth();
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: firstName || "",
      last_name: lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      state: user.state || "",
    },
  });
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      const payload = {
        ...user,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        state: data.user.state,
        account: data.user.userType,
      };
      saveUser(payload);
      toast.success(data.message);
      close();
      setIsBusy(false);
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      name: `${data.first_name} ${data.last_name}`,
      state: data.state,
      phone: data.phone,
      email: data.email,
    };
    mutation.mutate(payload);
  };
  return (
    <>
      <div className="text-black max-h-[60vh] overflow-y-auto px-3 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your first name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="First Name"
                  labelClassName="text-gray-500 fw-500"
                  error={errors.first_name?.message}
                  type={InputType.text}
                  {...field}
                />
              )}
            />
            <Controller
              name="last_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your last name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Last Name"
                  labelClassName="text-gray-500 fw-500"
                  error={errors.last_name?.message}
                  type={InputType.text}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              disabled
              rules={{
                required: {
                  value: true,
                  message: "Please enter your email",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Email"
                  labelClassName="text-gray-500 fw-500"
                  error={errors.email?.message}
                  type={InputType.email}
                  disabled={true}
                  {...field}
                />
              )}
            />
            <div className="mt-3">
              <label className="mb-2 mt-2 block text-gray-500">
                Phone Number
              </label>
              <PhoneInputWithCountry
                international
                defaultCountry="NG"
                name="phone"
                control={control}
                rules={{ required: false }}
                disabled
                className="border lg:p-2 p-2 border-gray-400 rounded outline-none"
              />
              {errors.phone && (
                <p className="error text-red-500 fw-500">
                  Invalid Phone Number
                </p>
              )}
            </div>
            <div>
              <Controller
                name="state"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your country",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Address"
                    labelClassName="text-gray-500 fw-500"
                    error={errors.state?.message}
                    type={InputType.textarea}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-8">
            <Button
              title={
                isBusy ? <ScaleSpinner size={10} color="white" /> : "Update"
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
