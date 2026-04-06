import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resendCode, verifyProvider } from "../../lib/services/api/authApi";
import { BeatLoader } from "react-spinners";
import happy from "../../assets/happystate.gif";
import fail from "../../assets/error.gif";
import { toast } from "react-toastify";
import { useEffect } from "react";

const VerifyEmail = () => {
  const { code } = useParams();
  const navigate = useNavigate()
  const email = code?.split("&");
  
  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getCat"],
    queryFn: () => verifyProvider(code || ""),
    retry: 1,
    retryDelay: 1000,
  });
  useEffect(() => {
    if(isSuccess){
        setTimeout(() => {
            navigate('/auth/login')
        }, 3000);
    }
  }, [isSuccess])

  const resendTok = useMutation({
    mutationFn: resendCode,
  });
  const handleResend = () => {
    const payload = {
      email: !!email?.length ? email[0]?.replace("email=", "") : "",
      platform: "web",
    };
    resendTok.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("Verification token has been sent to your mail");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <>
      <div className="bg-primary h-screen">
        <div className="w-full h-full bg-login">
          <div className="box h-full place-center">
            <div className="lg:w-[550px] mx-auto bg-white lg:px-16 p-6">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
                  alt="logo"
                  className="w-60 mx-auto my-6"
                  width={400}
                  height={80}
                />
              </Link>
              <div className="my-8 lg:mt-8 mb-5 mx-auto">
                {isLoading && (
                  <div className="w-full h-36 place-center">
                    <BeatLoader size={34} />
                  </div>
                )}
                {isSuccess && (
                  <div>
                    <img src={happy} alt="check" className="w-6/12 mx-auto" />
                    <p className="text-center text-black fw-600 text-lg lg:text-xl">
                      Accout confirmation Successful
                    </p>
                    <p className="mt-4 fw-600 text-gray-500 text-center italics fs-300">
                      Redirecting to login...
                    </p>
                  </div>
                )}
                {isError && (
                  <div>
                    <img src={fail} alt="check" className="w-3/12 mx-auto" />
                    <p className="text-center text-black mt-5 fw-600 text-lg lg:text-xl">
                      Accout confirmation Failed
                    </p>
                    <p
                      onClick={handleResend}
                      className="mt-4 fw-600 cursor-pointer text-gray-500 text-center italics fs-300"
                    >
                      Click to resend mail
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
