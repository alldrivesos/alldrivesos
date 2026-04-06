import { useMutation } from "@tanstack/react-query";
import { atomWithStorage } from "jotai/utils";
import { useForm } from "react-hook-form";
import PhoneInputWithCountrySelect from "react-phone-number-input/react-hook-form";
import { apiClient } from "../../../../lib/services/api/serviceApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { useServiceSec } from "./service-sec";
import useAuth from "../../../../lib/hooks/authUser";
const profile_sec_atom = atomWithStorage<any>("profile_sec", null);
export const useProfileSec = () => {
  let [prof, setProf] = useAtom(profile_sec_atom);
  return [prof, setProf] as const;
};
export interface SectionProps {
  next: () => void;
}
export default function ProfileSection(props: SectionProps) {
  const { id } = useParams();
  const [profile, setProfile] = useProfileSec();
  const { user } = useAuth();
  const auth = useAuth();

  const [service] = useServiceSec();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: auth.firstName,
      last_name: auth.lastName,
      email: user.email,
      phone: user.phone,
      street_address: "",
      apartment_unit: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });
  const onSubmit = (data: any) => {
    // Combine address fields into single address
    const combinedAddress = [
      data.street_address,
      data.apartment_unit,
      `${data.city}, ${data.state} ${data.zipcode}`,
    ]
      .filter(Boolean)
      .join(", ");

    const submitData = {
      ...data,
      address: combinedAddress,
    };

    toast.promise(create_mutation.mutateAsync(submitData), {
      pending: "Creating profile...",
      success: "Profile created successfully!",
      error: "Failed to create profile",
    });
  };
  const create_mutation = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.post(
        "/service-request/profile-information/create",
        {
          ...data,
          request_id: service.data.serviceRequest.id,
        },
      );
      setProfile(resp.data);
      return resp.data;
    },
    onSuccess: () => {
      props.next();
    },
  });
  // return <>{JSON.stringify(user)}</>;
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Profile Information
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-full text-sm text-gray-600 mb-4">
          *Make sure all fields are filled in correctly before proceeding
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            id="first_name"
            {...register("first_name", { required: "First name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            id="last_name"
            {...register("last_name", { required: "Last name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.last_name.message}
            </p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <PhoneInputWithCountrySelect
            defaultCountry="US"
            countries={["US"]}
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value:
                  /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
                message: "Please Enter A Valid Number",
              },
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message || "Invalid Phone Number"}
            </p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street_address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Street Address
          </label>
          <input
            id="street_address"
            type="text"
            {...register("street_address", {
              required: "Street address is required",
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="123 MAIN ST"
          />
          {errors.street_address && (
            <p className="mt-1 text-sm text-red-600">
              {errors?.street_address?.message}
            </p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="apartment_unit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Apartment/Unit (if applicable)
          </label>
          <input
            id="apartment_unit"
            type="text"
            {...register("apartment_unit")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="APT 101"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city", {
              required: "City is required",
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="ANYTOWN"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors?.city?.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <input
            id="state"
            type="text"
            {...register("state", {
              required: "State is required",
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="CA"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">
              {errors?.state?.message}
            </p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="zipcode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ZIP Code
          </label>
          <input
            id="zipcode"
            type="text"
            {...register("zipcode", {
              required: "ZIP code is required",
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="90210"
          />
          {errors.zipcode && (
            <p className="mt-1 text-sm text-red-600">
              {errors?.zipcode?.message}
            </p>
          )}
        </div>

        <div className="col-span-full text-right mt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            disabled={create_mutation.isPending}
          >
            {create_mutation.isPending ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
