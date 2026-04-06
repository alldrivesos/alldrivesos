import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiClient } from "../../lib/services/api/serviceApi";
import { useTempUser } from "./UserSignUp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../lib/store/userStore";
import { removeSpace } from "../../lib/utils";
import { simpleClient } from "../../lib/services/api/simpleapi";
import { AxiosResponse, AxiosResponseHeaders } from "axios";

type OtpFormInputs = {
  otp: string;
};

export default function OtpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // Removed: control, setValue, setError, clearErrors as they are not needed for this simplified form
  } = useForm<OtpFormInputs>({
    defaultValues: {
      otp: "", // Initialize OTP field
    },
  });

  const saveUser = useAuthStore((state) => state.saveUser);

  const [userDetails, setUserDetails] = useTempUser();
  const nav = useNavigate();
  const verify_code = useMutation({
    mutationFn: async (data: OtpFormInputs) => {
      console.log("OTP submitted:", data.otp);
      let resp = await simpleClient.post("/user/verifyemail/v2", {
        userId: userDetails?.userId,
        token: String(data.otp),
      });
      return resp.data;
      reset(); // Resets the form after submission
    },
    onError: (error: AxiosResponseHeaders) => {
      console.error("Error verifying OTP:", error);
      toast.error(error?.response.data.message || "Failed to verify OTP");
    },
    onSuccess: (data) => {
      toast.success("OTP verified successfully");
      const payload = {
        token: data.token,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        image: data.user.photo,
        state: data.user.state,
        account: data.user.userType,
        id: data.user.id,
        charge: data.user.serviceCharge,
      };
      saveUser(payload);
      localStorage.setItem("rhs_token", data.token);
      if (data.user.userType === "private_client") {
        saveUser({
          token: data.token,
          email: data.user.email,
          phone: data.user.phone,
          image: data.user.photo,
          state: data.user.state,
          account: data.user.userType,
          id: data.user.id,
          name: `${removeSpace(data?.user?.fname)} ${removeSpace(
            data?.user?.lname,
          )}`,
        });
        nav("/user");
        toast.success("Login Success");
      } else if (data?.user?.userType === "professional") {
        nav("/provider");
        toast.success("Login Success");
      } else {
        toast.info("This account is mobile-only. Please use our app");
      }
    },
  });
  const onSubmit = (data: OtpFormInputs) => {
    // return console.log(userDetails);
    console.log("OTP submitted:", data.otp);
    toast.promise(verify_code.mutateAsync(data), {
      pending: "Verifying...",
    });
    reset();
  };
  return (
    <>
      <div className="min-h-dvh bg-primary py-12 ">
        <div className="w-full h-full  bg-login">
          <div className="box h-full place-center">
            <div className="lg:w-7/12 mx-auto bg-white lg:px-16 p-6 rounded-lg shadow-lg">
              {/* Removed logo image and Link as they are not essential for a simple OTP form */}
              <div className="mt-6 lg:mt-6 text-center">
                <p className="text-2xl fw-600 text-gray-800">Enter OTP Code</p>
                <p className="mt-3 fs-500 text-gray-600">
                  Please enter the 6-digit verification code sent to your email.
                </p>
              </div>
              <div className="my-8 lg:mt-8 mb-5 mx-auto  p-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 flex flex-col"
                >
                  {/* OTP Input Field */}
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      OTP Code
                    </label>
                    <input
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^\d{6}$/, // Regular expression to match exactly 6 digits
                          message: "OTP must be exactly 6 digits",
                        },
                        minLength: {
                          value: 6,
                          message: "OTP must be 6 digits",
                        },
                        maxLength: {
                          value: 6,
                          message: "OTP must be 6 digits",
                        },
                      })}
                      id="otp"
                      type="text" // Use text type for flexibility, `inputMode` and `pattern` hint for numeric
                      inputMode="numeric" // Suggests numeric keyboard on mobile devices
                      pattern="[0-9]*" // HTML5 pattern attribute for numeric input hint
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center tracking-widest text-xl" // Added some styling for better OTP visual
                      placeholder="______" // Visual hint for 6 digits
                    />
                    {errors.otp && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.otp.message}
                      </p>
                    )}
                  </div>

                  {/* All other input fields (fname, lname, email, password, phone, fcm_token, referralSource, reCAPTCHA, sms_opt_in) from the original layout have been removed as per the prompt to create a "simple form that accepts otp code only". */}

                  <button
                    disabled={verify_code.isPending}
                    type="submit"
                    // Removed disabled state as there is no pending mutation for this simple form
                    className="w-full bg-primary text-white p-3 rounded-md fw-600 text-lg hover:bg-primary-dark transition-colors duration-200"
                  >
                    {verify_code.isPending ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              </div>
              {/* Removed "Already registered? Go to login" section as it's not relevant for an OTP verification form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
