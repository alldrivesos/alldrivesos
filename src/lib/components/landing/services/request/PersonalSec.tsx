import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../ui/TextInput";
import { City, ICity, IState, State } from "country-state-city";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FC, useState } from "react";
import useRequestStore from "../../../../store/serviceStore";
import { useMutation } from "@tanstack/react-query";
import { sendProfileInfo } from "../../../../services/api/serviceApi";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import useAuth from "../../../../hooks/authUser";

interface Props {
  next: () => void;
  prev: () => void;
}
const PersonalSec: FC<Props> = ({ next }) => {
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const requestInfo = useRequestStore((store) => store.request);
  const saveRequest = useRequestStore((state) => state.saveRequest);
  const { user, firstName, lastName } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      street: "",
      country: "",
      state: "",
      city: "",
      first_name: firstName || "",
      last_name: lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: "",
    },
  });
  const [isBusy, setIsBusy] = useState(false);
  const request = useMutation({
    mutationFn: sendProfileInfo,
    mutationKey: ["send-profile"],
  });
  const handleForm = (data: any) => {
    setIsBusy(true);
    const payload = {
      request_id: requestInfo.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: `${data.street}, ${data.city}, ${data.state}, ${data.country}`,
    };
    request.mutate(payload, {
      onSuccess: () => {
        setIsBusy(false);
        saveRequest({
          ...requestInfo,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          homeAddress: data.address,
          phone: data.phone,
          level: 1,
        });
        next();
      },
      onError: (err: any) => {
        setIsBusy(false);
        toast.error(err?.response?.data?.message);
      },
    });
  };

  const handleCountryChange = (countryCode: string) => {
    setValue("country", countryCode);
    setValue("state", "");
    setValue("city", "");
    setStates(State.getStatesOfCountry(countryCode));
    setCities([]);
  };

  const handleStateChange = (stateCode: string, countryCode: string) => {
    setValue("state", stateCode);
    setValue("city", "");
    setCities(City.getCitiesOfState(countryCode, stateCode));
  };

  return (
    <>
      <div className="bg-gray-100 lg:p-10 lg:pb-20 p-4 pb-8 rounded-md">
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="grid gap-3">
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-3">
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
                    required
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
                    required
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-3">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter an email",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Email Address"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.email?.message}
                    type={InputType.email}
                    required
                    {...field}
                    ref={null}
                  />
                )}
              />
              <div>
                <label className="mb-1 block mt-3 fw-500 text-[#000000B2]">
                  Phone Number <span className="fw-600 text-red-600"> *</span>
                </label>
                <PhoneInputWithCountry
                  defaultCountry="US"
                  countries={["US"]}
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
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-3">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Country"
                    type={InputType.select}
                    options={[
                      {
                        value: "US",
                        label: "United States",
                      },
                    ]}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCountryChange(e.target.value);
                    }}
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="State"
                    type={InputType.select}
                    options={states.map((s) => ({
                      value: s.isoCode,
                      label: s.name,
                    }))}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleStateChange(e.target.value, watch("country"));
                    }}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="City"
                    type={InputType.select}
                    options={cities.map((c) => ({
                      value: c.name,
                      label: c.name,
                    }))}
                    {...field}
                  />
                )}
              />
              <Controller
                name="street"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextInput
                    label="Street"
                    labelClassName="text-[#000000B2] fw-500"
                    placeholder="Enter Street"
                    error={errors.street?.message}
                    type={InputType.text}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-16 flex justify-end">
            <Button
              type={"submit"}
              className="btn-feel flex gap-x-2 items-center"
            >
              {isBusy ? (
                <BeatLoader size={13} />
              ) : (
                <>
                  Next <FaArrowRightLong />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalSec;
