import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../ui/TextInput";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import Button from "../../../ui/Button";
import useKycStore, { kycProps } from "../../../../store/kycStore";

interface Props {
  prev: () => void;
  next: () => void;
  prevKyc: kycProps;
}
const ServiceInfo: FC<Props> = ({ prev, next }) => {
  const kyc = useKycStore((state) => state.kyc);
  const saveKyc = useKycStore((state) => state.saveKyc);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: kyc?.director_fullname || "",
      designation: kyc?.director_designation || "",
      email: kyc?.director_email || "",
      phone: kyc?.director_phone || "",
    },
  });
  const submitAction = async (data: any) => {
    const payload = {
      director_fullname: data.fullname,
      director_designation: data.designation,
      director_phone: data.phone,
      director_email: data.email,
    };
    await saveKyc({ ...kyc, ...payload });
    next();
  };
  return (
    <>
      <div className="bg-gray-100 p-4 pb-8 rounded-md">
        <form onSubmit={handleSubmit(submitAction)}>
          <div className="grid gap-4">
            <Controller
              name="fullname"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Full Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.fullname?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="designation"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Designation"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.designation?.message}
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
            <div className="">
              <label className="mb-1 block mt-[10px] fw-500 text-[#000000B2]">
                Phone Number
              </label>
              <PhoneInputWithCountry
                international
                defaultCountry="US"
                name="phone"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
                    message: "Please Enter A Valid Number",
                  },
                }}
                className="border p-2 bg-white border-gray-400 rounded outline-none"
              />
              {errors.phone && (
                <p className="error text-red-400 text-sm">
                  Invalid Phone Number
                </p>
              )}
            </div>
          </div>
          <div className="mt-12">
            <div className="flex justify-between">
              <div className="w-3/12">
                <Button title={"Prev"} onClick={prev} />
              </div>
              <div className="w-3/12">
                <Button title={"Next"} disabled={!isValid} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceInfo;
