import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import TextInput, { InputType } from "../../../ui/TextInput";
import useAuth from "../../../../hooks/authUser";
import Button from "../../../ui/Button";
import useKycStore, { kycProps } from "../../../../store/kycStore";
import ImageInput from "../../../ui/ImageInput";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../../../services/api/routineApi";
import { toast } from "react-toastify";
import { FaCheck, FaCircleInfo } from "react-icons/fa6";
import dayjs from "dayjs";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_API_KEY } from "../../../../services/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getCityFromGoogle,
  getPostalCodeFromGoogle,
  getStateFromGoogle,
} from "../../../../utils";
import useModal from "../../../../hooks/useModal";
import { MdCancel } from "react-icons/md";

interface Props {
  next: () => void;
  prevKyc: kycProps;
  isLoading: boolean;
}
const GeneralInfo: FC<Props> = ({ next, prevKyc, isLoading }) => {
  const { user } = useAuth();
  const kyc = useKycStore((state) => state.kyc);
  const { Modal, setShowModal } = useModal();
  const saveKyc = useKycStore((state) => state.saveKyc);
  const [imageVal, setImageVal] = useState<Array<File>>();
  const [uploading, setUploading] = useState(0);
  const [bizCert, setbizCert] = useState<Array<File>>();
  const [sending, setSending] = useState(0);
  const [disabledField] = useState(false);

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_API_KEY,
    options: {
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      setValue("address", place.formatted_address || "");
      setValue(
        "business_state",
        getStateFromGoogle(place.address_components || [])
      );
      setValue(
        "business_city",
        getCityFromGoogle(place.address_components || [])
      );
      setValue(
        "business_postal_code",
        getPostalCodeFromGoogle(place.address_components || [])
      );
    },
  });

  useEffect(() => {
    if (prevKyc) {
      setTimeout(() => {
        reset({
          address: kyc.address ? kyc.address : prevKyc.address || "",
          serviceCharge: prevKyc.serviceCharge || 0,
          company: user?.name,
          business_registration_number: kyc.registration_number
            ? kyc.registration_number
            : prevKyc.registration_number || "",
          tin: prevKyc.tax_id || "",
          date: kyc?.incorporation_date
            ? kyc?.incorporation_date
            : prevKyc.incorporation_date || "",
          business_type: kyc?.business_nature
            ? kyc.business_nature
            : prevKyc.business_nature || "",
          business_email: prevKyc.business_email || user?.email || "",
          business_desc: kyc?.business_desc
            ? kyc.business_desc
            : prevKyc?.business_desc || "",
          business_city: kyc?.business_city
            ? kyc.business_city
            : prevKyc?.business_city || "",
          business_postal_code: kyc?.business_postal_code
            ? kyc?.business_postal_code
            : prevKyc?.business_postal_code || "",
          business_state: kyc?.business_state
            ? kyc?.business_state
            : prevKyc?.business_state || "",
          business_phone_number: kyc?.business_phone_number
            ? kyc?.business_phone_number
            : prevKyc?.business_phone_number || "",
        });
      }, 500);
    }
  }, [prevKyc]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      address: kyc?.address || "",
      serviceCharge: kyc?.serviceCharge || 0,
      company: user?.name,
      business_registration_number: kyc?.registration_number || "",
      tin: kyc?.tax_id || "",
      date: kyc?.incorporation_date || "",
      business_type: kyc?.business_nature || "",
      business_email: kyc?.business_email || user?.email || "",
      business_phone_number: kyc?.business_phone_number || user?.phone || "",
      business_desc: kyc?.business_desc || "",
      business_city: kyc?.business_city || "",
      business_postal_code: kyc?.business_postal_code || "",
      business_state: kyc?.business_state || "",
    },
  });

  const upload = useMutation({
    mutationFn: uploadFile,
  });
  // for insurance
  const handleUpload = () => {
    if (imageVal?.length) {
      setUploading(1);
      const fd = new FormData();
      for (let i = 0; i < imageVal.length; i++) {
        fd.append("image", imageVal[i]);
      }
      upload.mutateAsync(fd, {
        onSuccess: (data) => {
          setImageVal([]);
          saveKyc({ ...kyc, insurance_doc: [...kyc.insurance_doc, ...data] });
          setUploading(2);
        },
        onError: (error) => {
          toast.error(error.message);
          setUploading(3);
        },
      });
    }
  };

  useEffect(() => {
    handleUpload();
  }, [imageVal]);

  const removeFromSelected = (url: string) => {
    const data = kyc.insurance_doc;
    const filtered = data.filter((where: string) => where !== url);
    saveKyc({ ...kyc, insurance_doc: filtered });
  };

  // for business certificate
  const handleCertUpload = () => {
    if (kyc.insurance_doc.length > 0) {
      if (kyc.insurance_doc.length > 4) {
        toast.info("Maximum upload reached");
        return;
      }
      if (bizCert?.length) {
        setSending(1);
        const fd = new FormData();
        fd.append("image", bizCert[0]);
        upload.mutateAsync(fd, {
          onSuccess: (data) => {
            saveKyc({ ...kyc, business_reg_certificate: data[0] });
            setSending(2);
          },
          onError: (error) => {
            toast.error(error.message);
            setSending(3);
          },
        });
      }
    }
  };

  useEffect(() => {
    handleCertUpload();
  }, [bizCert]);

  const submitAction = (data: any) => {
    const payload = {
      business_name: user.name,
      registration_number: data.business_registration_number,
      incorporation_date: data?.date,
      address: data.address,
      business_email: data.business_email,
      business_phone_number: data.business_phone_number,
      business_nature: data.business_type,
      staff_number: 2,
      vat_registration_number: data.business_registration_number,
      tax_id: data.tin,
      serviceCharge: data.serviceCharge,
      business_desc: data?.business_desc,
      business_city: data?.business_city,
      business_postal_code: data?.business_postal_code,
      business_state: data?.business_state,
    };
    saveKyc({ ...kyc, ...payload });
    next();
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        {kyc?.isVerified && (
          <div className="flex gap-x-1 items-center">
            <span className="w-4 h-4 circle bg-green-600 block"></span>
            <p className="text-green-700 fw-600">Verified</p>
          </div>
        )}
      </div>
      <div className="bg-gray-100 p-4 pb-8 rounded-md">
        <form onSubmit={handleSubmit(submitAction)}>
          <div className="grid gap-3">
            <Controller
              name="company"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter category company",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Company Name (optional)"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.company?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-3">
              <Controller
                name="business_registration_number"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter category tin",
                  },
                }}
                disabled={disabledField}
                render={({ field }) => (
                  <TextInput
                    label="Business Reg No"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.business_registration_number?.message}
                    type={InputType.text}
                    {...field}
                    ref={null}
                  />
                )}
              />
              <div className="">
                <div className="flex gap-x-3 items-center mt-3">
                  <label className="block text-[#000000B2] fw-500">
                    Date of Incorporation/Registration
                  </label>
                  {kyc?.incorporation_date && (
                    <p className="bg-gray-200 fw-600 px-2">
                      {dayjs(kyc?.incorporation_date).format("MMMM-YYYY")}
                    </p>
                  )}
                </div>
                <div className="mt-1 bg-white rounded-lg border border-gray-400">
                  <DatePicker
                    selected={
                      watch("date")
                        ? dayjs(watch("date")).toDate()
                        : new Date(2010, 0)
                    }
                    startDate={new Date(2010, 0)}
                    onChange={(date) =>
                      setValue("date", dayjs(date).format("YYYY-MM") || "")
                    }
                    showIcon
                    maxDate={new Date()}
                    dateFormat={"dd - MM - yyyy"}
                    className="block !w-full"
                  />
                </div>
              </div>
            </div>
            <Controller
              name="business_desc"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter business description",
                },
              }}
              disabled={disabledField}
              render={({ field }) => (
                <TextInput
                  label="Business Description"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.business_desc?.message}
                  type={InputType.textarea}
                  {...field}
                  ref={null}
                />
              )}
            />
            <div className="grid lg:grid-cols-2 gap-4">
              <Controller
                name="address"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter category address",
                  },
                }}
                disabled={disabledField}
                render={({ field }) => (
                  <div className="w-full mt-[6px]">
                    <p className="text-[#000000B2] fw-500">
                      Operational Address
                    </p>
                    <input
                      type="text"
                      {...field}
                      ref={ref as any}
                      className="w-full bg-white outline-none p-2 lg:p-[10px] mt-[5px] rounded-lg border border-gray-400 placeholder:text-black"
                      placeholder="Enter operational full address"
                    />
                  </div>
                )}
              />
              <Controller
                name="business_postal_code"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter a value",
                  },
                }}
                disabled={disabledField}
                render={({ field }) => (
                  <TextInput
                    label="Postal Code"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.business_postal_code?.message}
                    type={InputType.text}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <label className="block mt-3 text-[#000000B2] fw-500">
                  Nature of Company
                </label>
                <Controller
                  name="business_type"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter a value",
                    },
                  }}
                  disabled={disabledField}
                  render={({ field }) => (
                    <select
                      className="border w-full border-gray-400 rounded-[4px] py-2 px-3 mt-2"
                      {...field}
                    >
                      <option value="">Please select an option</option>
                      <option value="Limited Liability Company (LLC)">
                        Limited Liability Company (LLC)
                      </option>
                      <option value="Sole Proprietorship">
                        Sole Proprietorship
                      </option>
                      <option value="Partnership">Partnership</option>
                      <option value="Corporation">Corporation</option>
                    </select>
                  )}
                />
              </div>

              <Controller
                name="tin"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter category tin",
                  },
                }}
                disabled={disabledField}
                render={({ field }) => (
                  <TextInput
                    label="Tax Identification Number"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.tin?.message}
                    type={InputType.text}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
            <div className="mt-3 relative">
              {!isLoading && (
                <ImageInput
                  label="Upload Business Registration Certificate (File must be in jpg or jpeg format)"
                  setImage={setbizCert}
                  prevValue={prevKyc?.business_reg_certificate}
                  disabled={disabledField}
                />
              )}
              {sending === 1 && (
                <p className="fs-400 italics text-gray-500 fw-500">
                  Document is uploading...
                </p>
              )}
              {sending === 2 && (
                <p className="fs-400 italics text-green-600 fw-500">
                  Document is uploaded
                </p>
              )}
            </div>
            <div className="mt-3 relative">
              {!isLoading && (
                <ImageInput
                  label="Upload Insurance Requirement (File must be in jpg or jpeg format)"
                  setImage={setImageVal}
                  prevValue={
                    (prevKyc &&
                      prevKyc?.insurance_doc?.length &&
                      prevKyc?.insurance_doc[0]) ||
                    []
                  }
                  disabled={disabledField}
                />
              )}
              {uploading === 1 && (
                <p className="fs-400 italics text-gray-500 fw-500">
                  Document is uploading...
                </p>
              )}
              {uploading === 2 && (
                <p className="fs-400 italics text-green-600 fw-500">
                  Document is uploaded
                </p>
              )}
              <div className="pt-6 flex overflow-x-auto scroll-pro gap-x-2">
                {kyc?.insurance_doc?.length ? (
                  kyc.insurance_doc.map((item) => (
                    <div className="relative w-[200px] h-[140px]">
                      <img src={item} key={item} className="w-[100%] h-full" />
                      <MdCancel
                        className="text-red-500 cursor-pointer absolute text-xl -top-2 -right-1"
                        onClick={() => removeFromSelected(item)}
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div
                className="absolute top-1 left-[550px]"
                // onMouseEnter={() => setShowTip(true)}
                // onMouseLeave={() => setShowTip(false)}
              >
                <FaCircleInfo
                  className="cursor-pointer"
                  onClick={() => setShowModal(true)}
                />
              </div>
            </div>
            <div>
              <p className="fw-500 mt-3">Company Contact Information</p>
              <div className="grid lg:grid-cols-2 gap-x-4 gap-y-3">
                <Controller
                  name="business_email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter a value",
                    },
                  }}
                  disabled={disabledField}
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      labelClassName="text-[#000000B2] fw-500"
                      error={errors.business_email?.message}
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
                    countries={["US"]}
                    name="business_phone_number"
                    control={control}
                    disabled={disabledField}
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
                  {errors.business_phone_number && (
                    <p className="error text-red-400 text-sm">
                      Invalid Phone Number
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="flex justify-end">
              <div className="w-3/12">
                <Button title={"Next"} disabled={!isValid} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal title="">
        <div className="text-black">
          <div className="px-5">
            <div className="w-full flex gap-3">
              <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-pri">
                <FaCheck className="text-ter fs-300 lg:fs-500" />
              </div>
              <span className="fs-700 fw-700 mt-1">Insurance Requirements</span>
            </div>
            <div className="mt-3 w-full">
              <ul
                className="flex flex-col gap-3"
                style={{ listStyle: "circle" }}
              >
                <li>
                  <span className="fw-700">Certificate of Insurance</span>: Hold
                  active Commercial General Liability and Commercial Automobile
                  Insurance from a reputable insurance company with an A- or
                  better rating from
                  <a href="https://web.ambest.com/home" target="_blank">
                    {" "}
                    <span className="underline">A.M. BEST</span>
                  </a>
                  <ul
                    className="md:mx-6 flex flex-col gap-3 my-3"
                    style={{ listStyle: "disc" }}
                  >
                    <li>
                      <span className="fw-700">For roadside/soft services</span>
                      :
                      <ul
                        className="md:mx-9 mx-3 flex flex-col gap-3 my-2"
                        style={{ listStyle: "disc" }}
                      >
                        <li>
                          <span className="fw-500">
                            Commercial General Liability Insurance: Minimum
                            $1,000,000
                          </span>
                        </li>
                        <li>
                          <span className="fw-500">
                            Commercial Automobile Insurance: Minimum $1,000,000
                          </span>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <span className="fw-700">Towing Services</span>:
                      <ul
                        className="md:mx-9 mx-3 flex flex-col gap-3 mt-2"
                        style={{ listStyle: "disc" }}
                      >
                        <li>
                          <span className="fw-500">
                            On-Hook Insurance: Minimum $100,000
                          </span>
                        </li>
                        <li>
                          <span className="fw-500">
                            Garage Keepers Legal Liability Insurance (if you
                            provide storage services): Minimum $100,000
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="fw-700">Additional Insured</span>: ALLDRIVE
                  SOS LLC must be included as an additional insured on both your
                  Commercial General Liability and Commercial Automobile
                  insurance policies.
                </li>
                <li>
                  <span className="fw-700">Proof of Insurance</span>: Submit a
                  certificate of insurance that satisfies the requirements
                  above.
                </li>
                <li>
                  <span className="fw-700">Policy Renewal</span>: When your
                  insurance policies are renewed, you must provide ALLDRIVE SOS
                  LLC with an updated certificate of insurance. You can do this
                  by logging into your account and updating your KYC information
                  under the "Settings" tab.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GeneralInfo;
