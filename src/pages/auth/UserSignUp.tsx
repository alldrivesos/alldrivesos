import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { apiClient } from "../../lib/services/api/serviceApi";
import { toast } from "react-toastify";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
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

type SignUpFormInputs = {
  platform: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone: string; // Storing as string for input flexibility
  zipcode: string; // Added zipcode field
  referralSource?: string; // Changed from howDidYouHear
  captcha: string; // This will now store the reCAPTCHA token
  sms_opt_in: boolean;
};
interface SignUpResponse {
  success: boolean;
  userId: string;
  message: string;
}
const user_details_atom = atomWithStorage<SignUpResponse | null>(
  "temp_user_details",
  null,
);
export const useTempUser = () => {
  const [userDetails, setUserDetails] = useAtom(user_details_atom);
  return [userDetails, setUserDetails] as const;
};

export default function UserSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue, // Added setValue to programmatically set captcha token
    setError, // Added setError to manually set captcha errors
    clearErrors, // Added clearErrors to clear captcha errors
  } = useForm<SignUpFormInputs>({
    defaultValues: {
      platform: "web", // Default value for platform
      sms_opt_in: false, // Default value for checkbox
      captcha: "", // Initialize captcha to an empty string
    },
  });

  // Use useRef to get a reference to the ReCAPTCHA component for methods like reset()
  // Keeping 'any' type as in original to avoid unrequested type definition fixes.
  const captchaRef = useRef<any>(null);
  const [userDetails, setUserDetails] = useAtom(user_details_atom);
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpFormInputs) => {
      const payload = { ...data };
      let resp = await apiClient.post("/user/signup", payload);
      const resp_data = resp.data;
      setUserDetails(resp_data);
      return resp_data;
    },
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
      reset(); // Resets all form fields managed by react-hook-form
      captchaRef.current?.reset(); // Resets the reCAPTCHA widget itself
      setValue("captcha", ""); // Clear the captcha value explicitly in the form state
      toast.success("Sign up successful! check email for otp");
      navigate("/auth/verify/user");
    },
    onError: (error: any) => {
      console.error("Sign up error:", error);
      captchaRef.current?.reset(); // Reset reCAPTCHA on error to allow user to try again
      setValue("captcha", ""); // Clear captcha value in form state
      setError("captcha", {
        type: "manual",
        message:
          error.message || "reCAPTCHA verification failed. Please try again.",
      });
      toast.error("Sign up failed: " + (error.message || "Please try again.")); // Provide user feedback
    },
  });

  // Function to handle reCAPTCHA change (token received)
  const onCaptchaChange = (token: string | null) => {
    setValue("captcha", token || ""); // Set the captcha token in the form state
    if (token) {
      clearErrors("captcha"); // Clear any captcha errors if a token is successfully received
    }
  };

  // Function to handle reCAPTCHA expiration
  const onCaptchaExpired = () => {
    setValue("captcha", ""); // Clear the captcha value when it expires
    setError("captcha", {
      type: "manual",
      message: "reCAPTCHA expired. Please verify again.",
    });
    captchaRef.current?.reset(); // Reset the reCAPTCHA widget
  };

  // Function to handle reCAPTCHA error
  const onCaptchaError = () => {
    setValue("captcha", ""); // Clear the captcha value on error
    setError("captcha", {
      type: "manual",
      message: "reCAPTCHA encountered an error. Please try again.",
    });
    captchaRef.current?.reset(); // Reset the reCAPTCHA widget
  };

  const onSubmit = (data: SignUpFormInputs) => {
    // Manually validate reCAPTCHA token before submission
    if (!data.captcha) {
      setError("captcha", {
        type: "required",
        message: "Please complete the reCAPTCHA verification",
      });
      return; // Prevent form submission
    }
    signUpMutation.mutate(data);
  };

  return (
    <>
      <div className="min-h-dvh bg-primary py-12 ">
        <div className="w-full h-full  bg-login">
          <div className="box h-full place-center">
            <div className="lg:w-7/12 mx-auto bg-white lg:px-16 p-6 rounded-lg shadow-lg">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
                  alt="logo"
                  className="w-60 mx-auto my-6"
                  width={400}
                  height={80}
                />
              </Link>
              <div className="mt-6 lg:mt-6 text-center">
                <p className="text-2xl fw-600 text-gray-800">
                  Create a User Account
                </p>
                <p className="mt-3 fs-500 text-gray-600">
                  Fill in your credentials to create an account on this platform
                </p>
              </div>
              <div className="mt-3 lg:mt-3 text-center">
                <p className="fs-500">
                  Company Account? 👉{" "}
                  <Link
                    to={"/auth/register/"}
                    className="underline fw-500 text-primary"
                  >
                    Register Here.
                  </Link>
                </p>
              </div>
              <div className="my-8 lg:mt-8 mb-5 mx-auto  p-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 flex flex-col"
                >
                  {/* Platform - can be a hidden field or selectable based on use-case */}
                  {/* Removed the manual captcha input field as ReCAPTCHA handles it */}

                  <div>
                    <label
                      htmlFor="fname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      {...register("fname", {
                        required: "First name is required",
                      })}
                      id="fname"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="First Name"
                    />
                    {errors.fname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fname.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      {...register("lname", {
                        required: "Last name is required",
                      })}
                      id="lname"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Last Name"
                    />
                    {errors.lname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lname.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/,
                          message: "Invalid email",
                        },
                      })}
                      id="email"
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      id="password"
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Phone number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <PhoneInputWithCountry
                      international={true}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label
                      htmlFor="zipcode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Zip Code
                    </label>
                    <input
                      {...register("zipcode", {
                        required: "Zip code is required",
                        pattern: {
                          value: /^\d{5}(-\d{4})?$/, // Basic US zip code pattern
                          message: "Invalid zip code",
                        },
                      })}
                      id="zipcode"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., 90210"
                    />
                    {errors.zipcode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>

                  {/* Referral Source */}
                  <div>
                    <label
                      htmlFor="referralSource"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Referral Source (Optional)
                    </label>
                    <select
                      {...register("referralSource")}
                      id="referralSource"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      {selectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.referralSource && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.referralSource.message}
                      </p>
                    )}
                  </div>

                  {/* SMS Opt-in */}
                  <div className="flex items-center space-x-2">
                    <input
                      {...register("sms_opt_in")}
                      type="checkbox"
                      id="sms_opt_in"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="sms_opt_in"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Opt-in for SMS notifications
                    </label>
                  </div>
                  {/* reCAPTCHA component for actual verification */}
                  <div>
                    {/* Label is usually not needed for ReCAPTCHA widget as it's self-explanatory */}
                    <ReCAPTCHA
                      sitekey={`6Leno1MpAAAAAO0BmPjneoVUVd5FKfw0ED40qvpc`}
                      ref={captchaRef}
                      onChange={onCaptchaChange} // Handle token changes
                      onExpired={onCaptchaExpired} // Handle token expiration
                      onErrored={onCaptchaError} // Handle errors with reCAPTCHA
                    />
                    {errors.captcha && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.captcha.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={signUpMutation.isPending}
                    className="w-full bg-primary text-white p-3 rounded-md fw-600 text-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {signUpMutation.isPending ? "Signing up..." : "Sign Up"}
                  </button>
                </form>
              </div>
              <div className="text-center mt-6">
                <p className="fs-500 text-gray-700">
                  Already registered?{" "}
                  <Link
                    to={"/auth/login"}
                    className="underline fw-500 text-primary hover:text-primary-dark"
                  >
                    Go to login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
