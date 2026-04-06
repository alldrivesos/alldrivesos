import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../ui/TextInput";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from "react-icons/vsc";
import { LuUserCircle } from "react-icons/lu";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../ui/Button";
import { ScaleSpinner } from "../ui/Loading";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient, getCategories } from "../../services/api/serviceApi";
import { ServiceCatItem } from "../../types/service";
import { registerProvider } from "../../services/api/authApi";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModal";
import RegisterSuccess from "./RegisterSuccess";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AxiosError } from "axios";
import { Tooltip } from "@chakra-ui/react";
import { TbTooltip } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useTempUser } from "../../../pages/auth/UserSignUp";

const ProviderRegisterForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { Modal, setShowModal } = useModal();
  const [showDrop, setShowDrop] = useState(false);
  const [selectDrop, setSelectDrop] = useState(false);
  const [selectedAvenue, setSelectedAvenue] = useState("");
  const [temp, setUserDetails] = useTempUser();
  const navigate = useNavigate();
  // const [selectedCat, setSelectedCat] = useState([]);
  const [values, setValues] = useState<string[]>([]);
  const { data: services } = useQuery({
    queryKey: ["getCat"],
    queryFn: getCategories,
  });

  const handleCheckboxChange = (event: any) => {
    if (event.target.checked) {
      const newValue = event.target.value; // Replace this with the value you want to add
      setValues((prevValues) => [...prevValues, newValue]);
    } else {
      setValues((prevValues) =>
        prevValues.filter((value) => value !== event.target.value),
      );
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      serviceTypeId: [],
      referralSource: "",
      sms_opt_in: false,
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.post("/user/provider/signup", data);
      return resp.data;
    },
  });
  const onSubmit = (data: any) => {
    if (data.email.includes("+")) {
    }
    setIsBusy(true);
    const payload = {
      name: `${data.first_name}`,
      platform: "web",
      email: data.email,
      phone: data.phone,
      password: data.password,
      userType: "professional",
      serviceTypeId: values,
      referralSource: data.referralSource
        ? data.referralSource
        : selectedAvenue,
      captcha: captchaRef.current.getValue(),
      sms_opt_in: data.sms_opt_in, // Changed from data.smsOptIn to data.sms_opt_in
    };
    toast.promise(
      () =>
        mutation.mutateAsync(payload, {
          onSuccess: (data) => {
            setIsBusy(false);
            toast.success(data?.message);
            navigate("/auth/verify/user");
            const payload = { ...data };
            const resp_data = data;
            //@ts-ignore
            setUserDetails(resp_data);
            return resp_data;
          },
          onError: (error: any) => {
            console.log(error);
            if ("errors" in error.response.data) {
              let error_arr = error.response.data.errors as {
                message: string;
              }[];
              error_arr.map((err) => {
                toast.error(err.message);
              });
              return setIsBusy(false);
            }
            toast.error(error.response.data.message);
            // const errors_arr = error.response.data.errors as {
            //   message: string;
            // }[];
            // errors_arr.map((err) => {
            //   toast.error(err.message);
            // });
            setIsBusy(false);
          },
        }),
      {
        pending: "signing up",
        success: "signed up",
      },
    );
  };
  const captchaRef = useRef<any>(null);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!ref?.current?.contains(e.target)) {
        setShowDrop(false);
        // setSelectDrop(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [close]);

  const selectOptions = [
    "Google",
    "Bing",
    "Facebook",
    "Instagram",
    "Twitter/X",
    "TikTok",
    "Friend or Family Recommendation",
    "Referral from Another Technician",
    "Google Ads",
    "Email Newsletter",
    "Roadside Assistance Comparison Website",
    "Blog or Article",
    "YouTube or Video Ad",
    "Radio or Podcast",
    "Television Ad",
    "Returning Service Provider",
    "Google Play",
    "Apple App Store",
    "Billboard or Outdoor Signage",
    "Flyer or Brochure",
    "Indeed",
    "LinkedIn",
    "ZipRecruiter",
    "Glassdoor",
    "Craigslist",
    "Yelp Business Directory",
    "Industry Partner",
    "Trade Shows or Industry Events",
    "Community Center or Bulletin Board",
    "Referral from AllDrive SOS Customer",
    "Other (Please Specify)",
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-4">
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your first_name",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Company Name"
                labelClassName="text-[#000000B2] fw-500"
                icon={
                  <LuUserCircle className="text-2xl mx-2 lg:mx-3 text-gray-800" />
                }
                error={errors.first_name?.message}
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
                message: "Please enter your email",
              },
              // validate: (val) => {
              //   if (val.includes("+")) {
              //     return "  Invalid Email";
              //   }
              // },
            }}
            render={({ field }) => (
              <TextInput
                label="Email"
                labelClassName="text-[#000000B2] fw-500"
                icon={<AiOutlineMail className="text-2xl mx-2 lg:mx-4" />}
                error={errors.email?.message}
                type={InputType.email}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="grid lg:grid-cols-2 lg:gap-4">
          <div className="mt-[4px]">
            <label className="mb-1 block mt-3 fw-500 text-[#000000B2]">
              Phone Number
            </label>
            <PhoneInputWithCountry
              international
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
              className="border p-2 border-gray-400 rounded outline-none"
            />
            {errors.phone && (
              <p className="error text-red-400 text-sm">Invalid Phone Number</p>
            )}
          </div>
          <div className="mt-4" ref={ref}>
            <span className="flex  items-center gap-2">
              {" "}
              Service Category
              <Tooltip
                label="Choose the services you’d like to offer."
                placement="top"
              >
                <span className="p-1 bg-red-500 bg-opacity-10 rounded-full ">
                  <TbTooltip className="text-red-400" />
                </span>
              </Tooltip>
            </span>
            <div className="border border-gray-400 w-full mt-[4px] px-[9px] py-[9px] rounded flex items-center gap-x-2">
              <MdOutlineHomeRepairService className="text-2xl text-gray-700" />
              <div className="w-full relative">
                <div
                  className="rounded cursor-pointer flex items-center justify-between"
                  onClick={() => setShowDrop(!showDrop)}
                >
                  <div className="w-[90%] flex items-center gapx-2 overflow-x-auto scroll-pro whitespace-nowrap">
                    {/* {selectedCat.map((item: selectedCatType) => (
                      <span className="px-1 rounded">{item.name},</span>
                    ))} */}
                    <p>Select Services</p>
                  </div>
                  <div onClick={(e) => e.preventDefault()}>
                    {showDrop ? (
                      <FaChevronUp
                        className="text-[13px]"
                        onClick={() => setShowDrop(false)}
                      />
                    ) : (
                      <FaChevronDown
                        className="text-[13px]"
                        onClick={() => setShowDrop(true)}
                      />
                    )}
                  </div>
                </div>
                {showDrop && (
                  <div className="absolute grid gap-2 z-10 top-8 left-0 bg-white w-full p-3 border shadow">
                    {services?.data &&
                      services?.data.map((item: ServiceCatItem) => (
                        <div className="flex items-center gap-x-2">
                          <input
                            type="checkbox"
                            value={item.id}
                            checked={values.includes(String(item.id))}
                            className=""
                            onChange={handleCheckboxChange}
                          />
                          <p>{item.name}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" grid lg:grid-cols-2 gap-4">
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

        <div className=" grid lg:grid-cols-2 gap-4">
          <div className="mt-4">
            <label className="fw-500 text-[#000000B2]">
              How did you hear about us?
            </label>
            <div className="border border-gray-400 w-full mt-[4px] px-[9px] py-[10px] rounded flex items-center gap-x-2">
              <div className="w-full relative">
                <div
                  className="rounded cursor-pointer flex items-center justify-between"
                  onClick={() => setSelectDrop(!selectDrop)}
                >
                  <div className="w-[100%] flex items-center gapx-2 overflow-x-auto scroll-pro whitespace-nowrap">
                    {/* {selectedCat.map((item: selectedCatType) => (
                      <span className="px-1 rounded">{item.name},</span>
                    ))} */}
                    <p className="">{selectedAvenue}</p>
                  </div>
                  <div onClick={(e) => e.preventDefault()}>
                    {selectDrop ? (
                      <FaChevronUp
                        className="text-[13px]"
                        onClick={() => setSelectDrop(false)}
                      />
                    ) : (
                      <FaChevronDown
                        className="text-[13px]"
                        onClick={() => setSelectDrop(true)}
                      />
                    )}
                  </div>
                </div>
                {selectDrop && (
                  <div className="absolute grid gap-2 z-10 top-8 left-0 h-[250px] overflow-y-scroll bg-white w-full p-3 border shadow">
                    {selectOptions.map((options, index) => (
                      <div
                        className="flex items-center cursor-pointer gap-x-2 gap-y-2"
                        onClick={() => [
                          setSelectedAvenue(options),
                          setSelectDrop(false),
                        ]}
                        key={index}
                      >
                        {options}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedAvenue === "Other (Please Specify)" && (
            <div className="mt-8">
              <Controller
                name="referralSource"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please specify",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label=""
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors?.referralSource?.message}
                    type={InputType.text}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
          )}
        </div>
        <div className="mt-4 ml-2">
          <Controller
            name="sms_opt_in"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sms_opt_in"
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sms_opt_in" className="text-gray-700">
                  I agree to receive SMS notifications.
                </label>
              </div>
            )}
          />
        </div>
        <div className="mt-8">
          <ReCAPTCHA
            sitekey={`6Leno1MpAAAAAO0BmPjneoVUVd5FKfw0ED40qvpc`}
            ref={captchaRef}
          />
        </div>
        <div className="mt-12">
          <Button
            title={
              isBusy ? <ScaleSpinner size={14} color="white" /> : "Register"
            }
            disabled={!isValid}
          />
        </div>
      </form>
      <Modal title="" size="sm">
        <div>
          <RegisterSuccess />
        </div>
      </Modal>
    </div>
  );
};

export default ProviderRegisterForm;
