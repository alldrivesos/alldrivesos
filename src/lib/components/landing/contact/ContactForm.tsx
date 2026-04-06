import { useState } from "react";
import "react-phone-number-input/style.css";
import { Controller, useForm } from "react-hook-form";
import { contactUs } from "../../../services/api/routineApi";
import { toast } from "react-toastify";
import TextInput, { InputType } from "../../ui/TextInput";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { BeatLoader } from "react-spinners";

const ContactForm = () => {
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      platform: "web",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsBusy(true);
    contactUs(data)
      .then((res) => {
        if (res) {
          toast.success("Suggestion submiited");
          reset();
          setIsBusy(false);
        } else {
          toast.error("Something went wrong");
          setIsBusy(false);
        }
      })
      .catch(() => {
        setIsBusy(false);
      });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: { value: true, message: "Field is required" },
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z ]*$/,
                  message: "Can only accept alphabets from a-z",
                },
              }}
              render={({ field }) => (
                <TextInput
                  type={InputType.text}
                  label="First Name"
                  altClassName="w-full h-14 bg-[#F9FAFA] rounded px-2 border border-[#F0F4FF]"
                  labelClassName="quicksand text-[#1F3D4F] fw-600 text-lg"
                  hasBorder={false}
                  error={errors.first_name?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="last_name"
              control={control}
              rules={{
                required: { value: true, message: "Field is required" },
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z ]*$/,
                  message: "Can only accept alphabets from a-z",
                },
              }}
              render={({ field }) => (
                <TextInput
                  type={InputType.text}
                  label="Last Name"
                  altClassName="w-full h-14 bg-[#F9FAFA] rounded px-2 border border-[#F0F4FF]"
                  labelClassName="quicksand text-[#1F3D4F] fw-600 text-lg"
                  hasBorder={false}
                  error={errors.last_name?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className="">
            <Controller
              name="email"
              control={control}
              rules={{
                required: { value: true, message: "Field is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please Enter A Valid Email!",
                },
              }}
              render={({ field }) => (
                <TextInput
                  type={InputType.text}
                  label="Email"
                  altClassName="w-full h-14 bg-[#F9FAFA] rounded px-2 border border-[#F0F4FF]"
                  labelClassName="quicksand text-[#1F3D4F] fw-600 text-lg"
                  hasBorder={false}
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-4">
            <label className="block fw-600 mb-1">Phone Number</label>
            <PhoneInputWithCountry
              international
              defaultCountry="US"
              name="phone"
              control={control}
              autoComplete="off"
              numberInputProps={{
                className: "bg-[#F9FAFA] h-10 quciksand",
              }}
              rules={{
                required: true,
                validate: isPossiblePhoneNumber,
              }}
              className=" p-2 bg-[#F9FAFA] outline-none  border  border-gray-400 rounded-[8px]"
            />
            {errors.phone && (
              <p className="error text-red-400 text-sm">
                {errors.phone?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <Controller
            name="message"
            control={control}
            rules={{
              required: { value: true, message: "Field is required" },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.textarea}
                className="h-24 w-full"
                label="Message"
                altClassName="w-full h-28 bg-[#F9FAFA] rounded p-2 border border-[#F0F4FF]"
                labelClassName="quicksand text-[#1F3D4F] fw-600 text-lg"
                hasBorder={false}
                error={errors.message?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-6">
          <button className="w-full py-4 rounded-[16px] bg-[#FEB470] text-xl fw-600">
            {isBusy ? <BeatLoader /> : "Send Message"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
